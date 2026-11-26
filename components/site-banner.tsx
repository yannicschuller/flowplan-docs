"use client";
// The announcement bar above the header (lib/banners.ts; the same component
// is in flowplan-website, which keeps the banners). The server passes the banners active now, highest
// priority first; the bar shows the first one this browser has not closed.
// Closing is remembered in localStorage under the banner's id and version
// (no cookie), so a changed banner shows again. Views (once per tab session),
// clicks on the button and closing are counted with navigator.sendBeacon –
// only the banner, the event and the site, nothing about the reader.
// Text is React text only; the link is a plain anchor.
import { useEffect, useRef, useState } from "react";
import { countdownText, type BannerSite, type PublicBanner } from "@/lib/banners";
import s from "./site-banner.module.css";

const LABELS = {
  de: { region: "Ankündigung", close: "Ankündigung schließen" },
  en: { region: "Announcement", close: "Close announcement" },
  fr: { region: "Annonce", close: "Fermer l’annonce" },
  zh: { region: "公告", close: "关闭公告" },
} as const;

const closedKey = (b: PublicBanner) => `flowplan-banner:${b.id}`;
const read = (store: () => Storage, key: string) => {
  try {
    return store().getItem(key);
  } catch {
    return null;
  }
};
const write = (store: () => Storage, key: string, value: string) => {
  try {
    store().setItem(key, value);
  } catch {}
};

function send(eventUrl: string, id: string, type: "view" | "click" | "dismiss", site: BannerSite) {
  const body = JSON.stringify({ id, type, site });
  try {
    // text/plain: a simple request, no preflight, no cookies set by us.
    if (navigator.sendBeacon?.(eventUrl, new Blob([body], { type: "text/plain" }))) return;
    void fetch(eventUrl, { method: "POST", body, keepalive: true, credentials: "omit", headers: { "content-type": "text/plain" } }).catch(() => {});
  } catch {}
}

export function SiteBanner({ banners, site, eventUrl, offsetHeader = false }: { banners: PublicBanner[]; site: BannerSite; eventUrl: string; offsetHeader?: boolean }) {
  // Index of the banner shown; the first one until the browser says otherwise.
  // null until this browser's closed banners are read (the first one shows meanwhile).
  const [index, setIndex] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const banner = index === null ? banners[0] : index >= 0 ? banners[index] : undefined;
  const ready = index !== null;

  useEffect(() => {
    const next = banners.findIndex((b) => read(() => localStorage, closedKey(b)) !== String(b.version));
    setIndex(next);
  }, [banners]);

  // One view per banner version and tab session.
  useEffect(() => {
    if (!banner || !ready) return;
    const key = `flowplan-banner-seen:${banner.id}:${banner.version}`;
    if (read(() => sessionStorage, key)) return;
    write(() => sessionStorage, key, "1");
    send(eventUrl, banner.id, "view", site);
  }, [banner, ready, eventUrl, site]);

  // "noch 3 Tage": computed here (the server's time would go stale), every minute.
  useEffect(() => {
    if (!banner?.countdown) {
      setCountdown(null);
      return;
    }
    const tick = () => setCountdown(countdownText(banner.endsAt, banner.lang));
    tick();
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, [banner]);

  // The website's header floats (position: fixed): it sits below the bar
  // until the bar has scrolled away (--site-banner-offset).
  useEffect(() => {
    if (!offsetHeader) return;
    const root = document.documentElement;
    const el = ref.current;
    if (!el) {
      root.style.setProperty("--site-banner-offset", "0px");
      return;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => root.style.setProperty("--site-banner-offset", `${Math.max(0, el.offsetHeight - window.scrollY)}px`));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      root.style.setProperty("--site-banner-offset", "0px");
    };
  }, [offsetHeader, banner]);

  if (!banner) return null;
  const labels = LABELS[banner.lang];
  const close = () => {
    write(() => localStorage, closedKey(banner), String(banner.version));
    send(eventUrl, banner.id, "dismiss", site);
    setIndex(-1);
  };
  return (
    <div ref={ref} className={s.banner} data-tone={banner.tone} data-dismissible={banner.dismissible} data-site-banner="" role="region" aria-label={labels.region} lang={banner.lang === "zh" ? "zh-Hans" : banner.lang}>
      <div className={s.inner}>
        <p className={s.text}>
          {banner.emoji && (
            <span className={s.emoji} aria-hidden="true">
              {banner.emoji}
            </span>
          )}
          {banner.title && <strong className={s.title}>{banner.title}</strong>}
          <span>{banner.message}</span>
          {countdown && <span className={s.countdown}>{countdown}</span>}
        </p>
        {banner.link && (
          <a className={s.link} href={banner.link.url} onClick={() => send(eventUrl, banner.id, "click", site)}>
            {banner.link.label}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
      {banner.dismissible && (
        <button type="button" className={s.close} aria-label={labels.close} onClick={close}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
