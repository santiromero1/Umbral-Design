// ============================================================
// UMBRAL · Backoffice — Admin UMBRAL (desktop, 1280px)
// Desarrollos (con acciones por fila) · Inversores (global +
// filtros) · Contenido (lista + agregar Noticia/FAQ) ·
// Pagos (marcar pagada + filtro) · Avisos · Preguntas ·
// Solicitudes · Métricas · Login
// Un solo rol: Admin UMBRAL (ve todo). Sin desarrolladora.
// ============================================================

const DEVS = [
  { id: 1, name: "Pilará Forest", dev: "Pilará S.A.", loc: "Pilar, BA", obra: 0.63, estado: "En obra", inv: 24, rango: "2.900–3.400" },
  { id: 2, name: "Distrito Quúntar", dev: "Quúntar Group", loc: "Nordelta, BA", obra: 0.34, estado: "En obra", inv: 11, rango: "3.100–3.700" },
  { id: 3, name: "Casa Liminal", dev: "UMBRAL Estudio", loc: "Palermo, CABA", obra: 1.0, estado: "Entregado", inv: 8, rango: "4.200–4.800" },
  { id: 4, name: "Reserva del Este", dev: "Pilará S.A.", loc: "Pilar, BA", obra: 0.08, estado: "Preventa", inv: 3, rango: "2.700–3.100" },
];

const INVERSORES = [
  { nm: "Santiago Ramírez", em: "santiago.ramirez@mail.com", dev: "Pilará Forest", m2: 120, conf: true, code: "UMB-2026-7F3A", last: "Hoy, 09:12", logins: 38 },
  { nm: "María Belén Soto", em: "mb.soto@mail.com", dev: "Pilará Forest", m2: 85, conf: true, code: "UMB-2026-K29D", last: "Ayer, 21:40", logins: 22 },
  { nm: "Joaquín Vega", em: "joaquin.vega@mail.com", dev: "Distrito Quúntar", m2: 200, conf: false, code: "UMB-2026-X81B", last: "Hace 3 días", logins: 7 },
  { nm: "Lucía Fernández", em: "lucia.f@mail.com", dev: "Distrito Quúntar", m2: 60, conf: true, code: "UMB-2026-M44C", last: "Hace 6 días", logins: 15 },
  { nm: "Tomás Aguirre", em: "t.aguirre@mail.com", dev: "Pilará Forest", m2: 150, conf: false, code: "UMB-2026-P07E", last: "Nunca ingresó", logins: 0 },
  { nm: "Carolina Méndez", em: "caro.mendez@mail.com", dev: "Casa Liminal", m2: 95, conf: true, code: "UMB-2026-L52F", last: "Hoy, 08:03", logins: 41 },
  { nm: "Pedro Ibáñez", em: "pedro.ibanez@mail.com", dev: "Casa Liminal", m2: 110, conf: true, code: "UMB-2026-D18G", last: "Hace 2 días", logins: 19 },
  { nm: "Valeria Costa", em: "v.costa@mail.com", dev: "Reserva del Este", m2: 70, conf: false, code: "UMB-2026-R90H", last: "Nunca ingresó", logins: 0 },
];

const VENTAS = [
  { nm: "Joaquín Vega", dev: "Distrito Quúntar", motivo: "Necesito liquidez", date: "07 jun 2026", estado: "Pendiente" },
  { nm: "Lucía Fernández", dev: "Distrito Quúntar", motivo: "Encontré otra oportunidad", date: "05 jun 2026", estado: "En gestión" },
  { nm: "Pedro Ibáñez", dev: "Casa Liminal", motivo: "Cambió mi plan", date: "01 jun 2026", estado: "En gestión" },
];

const PREGUNTAS = [
  { nm: "Santiago Ramírez", em: "santiago.ramirez@mail.com", dev: "Pilará Forest", asunto: "Cuota de junio", date: "Hoy, 10:24", unread: true, estado: "Sin responder",
    msgs: [{ from: "inv", t: "Hola, avisé que pagué la cuota de junio pero todavía la veo pendiente. ¿La pueden revisar? Gracias.", when: "Hoy, 10:24" }] },
  { nm: "María Belén Soto", em: "mb.soto@mail.com", dev: "Pilará Forest", asunto: "Visita de obra", date: "Ayer, 18:02", unread: true, estado: "Sin responder",
    msgs: [{ from: "inv", t: "¿Puedo llevar a un familiar a la visita de obra del sábado?", when: "Ayer, 18:02" }] },
  { nm: "Carolina Méndez", em: "caro.mendez@mail.com", dev: "Casa Liminal", asunto: "Escritura", date: "06 jun", unread: false, estado: "Respondida",
    msgs: [
      { from: "inv", t: "¿Cuándo arranca el proceso de escrituración ahora que está entregado?", when: "06 jun, 11:10" },
      { from: "umbral", t: "Hola Carolina, el proceso arranca este mes. Te vamos a contactar con la escribanía para coordinar la firma. ¡Gracias!", when: "06 jun, 15:30" },
    ] },
];

const NEWS = [
  { date: "02 jun 2026", dev: "Pilará Forest", tag: "Obra", title: "Bajada de hormigón · nivel 4", photos: 4, videos: 1, estado: "Publicada" },
  { date: "19 may 2026", dev: "Pilará Forest", tag: "Obra", title: "Avanza la mampostería interior", photos: 6, videos: 0, estado: "Publicada" },
  { date: "04 may 2026", dev: "Pilará Forest", tag: "Hito", title: "Te invitamos a ver la obra", photos: 2, videos: 1, estado: "Publicada" },
  { date: "21 abr 2026", dev: "Distrito Quúntar", tag: "Obra", title: "Inicio de excavación", photos: 3, videos: 0, estado: "Publicada" },
];

