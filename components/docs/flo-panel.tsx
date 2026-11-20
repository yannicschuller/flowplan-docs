"use client";
// The „Frag Flo“ panel: a modal dialog docked bottom right (a bottom sheet
// on phones) with the conversation, the question box and the privacy note.
//
// Asking (lib/flo.ts has the contract's details):
//   1. POST {ASK_URL}/api/session → { challenge, difficulty }; the Web
//      Worker public/flo-pow.js finds the nonce (about a second, "Flo wird
//      vorbereitet …"); POST /api/session { challenge, nonce } →
//      { sessionToken }, kept in sessionStorage for this tab only.
//   2. POST /api/ask with X-Ask-Session: { question, history, locale,
//      source: "docs", page } → { answer, sources }.
// No cookies (credentials: "omit"), no referrer, nothing counted. The
// conversation stays in sessionStorage – gone when the tab closes, or with
// „Neu anfangen“ – and only its latest turns go along with a follow-up.
// Answers render as React elements (lib/flo-markdown.tsx), never as HTML.
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon, X } from "../icons";
import {
  allowedLink,
  DEFAULT_MAX_QUESTION,
  describeProblem,
  docsPath,
  historyFor,
  MAX_KEPT,
  parseAnswer,
  parseTurns,
  retryText,
  SESSION_MS,
  type FloProblem,
  type FloSource,
  type FloTurn,
} from "@/lib/flo";
import { renderFloMarkdown } from "@/lib/flo-markdown";
import { useLocale, usePrefix, useT } from "../i18n";
import { FloOtter } from "./flo-otter";
import { FLO_KEYS, readSession, writeSession } from "./flo-store";
import s from "./flo.module.css";

// Phosphor "ArrowClockwise" (regular) and "ArrowUp" (bold), see ../icons.tsx.
const ARROW_CLOCKWISE = "M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z";
const ARROW_UP_BOLD = "M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z";

type Phase = "idle" | "preparing" | "asking";
// Why Flo stopped answering on the docs (off, budget, global limit).
type FloStop = { kind: "off" | "budget" | "global"; retryAt?: Date | null };
class Problem extends Error {
  constructor(readonly problem: FloProblem) {
    super(problem.kind);
  }
}

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
    });
  } catch {
    throw new Problem({ kind: "error", status: 0 });
  }
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Problem(describeProblem(response.status, data));
  return data;
}

// The nonce for a challenge, from the worker (at most a minute).
function solve(challenge: string, difficulty: number): Promise<number> {
  return new Promise((resolve, reject) => {
    let worker: Worker;
    try {
      worker = new Worker("/flo-pow.js");
    } catch {
      reject(new Problem({ kind: "error", status: -1 }));
      return;
    }
    const timer = setTimeout(() => done(() => reject(new Problem({ kind: "error", status: -1 }))), 60000);
    const done = (then: () => void) => {
      clearTimeout(timer);
      worker.terminate();
      then();
    };
    worker.onmessage = (event: MessageEvent<{ nonce?: number; error?: string }>) =>
      done(() => (typeof event.data?.nonce === "number" ? resolve(event.data.nonce) : reject(new Problem({ kind: "error", status: -1 }))));
    worker.onerror = () => done(() => reject(new Problem({ kind: "error", status: -1 })));
    worker.postMessage({ challenge, difficulty });
  });
}

function storedToken(): string | null {
  try {
    const { token, at } = JSON.parse(readSession(FLO_KEYS.session) || "null") as { token: string; at: number };
    return typeof token === "string" && Date.now() - at < SESSION_MS && Date.now() >= at ? token : null;
  } catch {
    return null;
  }
}

