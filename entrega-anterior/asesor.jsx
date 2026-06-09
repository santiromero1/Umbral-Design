// ============================================================
// UMBRAL · Back-office Asesor / Desarrolladora (Desktop CRM)
// ============================================================

const DEV_USER = { name: "Pilará S.A.", initials: "PS", role: "Desarrolladora", contact: "lucia.acuña@pilara.com.ar" };

const DEV_CLIENTS = [
  { id: 1, initials: "SR", name: "Santiago Ramírez",  email: "santiago.ramirez@mail.com",  dni: "29.114.802", project: "Pilará Forest · Lote 14",     invested: 120000, joined: "03/2025", status: "Activo",   contact: "+54 9 11 5532 8814" },
  { id: 2, initials: "MF", name: "María Fernández",    email: "mfernandez@estudiomya.com", dni: "27.882.901", project: "Pilará Forest · Lote 22",     invested: 95000,  joined: "07/2025", status: "Activo" },
  { id: 3, initials: "AC", name: "Andrés Capurro",     email: "acapurro@gmail.com",         dni: "32.408.117", project: "Pilará Forest · Lote 06",     invested: 180000, joined: "11/2024", status: "Activo" },
  { id: 4, initials: "LS", name: "Lucía Sandoval",     email: "lsandoval@nube.com.ar",      dni: "33.991.220", project: "Quartier Pilar · Unidad 8B",  invested: 85000,  joined: "02/2026", status: "Activo" },
  { id: 5, initials: "JG", name: "Joaquín García Lema", email: "jgarcialema@outlook.com",   dni: "28.701.554", project: "Pilará Forest · Lote 18",     invested: 145000, joined: "09/2025", status: "Activo" },
  { id: 6, initials: "VB", name: "Valentina Bianchi",  email: "v.bianchi@bma.com.ar",       dni: "34.502.881", project: "Pilará Forest · Lote 11",     invested: 60000,  joined: "01/2026", status: "Pendiente alta" },
  { id: 7, initials: "RM", name: "Ramiro Mendoza",     email: "rmendoza@fdo.legal",         dni: "26.118.700", project: "Quartier Pilar · Unidad 12A", invested: 72000,  joined: "12/2025", status: "Activo" },
  { id: 8, initials: "CP", name: "Camila Páez",         email: "camila.paez@correo.com",     dni: "35.114.220", project: "Pilará Forest · Lote 09",     invested: 50000,  joined: "04/2026", status: "Activo" },
];

const DEV_PROJECTS = [
  { id: 1, name: "Pilará Forest",       location: "Pilar, Buenos Aires",    units: 24, sold: 18, stage: "En obra · etapa 3 de 5",  state: "actualizado",          lastUpdate: "12/05/2026", request: null },
  { id: 2, name: "Quartier Pilar",      location: "Pilar, Buenos Aires",    units: 36, sold: 36, stage: "Entregado · renta",       state: "actualizado",          lastUpdate: "08/05/2026", request: null },
  { id: 3, name: "Las Lomas 220",       location: "Lomas de San Isidro",    units: 12, sold: 5,  stage: "En pozo · etapa 1 de 5",  state: "pending",              lastUpdate: "06/05/2026", request: "Solicitud de actualización pendiente" },
  { id: 4, name: "Costanera 8",         location: "Vicente López, BA",      units: 48, sold: 12, stage: "En pozo · etapa 1 de 5",  state: "pending",              lastUpdate: "02/05/2026", request: "Solicitud de actualización pendiente" },
  { id: 5, name: "Pilará Reserva III",  location: "Pilar, Buenos Aires",    units: 8,  sold: 8,  stage: "Entregado",               state: "rejected",             lastUpdate: "28/04/2026", request: "Solicitud de actualización rechazada" },
  { id: 6, name: "Tigre Norte",         location: "Tigre, Buenos Aires",    units: 18, sold: 4,  stage: "En obra · etapa 2 de 5",  state: "actualizado",          lastUpdate: "20/04/2026", request: null },
  { id: 7, name: "Distrito Quartier",   location: "Puerto Madero, CABA",    units: 56, sold: 56, stage: "Entregado · renta",       state: "pending",              lastUpdate: "15/04/2026", request: "Solicitud de actualización pendiente" },
];

