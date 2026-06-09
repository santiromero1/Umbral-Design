// ============================================================
// UMBRAL · Shared atoms used across investor / asesor / superuser
// ============================================================

// Logo mark — recreates the brand mark in SVG so it scales cleanly
function UmbralMark({ size = 28, color = "#fff", bg = "#395714", rounded = 3 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: rounded,
      background: bg, display: "inline-flex",
      alignItems: "center", justifyContent: "center",
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 100 80" fill={color}>
        {/* three dots */}
        <circle cx="8" cy="55" r="5" />
        <circle cx="24" cy="55" r="5" />
        <circle cx="40" cy="55" r="5" />
        {/* serif U */}
        <path d="M52 12 L52 14 C56 14 58 17 58 22 L58 50 C58 65 68 72 78 72 C88 72 96 65 96 50 L96 22 C96 17 98 14 100 14 L100 12 L88 12 L88 14 C90 14 92 17 92 22 L92 50 C92 62 86 68 78 68 C70 68 64 62 64 50 L64 22 C64 17 66 14 68 14 L68 12 Z" />
      </svg>
    </div>
  );
}

// Wordmark with brand
function UmbralWordmark({ small = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <UmbralMark size={small ? 24 : 32} rounded={3} />
      <div style={{ lineHeight: 1 }}>
        <div className="serif" style={{ fontSize: small ? 16 : 20, letterSpacing: "0.02em" }}>UMBRAL</div>
        <div style={{ fontSize: small ? 8 : 9, letterSpacing: "0.22em", color: "var(--muted)", marginTop: 2 }}>COLLECTION</div>
      </div>
    </div>
  );
}

// Pill / status badge
function Pill({ kind = "neutral", children }) {
  return (
    <span className={`pill pill--${kind}`}>
      <span className="dot"></span>
      {children}
    </span>
  );
}

// Simple icons (line-style)
const Icon = {
  search: (s = 14) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>,
  sort:   (s = 14) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 5h10M5 8h6M7 11h2"/></svg>,
  plus:   (s = 14) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3v10M3 8h10"/></svg>,
  chevron:(s = 14) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 4l4 4-4 4"/></svg>,
  back:   (s = 18) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 3L5 8l5 5"/></svg>,
  help:   (s = 16) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="8" r="6"/><path d="M6.3 6c.2-1 1-1.6 1.9-1.6 1 0 1.8.7 1.8 1.7 0 .9-.6 1.3-1.2 1.7-.4.3-.6.5-.6 1.1M8 11.2h.01" strokeLinecap="round"/></svg>,
  home:   (s = 18) => <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9L9 3l6 6v6H3z" strokeLinejoin="round"/><path d="M7 15v-4h4v4"/></svg>,
  blog:   (s = 18) => <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="12" height="12" rx="1.5"/><path d="M6 7h6M6 10h6M6 13h3"/></svg>,
  upload: (s = 18) => <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 12V3M5 7l4-4 4 4M3 13v2h12v-2"/></svg>,
  close:  (s = 16) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4l8 8M12 4l-8 8"/></svg>,
  pin:    (s = 14) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z"/><circle cx="8" cy="6" r="1.6"/></svg>,
  doc:    (s = 14) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 2h6l2 2v10H4z"/><path d="M10 2v3h2M6 7h4M6 10h4M6 13h3"/></svg>,
  bell:   (s = 16) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2c-2 0-3.5 1.5-3.5 3.5V8L3 10h10l-1.5-2V5.5C11.5 3.5 10 2 8 2zM6.5 12a1.5 1.5 0 003 0"/></svg>,
};

// Avatar circle (with initials)
function Avatar({ initials, size = 32, bg = "var(--umbral-green)", color = "#fff" }) {
  return (
    <div className="avatar" style={{ width: size, height: size, background: bg, color, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

// Subtle striped image placeholder
function ImagePlaceholder({ label = "Imagen", height = 140, style = {} }) {
  return (
    <div className="placeholder-img" style={{ height, ...style }}>
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </div>
  );
}

// =========================================================
// Performance line chart — investment yield over months
// =========================================================
function PerformanceChart({
  width = 320, height = 140,
  data = [100, 102, 101.5, 104, 106, 105, 108, 110, 112, 115, 118, 122],
  labels = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  stroke = "var(--umbral-green)",
  fill = "rgba(57,87,20,0.10)",
}) {
  const pad = { l: 28, r: 8, t: 12, b: 22 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const sx = (i) => pad.l + (w * i) / (data.length - 1);
  const sy = (v) => pad.t + h - ((v - min) / (max - min)) * h;

  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"}${sx(i)},${sy(v)}`).join(" ");
  const areaPath = `${linePath} L${sx(data.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z`;

  const ticks = 4;
  const gridY = Array.from({ length: ticks + 1 }, (_, i) => pad.t + (h * i) / ticks);

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {/* grid */}
      {gridY.map((y, i) => (
        <line key={i} x1={pad.l} y1={y} x2={width - pad.r} y2={y}
          stroke="rgba(26,26,26,0.06)" strokeDasharray={i === 0 || i === ticks ? "" : "2 3"} />
      ))}
      {/* Y axis labels */}
      {[max, min].map((v, i) => (
        <text key={i} x={pad.l - 6} y={i === 0 ? pad.t + 4 : pad.t + h}
          textAnchor="end" fontSize="9" fill="var(--muted)" fontFamily="var(--font-mono)">
          {v.toFixed(0)}
        </text>
      ))}
      {/* area */}
      <path d={areaPath} fill={fill} />
      {/* line */}
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      {/* dots */}
      {data.map((v, i) => (
        <circle key={i} cx={sx(i)} cy={sy(v)} r={i === data.length - 1 ? 3 : 1.5}
          fill={stroke} />
      ))}
      {/* X labels */}
      {labels.map((l, i) => (
        <text key={i} x={sx(i)} y={height - 6} textAnchor="middle"
          fontSize="9" fill="var(--muted)" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          {l}
        </text>
      ))}
    </svg>
  );
}

// Mini horizontal progress meter (used on project cards in CRM)
function Meter({ value = 0.55, color = "var(--umbral-green)", height = 4 }) {
  return (
    <div style={{ height, width: "100%", background: "var(--hairline-2)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(1, value) * 100}%`, height: "100%", background: color }} />
    </div>
  );
}

// Format USD
function fmt(n, opts = {}) {
  const { sign = false, cents = false } = opts;
  const s = (cents ? n : Math.round(n)).toLocaleString("es-AR", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
  return (sign && n > 0 ? "+" : "") + "USD " + s;
}
function pct(n, sign = true) {
  const s = (sign && n > 0 ? "+" : "") + n.toFixed(1).replace(".", ",") + "%";
  return s;
}

// Section header used inside mobile screens
function SectionHead({ title, action = null }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10, marginTop: 4 }}>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, margin: 0, fontWeight: 400 }}>{title}</h3>
      {action}
    </div>
  );
}

Object.assign(window, {
  UmbralMark, UmbralWordmark, Pill, Icon, Avatar, ImagePlaceholder,
  PerformanceChart, Meter, fmt, pct, SectionHead,
});