export default function FloPanel({
  askUrl,
  open,
  request,
  onClose,
  onStop,
}: {
  askUrl: string;
  open: boolean;
  request: { query: string; n: number };
  onClose: () => void;
  onStop: () => void;
}) {
  const t = useT();
  const locale = useLocale();
  const prefix = usePrefix();
  const path = usePathname();
  const titleId = useId();
  const counterId = useId();
  const noteId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  // The conversation of this tab (the panel renders only in the browser).
  const [turns, setTurns] = useState<FloTurn[]>(() => parseTurns(readSession(FLO_KEYS.turns)));
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [problem, setProblem] = useState<{ problem: FloProblem; question: string } | null>(null);
  const [max, setMax] = useState(() => {
    const stored = Number(readSession(FLO_KEYS.max));
    return Number.isInteger(stored) && stored >= 20 && stored <= 10000 ? stored : DEFAULT_MAX_QUESTION;
  });
  const [announce, setAnnounce] = useState("");
  const [stop, setStop] = useState<FloStop | null>(null);
  const stopWith = useCallback(
    (reason: FloStop) => {
      setStop(reason);
      onStop();
    },
    [onStop],
  );
  useEffect(() => {
    if (!stop) return;
    const timer = setTimeout(() => setStop(null), 12000);
    return () => clearTimeout(timer);
  }, [stop]);

  const save = (next: FloTurn[]) => {
    const kept = next.slice(-MAX_KEPT);
    setTurns(kept);
    writeSession(FLO_KEYS.turns, kept.length ? JSON.stringify(kept) : null);
  };

  // Opened and closed by the button; Escape and the backdrop close it.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      field.current?.focus();
    } else if (!open && d.open) d.close();
  }, [open]);

  // The latest message in view.
  useEffect(() => {
    const box = log.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [turns, pending, problem, phase]);

  const token = useCallback(async (): Promise<string> => {
    const kept = storedToken();
    if (kept) return kept;
    setPhase("preparing");
    const challenge = (await post(`${askUrl}/api/session`, {})) as { challenge?: unknown; difficulty?: unknown } | null;
    if (!challenge || typeof challenge.challenge !== "string" || !Number.isInteger(challenge.difficulty)) throw new Problem({ kind: "error", status: -2 });
    const nonce = await solve(challenge.challenge, challenge.difficulty as number);
    const session = (await post(`${askUrl}/api/session`, { challenge: challenge.challenge, nonce })) as { sessionToken?: unknown } | null;
    if (!session || typeof session.sessionToken !== "string") throw new Problem({ kind: "error", status: -2 });
    writeSession(FLO_KEYS.session, JSON.stringify({ token: session.sessionToken, at: Date.now() }));
    return session.sessionToken;
  }, [askUrl]);

  const busy = phase !== "idle";
  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busy) return;
      if (q.length > max) {
        setProblem({ problem: { kind: "too-long", max }, question: q });
        return;
      }
      setProblem(null);
      setPending(q);
      setQuestion("");
      setAnnounce("");
      const slug = path.replace(/^\/(de|en|fr|zh)(?=\/|$)/, "").match(/^\/([a-z0-9-]+)$/)?.[1];
      const body = { question: q, history: historyFor(turns), locale, source: "docs", ...(slug ? { page: slug } : {}) };
      try {
        let data: unknown;
        for (let attempt = 0; ; attempt++) {
          const session = await token();
          setPhase("asking");
          try {
            data = await post(`${askUrl}/api/ask`, body, { "X-Ask-Session": session });
            break;
          } catch (error) {
            // An expired or unknown session: a new challenge, once.
            if (error instanceof Problem && error.problem.kind === "session" && attempt === 0) {
              writeSession(FLO_KEYS.session, null);
              continue;
            }
            throw error;
          }
        }
        const answer = parseAnswer(data);
        if (!answer) throw new Problem({ kind: "error", status: -2 });
        save([...turns, { question: q, ...answer }]);
        setAnnounce(t("Flo hat geantwortet.", "Flo has answered."));
      } catch (error) {
        const p: FloProblem = error instanceof Problem ? error.problem : { kind: "error", status: -1 };
        if (p.kind === "off" || p.kind === "budget") stopWith({ kind: p.kind });
        else if (p.kind === "limit" && p.scope === "global") stopWith({ kind: "global", retryAt: p.retryAt });
        else {
          if (p.kind === "too-long" && p.max) {
            setMax(p.max);
            writeSession(FLO_KEYS.max, String(p.max));
          }
          setProblem({ problem: p, question: q });
          setQuestion(q);
        }
      } finally {
        setPending(null);
        setPhase("idle");
      }
    },
    [askUrl, busy, locale, max, stopWith, path, t, token, turns],
  );

  // A request from the button or the search ("Flo fragen: …").
  const handled = useRef(0);
  useEffect(() => {
    if (request.n === handled.current) return;
    handled.current = request.n;
    // From the search: the query waits in the box, under the privacy note,
    // until the reader sends it.
    if (request.query) {
      setQuestion(request.query.slice(0, max));
      setProblem(null);
      requestAnimationFrame(() => field.current?.focus());
    }
  }, [request.n]);

  const restart = () => {
    save([]);
    setProblem(null);
    setQuestion("");
    setAnnounce(t("Neues Gespräch.", "New conversation."));
    field.current?.focus();
  };

  // Tab stays inside the panel.
  const trap = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !dialog.current) return;
    const items = [...dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea:not([disabled]), [tabindex="0"]')].filter(
      (el) => el.offsetParent !== null,
    );
    if (!items.length) return;
    const first = items[0],
      last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const newTab = t("öffnet in neuem Tab", "opens in a new tab");
  const md = { prefix, newTab };
  const left = max - question.length;
  const status =
    phase === "preparing"
      ? t("Flo wird vorbereitet …", "Getting Flo ready …")
      : phase === "asking"
        ? t("Flo schaut in der Doku nach …", "Flo is looking it up in the docs …")
        : "";

  return (
    <>
      <dialog
        ref={dialog}
        className={s.panel}
        aria-labelledby={titleId}
        onCancel={(e) => {
          e.preventDefault();
          onClose();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) onClose();
        }}
        onKeyDown={trap}
      >
        <div className={s.sheet}>
          <header className={s.head}>
            <FloOtter size={36} className={s.otter} />
            <div className={s.headText}>
              <h2 id={titleId}>{t("Frag Flo", "Ask Flo")}</h2>
              <p>{t("Antwortet aus dieser Dokumentation", "Answers from these docs")}</p>
            </div>
            {turns.length > 0 && (
              <button type="button" className={s.restart} onClick={restart} disabled={busy}>
                <Icon path={ARROW_CLOCKWISE} size={15} aria-hidden="true" />
                {t("Neu anfangen", "Start over")}
              </button>
            )}
            <button type="button" className={s.close} onClick={onClose} aria-label={t("Flo schließen", "Close Flo")}>
              <Icon path={X} size={18} aria-hidden="true" />
            </button>
          </header>

          <div className={s.log} ref={log} tabIndex={0} role="region" aria-label={t("Gespräch mit Flo", "Conversation with Flo")}>
            {turns.length === 0 && !pending && (
              <div className={s.hello}>
                <p>
                  <strong>{t("Hallo, ich bin Flo!", "Hi, I'm Flo!")}</strong>{" "}
                  {t(
                    "Frag mich etwas zu Flowplan – ich antworte aus dieser Dokumentation und sage dir, auf welchen Seiten es steht.",
                    "Ask me something about Flowplan – I answer from these docs and tell you which pages it comes from.",
                  )}
                </p>
                <ul className={s.examples}>
                  {[
                    t("Wie sichere ich meine Instanz?", "How do I back up my instance?"),
                    t("Wie lege ich ein Kanban-Board an?", "How do I create a kanban board?"),
                    t("Wie melde ich mich mit SSO an?", "How do I set up single sign-on?"),
                  ].map((example) => (
                    <li key={example}>
                      <button type="button" onClick={() => void send(example)} disabled={busy}>
                        {example}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {turns.map((turn, i) => (
              <Exchange key={i} turn={turn} md={md} prefix={prefix} newTab={newTab} t={t} />
            ))}
            {pending && (
              <div className={s.exchange}>
                <p className={s.question}>{pending}</p>
                <p className={s.thinking}>
                  <span className={s.dots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  {status}
                </p>
              </div>
            )}
            {problem && (
              <ProblemNote
                problem={problem.problem}
                locale={locale}
                t={t}
                onRetry={problem.problem.kind === "error" ? () => void send(problem.question) : undefined}
              />
            )}
          </div>

          <form
            className={s.ask}
            onSubmit={(e) => {
              e.preventDefault();
              void send(question);
            }}
          >
            <label className="sr-only" htmlFor={`${titleId}-q`}>
              {t("Deine Frage an Flo", "Your question for Flo")}
            </label>
            <div className={s.field}>
              <textarea
                ref={field}
                id={`${titleId}-q`}
                rows={2}
                value={question}
                maxLength={max}
                placeholder={turns.length ? t("Noch eine Frage?", "Another question?") : t("Was möchtest du wissen?", "What would you like to know?")}
                aria-describedby={`${counterId} ${noteId}`}
                onChange={(e) => setQuestion(e.target.value.slice(0, max))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    void send(question);
                  }
                }}
              />
              <button type="submit" className={s.send} disabled={busy || !question.trim()} aria-label={t("Frage senden", "Send question")}>
                <Icon path={ARROW_UP_BOLD} size={18} aria-hidden="true" />
              </button>
            </div>
            <div className={s.meta}>
              <p id={noteId} className={s.privacy}>
                {t(
                  "Deine Frage geht an Anthropic (Claude) und wird nur aus den öffentlichen Docs beantwortet.",
                  "Your question goes to Anthropic (Claude) and is answered only from the public docs.",
                )}{" "}
                <a href={`${prefix}/flo`}>{t("Mehr über Flo", "More about Flo")}</a>
              </p>
              <span id={counterId} className={s.counter} data-low={left < 50 ? "true" : undefined}>
                <span className="sr-only">{t("Zeichen:", "Characters:")} </span>
                {question.length} / {max}
              </span>
            </div>
          </form>
          <span className="sr-only" role="status" aria-live="polite">
            {status || announce}
          </span>
        </div>
      </dialog>
      <StopNote stop={stop} locale={locale} t={t} onDismiss={() => setStop(null)} />
    </>
  );
}

// Shown bottom right once the panel has closed because Flo stopped.
function StopNote({ stop, locale, t, onDismiss }: { stop: FloStop | null; locale: "de" | "en"; t: T; onDismiss: () => void }) {
  const text = !stop
    ? ""
    : stop.kind === "budget"
      ? t(
          "Flo hat für diesen Monat alle Fragen beantwortet, die er darf, und macht bis zum nächsten Monat Pause. Die Suche hilft dir weiter.",
          "Flo has answered all the questions he may this month and is taking a break until next month. The search is still here for you.",
        )
      : stop.kind === "global" && stop.retryAt
        ? t(
            `Flo hat gerade sehr viele Fragen beantwortet und macht bis ${retryText(stop.retryAt, locale)} Pause. Die Suche hilft dir weiter.`,
            `Flo has answered a lot of questions just now and is taking a break until ${retryText(stop.retryAt, locale)}. The search is still here for you.`,
          )
        : t("Flo macht gerade eine Pause. Die Suche hilft dir weiter.", "Flo is taking a break right now. The search is still here for you.");
  return (
    <div className={s.stopNote} role="status" aria-live="polite" data-shown={stop ? "true" : undefined}>
      {stop && (
        <>
          <FloOtter size={28} small />
          <p>{text}</p>
          <button type="button" onClick={onDismiss} aria-label={t("Hinweis schließen", "Close notice")}>
            <Icon path={X} size={16} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

type T = (de: string, en: string) => string;

function Exchange({ turn, md, prefix, newTab, t }: { turn: FloTurn; md: { prefix: string; newTab: string }; prefix: string; newTab: string; t: T }) {
  return (
    <div className={s.exchange}>
      <p className={s.question}>{turn.question}</p>
      <div className={s.answer}>
        <FloOtter size={22} small className={s.otter} />
        <div className={s.answerText}>
          {renderFloMarkdown(turn.answer, md)}
          {turn.sources.length > 0 && <Sources sources={turn.sources} prefix={prefix} newTab={newTab} t={t} />}
        </div>
      </div>
    </div>
  );
}

function Sources({ sources, prefix, newTab, t }: { sources: FloSource[]; prefix: string; newTab: string; t: T }) {
  return (
    <div className={s.sources}>
      <p>{t("Quellen", "Sources")}</p>
      <ul>
        {sources.map((source) => {
          const href = allowedLink(source.url);
          if (!href) return null;
          const local = docsPath(href, prefix);
          return (
            <li key={href}>
              {local ? (
                <a href={local}>{source.title}</a>
              ) : (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {source.title}
                  <span className="sr-only"> ({newTab})</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ProblemNote({ problem, locale, t, onRetry }: { problem: FloProblem; locale: "de" | "en"; t: T; onRetry?: () => void }) {
  let text: string;
  if (problem.kind === "limit")
    text = problem.retryAt
      ? t(
          `Du hast gerade sehr viele Fragen gestellt. Ab ${retryText(problem.retryAt, locale)} kannst du Flo wieder fragen – bis dahin hilft dir die Suche.`,
          `You've asked a lot of questions just now. You can ask Flo again from ${retryText(problem.retryAt, locale)} – until then, the search is here for you.`,
        )
      : t(
          "Du hast gerade sehr viele Fragen gestellt. Versuch es etwas später noch einmal.",
          "You've asked a lot of questions just now. Please try again a little later.",
        );
  else if (problem.kind === "too-long")
    text = t(
      `Deine Frage ist zu lang – höchstens ${problem.max ?? DEFAULT_MAX_QUESTION} Zeichen.`,
      `Your question is too long – ${problem.max ?? DEFAULT_MAX_QUESTION} characters at most.`,
    );
  else text = t("Flo konnte gerade nicht antworten. Versuch es gleich noch einmal.", "Flo couldn't answer just now. Please try again in a moment.");
  return (
    <div className={s.problem} role="alert" data-kind={problem.kind}>
      <p>{text}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          <Icon path={ARROW_CLOCKWISE} size={14} aria-hidden="true" />
          {t("Nochmal versuchen", "Try again")}
        </button>
      )}
    </div>
  );
}