// ============================================================
// Layout helpers
// ============================================================
function CrmShell({ side, topbar, children, modal }) {
  return (
    <div className="crm" style={{ position: "relative" }}>
      <aside className="crm-side">{side}</aside>
      <div className="crm-main">
        <header className="crm-topbar">{topbar}</header>
        <div className="crm-content">{children}</div>
      </div>
      {modal}
    </div>
  );
}

function DevSide({ active = "clientes" }) {
  return (
    <React.Fragment>
      <div className="crm-side-brand">
        <UmbralMark size={28} rounded={3} />
        <div className="word">UMBRAL<small>BACK OFFICE</small></div>
      </div>
      <div className="crm-nav-section">Mi desarrolladora</div>
      <div className={`crm-nav-item ${active === "clientes" ? "crm-nav-item--active" : ""}`}>
        <span>Clientes</span><span className="count">{DEV_CLIENTS.length}</span>
      </div>
      <div className={`crm-nav-item ${active === "proyectos" ? "crm-nav-item--active" : ""}`}>
        <span>Proyectos</span><span className="count">{DEV_PROJECTS.length}</span>
      </div>
      <div className={`crm-nav-item ${active === "solicitudes" ? "crm-nav-item--active" : ""}`}>
        <span>Solicitudes</span>
        <span className="count" style={{ color: "var(--status-pending)" }}>3 pend.</span>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: "12px 12px 0", fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
        Cargas y actualizaciones quedan pendientes hasta la aprobación de UMBRAL.
      </div>
    </React.Fragment>
  );
}

function DevTopbar() {
  return (
    <React.Fragment>
      <Avatar initials={DEV_USER.initials} size={32} />
      <div className="who">
        <div>
          <div>{DEV_USER.name}</div>
          <small>Desarrolladora · {DEV_USER.contact}</small>
        </div>
      </div>
      <div className="spacer"/>
      <div className="right">
        <span>Jueves 20 · Mayo 2026</span>
        <span style={{ width: 1, alignSelf: "stretch", background: "var(--hairline-2)" }}/>
        <UmbralWordmark small/>
      </div>
    </React.Fragment>
  );
}

