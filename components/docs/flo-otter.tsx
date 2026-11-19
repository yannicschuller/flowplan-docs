// Flo, the docs assistant's mascot: a small otter holding a notepad. The
// colours are custom properties (flo.module.css, .otter) so it follows the
// light and dark scheme. `small` is the simplified favicon-sized drawing
// (also public/flo.svg) for 16–24 px. The button shows the full drawing as
// public/flo-otter.svg – keep it in sync.
import f from "./flo.module.css";

export function FloOtter({ size = 32, small = false, className: extra }: { size?: number; small?: boolean; className?: string }) {
  const className = extra ? `${f.otter} ${extra}` : f.otter;
  const c = {
    fur: "var(--flo-fur)",
    furDark: "var(--flo-fur-dark)",
    cream: "var(--flo-cream)",
    ink: "var(--flo-ink)",
    paper: "var(--flo-paper)",
    line: "var(--flo-line)",
    accent: "var(--flo-accent)",
    cheek: "var(--flo-cheek)",
  };
  if (small)
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <circle cx="6.2" cy="11" r="2.2" fill={c.fur} />
        <circle cx="25.8" cy="11" r="2.2" fill={c.fur} />
        <ellipse cx="16" cy="14.5" rx="11" ry="8.2" fill={c.fur} />
        <ellipse cx="16" cy="17.8" rx="7.6" ry="4.8" fill={c.cream} />
        <circle cx="12.3" cy="13.2" r="1.6" fill={c.ink} />
        <circle cx="19.7" cy="13.2" r="1.6" fill={c.ink} />
        <ellipse cx="16" cy="16.2" rx="1.9" ry="1.3" fill={c.ink} />
        <rect x="9" y="22" width="14" height="10" rx="1.5" fill={c.paper} stroke={c.line} strokeWidth=".8" />
        <rect x="9" y="22" width="14" height="2.6" rx="1" fill={c.accent} />
        <ellipse cx="9.5" cy="25.6" rx="2.4" ry="2" fill={c.furDark} />
        <ellipse cx="22.5" cy="25.6" rx="2.4" ry="2" fill={c.furDark} />
      </svg>
    );
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {/* body and head */}
      <ellipse cx="32" cy="60" rx="18" ry="13" fill={c.fur} />
      <circle cx="13.5" cy="21" r="3.6" fill={c.fur} />
      <circle cx="50.5" cy="21" r="3.6" fill={c.fur} />
      <circle cx="13.5" cy="21" r="1.7" fill={c.furDark} />
      <circle cx="50.5" cy="21" r="1.7" fill={c.furDark} />
      <ellipse cx="32" cy="28" rx="20.5" ry="15" fill={c.fur} />
      {/* face */}
      <ellipse cx="32" cy="34" rx="14" ry="9" fill={c.cream} />
      <circle cx="20.5" cy="31.5" r="2.3" fill={c.cheek} />
      <circle cx="43.5" cy="31.5" r="2.3" fill={c.cheek} />
      <circle cx="24.5" cy="25" r="2.6" fill={c.ink} />
      <circle cx="39.5" cy="25" r="2.6" fill={c.ink} />
      <circle cx="25.4" cy="24.1" r=".9" fill={c.paper} />
      <circle cx="40.4" cy="24.1" r=".9" fill={c.paper} />
      <path d="M28.5 29.6c0-1.4 1.6-2.2 3.5-2.2s3.5.8 3.5 2.2c0 1.3-1.8 2.6-3.5 2.6s-3.5-1.3-3.5-2.6Z" fill={c.ink} />
      <path d="M29 34.4c1.2 1.4 2.2 1.5 3 .3.8 1.2 1.8 1.1 3-.3" fill="none" stroke={c.ink} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M22 32.6l-6.5-1.2M22 35.2l-6.2 1.8M42 32.6l6.5-1.2M42 35.2l6.2 1.8" stroke={c.ink} strokeWidth=".9" strokeLinecap="round" opacity=".6" />
      {/* notepad, pencil and paws */}
      <rect x="19" y="41" width="26" height="22" rx="2.5" fill={c.paper} stroke={c.line} strokeWidth="1.2" />
      <rect x="19" y="41" width="26" height="4.5" rx="2" fill={c.accent} />
      <path d="M23.5 50.5h17M23.5 54.5h13M23.5 58.5h15" stroke={c.line} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M47.5 47 53 38.5" stroke={c.accent} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="19.5" cy="50" rx="4.2" ry="3.5" fill={c.furDark} />
      <ellipse cx="45" cy="49" rx="4.2" ry="3.5" fill={c.furDark} />
    </svg>
  );
}
