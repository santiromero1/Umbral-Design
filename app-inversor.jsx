// ============================================================
// UMBRAL · App del inversor (mobile-first)
// Onboarding · Login · Home (valorización) · Contenido · Ayuda
// Nueva duda · Vender · Vacíos / error
// Copy en voseo, sin palabras prohibidas (Design-Spec §5)
// ============================================================

const DEV = {
  name: "Pilará Forest",
  developer: "Pilará S.A.",
  location: "Pilar, Buenos Aires",
  rango: "USD 2.900–3.400 / m²",
  m2: 120,
  valor: 312000,
  ingreso: 258000,
  deltaPct: 20.9,
  obra: 0.72,
  etapa: "Etapa 3 de 5 · estructura",
  entrega: "Marzo 2027",
  curve: [100, 101, 103, 104.5, 107, 110, 113, 117, 122, 128],
};

const CUOTAS = [
  { n: 6, when: "Marzo 2026", amt: "USD 4.200", ok: true },
  { n: 7, when: "Abril 2026", amt: "USD 4.200", ok: true },
  { n: 8, when: "Mayo 2026", amt: "USD 4.200", ok: true },
  { n: 9, when: "Junio 2026", amt: "USD 4.200", ok: false },
  { n: 10, when: "Julio 2026", amt: "USD 4.200", ok: false },
];

const NEWS = [
  { date: "02 jun 2026", tag: "Obra", title: "Bajada de hormigón · nivel 4", note: "nivel 4 ✓",
    body: "Se completó el colado de la losa del cuarto nivel. La estructura ya alcanza los 12 metros sobre la cota de vereda y arranca el montaje del nivel 5." },
  { date: "19 may 2026", tag: "Obra", title: "Avanza la mampostería interior", note: "60% interior",
    body: "La mampostería interior llegó al 60% en los niveles 1 a 3. Comienza el tendido de cañerías sanitarias primarias." },
  { date: "04 may 2026", tag: "Hito", title: "Te invitamos a ver la obra", note: "sábado 17",
    body: "Estás invitado a la visita de obra del sábado 17 de mayo. Vas a poder recorrer tu nivel y ver el avance de cerca." },
];

const PHOTOS = ["fachada · render", "estructura nivel 3", "vista al parque", "hall de acceso", "terraza · esquema", "unidad tipo"];
const VIDEOS = [
  { title: "Recorrido de obra · mayo 2026", len: "2:40" },
  { title: "Cómo se proyecta el parque interno", len: "1:55" },
];

const FAQ = [
  ["¿Cómo se calcula la proyección de mis metros?",
   "Tomamos el valor de referencia por m² del desarrollo y lo proyectamos sobre tus metros invertidos. UMBRAL actualiza ese valor a medida que avanza la obra; no es una promesa de rentabilidad, es una proyección de referencia."],
  ["¿Qué pasa si la obra se atrasa?",
   "Cualquier cambio en los plazos de obra se carga acá apenas se confirma. Vas a ver la nueva fecha estimada y una novedad explicando el motivo."],
  ["¿Puedo sumar a alguien a mi unidad?",
   "Sí. Escribinos desde Ayuda y el equipo de UMBRAL te acompaña con el trámite junto a la desarrolladora."],
  ["¿Dónde veo el detalle de mis cuotas?",
   "En el inicio, dentro de “Tus cuotas”. Ahí figura cada cuota del plan con su estado. Si algo no coincide, escribinos y lo revisamos con vos."],
];

// ──────────────────────────────────────────────────────────
// Bottom nav (4 tabs)
// ──────────────────────────────────────────────────────────
function BottomNav({ active = "inicio", onNav }) {
  const tabs = [
    ["inicio", "Inicio", I.home],
    ["contenido", "Contenido", I.grid],
    ["ayuda", "Ayuda", I.help],
    ["vender", "Vender", I.sell],
  ];
  return (
    <div className="mob-nav">
      {tabs.map(([id, label, ic]) => (
        <button key={id}
          className={`mob-nav-item ${active === id ? "mob-nav-item--active" : ""} ${id === "vender" ? "mob-nav-item--sell" : ""}`}
          onClick={() => onNav?.(id)}>
          <span className="ic">{ic(20)}</span>{label}
        </button>
      ))}
    </div>
  );
}