// ============================================================
// LOGIN (Desktop)
// ============================================================
function DevLogin() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", height: "100%", background: "var(--paper)" }}>
      {/* left brand panel */}
      <div style={{
        background: "var(--umbral-green)", color: "#fff",
        padding: "48px 56px", display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <UmbralMark size={36} rounded={4} bg="#fff" color="var(--umbral-green)"/>
          <div style={{ lineHeight: 1 }}>
            <div className="serif" style={{ fontSize: 22, letterSpacing: "0.02em" }}>UMBRAL</div>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>COLLECTION</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 460 }}>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.65)" }}>Back office</div>
          <h1 className="serif" style={{ fontSize: 60, lineHeight: 0.95, margin: "12px 0 18px", textWrap: "balance" }}>
            La obra<br/>institucionalizada.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", maxWidth: 420 }}>
            El espacio donde cada desarrolladora carga la información de sus proyectos
            y mantiene informados a sus inversores con la formalidad del proceso UMBRAL.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <span>v. MVP 0.1</span><span>·</span><span>Argentina</span><span>·</span><span>Mayo 2026</span>
        </div>

        <div style={{ position: "absolute", right: -80, bottom: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}/>
        <div style={{ position: "absolute", right: 40, top: 60, fontSize: 240, fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>U</div>
      </div>

      {/* right form */}
      <div style={{ padding: "56px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="eyebrow">Acceso desarrolladora</div>
        <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 28px", lineHeight: 1.05 }}>Ingresar al panel</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 380 }}>
          <div className="field">
            <label>Correo corporativo</label>
            <input type="email" defaultValue="lucia.acuña@pilara.com.ar"/>
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" defaultValue="••••••••••••"/>
          </div>
          <button className="umb-btn umb-btn--primary umb-btn--block" style={{ marginTop: 6 }}>
            Ingresar al back office
          </button>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 12 }}>
            <a href="#" style={{ color: "var(--umbral-green)", textDecoration: "none" }}>Olvidé mi contraseña</a>
            <span style={{ color: "var(--muted)" }}>¿Sos inversor? Acceso mobile →</span>
          </div>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 60, fontSize: 11, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
          <span>UMBRAL Collection © 2026</span>
          <span>Soporte · soporte@umbralcollection.com</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CLIENTES — list
// ============================================================
function DevClients({ onNewClient, onOpenClient }) {
  return (
    <CrmShell side={<DevSide active="clientes"/>} topbar={<DevTopbar/>}>
      <div className="crm-page-head">
        <div>
          <h1 className="crm-page-title">Clientes</h1>
          <div className="crm-page-sub">8 inversores activos · 1 pendiente de envío de credenciales</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="umb-btn umb-btn--text">Exportar lista</button>
          <button className="umb-btn umb-btn--primary" onClick={onNewClient}>{Icon.plus()} Nuevo cliente</button>
        </div>
      </div>

      {/* summary tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
        {[
          ["Inversores activos","8","+2 este mes"],
          ["Total invertido","USD 807.000","via Pilará"],
          ["Renta mensual","USD 3.140","septiembre 2026"],
          ["Pendientes UMBRAL","1","alta de inversor"],
        ].map(([l,v,s],i)=>(
          <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--hairline-2)", borderRadius: 3, padding: "16px 18px" }}>
            <div className="eyebrow">{l}</div>
            <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, margin: "6px 0 2px" }}>{v}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{s}</div>
          </div>
        ))}
      </div>

      <div className="crm-toolbar">
        <div className="search">{Icon.search(14)} Buscar cliente, mail o DNI…</div>
        <button className="umb-btn umb-btn--text">{Icon.sort(14)} Ordenar · Última actividad</button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <Pill kind="approved">Activos · 7</Pill>
          <Pill kind="pending">Pendientes · 1</Pill>
        </div>
      </div>

      <div className="crm-table">
        <div className="crm-tr crm-tr--head" style={{ gridTemplateColumns: "2fr 1.6fr 1.4fr 1.2fr 1fr 80px" }}>
          <span>Inversor</span><span>Proyecto · unidad</span><span>Invertido</span><span>Alta</span><span>Estado</span><span></span>
        </div>
        {DEV_CLIENTS.map(c => (
          <div key={c.id} className="crm-tr crm-tr--row" style={{ gridTemplateColumns: "2fr 1.6fr 1.4fr 1.2fr 1fr 80px", cursor: "pointer" }}
               onClick={() => onOpenClient?.(c)}>
            <div className="cell-name">
              <Avatar initials={c.initials} size={32}/>
              <div style={{ minWidth: 0 }}>
                <div className="nm">{c.name}</div>
                <div className="sub" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.email}</div>
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div>{c.project.split(" · ")[0]}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.project.split(" · ")[1]}</div>
            </div>
            <div className="serif" style={{ fontSize: 17 }}>USD {c.invested.toLocaleString("es-AR")}</div>
            <div style={{ color: "var(--muted)" }}>{c.joined}</div>
            <div>{c.status === "Activo" ? <Pill kind="approved">Activo</Pill> : <Pill kind="pending">Pend. alta</Pill>}</div>
            <div style={{ textAlign: "right", color: "var(--muted)" }}>{Icon.chevron(14)}</div>
          </div>
        ))}
      </div>
    </CrmShell>
  );
}

// ============================================================
// NUEVO CLIENTE modal
// ============================================================
function NewClientModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 540 }}>
        <div className="modal-head">
          <div>
            <div className="eyebrow">Alta de inversor</div>
            <h3>Nuevo cliente</h3>
          </div>
          <button className="x" onClick={onClose}>{Icon.close(16)}</button>
        </div>
        <div className="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Nombre</label><input defaultValue="Tomás"/></div>
            <div className="field"><label>Apellido</label><input defaultValue="Ledesma"/></div>
            <div className="field"><label>DNI / CUIT</label><input placeholder="00.000.000"/></div>
            <div className="field"><label>Teléfono</label><input placeholder="+54 9 11 ..."/></div>
          </div>
          <div className="field"><label>Email</label><input type="email" placeholder="tomas@correo.com"/></div>

          <hr className="hairline" style={{ margin: "4px 0" }}/>
          <div className="eyebrow">Asignar inversión</div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
            <div className="field"><label>Proyecto</label><select defaultValue="Pilará Forest">
              <option>Pilará Forest</option><option>Quartier Pilar</option><option>Las Lomas 220</option>
            </select></div>
            <div className="field"><label>Unidad / Lote</label><input placeholder="Lote 14"/></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Monto invertido (USD)</label><input placeholder="120.000"/></div>
            <div className="field"><label>Fecha de inversión</label><input placeholder="DD/MM/AAAA"/></div>
          </div>

          <div style={{ background: "var(--paper-alt)", border: "1px solid var(--hairline-2)", padding: "10px 12px", fontSize: 12, color: "var(--muted)", borderRadius: 2 }}>
            UMBRAL enviará al inversor un email con sus credenciales una vez aprobada el alta.
          </div>
        </div>
        <div className="modal-foot">
          <button className="umb-btn umb-btn--text" onClick={onClose}>Cancelar</button>
          <button className="umb-btn umb-btn--primary">Dar de alta</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INFO CLIENTE modal
// ============================================================
function ClientInfoModal({ client, onClose }) {
  const c = client || DEV_CLIENTS[0];
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 580 }}>
        <div className="modal-head">
          <Avatar initials={c.initials} size={42}/>
          <div>
            <div className="eyebrow">Ficha del cliente · #{String(c.id).padStart(4,"0")}</div>
            <h3>{c.name}</h3>
          </div>
          <button className="x" onClick={onClose}>{Icon.close(16)}</button>
        </div>
        <div className="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Email</label><input defaultValue={c.email} readOnly/></div>
            <div className="field"><label>DNI</label><input defaultValue={c.dni} readOnly/></div>
            <div className="field"><label>Teléfono</label><input defaultValue={c.contact || "+54 9 11 4471 2008"} readOnly/></div>
            <div className="field"><label>Alta UMBRAL</label><input defaultValue={c.joined} readOnly/></div>
          </div>

          <hr className="hairline" style={{ margin: "4px 0" }}/>
          <div className="eyebrow">Inversiones asociadas</div>
          <div style={{ border: "1px solid var(--hairline-2)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--hairline-2)", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 90px", fontSize: 13, alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>{c.project.split(" · ")[0]}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.project.split(" · ")[1]}</div>
              </div>
              <div className="serif" style={{ fontSize: 16 }}>USD {c.invested.toLocaleString("es-AR")}</div>
              <div style={{ color: "var(--umbral-green)", fontWeight: 500 }}>+14,7 %</div>
              <Pill kind="approved">Activa</Pill>
            </div>
            <div style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
              <span>Última actualización publicada · 12/05/2026</span>
              <a href="#" style={{ color: "var(--umbral-green)" }}>Ver actividad →</a>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--muted)", fontSize: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--umbral-green)" }}/>
            Credenciales enviadas el {c.joined}
          </div>
        </div>
        <div className="modal-foot">
          <button className="umb-btn umb-btn--text">Reenviar credenciales</button>
          <button className="umb-btn umb-btn--ghost">Editar datos</button>
          <button className="umb-btn umb-btn--primary">Asociar nueva inversión</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROYECTOS — list
// ============================================================
function DevProjects({ onNewProject, onUpdateProject }) {
  const stateLabel = (p) => {
    if (p.state === "pending") return <Pill kind="pending">Actualización pendiente</Pill>;
    if (p.state === "rejected") return <Pill kind="rejected">Actualización rechazada</Pill>;
    return <Pill kind="approved">Publicado</Pill>;
  };
  return (
    <CrmShell side={<DevSide active="proyectos"/>} topbar={<DevTopbar/>}>
      <div className="crm-page-head">
        <div>
          <h1 className="crm-page-title">Proyectos</h1>
          <div className="crm-page-sub">7 proyectos · 3 solicitudes en revisión por UMBRAL</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="umb-btn umb-btn--text">{Icon.doc(14)} Manual de carga</button>
          <button className="umb-btn umb-btn--primary" onClick={onNewProject}>{Icon.plus()} Nuevo proyecto</button>
        </div>
      </div>

      <div className="crm-toolbar">
        <div className="search">{Icon.search(14)} Buscar proyecto…</div>
        <button className="umb-btn umb-btn--text">{Icon.sort(14)} Ordenar · Última actualización</button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <Pill kind="neutral">Todos · 7</Pill>
          <Pill kind="approved">Publicados · 3</Pill>
          <Pill kind="pending">Pendientes · 3</Pill>
          <Pill kind="rejected">Rechazados · 1</Pill>
        </div>
      </div>

      <div className="crm-table">
        <div className="crm-tr crm-tr--head" style={{ gridTemplateColumns: "2.2fr 1.4fr 1.2fr 1.6fr 140px" }}>
          <span>Proyecto</span><span>Ubicación</span><span>Etapa</span><span>Estado</span><span></span>
        </div>
        {DEV_PROJECTS.map(p => (
          <div key={p.id} className="crm-tr crm-tr--row" style={{ gridTemplateColumns: "2.2fr 1.4fr 1.2fr 1.6fr 140px" }}>
            <div className="cell-name">
              <div className="placeholder-img" style={{ width: 44, height: 44, borderRadius: 2 }}>
                <span style={{ fontSize: 8 }}>{p.name.slice(0,3).toUpperCase()}</span>
              </div>
              <div>
                <div className="nm">{p.name}</div>
                <div className="sub">{p.sold}/{p.units} unidades colocadas</div>
              </div>
            </div>
            <div style={{ color: "var(--ink-2)" }}>{p.location}</div>
            <div style={{ fontSize: 12 }}>{p.stage}</div>
            <div className="stat">
              {stateLabel(p)}
              <span className="meta">Última actualización · {p.lastUpdate}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="umb-btn umb-btn--ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => onUpdateProject?.(p)}>
                Actualizar info
              </button>
            </div>
          </div>
        ))}
      </div>
    </CrmShell>
  );
}

// ============================================================
// NUEVO PROYECTO modal
// ============================================================
function NewProjectModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 600 }}>
        <div className="modal-head">
          <div>
            <div className="eyebrow">Solicitud de alta</div>
            <h3>Nuevo proyecto</h3>
          </div>
          <button className="x" onClick={onClose}>{Icon.close(16)}</button>
        </div>
        <div className="modal-body">
          <div className="field"><label>Nombre del proyecto</label><input placeholder="Pilará Bosques II"/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
            <div className="field"><label>Ubicación</label><input placeholder="Pilar, Buenos Aires"/></div>
            <div className="field"><label>Tipología</label><select><option>Departamentos</option><option>Casas</option><option>Lotes</option><option>Mixto</option></select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div className="field"><label>Unidades</label><input placeholder="24"/></div>
            <div className="field"><label>Etapa actual</label><select><option>En pozo · etapa 1 de 5</option><option>En obra · etapa 2 de 5</option><option>En obra · etapa 3 de 5</option><option>Entregado</option></select></div>
            <div className="field"><label>Entrega estimada</label><input placeholder="03/2028"/></div>
          </div>
          <div className="field"><label>Descripción general</label><textarea rows="3" placeholder="Resumen institucional del proyecto, ubicación, diferenciadores."/></div>

          <div className="eyebrow" style={{ marginTop: 6 }}>Material visual</div>
          <div className="upload-zone">
            {Icon.upload(20)}
            <div style={{ color: "var(--ink-2)", fontSize: 13 }}>Arrastrá fotos, render o links de YouTube</div>
            <div>JPG · PNG · PDF · MP4 · hasta 25 MB</div>
            <button className="umb-btn umb-btn--ghost" style={{ marginTop: 8, fontSize: 12, padding: "6px 12px" }}>Seleccionar archivos</button>
          </div>

          <div style={{ background: "var(--status-pending-bg)", color: "var(--status-pending)", padding: "10px 12px", fontSize: 12, borderRadius: 2 }}>
            Esta solicitud queda <strong>pendiente de aprobación</strong> de UMBRAL antes de publicarse.
          </div>
        </div>
        <div className="modal-foot">
          <button className="umb-btn umb-btn--text" onClick={onClose}>Cancelar</button>
          <button className="umb-btn umb-btn--primary">Solicitar alta de proyecto</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CAMBIO DE INFO modal
// ============================================================
function UpdateProjectModal({ project, onClose }) {
  const p = project || DEV_PROJECTS[2];
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 600 }}>
        <div className="modal-head">
          <div className="placeholder-img" style={{ width: 44, height: 44, borderRadius: 2 }}>
            <span style={{ fontSize: 8 }}>{p.name.slice(0,3).toUpperCase()}</span>
          </div>
          <div>
            <div className="eyebrow">Actualizar información</div>
            <h3>{p.name}</h3>
            <div style={{ marginTop: 6 }}><Pill kind="pending">Solicitud pendiente · 06/05</Pill></div>
          </div>
          <button className="x" onClick={onClose}>{Icon.close(16)}</button>
        </div>
        <div className="modal-body">
          <div className="field"><label>Nombre</label><input defaultValue={p.name}/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Etapa</label><select defaultValue={p.stage}><option>{p.stage}</option><option>En obra · etapa 4 de 5</option></select></div>
            <div className="field"><label>% de avance</label><input defaultValue="62 %"/></div>
          </div>
          <div className="field"><label>Novedad del mes</label><textarea rows="3" defaultValue="Avanza la colocación de losas en el nivel 3. Mampostería interior al 60 %."/></div>

          <div className="eyebrow">Nuevas fotos / videos</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <ImagePlaceholder label="Foto 01" height={84} />
            <ImagePlaceholder label="Foto 02" height={84} />
            <div className="upload-zone" style={{ height: 84, padding: 8, fontSize: 10 }}>
              {Icon.upload(16)} <span>Agregar</span>
            </div>
          </div>

          <div style={{ background: "var(--status-pending-bg)", color: "var(--status-pending)", padding: "10px 12px", fontSize: 12, borderRadius: 2 }}>
            La solicitud anterior está en revisión por UMBRAL. Si guardás cambios, se actualizará la misma solicitud.
          </div>
        </div>
        <div className="modal-foot">
          <button className="umb-btn umb-btn--text" onClick={onClose}>Cancelar</button>
          <button className="umb-btn umb-btn--ghost">Guardar borrador</button>
          <button className="umb-btn umb-btn--primary">Solicitar actualización</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  DevLogin, DevClients, NewClientModal, ClientInfoModal,
  DevProjects, NewProjectModal, UpdateProjectModal,
  CrmShell, DevSide, DevTopbar, DEV_CLIENTS, DEV_PROJECTS,
});
