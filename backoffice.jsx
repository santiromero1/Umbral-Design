// ============================================================
// UMBRAL · Backoffice — Admin UMBRAL (desktop, 1280px)
// HP-08 Desarrollos+Alta · HP-09 Inversores+código
// HP-10 Contenido · HP-11 Pagos · HP-12 Avisos
// HP-13 Solicitudes de venta · HP-14 Métricas · Login
// Un solo rol: Admin UMBRAL (ve todo). Sin desarrolladora.
// ============================================================

const DEVS = [
  { id: 1, name: "Pilará Forest", dev: "Pilará S.A.", loc: "Pilar, BA", obra: 0.72, estado: "En obra", inv: 24, rango: "2.900–3.400" },
  { id: 2, name: "Distrito Quúntar", dev: "Quúntar Group", loc: "Nordelta, BA", obra: 0.34, estado: "En obra", inv: 11, rango: "3.100–3.700" },
  { id: 3, name: "Casa Liminal", dev: "UMBRAL Estudio", loc: "Palermo, CABA", obra: 1.0, estado: "Entregado", inv: 8, rango: "4.200–4.800" },
  { id: 4, name: "Reserva del Este", dev: "Pilará S.A.", loc: "Pilar, BA", obra: 0.08, estado: "Preventa", inv: 3, rango: "2.700–3.100" },
];

const INVERSORES = [
  { nm: "Santiago Ramírez", em: "santiago.ramirez@mail.com", m2: 120, conf: true, code: "UMB-2026-7F3A", last: "Hoy, 09:12", logins: 38 },
  { nm: "María Belén Soto", em: "mb.soto@mail.com", m2: 85, conf: true, code: "UMB-2026-K29D", last: "Ayer, 21:40", logins: 22 },
  { nm: "Joaquín Vega", em: "joaquin.vega@mail.com", m2: 200, conf: false, code: "UMB-2026-X81B", last: "Hace 3 días", logins: 7 },
  { nm: "Lucía Fernández", em: "lucia.f@mail.com", m2: 60, conf: true, code: "UMB-2026-M44C", last: "Hace 6 días", logins: 15 },
  { nm: "Tomás Aguirre", em: "t.aguirre@mail.com", m2: 150, conf: false, code: "UMB-2026-P07E", last: "Nunca ingresó", logins: 0 },
];

const VENTAS = [
  { nm: "Joaquín Vega", dev: "Pilará Forest", motivo: "Necesito liquidez", date: "07 jun 2026", estado: "Pendiente" },
  { nm: "Lucía Fernández", dev: "Distrito Quúntar", motivo: "Encontré otra oportunidad", date: "05 jun 2026", estado: "En gestión" },
  { nm: "Pedro Ibáñez", dev: "Pilará Forest", motivo: "Cambió mi plan", date: "01 jun 2026", estado: "En gestión" },
];

const PLAN = [6, 7, 8, 9, 10, 11];
const PAGOS = INVERSORES.slice(0, 5).map((inv, r) => ({
  ...inv,
  cuotas: PLAN.map((n) => (n <= 8 ? true : n === 9 && r % 2 === 0 ? true : false)),
}));