function MobHeader({ action }) {
  return (
    <div className="mob-h">
      <UmbralLogo height={20} />
      <div style={{ flex: 1 }} />
      {action}
    </div>
  );
}

function RoundBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--hairline)",
      background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--ink)", cursor: "pointer", flexShrink: 0,
    }}>{children}</button>
  );
}

// ──────────────────────────────────────────────────────────
// ONBOARDING — paso 1 · código de referencia (+ ERR-04)
// ──────────────────────────────────────────────────────────
function InvOnboard1({ error = false, value = "" }) {
  return (
    <div className="mob">
      <div className="mob-pad" style={{ display: "flex", flexDirection: "column", paddingTop: 86 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <UmbralLogo height={56} />
        </div>
        <h1 className="serif" style={{ fontSize: 33, lineHeight: 1.04, margin: "0 0 10px", textAlign: "center" }}>
          Bienvenido a<br/>tu umbral.
        </h1>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 14, lineHeight: 1.5, margin: "0 auto 32px", maxWidth: 260 }}>
          Ingresá el código que te dimos para entrar.
        </p>
        <div className={`field field--mobile ${error ? "field--err" : ""}`}>
          <label>Código de referencia</label>
          <input defaultValue={value} placeholder="Ej: UMB-2026-…" style={{ textAlign: "center", letterSpacing: "0.06em", fontFamily: "var(--mono)" }} />
          {error && <span className="err">Ese código no es válido. Revisalo e intentá de nuevo.</span>}
        </div>
        <button className={`btn btn--primary btn--block ${value || error ? "" : ""}`} style={{ marginTop: 16 }} aria-disabled={!value && !error}>
          Continuar
        </button>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--muted)" }}>
          ¿Ya tenés cuenta? <span style={{ color: "var(--green)", cursor: "pointer" }}>Entrá</span>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 40, textAlign: "center" }}>
          <div className="eyebrow">Cada umbral marca un antes y un después</div>
        </div>
      </div>
    </div>
  );
}

// ONBOARDING — paso 2 · datos + m²
function InvOnboard2() {
  return (
    <div className="mob">
      <div className="mob-h" style={{ paddingBottom: 12 }}>
        <RoundBtn>{I.back(18)}</RoundBtn>
        <div style={{ flex: 1 }} />
        <div className="stepper" style={{ width: 64 }}><i className="on" /><i className="on" /></div>
        <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 8 }}>Paso 2 de 2</span>
      </div>
      <div className="mob-scroll" style={{ paddingTop: 18 }}>
        <h1 className="serif" style={{ fontSize: 30, margin: "8px 0 24px", lineHeight: 1.05 }}>Contanos quién sos.</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="field field--mobile"><label>Nombre y apellido</label><input placeholder="Santiago Ramírez" /></div>
          <div className="field field--mobile"><label>Email</label><input placeholder="tunombre@email.com" /></div>
          <div className="field field--mobile">
            <label>Tus metros invertidos (m²)</label>
            <input placeholder="120" inputMode="numeric" />
            <span className="helper">Después lo confirmamos con vos.</span>
          </div>
        </div>
        <button className="btn btn--primary btn--block" style={{ marginTop: 26 }}>Crear cuenta</button>
      </div>
    </div>
  );
}

// LOGIN — Google + email
function InvLogin() {
  return (
    <div className="mob">
      <div className="mob-pad" style={{ display: "flex", flexDirection: "column", paddingTop: 96 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 26 }}>
          <UmbralLogo height={52} />
        </div>
        <h1 className="serif" style={{ fontSize: 34, lineHeight: 1, margin: "0 0 6px", textAlign: "center" }}>Volvé a entrar.</h1>
        <p className="eyebrow" style={{ textAlign: "center", margin: "0 0 34px" }}>Acceso para inversores</p>

        <button className="btn btn--google btn--block" style={{ marginBottom: 18 }}>{I.google(18)} Continuar con Google</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--muted-2)", fontSize: 11, margin: "0 0 18px" }}>
          <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} /> o <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field field--mobile"><label>Email</label><input defaultValue="santiago.ramirez@mail.com" /></div>
          <div className="field field--mobile"><label>Contraseña</label><input type="password" defaultValue="••••••••••" /></div>
          <button className="btn btn--primary btn--block" style={{ marginTop: 4 }}>Entrar</button>
          <span style={{ textAlign: "center", marginTop: 4, color: "var(--green)", fontSize: 12, cursor: "pointer" }}>¿Olvidaste tu contraseña?</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// HOME — la joya visual