const FAQ = [
  ["¿Cómo se calcula la proyección de mis metros?",
   "Tomamos el valor de referencia por m² del desarrollo y lo proyectamos sobre tus metros invertidos. No es una promesa de rentabilidad, es una proyección de referencia."],
  ["¿Qué pasa si la obra se atrasa?",
   "Cualquier cambio en los plazos se carga apenas se confirma. Vas a ver la nueva fecha estimada y una novedad explicando el motivo."],
  ["¿Puedo sumar a alguien a mi unidad?",
   "Sí. Escribinos desde Ayuda y el equipo de UMBRAL te acompaña con el trámite junto a la desarrolladora."],
];

const PLAN = [6, 7, 8, 9, 10, 11];
// estados de celda: 'ok' | 'pend' | 'aviso'
const PAGOS_SEED = [
  { nm: "Santiago Ramírez", dev: "Pilará Forest", m2: 120, cuotas: ["ok", "ok", "ok", "aviso", "pend", "pend"] },
  { nm: "María Belén Soto", dev: "Pilará Forest", m2: 85, cuotas: ["ok", "ok", "ok", "ok", "pend", "pend"] },
  { nm: "Tomás Aguirre", dev: "Pilará Forest", m2: 150, cuotas: ["ok", "ok", "aviso", "pend", "pend", "pend"] },
  { nm: "Joaquín Vega", dev: "Distrito Quúntar", m2: 200, cuotas: ["ok", "ok", "ok", "ok", "ok", "pend"] },
  { nm: "Lucía Fernández", dev: "Distrito Quúntar", m2: 60, cuotas: ["ok", "ok", "ok", "pend", "pend", "pend"] },
];

const initials = (nm) => nm.split(" ").map((x) => x[0]).slice(0, 2).join("");

