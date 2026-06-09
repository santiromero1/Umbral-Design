// ============================================================
// UMBRAL · App del inversor (web responsive, mobile-first)
// Burger menu (sin tabbar) · Home con edificio en vivo, accesos
// directos y cuotas (ya pagué + add to calendar) · Contenido
// como newsletter · Ayuda · Vender · Vacíos / error
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
  obra: 0.63,
  floors: 8,
  floorsDone: 5,
  etapaNum: 5,
  etapaTotal: 8,
  etapaName: "Mampostería",
  proxima: "Instalaciones",
  entrega: "Marzo 2027",
  curve: [100, 101, 103, 104.5, 107, 110, 113, 117, 122, 128],
};

const PLAN_TOTAL = 12;
const PLAN_PAGADAS = 8;
const PROX_CUOTA = { n: 9, when: "Junio 2026", amt: "USD 4.200", venc: "10 jun 2026" };

const CUOTAS = [
  { n: 6, when: "Marzo 2026", amt: "USD 4.200", ok: true },
  { n: 7, when: "Abril 2026", amt: "USD 4.200", ok: true },
  { n: 8, when: "Mayo 2026", amt: "USD 4.200", ok: true },
  { n: 9, when: "Junio 2026", amt: "USD 4.200", ok: false },
  { n: 10, when: "Julio 2026", amt: "USD 4.200", ok: false },
];