// ──────────────────────────────────────────────────────────
function InvHome({ onNav, onOpenNews }) {
  return (
    <div className="mob">
      <MobHeader action={<RoundBtn>{I.gear(18)}</RoundBtn>} />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <div style={{ marginBottom: 14 }}>
          <div className="eyebrow">Hola, Santiago</div>
          <h1 className="serif" style={{ fontSize: 26, margin: "2px 0 0", lineHeight: 1.05 }}>Tu desarrollo</h1>
        </div>

        {/* card del desarrollo */}
        <div className="dev-card" style={{ marginBottom: 16 }}>
          <Ph label="foto de obra" note="vista al parque" height={150} />
          <div className="body">
            <h2 className="serif" style={{ fontSize: 22, margin: "0 0 8px", lineHeight: 1.05 }}>{DEV.name}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <Pill kind="obra">En obra · {Math.round(DEV.obra * 100)}%</Pill>
              <Pill kind="neutral" dot={false}>Tus {DEV.m2} m²</Pill>
              <Pill kind="neutral" dot={false}>{DEV.developer}</Pill>
            </div>
          </div>
        </div>

        {/* valorización — héroe */}
        <div className="valor" style={{ marginBottom: 16 }}>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Tu valor</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div className="big">{usd(DEV.valor)}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", marginTop: 4 }}>Proyección de tus {DEV.m2} m²</div>
            </div>
            <div style={{ textAlign: "right", color: "#dcebc4", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
              ↗ +{DEV.deltaPct.toString().replace(".", ",")} %
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <ValorCurve width={300} height={88} data={DEV.curve} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
            <span>Ingreso · {usd(DEV.ingreso)}</span>
            <span>Hoy · {usd(DEV.valor)}</span>
          </div>
        </div>

        {/* avance de obra */}
        <div className="mob-card" style={{ padding: "16px 16px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Avance de obra</span>
            <span className="serif" style={{ fontSize: 20, color: "var(--green)" }}>{Math.round(DEV.obra * 100)}%</span>
          </div>
          <div className="bar"><i style={{ width: `${DEV.obra * 100}%` }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 9, fontSize: 11.5, color: "var(--muted)" }}>
            <span>{DEV.etapa}</span><span>Entrega {DEV.entrega}</span>
          </div>
        </div>

        {/* tus cuotas */}
        <div className="sec-head" style={{ marginTop: 4 }}><h3>Tus cuotas</h3><span className="link">Ver plan {I.chev(12)}</span></div>
        <div className="mob-card">
          {CUOTAS.slice(2, 5).map((c) => (
            <div key={c.n} className={`cuota ${c.ok ? "cuota--ok" : ""}`}>
              <span className="ring" />
              <div>
                <div>Cuota {c.n}</div>
                <div className="when">{c.when}</div>
              </div>
              <span className="amt">{c.amt}</span>
              <span style={{ fontSize: 12, color: c.ok ? "var(--green)" : "var(--pend)", fontWeight: 500, marginLeft: 10 }}>
                {c.ok ? "Pagada" : "Próxima"}
              </span>
            </div>
          ))}
        </div>

        {/* novedades */}
        <div className="sec-head"><h3>Novedades de obra</h3><span className="link" onClick={() => onNav?.("contenido")}>Ver todas {I.chev(12)}</span></div>
        <NewsCard n={NEWS[0]} onClick={() => onOpenNews?.(0)} />
      </div>
      <BottomNav active="inicio" onNav={onNav} />
    </div>
  );
}

function NewsCard({ n, onClick, compact }) {
  return (
    <div className="mob-card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={onClick}>
      <Ph label="foto de obra" note={n.note} height={compact ? 120 : 148} />
      <div style={{ padding: "13px 15px 15px" }}>
        <div style={{ display: "flex", gap: 8, fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
          <span style={{ color: "var(--green)" }}>{n.tag}</span><span>·</span><span>{n.date}</span>
        </div>
        <div className="serif" style={{ fontSize: 18, lineHeight: 1.15, textWrap: "pretty" }}>{n.title}</div>
        {!compact && <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "8px 0 0" }}>{n.body}</p>}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// CONTENIDO — Novedades / Fotos / Videos
// ──────────────────────────────────────────────────────────
function InvContent({ onNav, onOpenNews, initialTab = "novedades" }) {
  const [tab, setTab] = React.useState(initialTab);
  return (
    <div className="mob">
      <MobHeader action={<RoundBtn>{I.bell(16)}</RoundBtn>} />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <h1 className="serif" style={{ fontSize: 26, margin: "2px 0 16px" }}>Contenido</h1>
        <div className="seg" style={{ marginBottom: 18 }}>
          {[["novedades", "Novedades"], ["fotos", "Fotos"], ["videos", "Videos"]].map(([id, l]) => (
            <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{l}</button>
          ))}
        </div>

        {tab === "novedades" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {NEWS.map((n, i) => <NewsCard key={i} n={n} compact onClick={() => onOpenNews?.(i)} />)}
          </div>
        )}
        {tab === "fotos" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {PHOTOS.map((p, i) => <Ph key={i} label={p} height={118} style={{ borderRadius: 4 }} />)}
          </div>
        )}
        {tab === "videos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VIDEOS.map((v, i) => (
              <div key={i} className="mob-card" style={{ overflow: "hidden" }}>
                <div className="ph" style={{ height: 150, position: "relative" }}>
                  <span style={{ position: "relative", zIndex: 1 }}>video · youtube</span>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)" }}>{I.play(40)}</div>
                </div>
                <div style={{ padding: "12px 15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{v.title}</span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{v.len}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav active="contenido" onNav={onNav} />
    </div>
  );
}

// Detalle de novedad (cuaderno de obra)
function InvNewsDetail({ index = 0, onBack }) {
  const n = NEWS[index];
  return (
    <div className="mob">
      <div className="mob-h" style={{ paddingBottom: 12 }}>
        <RoundBtn onClick={onBack}>{I.back(18)}</RoundBtn>
        <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 4 }}>Novedades de obra</span>
      </div>
      <div className="mob-scroll" style={{ paddingTop: 8 }}>
        <Ph label="foto de obra" note={n.note} height={220} style={{ borderRadius: 6, marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 8, fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          <span style={{ color: "var(--green)" }}>{n.tag}</span><span>·</span><span>{n.date}</span>
        </div>
        <h1 className="serif" style={{ fontSize: 28, lineHeight: 1.1, margin: "0 0 14px", textWrap: "pretty" }}>{n.title}</h1>
        <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>{n.body}</p>
        <div style={{ margin: "22px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Ph label="detalle" note="hormigón" height={120} style={{ borderRadius: 4 }} />
          <Ph label="detalle" note="nivel 4" height={120} style={{ borderRadius: 4 }} />
        </div>
        <div className="note" style={{ fontSize: 19, color: "var(--green-60)", textAlign: "center", padding: "8px 0 4px" }}>
          — la obra avanza con vos —
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// AYUDA — FAQ + abrir nueva duda
// ──────────────────────────────────────────────────────────
function InvAyuda({ onNav, onNewDuda }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="mob">
      <MobHeader />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <h1 className="serif" style={{ fontSize: 26, margin: "2px 0 4px" }}>Ayuda</h1>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 20px" }}>Estamos para acompañarte. Mirá las preguntas frecuentes o escribinos.</p>

        <div className="eyebrow" style={{ marginBottom: 10 }}>Preguntas frecuentes</div>
        <div className="faq">
          {FAQ.map(([q, a], i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span style={{ textWrap: "pretty" }}>{q}</span>
                <span style={{ color: "var(--muted)", transform: open === i ? "rotate(90deg)" : "none", transition: "transform 150ms" }}>{I.chev(13)}</span>
              </button>
              {open === i && <div className="faq-a">{a}</div>}
            </div>
          ))}
        </div>

        <div className="mob-card" style={{ marginTop: 20, padding: "18px 16px", textAlign: "center" }}>
          <div className="serif" style={{ fontSize: 19, marginBottom: 4 }}>¿Tenés una duda?</div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 14px" }}>Escribinos y te respondemos a la brevedad.</p>
          <button className="btn btn--primary btn--block" onClick={onNewDuda}>Abrir una consulta</button>
        </div>
      </div>
      <BottomNav active="ayuda" onNav={onNav} />
    </div>
  );
}

// Nueva duda (formulario)
function InvNewDuda({ onBack, sent = false }) {
  if (sent) return (
    <div className="mob">
      <div className="mob-h" style={{ paddingBottom: 12 }}><RoundBtn onClick={onBack}>{I.back(18)}</RoundBtn></div>
      <div className="mob-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div className="tick" style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{I.check(24)}</div>
        <h1 className="serif" style={{ fontSize: 28, margin: "0 0 8px" }}>Recibimos tu consulta.</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 240, lineHeight: 1.5 }}>El equipo de UMBRAL te va a responder por mail. Gracias por escribirnos.</p>
        <button className="btn btn--soft" style={{ marginTop: 22 }} onClick={onBack}>Volver al inicio</button>
      </div>
    </div>
  );
  return (
    <div className="mob">
      <div className="mob-h" style={{ paddingBottom: 12 }}>
        <RoundBtn onClick={onBack}>{I.back(18)}</RoundBtn>
        <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 4 }}>Nueva consulta</span>
      </div>
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <h1 className="serif" style={{ fontSize: 27, margin: "2px 0 6px", lineHeight: 1.1, textWrap: "pretty" }}>¿Tenés una duda? Escribinos.</h1>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 22px" }}>Sobre {DEV.name} · {DEV.developer}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="field field--mobile"><label>Asunto (opcional)</label><input placeholder="Sobre las cuotas, la obra…" /></div>
          <div className="field field--mobile">
            <label>Tu duda</label>
            <textarea rows="5" placeholder="Escribí lo que quieras consultar" style={{ resize: "none", lineHeight: 1.5 }} />
          </div>
        </div>
        <button className="btn btn--primary btn--block" style={{ marginTop: 22 }}>Enviar</button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// VENDER — línea de salida (3 pasos)
// ──────────────────────────────────────────────────────────
function InvSell({ onNav, step = "intro" }) {
  const [motivo, setMotivo] = React.useState(0);
  const motivos = ["Necesito liquidez", "Encontré otra oportunidad", "Cambió mi plan", "Otro motivo"];

  if (step === "confirm") return (
    <div className="mob">
      <MobHeader />
      <div className="mob-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{I.check(24)}</div>
        <h1 className="serif" style={{ fontSize: 30, margin: "0 0 10px" }}>Recibimos tu solicitud.</h1>
        <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 250, lineHeight: 1.55 }}>Te vamos a contactar para acompañarte en la venta de tu unidad.</p>
      </div>
      <BottomNav active="vender" onNav={onNav} />
    </div>
  );

  if (step === "cuestionario") return (
    <div className="mob">
      <div className="mob-h" style={{ paddingBottom: 12 }}>
        <RoundBtn>{I.back(18)}</RoundBtn>
        <div style={{ flex: 1 }} />
        <div className="stepper" style={{ width: 64 }}><i className="on" /><i className="on" /><i /></div>
      </div>
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <h1 className="serif" style={{ fontSize: 26, margin: "2px 0 18px", lineHeight: 1.1 }}>¿Por qué querés vender?</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {motivos.map((m, i) => (
            <div key={i} className={`radio-card ${motivo === i ? "radio-card--on" : ""}`} onClick={() => setMotivo(i)}>
              <span className="rb" />{m}
            </div>
          ))}
        </div>
        <div className="field field--mobile" style={{ marginTop: 18 }}>
          <label>¿Querés contarnos algo más? (opcional)</label>
          <textarea rows="3" placeholder="Escribí lo que quieras" style={{ resize: "none" }} />
        </div>
        <div className="field field--mobile" style={{ marginTop: 16 }}>
          <label>¿En qué plazo lo pensás?</label>
          <select><option>Cuanto antes</option><option>En los próximos meses</option><option>Todavía lo estoy evaluando</option></select>
        </div>
        <button className="btn btn--primary btn--block" style={{ marginTop: 24 }}>Enviar solicitud</button>
      </div>
    </div>
  );

  // intro
  return (
    <div className="mob">
      <MobHeader />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <div className="stepper" style={{ marginBottom: 22 }}><i className="on" /><i /><i /></div>
        <h1 className="serif" style={{ fontSize: 30, margin: "2px 0 14px", lineHeight: 1.08 }}>Quiero vender<br/>mi unidad</h1>
        <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 22px" }}>
          Si querés salir, te acompañamos en la venta. Contanos un poco para empezar y el equipo de UMBRAL te contacta.
        </p>
        <div className="mob-card" style={{ padding: "16px 16px" }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Tu unidad hoy</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div className="serif" style={{ fontSize: 22 }}>{DEV.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Tus {DEV.m2} m² · {DEV.etapa}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="serif" style={{ fontSize: 22, color: "var(--green)" }}>{usd(DEV.valor)}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>valor proyectado</div>
            </div>
          </div>
        </div>
        <button className="btn btn--primary btn--block" style={{ marginTop: 24 }}>Continuar</button>
        <p className="note" style={{ textAlign: "center", fontSize: 17, color: "var(--muted)", margin: "16px 0 0" }}>
          vender no es abandonar — es una decisión más
        </p>
      </div>
      <BottomNav active="vender" onNav={onNav} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// EMPTY — desarrollo sin contenido aún (EMPTY-01)
// ──────────────────────────────────────────────────────────
function InvEmpty({ onNav }) {
  return (
    <div className="mob">
      <MobHeader action={<RoundBtn>{I.gear(18)}</RoundBtn>} />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <div style={{ marginBottom: 14 }}>
          <div className="eyebrow">Hola, Santiago</div>
          <h1 className="serif" style={{ fontSize: 26, margin: "2px 0 0" }}>Tu desarrollo</h1>
        </div>
        <div className="dev-card" style={{ marginBottom: 16 }}>
          <Ph label="foto de obra" height={150} />
          <div className="body">
            <h2 className="serif" style={{ fontSize: 22, margin: "0 0 8px" }}>{DEV.name}</h2>
            <div style={{ display: "flex", gap: 6 }}>
              <Pill kind="obra">En obra</Pill>
              <Pill kind="neutral" dot={false}>Tus {DEV.m2} m²</Pill>
            </div>
          </div>
        </div>
        <div className="empty" style={{ border: "1px solid var(--hairline-2)", borderRadius: 8, background: "var(--paper)" }}>
          <div className="mk"><UmbralLogo height={48} /></div>
          <h3 className="serif" style={{ fontSize: 22, margin: "0 0 8px" }}>Tu desarrollo está tomando forma.</h3>
          <p style={{ fontSize: 13.5, color: "var(--muted)", maxWidth: 250, margin: "0 auto", lineHeight: 1.55 }}>
            Pronto vas a ver acá las novedades, fotos y la valorización de tu obra.
          </p>
        </div>
      </div>
      <BottomNav active="inicio" onNav={onNav} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// App interactiva (para el artboard "vivo")
// ──────────────────────────────────────────────────────────
function InvApp() {
  const [screen, setScreen] = React.useState("inicio");
  const [news, setNews] = React.useState(null);
  const nav = (id) => { setNews(null); setScreen(id); };
  if (news !== null) return <InvNewsDetail index={news} onBack={() => setNews(null)} />;
  return (
    <React.Fragment>
      {screen === "inicio" && <InvHome onNav={nav} onOpenNews={(i) => setNews(i)} />}
      {screen === "contenido" && <InvContent onNav={nav} onOpenNews={(i) => setNews(i)} />}
      {screen === "ayuda" && <InvAyuda onNav={nav} onNewDuda={() => setScreen("duda")} />}
      {screen === "duda" && <InvNewDuda onBack={() => setScreen("ayuda")} />}
      {screen === "vender" && <InvSell onNav={nav} />}
    </React.Fragment>
  );
}

Object.assign(window, {
  InvOnboard1, InvOnboard2, InvLogin, InvHome, InvContent, InvNewsDetail,
  InvAyuda, InvNewDuda, InvSell, InvEmpty, InvApp, DEV, CUOTAS,
});