// ──────────────────────────────────────────────────────────
// Shell
// ──────────────────────────────────────────────────────────
function BOShell({ active, children, onNav }) {
  const nav = [
    ["sec", "Operación"],
    ["desarrollos", "Desarrollos", I.building, DEVS.length],
    ["inversores", "Inversores", I.users, 46],
    ["contenido", "Contenido", I.image],
    ["pagos", "Pagos", I.coin],
    ["sec", "Comunicación"],
    ["avisos", "Avisos", I.bell],
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

function BOTop({ crumb }) {
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
// HP-08 · Desarrollos
// ──────────────────────────────────────────────────────────
function BODesarrollos({ onNav, onNew }) {
  return (
    <BOShell active="desarrollos" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head">
          <div>
            <div className="bo-crumb"><span className="here">Desarrollos</span></div>
            <h1 className="bo-title">Desarrollos</h1>
            <div className="bo-sub">Cada desarrollo que UMBRAL deja operativo para sus inversores.</div>
          </div>
          <button className="btn btn--primary btn--lg" onClick={onNew}>{I.plus(14)} Nuevo desarrollo</button>
        </div>

        <div className="bo-stats" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="bo-stat"><div className="s">Desarrollos activos</div><div className="v">3</div></div>
          <div className="bo-stat"><div className="s">Inversores totales</div><div className="v">46</div></div>
          <div className="bo-stat"><div className="s">m² bajo gestión</div><div className="v">8.420</div></div>
          <div className="bo-stat"><div className="s">Cuotas al día</div><div className="v">91%</div></div>
        </div>

        <div className="bo-toolbar">
          <div className="bo-search">{I.search(14)}<span>Buscar desarrollo…</span></div>
          <button className="btn btn--text" style={{ border: "1px solid var(--hairline)" }}>{I.sort(14)} Ordenar</button>
        </div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "2.2fr 1.4fr 1fr 1fr 0.5fr" }}>
            <span>Desarrollo</span><span>Desarrolladora</span><span>Estado de obra</span><span>Inversores</span><span></span>
          </div>
          {DEVS.map((d) => (
            <div className="tr tr--row" key={d.id} style={{ gridTemplateColumns: "2.2fr 1.4fr 1fr 1fr 0.5fr", cursor: "pointer" }} onClick={() => onNav?.("inversores")}>
              <div className="nmcell">
                <div style={{ width: 40, height: 40, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}><Ph label="" height={40} style={{ borderRadius: 4 }} /></div>
                <div><div className="nm">{d.name}</div><div className="sub">{d.loc} · USD {d.rango}/m²</div></div>
              </div>
              <div style={{ color: "var(--ink-2)" }}>{d.dev}</div>
              <div>
                {d.estado === "Entregado" ? <Pill kind="ok">Entregado</Pill>
                  : d.estado === "Preventa" ? <Pill kind="neutral">Preventa</Pill>
                  : <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="bar" style={{ width: 60 }}><i style={{ width: `${d.obra * 100}%` }} /></div>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>{Math.round(d.obra * 100)}%</span>
                    </div>}
              </div>
              <div style={{ fontVariantNumeric: "tabular-nums" }}>{d.inv}</div>
              <div style={{ textAlign: "right", color: "var(--muted)" }}>{I.chev(15)}</div>
            </div>
          ))}
        </div>
      </div>
    </BOShell>
  );
}

// HP-08b · Alta de desarrollo (modal con plan de cuotas)
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
              <div className="field"><label>Etiqueta de etapa</label><input placeholder="Etapa 3 de 5 · estructura" /></div>
              <div className="field"><label>% de avance</label><input placeholder="72" inputMode="numeric" /></div>
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
// HP-09 · Detalle desarrollo → Inversores
// ──────────────────────────────────────────────────────────
function BOInversores({ onNav, onNewInv }) {
  return (
    <BOShell active="inversores" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-crumb"><a onClick={() => onNav?.("desarrollos")} style={{ cursor: "pointer" }}>Desarrollos</a>{I.chev(12)}<span className="here">Pilará Forest</span></div>
        <div className="bo-head">
          <div>
            <h1 className="bo-title">Pilará Forest</h1>
            <div className="bo-sub">Pilará S.A. · Pilar, BA · En obra 72% · 24 inversores</div>
          </div>
          <button className="btn btn--primary btn--lg" onClick={onNewInv}>{I.plus(14)} Dar de alta inversor</button>
        </div>

        <div className="bo-toolbar">
          <div className="bo-search">{I.search(14)}<span>Buscar por nombre, email o código…</span></div>
          <button className="btn btn--text" style={{ border: "1px solid var(--hairline)" }}>{I.sort(14)} Ordenar</button>
        </div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "2fr 1fr 1.3fr 1.2fr 0.4fr" }}>
            <span>Inversor</span><span>Metros</span><span>Código</span><span>Último ingreso</span><span></span>
          </div>
          {INVERSORES.map((v, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "2fr 1fr 1.3fr 1.2fr 0.4fr" }}>
              <div className="nmcell"><Avatar initials={v.nm.split(" ").map((x) => x[0]).slice(0, 2).join("")} size={34} bg="var(--green-10)" color="var(--green)" /><div><div className="nm">{v.nm}</div><div className="sub">{v.em}</div></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="mono" style={{ fontSize: 13 }}>{v.m2} m²</span>
                {v.conf ? <Pill kind="ok" dot={false}>Confirmado</Pill> : <Pill kind="pend" dot={false}>No conf.</Pill>}
              </div>
              <div className="mono" style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{v.code}</div>
              <div style={{ color: v.logins === 0 ? "var(--muted-2)" : "var(--ink-2)", fontSize: 12.5 }}>{v.last}</div>
              <div style={{ textAlign: "right", color: "var(--muted)" }}>{I.chev(15)}</div>
            </div>
          ))}
        </div>
      </div>
    </BOShell>
  );
}

