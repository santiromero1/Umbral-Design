// ============================================================
// UMBRAL · Átomos compartidos — App inversor + Backoffice
// ============================================================

// --- Logo (usa los PNG reales de marca) ---------------------
function UmbralLogo({ height = 22, variant = "green" }) {
  // variant: "green" (···U verde transparente) | "mark" (cuadrado verde, marca blanca)
  const src = variant === "mark" ? "assets/umbral-logo-mark.png" : "assets/umbral-logo-clean.png";
  const ratio = variant === "mark" ? 1 : 1.05;
  return <img src={src} alt="UMBRAL" style={{ height, width: height * ratio, objectFit: "contain", display: "block" }} />;
}

// Marca cuadrada (invertida) como avatar/sello
function UmbralMark({ size = 32, radius = 4 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", flexShrink: 0 }}>
      <img src="assets/umbral-logo-mark.png" alt="UMBRAL" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

// Wordmark de marca (texto, no imagen — para sidebars)
function UmbralWord({ tag = "COLLECTION", size = 19 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <UmbralMark size={size * 1.5} radius={3} />
      <div style={{ lineHeight: 1 }}>
        <div className="serif" style={{ fontSize: size, letterSpacing: "0.01em" }}>UMBRAL</div>
        <div style={{ fontSize: size * 0.45, letterSpacing: "0.24em", color: "var(--muted)", marginTop: 3, textTransform: "uppercase" }}>{tag}</div>
      </div>
    </div>
  );
}

function Pill({ kind = "neutral", children, dot = true }) {
  return <span className={`pill pill--${kind}`}>{dot && <span className="dot"></span>}{children}</span>;
}

function Avatar({ initials, size = 36, bg = "var(--green)", color = "#fff" }) {
  return <div className="avatar" style={{ width: size, height: size, background: bg, color, fontSize: size * 0.36 }}>{initials}</div>;
}

// Placeholder estilo cuaderno de obra
function Ph({ label = "imagen", note, height = 150, style = {} }) {
  return (
    <div className="ph" style={{ height, ...style }}>
      <span style={{ position: "relative", zIndex: 1, textAlign: "center" }}>{label}</span>
      {note && <span className="ph-note" style={{ position: "absolute", right: 10, bottom: 8, zIndex: 1 }}>{note}</span>}
    </div>
  );
}

// --- Iconos (line-style, 1.5 stroke) ------------------------
const I = {
  home:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9.5L10 3l7 6.5V17H3z" strokeLinejoin="round"/><path d="M8 17v-5h4v5"/></svg>,
  grid:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></svg>,
  help:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h12v9H8l-4 3z" strokeLinejoin="round"/><path d="M10 7.2c.7 0 1.2.5 1.2 1.1 0 .9-1.2.9-1.2 1.9" strokeLinecap="round"/><circle cx="10" cy="11.6" r="0.5" fill="currentColor" stroke="none"/></svg>,
  sell:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.5 3H4v6.5L11 16l5.5-5.5L10.5 3z" strokeLinejoin="round"/><circle cx="7" cy="6.5" r="1"/></svg>,
  building:(s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 17V5l6-2v14M10 17V7l6 2v8M3 17h14"/><path d="M6.5 7v0M6.5 10v0M6.5 13v0M13 11v0M13 14v0" strokeLinecap="round"/></svg>,
  users:   (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7.5" cy="7" r="2.6"/><path d="M3 16c0-2.4 2-4 4.5-4S12 13.6 12 16"/><path d="M13 5.2A2.4 2.4 0 0114 10M14.5 16c0-1.8-.6-2.9-1.6-3.6"/></svg>,
  image:   (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="14" height="12" rx="1.5"/><circle cx="7.5" cy="8" r="1.3"/><path d="M3 14l4-3.5 3 2.5 3-3 4 3.5"/></svg>,
  coin:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="7"/><path d="M10 6v8M8 7.6c0-.9.9-1.4 2-1.4s2 .5 2 1.4-.9 1.3-2 1.4c-1.1.1-2 .5-2 1.4s.9 1.4 2 1.4 2-.5 2-1.4" strokeLinecap="round"/></svg>,
  mail:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="14" height="10" rx="1.5"/><path d="M3.5 6l6.5 5 6.5-5"/></svg>,
  inbox:   (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h14v12H3z"/><path d="M3 11h4l1.5 2h3L13 11h4"/></svg>,
  chart:   (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17h14"/><path d="M5 14v-3M9 14V8M13 14v-6M17 14V5" strokeLinecap="round"/></svg>,
  plus:    (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3v10M3 8h10" strokeLinecap="round"/></svg>,
  search:  (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3" strokeLinecap="round"/></svg>,
  sort:    (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 5h10M5 8h6M7 11h2" strokeLinecap="round"/></svg>,
  chev:    (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  back:    (s=18)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  close:   (s=16)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/></svg>,
  copy:    (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="5.5" y="5.5" width="8" height="8" rx="1.2"/><path d="M3.5 10.5h-1V3a.5.5 0 01.5-.5h7.5v1"/></svg>,
  check:   (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pin:     (s=13)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 1.6c-2.4 0-4.3 1.9-4.3 4.3 0 3.3 4.3 8.1 4.3 8.1s4.3-4.8 4.3-8.1c0-2.4-1.9-4.3-4.3-4.3z"/><circle cx="8" cy="5.9" r="1.5"/></svg>,
  bell:    (s=16)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2c-2 0-3.4 1.5-3.4 3.4V8L3 10h10l-1.5-2V5.4C11.4 3.5 10 2 8 2zM6.5 12a1.5 1.5 0 003 0"/></svg>,
  play:    (s=20)=><svg width={s} height={s} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8.5"/><path d="M9 7.5l5 3.5-5 3.5z" fill="currentColor" stroke="none"/></svg>,
  gear:    (s=18)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="10" cy="10" r="2.4"/><path d="M10 2.6v2M10 15.4v2M3.5 6l1.7 1M14.8 13l1.7 1M3.5 14l1.7-1M14.8 7l1.7-1M2.6 10h2M15.4 10h2"/></svg>,
  doc:     (s=14)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 2h6l2 2v10H4z"/><path d="M10 2v3h2M6 8h4M6 11h3"/></svg>,
  google:  (s=18)=><svg width={s} height={s} viewBox="0 0 18 18"><path fill="#4285F4" d="M17.6 9.2c0-.6 0-1.1-.2-1.7H9v3.3h4.8a4 4 0 01-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.3c-.8.6-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 009 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 010-3.4V5H.9a9 9 0 000 8l3-2.3z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 00.9 5l3 2.3C4.6 5.1 6.6 3.6 9 3.6z"/></svg>,
};

// --- Curva de valorización (proyección por m²) --------------
function ValorCurve({
  width = 300, height = 96,
  data = [100, 101, 103, 104.5, 107, 110, 113, 117, 122, 128],
  stroke = "#fff", fill = "rgba(255,255,255,0.14)", dot = "#fff",
}) {
  const pad = { l: 4, r: 6, t: 10, b: 6 };
  const w = width - pad.l - pad.r, h = height - pad.t - pad.b;
  const min = Math.min(...data), max = Math.max(...data);
  const sx = (i) => pad.l + (w * i) / (data.length - 1);
  const sy = (v) => pad.t + h - ((v - min) / (max - min || 1)) * h;
  const line = data.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(" ");
  const area = `${line} L${sx(data.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z`;
  const last = data.length - 1;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={sx(last)} cy={sy(data[last])} r="3.5" fill={dot} />
      <circle cx={sx(last)} cy={sy(data[last])} r="6.5" fill="none" stroke={dot} strokeOpacity="0.4" />
    </svg>
  );
}

// --- helpers ------------------------------------------------
function usd(n, { sign = false } = {}) {
  const s = Math.round(n).toLocaleString("es-AR");
  return (sign && n > 0 ? "+" : "") + "USD " + s;
}
function m2(n) { return n.toLocaleString("es-AR") + " m²"; }

Object.assign(window, {
  UmbralLogo, UmbralMark, UmbralWord, Pill, Avatar, Ph, I, ValorCurve, usd, m2,
});