// ──────────────────────────────────────────────────────────
// Filtros reutilizables
// ──────────────────────────────────────────────────────────
function DevFilter({ value, onChange }) {
  return (
    <div className="bo-select">
      <span style={{ display: "flex", color: "var(--muted)" }}>{I.building(15)}</span>
      <select value={value || ""} onChange={(e) => onChange?.(e.target.value)}>
        <option value="">Todos los desarrollos</option>
        {DEVS.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
      </select>
    </div>
  );
}

function Chips({ options, value, onChange }) {
  return (
    <div className="chips">
      {options.map(([id, label, n]) => (
        <button key={id} className={`chip ${value === id ? "chip--on" : ""}`} onClick={() => onChange?.(id)}>
          {label}{n != null && <span className="n">{n}</span>}
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Shell
// ──────────────────────────────────────────────────────────
function BOShell({ active, children, onNav }) {
  const nav = [
    ["sec", "Operación"],
    ["desarrollos", "Desarrollos", I.building, DEVS.length],
    ["inversores", "Inversores", I.users, INVERSORES.length],
    ["contenido", "Contenido", I.image],
    ["pagos", "Pagos", I.coin],
    ["sec", "Comunicación"],
    ["avisos", "Avisos", I.bell],
    ["preguntas", "Preguntas", I.help, 2],
    ["solicitudes", "Solicitudes", I.inbox, 3],
    ["sec", "Análisis"],
    ["metricas", "Métricas", I.chart],
  ];
  return (
    <div className="bo">
      <aside className="bo-side">
        <div className="bo-brand"><UmbralWord tag="BACKOFFICE" /></div>
        {nav.map((it, i) => it[0] === "sec"
          ? <div key={i} className="bo-nav-sec">{it[1]}</div>
          : (
            <div key={i} className={`bo-nav ${active === it[0] ? "bo-nav--active" : ""}`} onClick={() => onNav?.(it[0])}>
              <span style={{ display: "flex" }}>{it[2](17)}</span>{it[1]}
              {it[3] != null && <span className="count">{it[3]}</span>}
            </div>
          )
        )}
        <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--hairline-2)", display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="AU" size={30} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Admin UMBRAL</div>
            <div style={{ fontSize: 10.5, color: "var(--muted)" }}>operaciones@umbral.com</div>
          </div>
        </div>
      </aside>
      <main className="bo-main">{children}</main>
    </div>
  );
}

function BOTop() {
  return (
    <div className="bo-top">
      <div className="bo-search" style={{ minWidth: 280 }}>{I.search(14)}<span>Buscar desarrollo, inversor, código…</span></div>
      <div style={{ flex: 1 }} />
      <button className="btn btn--text" style={{ gap: 7 }}>{I.bell(16)}</button>
      <div className="who"><Avatar initials="AU" size={30} /><div><b style={{ fontWeight: 500 }}>Admin UMBRAL</b><small>Super usuario</small></div></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Desarrollos — con acciones por fila
// ──────────────────────────────────────────────────────────
function BODesarrollos({ onNav, onNew }) {
  const [estado, setEstado] = React.useState("todos");
  const rows = DEVS.filter((d) => estado === "todos"
    || (estado === "obra" && d.estado === "En obra")
    || (estado === "preventa" && d.estado === "Preventa")
    || (estado === "entregado" && d.estado === "Entregado"));
  return (
    <BOShell active="desarrollos" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head">
          <div>
            <div className="bo-crumb"><span className="here">Desarrollos</span></div>
            <h1 className="bo-title">Desarrollos</h1>
            <div className="bo-sub">Gestioná todo desde acá: sumá inversores, publicá novedades o cargá pagos de cada desarrollo.</div>
          </div>
          <button className="btn btn--primary btn--lg" onClick={onNew}>{I.plus(14)} Nuevo desarrollo</button>
        </div>

        <div className="bo-stats" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="bo-stat"><div className="s">Desarrollos activos</div><div className="v">3</div></div>
          <div className="bo-stat"><div className="s">Inversores totales</div><div className="v">46</div></div>
          <div className="bo-stat"><div className="s">m² bajo gestión</div><div className="v">8.420</div></div>
          <div className="bo-stat"><div className="s">Cuotas al día</div><div className="v">91%</div></div>
        </div>

        <div className="filterbar">
          <div className="bo-search" style={{ flex: "none", width: 260 }}>{I.search(14)}<span>Buscar desarrollo…</span></div>
          <Chips value={estado} onChange={setEstado} options={[["todos", "Todos"], ["obra", "En obra"], ["preventa", "Preventa"], ["entregado", "Entregado"]]} />
        </div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "2fr 1.2fr 1fr 0.7fr 2fr" }}>
            <span>Desarrollo</span><span>Desarrolladora</span><span>Estado de obra</span><span>Inversores</span><span style={{ textAlign: "right" }}>Acciones</span>
          </div>
          {rows.map((d) => (
            <div className="tr tr--row" key={d.id} style={{ gridTemplateColumns: "2fr 1.2fr 1fr 0.7fr 2fr" }}>
              <div className="nmcell" style={{ cursor: "pointer" }} onClick={() => onNav?.("inversores")}>
                <div style={{ width: 40, height: 40, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}><Ph label="" height={40} style={{ borderRadius: 4 }} /></div>
                <div><div className="nm">{d.name}</div><div className="sub">{d.loc} · USD {d.rango}/m²</div></div>
              </div>
              <div style={{ color: "var(--ink-2)" }}>{d.dev}</div>
              <div>
                {d.estado === "Entregado" ? <Pill kind="ok">Entregado</Pill>
                  : d.estado === "Preventa" ? <Pill kind="neutral">Preventa</Pill>
                  : <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="bar" style={{ width: 52 }}><i style={{ width: `${d.obra * 100}%` }} /></div>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>{Math.round(d.obra * 100)}%</span>
                    </div>}
              </div>
              <div style={{ fontVariantNumeric: "tabular-nums" }}>{d.inv}</div>
              <div className="row-actions">
                <button className="row-act" onClick={() => onNav?.("inversores")}>{I.plus(13)} Inversor</button>
                <button className="row-act" onClick={() => onNav?.("contenido")}>{I.image(14)} Noticia</button>
                <button className="row-act" onClick={() => onNav?.("pagos")}>{I.coin(14)} Pagos</button>
                <button className="icon-btn" title="Ver desarrollo" onClick={() => onNav?.("inversores")}>{I.chev(14)}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BOShell>
  );
}

// Alta de desarrollo (modal con plan de cuotas)
function BONewDev({ onNav }) {
  return (
    <BOShell active="desarrollos" onNav={onNav}>
      <BOTop />
      <div className="bo-content" style={{ filter: "blur(1.5px)", opacity: 0.55, pointerEvents: "none" }}>
        <div className="bo-head"><div><h1 className="bo-title">Desarrollos</h1></div></div>
      </div>
      <div className="modal-bg" style={{ position: "absolute", inset: 0, top: 56, left: 232 }}>
        <div className="modal" style={{ width: 640, maxHeight: "86%" }}>
          <div className="modal-h">
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Nuevo desarrollo</div><h3>Dejá un desarrollo operativo</h3></div>
            <button className="x">{I.close(16)}</button>
          </div>
          <div className="modal-b">
            <div className="eyebrow">Datos base</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="field"><label>Nombre del desarrollo</label><input placeholder="Pilará Forest" /></div>
              <div className="field"><label>Desarrolladora</label><input placeholder="Pilará S.A." /></div>
              <div className="field"><label>Ubicación</label><input placeholder="Pilar, Buenos Aires" /></div>
              <div className="field"><label>Rango USD / m²</label><input placeholder="2.900 – 3.400" /></div>
            </div>
            <hr className="hairline" />
            <div className="eyebrow">Estado de obra</div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
              <div className="field"><label>Etiqueta de etapa</label><input placeholder="Etapa 5 de 8 · mampostería" /></div>
              <div className="field"><label>% de avance</label><input placeholder="63" inputMode="numeric" /></div>
            </div>
            <hr className="hairline" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="eyebrow">Plan de cuotas</div>
              <button className="btn btn--soft" style={{ padding: "6px 12px" }}>{I.plus(13)} Agregar cuota</button>
            </div>
            <div className="tbl">
              <div className="tr tr--head" style={{ gridTemplateColumns: "0.5fr 1.4fr 1.4fr 0.4fr", padding: "10px 14px" }}><span>#</span><span>Vencimiento</span><span>Monto USD</span><span></span></div>
              {[["1", "Ene 2026", "4.200"], ["2", "Feb 2026", "4.200"], ["3", "Mar 2026", "4.200"]].map((c, i) => (
                <div className="tr" key={i} style={{ gridTemplateColumns: "0.5fr 1.4fr 1.4fr 0.4fr", padding: "8px 14px" }}>
                  <span style={{ color: "var(--muted)" }}>{c[0]}</span>
                  <input defaultValue={c[1]} style={{ border: "1px solid var(--hairline)", borderRadius: 2, padding: "7px 9px", fontSize: 13, fontFamily: "var(--sans)" }} />
                  <input defaultValue={c[2]} style={{ border: "1px solid var(--hairline)", borderRadius: 2, padding: "7px 9px", fontSize: 13, fontFamily: "var(--mono)" }} />
                  <span style={{ textAlign: "right", color: "var(--muted-2)", cursor: "pointer" }}>{I.close(14)}</span>
                </div>
              ))}
            </div>
            <div className="field" style={{ marginTop: 4 }}><span className="helper">Las cuotas se reflejan en la app del inversor apenas guardás.</span></div>
          </div>
          <div className="modal-f">
            <button className="btn btn--text">Cancelar</button>
            <button className="btn btn--primary">Crear desarrollo</button>
          </div>
        </div>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Inversores — global, con filtros por desarrollo y estado
// ──────────────────────────────────────────────────────────
function BOInversores({ onNav, onNewInv }) {
  const [dev, setDev] = React.useState("");
  const [estado, setEstado] = React.useState("todos");
  const rows = INVERSORES.filter((v) => {
    if (dev && v.dev !== dev) return false;
    if (estado === "conf" && !v.conf) return false;
    if (estado === "noconf" && v.conf) return false;
    if (estado === "sinin" && v.logins > 0) return false;
    return true;
  });
  const noConf = INVERSORES.filter((v) => !v.conf).length;
  const sinIn = INVERSORES.filter((v) => v.logins === 0).length;
  return (
    <BOShell active="inversores" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head">
          <div>
            <div className="bo-crumb"><span className="here">Inversores</span></div>
            <h1 className="bo-title">Inversores</h1>
            <div className="bo-sub">Todos los inversores de todos los desarrollos. Filtrá por desarrollo o por estado.</div>
          </div>
          <button className="btn btn--primary btn--lg" onClick={onNewInv}>{I.plus(14)} Dar de alta inversor</button>
        </div>

        <div className="filterbar">
          <div className="bo-search" style={{ flex: "none", width: 240 }}>{I.search(14)}<span>Nombre, email o código…</span></div>
          <DevFilter value={dev} onChange={setDev} />
          <Chips value={estado} onChange={setEstado} options={[["todos", "Todos", INVERSORES.length], ["conf", "Confirmados"], ["noconf", "No confirmados", noConf], ["sinin", "Sin ingresar", sinIn]]} />
        </div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "1.9fr 1.3fr 0.9fr 1.2fr 1.1fr 0.4fr" }}>
            <span>Inversor</span><span>Desarrollo</span><span>Metros</span><span>Código</span><span>Último ingreso</span><span></span>
          </div>
          {rows.map((v, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "1.9fr 1.3fr 0.9fr 1.2fr 1.1fr 0.4fr" }}>
              <div className="nmcell"><Avatar initials={initials(v.nm)} size={34} bg="var(--green-10)" color="var(--green)" /><div><div className="nm">{v.nm}</div><div className="sub">{v.em}</div></div></div>
              <div style={{ color: "var(--ink-2)", fontSize: 12.5 }}>{v.dev}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span className="mono" style={{ fontSize: 13 }}>{v.m2} m²</span>
                {v.conf ? <Pill kind="ok" dot={false}>OK</Pill> : <Pill kind="pend" dot={false}>No conf.</Pill>}
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{v.code}</div>
              <div style={{ color: v.logins === 0 ? "var(--muted-2)" : "var(--ink-2)", fontSize: 12.5 }}>{v.last}</div>
              <div style={{ textAlign: "right", color: "var(--muted)" }}>{I.chev(15)}</div>
            </div>
          ))}
        </div>
      </div>
    </BOShell>
  );
}

// Alta de inversor → código generado
function BONewInv({ onNav, generated = true }) {
  return (
    <BOShell active="inversores" onNav={onNav}>
      <BOTop />
      <div className="bo-content" style={{ filter: "blur(1.5px)", opacity: 0.55, pointerEvents: "none" }}>
        <div className="bo-head"><div><h1 className="bo-title">Inversores</h1></div></div>
      </div>
      <div className="modal-bg" style={{ position: "absolute", inset: 0, top: 56, left: 232 }}>
        <div className="modal" style={{ width: 520 }}>
          <div className="modal-h">
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Alta de inversor</div><h3>{generated ? "Listo, generamos su código" : "Sumar un inversor"}</h3></div>
            <button className="x">{I.close(16)}</button>
          </div>
          <div className="modal-b">
            {!generated ? (
              <React.Fragment>
                <div className="field"><label>Desarrollo</label><select><option>Pilará Forest</option><option>Distrito Quúntar</option><option>Casa Liminal</option><option>Reserva del Este</option></select></div>
                <div className="field"><label>Nombre y apellido</label><input placeholder="Santiago Ramírez" /></div>
                <div className="field"><label>Email</label><input placeholder="tunombre@email.com" /></div>
                <div className="field"><label>Metros invertidos (m²)</label><input placeholder="120" inputMode="numeric" /><span className="helper">Queda como “No confirmado” hasta que lo valides.</span></div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "4px 0 6px" }}>
                  <Avatar initials="SR" size={40} bg="var(--green-10)" color="var(--green)" />
                  <div><div style={{ fontWeight: 500, fontSize: 15 }}>Santiago Ramírez</div><div style={{ fontSize: 12.5, color: "var(--muted)" }}>Pilará Forest · 120 m² <span style={{ color: "var(--pend)" }}>· No confirmado</span></div></div>
                </div>
                <div className="code-card">
                  <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Código de referencia único</div>
                  <div className="code"><span>UMB-2026-7F3A</span><button className="btn" style={{ background: "rgba(255,255,255,0.16)", color: "#fff", padding: "6px 12px", fontSize: 12 }}>{I.copy(13)} Copiar</button></div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>Entregáselo al inversor por fuera de la plataforma. Lo va a usar una sola vez para entrar.</div>
                </div>
                <div className="field"><span className="helper">El inversor aparece en la tabla apenas cerrás esta ventana.</span></div>
              </React.Fragment>
            )}
          </div>
          <div className="modal-f">
            {!generated ? <React.Fragment><button className="btn btn--text">Cancelar</button><button className="btn btn--primary">Generar código</button></React.Fragment>
              : <React.Fragment><button className="btn btn--text">Dar de alta otro</button><button className="btn btn--primary">{I.check(14)} Listo</button></React.Fragment>}
          </div>
        </div>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Contenido — lista de contenidos + agregar (Noticia / FAQ)
// ──────────────────────────────────────────────────────────
function ContenidoModal({ onClose, tipo: tipo0 = "noticia" }) {
  const [tipo, setTipo] = React.useState(tipo0);
  return (
    <div className="modal-bg" style={{ position: "absolute", inset: 0, top: 56, left: 232 }}>
      <div className="modal" style={{ width: 600, maxHeight: "88%" }}>
        <div className="modal-h">
          <div><div className="eyebrow" style={{ marginBottom: 4 }}>Agregar contenido</div><h3>{tipo === "noticia" ? "Nueva noticia" : "Nueva pregunta frecuente"}</h3></div>
          <button className="x" onClick={onClose}>{I.close(16)}</button>
        </div>
        <div className="modal-b">
          <div className="seg" style={{ maxWidth: 320 }}>
            <button className={tipo === "noticia" ? "on" : ""} onClick={() => setTipo("noticia")}>Noticia</button>
            <button className={tipo === "faq" ? "on" : ""} onClick={() => setTipo("faq")}>Pregunta frecuente</button>
          </div>

          {tipo === "noticia" ? (
            <React.Fragment>
              <div className="field"><label>Desarrollo</label><select><option>Pilará Forest</option><option>Distrito Quúntar</option><option>Casa Liminal</option></select></div>
              <div className="field"><label>Título <span style={{ color: "var(--pend)" }}>·obligatorio</span></label><input placeholder="Bajada de hormigón · nivel 4" /></div>
              <div className="field"><label>Descripción <span style={{ color: "var(--pend)" }}>·obligatorio</span></label><textarea rows="4" placeholder="Contá el avance con tono cercano…" style={{ resize: "none", lineHeight: 1.5 }} /></div>
              <div className="field">
                <label>Foto de portada <span style={{ color: "var(--pend)" }}>·obligatorio</span></label>
                <div className="upload">{I.image(22)}<div><b style={{ fontWeight: 500 }}>Arrastrá la portada acá</b> o hacé clic para subir</div><div style={{ fontSize: 11 }}>JPG o PNG · hasta 10 MB</div></div>
              </div>
              <div className="field">
                <label>Más fotos y videos <span style={{ color: "var(--muted-2)" }}>·opcional</span></label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                  <Ph label="foto" height={68} style={{ borderRadius: 4 }} />
                  <Ph label="foto" height={68} style={{ borderRadius: 4 }} />
                  <div className="upload" style={{ padding: 10, minHeight: 68 }}>{I.plus(16)}</div>
                  <div className="upload" style={{ padding: 10, minHeight: 68 }}>{I.play(18)}</div>
                </div>
                <span className="helper">Las fotos y videos extra aparecen dentro de la noticia en la app.</span>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="field"><label>Desarrollo</label><select><option>Todos los desarrollos</option><option>Pilará Forest</option><option>Distrito Quúntar</option></select></div>
              <div className="field"><label>Pregunta</label><input placeholder="¿Cómo se calcula la proyección de mis metros?" /></div>
              <div className="field"><label>Respuesta</label><textarea rows="5" placeholder="Escribí la respuesta con tono claro y cercano…" style={{ resize: "none", lineHeight: 1.5 }} /></div>
            </React.Fragment>
          )}
        </div>
        <div className="modal-f">
          <button className="btn btn--text" onClick={onClose}>Cancelar</button>
          {tipo === "noticia" && <button className="btn btn--ghost">Guardar borrador</button>}
          <button className="btn btn--primary">Publicar</button>
        </div>
      </div>
    </div>
  );
}

function BOContenido({ onNav, adding = false }) {
  const [tab, setTab] = React.useState("noticias");
  const [dev, setDev] = React.useState("");
  const [modal, setModal] = React.useState(adding ? "noticia" : null);
  const news = NEWS.filter((n) => !dev || n.dev === dev);
  return (
    <BOShell active="contenido" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head">
          <div>
            <div className="bo-crumb"><span className="here">Contenido</span></div>
            <h1 className="bo-title">Contenido</h1>
            <div className="bo-sub">Lo que el inversor ve en la app. Se publica al instante.</div>
          </div>
          <button className="btn btn--primary btn--lg" onClick={() => setModal("noticia")}>{I.plus(14)} Agregar contenido</button>
        </div>

        <div className="filterbar">
          <DevFilter value={dev} onChange={setDev} />
          <Chips value={tab} onChange={setTab} options={[["noticias", "Noticias", news.length], ["faq", "FAQ", FAQ.length]]} />
        </div>

        {tab === "noticias" && (
          <div className="tbl">
            <div className="tr tr--head" style={{ gridTemplateColumns: "2.4fr 1.3fr 1fr 1fr 0.8fr" }}><span>Noticia</span><span>Desarrollo</span><span>Adjuntos</span><span>Estado</span><span style={{ textAlign: "right" }}>Acciones</span></div>
            {news.map((n, i) => (
              <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "2.4fr 1.3fr 1fr 1fr 0.8fr" }}>
                <div className="nmcell">
                  <div style={{ width: 46, height: 46, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}><Ph label="" height={46} style={{ borderRadius: 4 }} /></div>
                  <div><div className="nm" style={{ fontSize: 13.5 }}>{n.title}</div><div className="sub">{n.tag} · {n.date}</div></div>
                </div>
                <div style={{ color: "var(--ink-2)", fontSize: 12.5 }}>{n.dev}</div>
                <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--muted)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{I.image(13)} {n.photos}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{I.play(13)} {n.videos}</span>
                </div>
                <div><Pill kind="ok" dot={false}>Publicada</Pill></div>
                <div className="row-actions">
                  <button className="icon-btn" title="Editar">{I.edit(14)}</button>
                  <button className="icon-btn" title="Eliminar">{I.trash(14)}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "faq" && (
          <div className="tbl">
            <div className="tr tr--head" style={{ gridTemplateColumns: "3fr 1fr 0.8fr" }}><span>Pregunta</span><span>Alcance</span><span style={{ textAlign: "right" }}>Acciones</span></div>
            {FAQ.map(([q, a], i) => (
              <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "3fr 1fr 0.8fr", alignItems: "start" }}>
                <div><div className="nm" style={{ fontSize: 13.5, marginBottom: 4 }}>{q}</div><div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{a}</div></div>
                <div style={{ color: "var(--muted)", fontSize: 12.5 }}>Todos</div>
                <div className="row-actions"><button className="icon-btn" title="Editar">{I.edit(14)}</button><button className="icon-btn" title="Eliminar">{I.trash(14)}</button></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && <ContenidoModal tipo={modal} onClose={() => setModal(null)} />}
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Pagos — marcar como pagada + filtro por desarrollo
// ──────────────────────────────────────────────────────────
function BOPagos({ onNav }) {
  const [dev, setDev] = React.useState("");
  const [data, setData] = React.useState(PAGOS_SEED.map((p) => ({ ...p, cuotas: [...p.cuotas] })));
  const rows = data.filter((p) => !dev || p.dev === dev);
  const setCell = (nm, j) => setData((d) => d.map((p) => p.nm === nm ? { ...p, cuotas: p.cuotas.map((c, k) => k === j ? "ok" : c) } : p));
  const avisos = data.reduce((a, p) => a + p.cuotas.filter((c) => c === "aviso").length, 0);

  return (
    <BOShell active="pagos" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head">
          <div>
            <div className="bo-crumb"><span className="here">Pagos</span></div>
            <h1 className="bo-title">Pagos</h1>
            <div className="bo-sub">Marcá cada cuota como pagada. El cambio impacta directo en la app del inversor.</div>
          </div>
        </div>

        <div className="filterbar">
          <DevFilter value={dev} onChange={setDev} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Pill kind="ok">Pagada</Pill>
            <Pill kind="pend" dot={false}>Pendiente</Pill>
            <span className="pay-cell pay-cell--aviso" style={{ cursor: "default" }}><span className="dot" />Avisó que pagó</span>
          </div>
        </div>

        {avisos > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "var(--pend-bg)", borderRadius: 4, marginBottom: 16, fontSize: 13, color: "var(--pend)" }}>
            {I.bell(15)} <b style={{ fontWeight: 600 }}>{avisos} inversores</b> avisaron que pagaron y esperan tu confirmación.
          </div>
        )}

        <div className="tbl" style={{ overflowX: "auto" }}>
          <div className="tr tr--head" style={{ gridTemplateColumns: `1.8fr repeat(${PLAN.length}, 1fr)` }}>
            <span>Inversor</span>{PLAN.map((n) => <span key={n} style={{ textAlign: "center" }}>Cuota {n}</span>)}
          </div>
          {rows.map((p, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: `1.8fr repeat(${PLAN.length}, 1fr)` }}>
              <div className="nmcell"><Avatar initials={initials(p.nm)} size={30} bg="var(--green-10)" color="var(--green)" /><div><div className="nm" style={{ fontSize: 13 }}>{p.nm}</div><div className="sub">{p.dev}</div></div></div>
              {p.cuotas.map((c, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "center" }}>
                  {c === "ok"
                    ? <span className="pay-cell pay-cell--ok"><span className="dot" />Pagada</span>
                    : c === "aviso"
                      ? <button className="pay-cell pay-cell--aviso" onClick={() => setCell(p.nm, j)} title="Confirmar pago">{I.check(13)} Confirmar</button>
                      : <button className="pay-cell pay-cell--pend" onClick={() => setCell(p.nm, j)} title="Marcar como pagada">{I.check(13)} Marcar</button>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14 }}>Tono de acompañamiento: el inversor ve sus cuotas como seguimiento, nunca como reclamo.</p>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Avisos
// ──────────────────────────────────────────────────────────
function BOAvisos({ onNav }) {
  return (
    <BOShell active="avisos" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head"><div><div className="bo-crumb"><span className="here">Avisos</span></div><h1 className="bo-title">Enviar un aviso</h1><div className="bo-sub">Comunicá novedades o recordá una cuota. Siempre desde el acompañamiento.</div></div></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: 28, maxWidth: 980 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="field"><label>Desarrollo</label><select><option>Pilará Forest</option><option>Distrito Quúntar</option><option>Casa Liminal</option></select></div>
              <div className="field"><label>Destinatarios</label><select><option>Todos los inversores</option><option>Con cuota próxima a vencer</option><option>Un inversor puntual</option></select></div>
            </div>
            <div className="field">
              <label>Tipo de aviso</label>
              <div style={{ display: "flex", gap: 10 }}>
                <label className="radio-card radio-card--on" style={{ flex: 1 }}><span className="rb" />Novedad de obra</label>
                <label className="radio-card" style={{ flex: 1 }}><span className="rb" />Recordatorio de cuota</label>
              </div>
            </div>
            <div className="field"><label>Asunto</label><input defaultValue="Avanza la obra de Pilará Forest" /></div>
            <div className="field"><label>Cuerpo</label><textarea rows="6" defaultValue="Hola, te queremos contar que esta semana completamos la estructura del nivel 4. Gracias por ser parte de este camino." style={{ resize: "none", lineHeight: 1.5 }} /></div>
            <div style={{ display: "flex", gap: 10 }}><button className="btn btn--ghost">Vista previa</button><button className="btn btn--primary">{I.mail(16)} Enviar aviso</button></div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Vista previa · mail</div>
            <div style={{ border: "1px solid var(--hairline-2)", borderRadius: 6, overflow: "hidden", background: "var(--paper)" }}>
              <div style={{ background: "var(--green)", padding: "18px 20px" }}><UmbralLogo height={22} variant="mark" /></div>
              <div style={{ padding: "20px 22px" }}>
                <h3 className="serif" style={{ fontSize: 22, margin: "0 0 12px", lineHeight: 1.15 }}>Avanza la obra de Pilará Forest</h3>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>Hola, te queremos contar que esta semana completamos la estructura del nivel 4. Gracias por ser parte de este camino.</p>
                <Ph label="foto de obra" note="nivel 4 ✓" height={140} style={{ borderRadius: 4, margin: "16px 0" }} />
                <button className="btn btn--primary" style={{ width: "100%" }}>Ver en la app</button>
                <p className="serif" style={{ fontStyle: "italic", fontSize: 15, color: "var(--muted)", textAlign: "center", marginTop: 14 }}>Cada umbral marca un antes y un después</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Preguntas — llegan las consultas, se responde por mail
// ──────────────────────────────────────────────────────────
function BOPreguntas({ onNav }) {
  const [sel, setSel] = React.useState(0);
  const q = PREGUNTAS[sel];
  return (
    <BOShell active="preguntas" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head"><div><div className="bo-crumb"><span className="here">Preguntas</span></div><h1 className="bo-title">Preguntas de inversores</h1><div className="bo-sub">Respondé las consultas que llegan desde la app. La respuesta se envía por mail.</div></div></div>

        <div className="qa">
          <div className="qa-list">
            {PREGUNTAS.map((p, i) => (
              <div key={i} className={`qa-item ${i === sel ? "qa-item--on" : ""} ${p.unread ? "qa-item--unread" : ""}`} onClick={() => setSel(i)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <Avatar initials={initials(p.nm)} size={28} bg="var(--green-10)" color="var(--green)" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="qa-item-name" style={{ fontSize: 13, fontWeight: 500 }}>{p.nm}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.dev}</div>
                  </div>
                  <span style={{ fontSize: 10.5, color: "var(--muted-2)" }}>{p.date}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-2)" }}>{p.asunto}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.msgs[0].t}</div>
                <div style={{ marginTop: 7 }}>{p.estado === "Respondida" ? <Pill kind="ok" dot={false}>Respondida</Pill> : <Pill kind="pend" dot={false}>Sin responder</Pill>}</div>
              </div>
            ))}
          </div>

          <div className="qa-pane">
            <div className="qa-pane-head">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={initials(q.nm)} size={38} bg="var(--green-10)" color="var(--green)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{q.nm}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{q.em} · {q.dev}</div>
                </div>
                <div className="eyebrow">{q.asunto}</div>
              </div>
            </div>
            <div className="qa-thread">
              {q.msgs.map((m, i) => (
                <div key={i} className={`qa-bubble ${m.from === "inv" ? "qa-bubble--in" : "qa-bubble--out"}`}>
                  {m.t}
                  <div style={{ fontSize: 10.5, opacity: 0.6, marginTop: 6 }}>{m.when}</div>
                </div>
              ))}
            </div>
            <div className="qa-reply">
              <textarea rows="3" placeholder={`Escribí tu respuesta para ${q.nm.split(" ")[0]}…`} style={{ width: "100%", border: "1px solid var(--hairline)", borderRadius: 4, padding: "10px 12px", fontSize: 13.5, fontFamily: "var(--sans)", resize: "none", lineHeight: 1.5, outline: "none" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <span style={{ fontSize: 11.5, color: "var(--muted)" }}>Se envía a {q.em}</span>
                <button className="btn btn--primary">{I.send(15)} Enviar respuesta por mail</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Solicitudes de venta
// ──────────────────────────────────────────────────────────
function BOSolicitudes({ onNav }) {
  const [dev, setDev] = React.useState("");
  const rows = VENTAS.filter((v) => !dev || v.dev === dev);
  return (
    <BOShell active="solicitudes" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head"><div><div className="bo-crumb"><span className="here">Solicitudes</span></div><h1 className="bo-title">Solicitudes de venta</h1><div className="bo-sub">Cuando un inversor pide salir, lo acompañamos desde acá.</div></div></div>

        <div className="bo-stats" style={{ gridTemplateColumns: "repeat(3,1fr)", maxWidth: 560 }}>
          <div className="bo-stat"><div className="s">Pendientes</div><div className="v" style={{ color: "var(--pend)" }}>1</div></div>
          <div className="bo-stat"><div className="s">En gestión</div><div className="v">2</div></div>
          <div className="bo-stat"><div className="s">Resueltas (mes)</div><div className="v">4</div></div>
        </div>

        <div className="filterbar" style={{ marginTop: 20 }}><DevFilter value={dev} onChange={setDev} /></div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "1.6fr 1.4fr 1.6fr 1fr 1fr" }}><span>Inversor</span><span>Desarrollo</span><span>Motivo</span><span>Fecha</span><span>Estado</span></div>
          {rows.map((v, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "1.6fr 1.4fr 1.6fr 1fr 1fr", cursor: "pointer" }}>
              <div className="nmcell"><Avatar initials={initials(v.nm)} size={32} bg="var(--green-10)" color="var(--green)" /><div className="nm" style={{ fontSize: 13 }}>{v.nm}</div></div>
              <div style={{ color: "var(--ink-2)" }}>{v.dev}</div>
              <div style={{ color: "var(--ink-2)" }}>{v.motivo}</div>
              <div style={{ color: "var(--muted)", fontSize: 12.5 }}>{v.date}</div>
              <div>{v.estado === "Pendiente" ? <Pill kind="pend">Pendiente</Pill> : <Pill kind="obra">En gestión</Pill>}</div>
            </div>
          ))}
        </div>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// Métricas por inversor
// ──────────────────────────────────────────────────────────
function BOMetricas({ onNav }) {
  const [dev, setDev] = React.useState("");
  const rows = INVERSORES.filter((v) => !dev || v.dev === dev);
  return (
    <BOShell active="metricas" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head"><div><div className="bo-crumb"><span className="here">Métricas</span></div><h1 className="bo-title">Métricas por inversor</h1><div className="bo-sub">Trazabilidad simple: ingresos, último acceso, fecha de alta. Solo lectura.</div></div></div>

        <div className="filterbar"><DevFilter value={dev} onChange={setDev} /></div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "1.9fr 1.2fr 0.8fr 1.1fr 1fr 1fr" }}><span>Inversor</span><span>Desarrollo</span><span>Ingresos</span><span>Último acceso</span><span>Alta</span><span>Actividad</span></div>
          {rows.map((v, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "1.9fr 1.2fr 0.8fr 1.1fr 1fr 1fr" }}>
              <div className="nmcell"><Avatar initials={initials(v.nm)} size={32} bg="var(--green-10)" color="var(--green)" /><div><div className="nm" style={{ fontSize: 13 }}>{v.nm}</div><div className="sub">{v.em}</div></div></div>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{v.dev}</div>
              <div className="mono" style={{ fontSize: 14 }}>{v.logins}</div>
              <div style={{ fontSize: 12.5, color: v.logins === 0 ? "var(--muted-2)" : "var(--ink-2)" }}>{v.last}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)" }}>Feb 2026</div>
              <div><div className="bar" style={{ width: 80 }}><i style={{ width: `${Math.min(100, v.logins * 2.6)}%` }} /></div></div>
            </div>
          ))}
        </div>
      </div>
    </BOShell>
  );
}

// Login del backoffice
function BOLogin() {
  return (
    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", background: "var(--off-white)" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px" }}>
        <UmbralLogo height={48} />
        <h1 className="serif" style={{ fontSize: 42, lineHeight: 1.05, margin: "32px 0 8px" }}>Backoffice UMBRAL</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 36px" }}>Acceso del equipo de operaciones.</p>
        <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="field"><label>Email</label><input defaultValue="operaciones@umbral.com" /></div>
          <div className="field"><label>Contraseña</label><input type="password" defaultValue="••••••••••" /></div>
          <button className="btn btn--primary btn--block btn--lg" style={{ marginTop: 6 }}>Entrar</button>
        </div>
      </div>
      <div style={{ background: "var(--green)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#fff", padding: 40 }}>
          <UmbralLogo height={64} variant="mark" />
          <p className="serif" style={{ fontSize: 26, lineHeight: 1.3, margin: "28px auto 0", maxWidth: 320, color: "rgba(255,255,255,0.92)" }}>Cada umbral marca un antes y un después.</p>
        </div>
      </div>
    </div>
  );
}

// Backoffice interactivo
function BOApp() {
  const [screen, setScreen] = React.useState("desarrollos");
  const map = {
    desarrollos: BODesarrollos, inversores: BOInversores, contenido: BOContenido,
    pagos: BOPagos, avisos: BOAvisos, preguntas: BOPreguntas, solicitudes: BOSolicitudes, metricas: BOMetricas,
  };
  const C = map[screen] || BODesarrollos;
  return <C onNav={setScreen} onNew={() => {}} onNewInv={() => {}} />;
}

Object.assign(window, {
  BODesarrollos, BONewDev, BOInversores, BONewInv, BOContenido, BOPagos,
  BOAvisos, BOPreguntas, BOSolicitudes, BOMetricas, BOLogin, BOApp,
});