// HP-09b · Alta de inversor → código generado
function BONewInv({ onNav, generated = true }) {
  return (
    <BOShell active="inversores" onNav={onNav}>
      <BOTop />
      <div className="bo-content" style={{ filter: "blur(1.5px)", opacity: 0.55, pointerEvents: "none" }}>
        <div className="bo-head"><div><h1 className="bo-title">Pilará Forest</h1></div></div>
      </div>
      <div className="modal-bg" style={{ position: "absolute", inset: 0, top: 56, left: 232 }}>
        <div className="modal" style={{ width: 520 }}>
          <div className="modal-h">
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Alta de inversor · Pilará Forest</div><h3>{generated ? "Listo, generamos su código" : "Sumar un inversor"}</h3></div>
            <button className="x">{I.close(16)}</button>
          </div>
          <div className="modal-b">
            {!generated ? (
              <React.Fragment>
                <div className="field"><label>Nombre y apellido</label><input placeholder="Santiago Ramírez" /></div>
                <div className="field"><label>Email</label><input placeholder="tunombre@email.com" /></div>
                <div className="field"><label>Metros invertidos (m²)</label><input placeholder="120" inputMode="numeric" /><span className="helper">Queda como “No confirmado” hasta que lo valides.</span></div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "4px 0 6px" }}>
                  <Avatar initials="SR" size={40} bg="var(--green-10)" color="var(--green)" />
                  <div><div style={{ fontWeight: 500, fontSize: 15 }}>Santiago Ramírez</div><div style={{ fontSize: 12.5, color: "var(--muted)" }}>santiago.ramirez@mail.com · 120 m² <span style={{ color: "var(--pend)" }}>· No confirmado</span></div></div>
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
// HP-10 · Carga de contenido
// ──────────────────────────────────────────────────────────
function BOContenido({ onNav }) {
  const [tab, setTab] = React.useState("novedades");
  return (
    <BOShell active="contenido" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-crumb"><a style={{ cursor: "pointer" }} onClick={() => onNav?.("desarrollos")}>Desarrollos</a>{I.chev(12)}<span className="here">Pilará Forest · Contenido</span></div>
        <div className="bo-head"><div><h1 className="bo-title">Contenido</h1><div className="bo-sub">Lo que el inversor ve en la app. Se publica al instante.</div></div></div>

        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--hairline)", marginBottom: 22 }}>
          {[["imagenes", "Imágenes"], ["videos", "Videos"], ["novedades", "Novedades"], ["faq", "FAQ"], ["valor", "Valorización"]].map(([id, l]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              border: "none", background: "transparent", cursor: "pointer", padding: "10px 14px", fontSize: 13,
              fontWeight: tab === id ? 500 : 400, color: tab === id ? "var(--green)" : "var(--muted)",
              borderBottom: `2px solid ${tab === id ? "var(--green)" : "transparent"}`, marginBottom: -1,
            }}>{l}</button>
          ))}
        </div>

        {tab === "imagenes" && (
          <div>
            <div className="upload" style={{ marginBottom: 18 }}>{I.image(22)}<div><b style={{ fontWeight: 500 }}>Arrastrá imágenes acá</b> o hacé clic para subir</div><div style={{ fontSize: 11 }}>JPG o PNG · hasta 10 MB</div></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {PHOTOS.map((p, i) => <Ph key={i} label={p} height={110} style={{ borderRadius: 4 }} note={i === 0 ? "portada" : undefined} />)}
            </div>
          </div>
        )}

        {tab === "videos" && (
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              <input className="" placeholder="Pegá el link de YouTube…" style={{ flex: 1, border: "1px solid var(--hairline)", borderRadius: 2, padding: "10px 12px", fontSize: 13 }} />
              <button className="btn btn--primary">Agregar video</button>
            </div>
            {VIDEOS.map((v, i) => (
              <div key={i} className="tr tr--row" style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--hairline-2)", borderRadius: 4, marginBottom: 8, padding: 12 }}>
                <div style={{ width: 90, height: 52, borderRadius: 3, overflow: "hidden" }}><Ph label="" height={52} /></div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 500, fontSize: 13.5 }}>{v.title}</div><div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>youtube · {v.len}</div></div>
                <button className="btn btn--text" style={{ color: "var(--muted)" }}>{I.close(15)}</button>
              </div>
            ))}
          </div>
        )}

        {tab === "novedades" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Nueva novedad de obra</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="field"><label>Título</label><input placeholder="Bajada de hormigón · nivel 4" /></div>
                <div className="field"><label>Cuerpo</label><textarea rows="6" placeholder="Contá el avance con tono cercano…" style={{ resize: "none", lineHeight: 1.5 }} /></div>
                <div className="upload">{I.image(20)}<div>Imagen de portada</div></div>
                <div style={{ display: "flex", gap: 10 }}><button className="btn btn--ghost">Guardar borrador</button><button className="btn btn--primary">Publicar</button></div>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Publicadas</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {NEWS.map((n, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, border: "1px solid var(--hairline-2)", borderRadius: 4, padding: 10, background: "var(--paper)" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}><Ph label="" height={56} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 500, fontSize: 13, lineHeight: 1.3 }}>{n.title}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{n.date} · {n.tag}</div></div>
                    <Pill kind="ok" dot={false}>Publicada</Pill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "faq" && (
          <div style={{ maxWidth: 760 }}>
            <button className="btn btn--soft" style={{ marginBottom: 16 }}>{I.plus(13)} Agregar pregunta</button>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FAQ.map(([q, a], i) => (
                <div key={i} style={{ border: "1px solid var(--hairline-2)", borderRadius: 4, padding: "14px 16px", background: "var(--paper)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 500, fontSize: 13.5 }}>{q}</div>
                    <div style={{ display: "flex", gap: 8, color: "var(--muted)", flexShrink: 0 }}><span style={{ cursor: "pointer" }}>{I.doc(14)}</span><span style={{ cursor: "pointer" }}>{I.close(14)}</span></div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "valor" && (
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 24, maxWidth: 900 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Valor de referencia por m²</div>
              <div className="tbl">
                <div className="tr tr--head" style={{ gridTemplateColumns: "1.2fr 1fr", padding: "10px 14px" }}><span>Mes</span><span>USD / m²</span></div>
                {[["Ene 2026", "2.900"], ["Feb 2026", "2.940"], ["Mar 2026", "3.010"], ["Abr 2026", "3.120"], ["May 2026", "3.260"], ["Jun 2026", "3.400"]].map((r, i) => (
                  <div className="tr" key={i} style={{ gridTemplateColumns: "1.2fr 1fr", padding: "8px 14px" }}>
                    <span style={{ fontSize: 13 }}>{r[0]}</span>
                    <input defaultValue={r[1]} style={{ border: "1px solid var(--hairline)", borderRadius: 2, padding: "6px 9px", fontSize: 13, fontFamily: "var(--mono)" }} />
                  </div>
                ))}
              </div>
              <button className="btn btn--soft" style={{ marginTop: 12 }}>{I.plus(13)} Agregar punto</button>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Vista previa de la curva (app)</div>
              <div className="valor"><div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Tu valor</div><div className="big serif" style={{ fontSize: 38, color: "#fff", marginTop: 4 }}>USD 312.000</div><div style={{ marginTop: 12 }}><ValorCurve width={360} height={120} /></div></div>
              <p className="note" style={{ fontSize: 16, color: "var(--muted)", textAlign: "center", marginTop: 12 }}>así lo ve el inversor</p>
            </div>
          </div>
        )}
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// HP-11 · Panel de pagos
// ──────────────────────────────────────────────────────────
function BOPagos({ onNav }) {
  return (
    <BOShell active="pagos" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-crumb"><a style={{ cursor: "pointer" }} onClick={() => onNav?.("desarrollos")}>Desarrollos</a>{I.chev(12)}<span className="here">Pilará Forest · Pagos</span></div>
        <div className="bo-head"><div><h1 className="bo-title">Pagos</h1><div className="bo-sub">Marcá cada cuota como pagada o pendiente. El cambio impacta directo en la app.</div></div></div>

        <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center" }}>
          <Pill kind="ok">Pagada</Pill><Pill kind="pend">Pendiente</Pill>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>· hacé clic en cualquier celda para cambiar el estado</span>
        </div>

        <div className="tbl" style={{ overflowX: "auto" }}>
          <div className="tr tr--head" style={{ gridTemplateColumns: `2fr repeat(${PLAN.length}, 1fr)` }}>
            <span>Inversor</span>{PLAN.map((n) => <span key={n} style={{ textAlign: "center" }}>Cuota {n}</span>)}
          </div>
          {PAGOS.map((p, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: `2fr repeat(${PLAN.length}, 1fr)` }}>
              <div className="nmcell"><Avatar initials={p.nm.split(" ").map((x) => x[0]).slice(0, 2).join("")} size={30} bg="var(--green-10)" color="var(--green)" /><div><div className="nm" style={{ fontSize: 13 }}>{p.nm}</div><div className="sub">{p.m2} m²</div></div></div>
              {p.cuotas.map((ok, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "center" }}>
                  <span className={`pay-cell ${ok ? "pay-cell--ok" : "pay-cell--pend"}`}><span className="dot" />{ok ? "Pagada" : "Pend."}</span>
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
// HP-12 · Avisos
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
                <p className="note" style={{ fontSize: 15, color: "var(--muted)", textAlign: "center", marginTop: 14 }}>Cada umbral marca un antes y un después</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BOShell>
  );
}

// ──────────────────────────────────────────────────────────
// HP-13 · Solicitudes de venta
// ──────────────────────────────────────────────────────────
function BOSolicitudes({ onNav }) {
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

        <div className="tbl" style={{ marginTop: 20 }}>
          <div className="tr tr--head" style={{ gridTemplateColumns: "1.6fr 1.4fr 1.6fr 1fr 1fr" }}><span>Inversor</span><span>Desarrollo</span><span>Motivo</span><span>Fecha</span><span>Estado</span></div>
          {VENTAS.map((v, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "1.6fr 1.4fr 1.6fr 1fr 1fr", cursor: "pointer" }}>
              <div className="nmcell"><Avatar initials={v.nm.split(" ").map((x) => x[0]).slice(0, 2).join("")} size={32} bg="var(--green-10)" color="var(--green)" /><div className="nm" style={{ fontSize: 13 }}>{v.nm}</div></div>
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
// HP-14 · Métricas por inversor
// ──────────────────────────────────────────────────────────
function BOMetricas({ onNav }) {
  return (
    <BOShell active="metricas" onNav={onNav}>
      <BOTop />
      <div className="bo-content">
        <div className="bo-head"><div><div className="bo-crumb"><span className="here">Métricas</span></div><h1 className="bo-title">Métricas por inversor</h1><div className="bo-sub">Trazabilidad simple: ingresos, último acceso, fecha de alta. Solo lectura.</div></div></div>

        <div className="tbl">
          <div className="tr tr--head" style={{ gridTemplateColumns: "2fr 1fr 1.2fr 1.2fr 1fr" }}><span>Inversor</span><span>Ingresos</span><span>Último acceso</span><span>Alta</span><span>Actividad</span></div>
          {INVERSORES.map((v, i) => (
            <div className="tr tr--row" key={i} style={{ gridTemplateColumns: "2fr 1fr 1.2fr 1.2fr 1fr" }}>
              <div className="nmcell"><Avatar initials={v.nm.split(" ").map((x) => x[0]).slice(0, 2).join("")} size={32} bg="var(--green-10)" color="var(--green)" /><div><div className="nm" style={{ fontSize: 13 }}>{v.nm}</div><div className="sub">{v.em}</div></div></div>
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
    pagos: BOPagos, avisos: BOAvisos, solicitudes: BOSolicitudes, metricas: BOMetricas,
  };
  const C = map[screen] || BODesarrollos;
  return <C onNav={setScreen} onNew={() => {}} onNewInv={() => {}} />;
}

Object.assign(window, {
  BODesarrollos, BONewDev, BOInversores, BONewInv, BOContenido, BOPagos,
  BOAvisos, BOSolicitudes, BOMetricas, BOLogin, BOApp,
});