const NEWS = [
  { date: "02 jun 2026", tag: "Obra", title: "Bajada de hormigón · nivel 4", note: "nivel 4 ✓", photos: 4, videos: 1,
    body: "Se completó el colado de la losa del cuarto nivel. La estructura ya alcanza los 12 metros sobre la cota de vereda y arranca el montaje del nivel 5. Gracias por seguir de cerca cada etapa." },
  { date: "19 may 2026", tag: "Obra", title: "Avanza la mampostería interior", note: "60% interior", photos: 6, videos: 0,
    body: "La mampostería interior llegó al 60% en los niveles 1 a 3. Comienza el tendido de cañerías sanitarias primarias y la preparación de los pases de instalaciones." },
  { date: "04 may 2026", tag: "Hito", title: "Te invitamos a ver la obra", note: "sábado 17", photos: 2, videos: 1,
    body: "Estás invitado a la visita de obra del sábado 17 de mayo. Vas a poder recorrer tu nivel y ver el avance de cerca, acompañado por el equipo de UMBRAL." },
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
// Header con burger + drawer (reemplaza la tabbar)
// ──────────────────────────────────────────────────────────
function MobMenu({ active, onNav, onClose }) {
  const items = [
    ["inicio", "Inicio", I.home],
    ["contenido", "Novedades", I.grid],
    ["ayuda", "Ayuda", I.help],
    ["vender", "Vender mi unidad", I.sell],
  ];
  return (
    <div className="drawer-bg" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <UmbralLogo height={22} />
          <div style={{ flex: 1 }} />
          <button className="burger" style={{ border: "none", background: "transparent" }} onClick={onClose}>{I.close(18)}</button>
        </div>
        <div className="drawer-user">
          <Avatar initials="SR" size={40} />
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Santiago Ramírez</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Tus {DEV.m2} m² · {DEV.name}</div>
          </div>
        </div>
        <div className="drawer-nav">
          {items.map(([id, label, ic]) => (
            <button key={id} className={`drawer-item ${active === id ? "drawer-item--active" : ""} ${id === "vender" ? "drawer-item--sell" : ""}`}
              onClick={() => onNav?.(id)}>
              <span className="ico">{ic(20)}</span>{label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: "auto", padding: "12px 28px 0", borderTop: "1px solid var(--hairline-2)", marginInline: 14 }}>
          <button className="drawer-item" style={{ paddingInline: 0, color: "var(--muted)" }}><span className="ico">{I.gear(18)}</span>Configuración</button>
          <button className="drawer-item" style={{ paddingInline: 0, color: "var(--muted)" }}><span className="ico">{I.back(18)}</span>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}

function MobHeader({ onNav, active, menuOpen = false, back }) {
  const [open, setOpen] = React.useState(menuOpen);
  return (
    <React.Fragment>
      <div className="mob-h">
        {back && <RoundBtn onClick={back}>{I.back(18)}</RoundBtn>}
        <UmbralLogo height={20} />
        <div style={{ flex: 1 }} />
        {!back && <button className="burger" onClick={() => setOpen(true)} aria-label="Menú">{I.burger(20)}</button>}
      </div>
      {open && <MobMenu active={active} onNav={(id) => { setOpen(false); onNav?.(id); }} onClose={() => setOpen(false)} />}
    </React.Fragment>
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
        <button className="btn btn--primary btn--block" style={{ marginTop: 16 }} aria-disabled={!value && !error}>
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
      <div className="mob-h">
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
// Card · Edificio en vivo
// ──────────────────────────────────────────────────────────
function EdificioCard() {
  return (
    <div className="mob-card" style={{ padding: "16px 16px 18px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ color: "var(--green)", display: "flex" }}>{I.building(18)}</span>
        <span className="eyebrow">Tu edificio en vivo</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 6px", lineHeight: 1.45 }}>
        A medida que avanza la obra, el edificio se va terminando de pintar.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <BuildingProgress floors={DEV.floors} done={DEV.floorsDone} />
        <div style={{ flex: 1, paddingLeft: 6 }}>
          <div className="serif" style={{ fontSize: 38, lineHeight: 1, color: "var(--ink)" }}>{Math.round(DEV.obra * 100)}%</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>Etapa {DEV.etapaNum}/{DEV.etapaTotal}</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{DEV.etapaName}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>Próxima: {DEV.proxima}</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Card · Cuotas (ya pagué + add to calendar)
// ──────────────────────────────────────────────────────────
function PagosCard() {
  const [avisado, setAvisado] = React.useState(false);
  const pct = Math.round((PLAN_PAGADAS / PLAN_TOTAL) * 100);
  return (
    <div className="mob-card" style={{ padding: "16px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span className="eyebrow">Tus cuotas</span>
        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{PLAN_PAGADAS} de {PLAN_TOTAL} pagadas · {pct}%</span>
      </div>
      <div className="cuota-dots" style={{ marginBottom: 16 }}>
        {Array.from({ length: PLAN_TOTAL }).map((_, i) => (
          <i key={i} className={i < PLAN_PAGADAS ? "on" : (i === PLAN_PAGADAS ? "next" : "")} />
        ))}
      </div>
      <div className="next-cuota" style={{ marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)", flexShrink: 0 }}>{I.coin(18)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--green-60)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Próxima cuota</div>
          <div style={{ fontSize: 14.5, fontWeight: 500, marginTop: 1 }}>Cuota {PROX_CUOTA.n} · {PROX_CUOTA.when}</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Vence el {PROX_CUOTA.venc}</div>
        </div>
        <div className="serif" style={{ fontSize: 19, color: "var(--green)" }}>{PROX_CUOTA.amt}</div>
      </div>
      {avisado ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "2px 2px 4px" }}>
          <span className="paid-note">{I.check(15)} Le avisamos a UMBRAL que pagaste</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Te confirmamos en cuanto lo registremos.</span>
        </div>
      ) : (
        <button className="btn btn--primary btn--block" onClick={() => setAvisado(true)}>{I.check(15)} Ya pagué esta cuota</button>
      )}
      <button className="btn btn--ghost btn--block" style={{ marginTop: 8 }}>{I.calendar(16)} Agregar las cuotas a mi calendario</button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// HOME
// ──────────────────────────────────────────────────────────
function InvHome({ onNav, onOpenNews, menuOpen = false }) {
  return (
    <div className="mob">
      <MobHeader onNav={onNav} active="inicio" menuOpen={menuOpen} />
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
            <hr className="hairline" style={{ margin: "16px 0 14px" }} />
            <div className="quick">
              <button onClick={() => onNav?.("contenido")}><span className="qic">{I.grid(20)}</span>Novedades</button>
              <button onClick={() => onNav?.("ayuda")}><span className="qic">{I.help(20)}</span>Ayuda</button>
              <button onClick={() => onNav?.("vender")}><span className="qic">{I.sell(20)}</span>Vender</button>
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

        {/* edificio en vivo */}
        <EdificioCard />

        {/* cuotas */}
        <PagosCard />

        {/* novedades */}
        <div className="sec-head"><h3>Novedades de obra</h3><span className="link" onClick={() => onNav?.("contenido")}>Ver todas {I.chev(12)}</span></div>
        <NewsCard n={NEWS[0]} onClick={() => onOpenNews?.(0)} />
      </div>
    </div>
  );
}

function NewsCard({ n, onClick, compact }) {
  return (
    <div className="mob-card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={onClick}>
      <Ph label="foto de obra" note={n.note} height={compact ? 140 : 148} />
      <div style={{ padding: "13px 15px 15px" }}>
        <div style={{ display: "flex", gap: 8, fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
          <span style={{ color: "var(--green)" }}>{n.tag}</span><span>·</span><span>{n.date}</span>
        </div>
        <div className="serif" style={{ fontSize: 19, lineHeight: 1.15, textWrap: "pretty", marginBottom: 6 }}>{n.title}</div>
        <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{n.body}</p>
        <div style={{ display: "flex", gap: 12, fontSize: 11.5, color: "var(--muted)" }}>
          {n.photos > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{I.image(14)} {n.photos} fotos</span>}
          {n.videos > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{I.play(14)} {n.videos} video</span>}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// CONTENIDO — newsletter único
// ──────────────────────────────────────────────────────────
function InvContent({ onNav, onOpenNews }) {
  return (
    <div className="mob">
      <MobHeader onNav={onNav} active="contenido" />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <h1 className="serif" style={{ fontSize: 26, margin: "2px 0 2px" }}>Novedades</h1>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 18px" }}>Todo lo que pasa en tu obra, en un solo lugar.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {NEWS.map((n, i) => <NewsCard key={i} n={n} compact onClick={() => onOpenNews?.(i)} />)}
        </div>
      </div>
    </div>
  );
}

// Detalle de novedad (con galería + video)
function InvNewsDetail({ index = 0, onBack }) {
  const n = NEWS[index];
  return (
    <div className="mob">
      <MobHeader back={onBack} />
      <div className="mob-scroll" style={{ paddingTop: 8 }}>
        <Ph label="foto de obra" note={n.note} height={210} style={{ borderRadius: 6, marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 8, fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          <span style={{ color: "var(--green)" }}>{n.tag}</span><span>·</span><span>{n.date}</span>
        </div>
        <h1 className="serif" style={{ fontSize: 27, lineHeight: 1.12, margin: "0 0 14px", textWrap: "pretty" }}>{n.title}</h1>
        <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>{n.body}</p>

        {n.photos > 0 && (
          <React.Fragment>
            <div className="eyebrow" style={{ margin: "22px 0 10px" }}>Fotos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Array.from({ length: n.photos }).map((_, i) => <Ph key={i} label="foto" height={110} style={{ borderRadius: 4 }} />)}
            </div>
          </React.Fragment>
        )}

        {n.videos > 0 && (
          <React.Fragment>
            <div className="eyebrow" style={{ margin: "22px 0 10px" }}>Video</div>
            <div className="ph" style={{ height: 170, borderRadius: 6, position: "relative" }}>
              <span style={{ position: "relative", zIndex: 1 }}>video · youtube</span>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--green)" }}>{I.play(44)}</div>
            </div>
          </React.Fragment>
        )}
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
      <MobHeader onNav={onNav} active="ayuda" />
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
    </div>
  );
}

// Nueva duda (formulario)
function InvNewDuda({ onBack, sent = false }) {
  if (sent) return (
    <div className="mob">
      <MobHeader back={onBack} />
      <div className="mob-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{I.check(24)}</div>
        <h1 className="serif" style={{ fontSize: 28, margin: "0 0 8px" }}>Recibimos tu consulta.</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 240, lineHeight: 1.5 }}>El equipo de UMBRAL te va a responder por mail. Gracias por escribirnos.</p>
        <button className="btn btn--soft" style={{ marginTop: 22 }} onClick={onBack}>Volver</button>
      </div>
    </div>
  );
  return (
    <div className="mob">
      <MobHeader back={onBack} />
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
      <MobHeader onNav={onNav} active="vender" />
      <div className="mob-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{I.check(24)}</div>
        <h1 className="serif" style={{ fontSize: 30, margin: "0 0 10px" }}>Recibimos tu solicitud.</h1>
        <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 250, lineHeight: 1.55 }}>Te vamos a contactar para acompañarte en la venta de tu unidad.</p>
      </div>
    </div>
  );

  if (step === "cuestionario") return (
    <div className="mob">
      <MobHeader onNav={onNav} active="vender" />
      <div className="mob-scroll" style={{ paddingTop: 14 }}>
        <div className="stepper" style={{ marginBottom: 18 }}><i className="on" /><i className="on" /><i /></div>
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
      <MobHeader onNav={onNav} active="vender" />
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
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Tus {DEV.m2} m² · {DEV.etapaName}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="serif" style={{ fontSize: 22, color: "var(--green)" }}>{usd(DEV.valor)}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>valor proyectado</div>
            </div>
          </div>
        </div>
        <button className="btn btn--primary btn--block" style={{ marginTop: 24 }}>Continuar</button>
        <p className="serif" style={{ textAlign: "center", fontStyle: "italic", fontSize: 16, color: "var(--muted)", margin: "16px 0 0" }}>
          Vender no es abandonar — es una decisión más.
        </p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// EMPTY — desarrollo sin contenido aún (EMPTY-01)
// ──────────────────────────────────────────────────────────
function InvEmpty({ onNav }) {
  return (
    <div className="mob">
      <MobHeader onNav={onNav} active="inicio" />
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
