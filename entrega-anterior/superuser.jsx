// ============================================================
// UMBRAL · Back-office SUPERUSER (Desktop CRM)
// ============================================================

const SU_USER = { name: "UMBRAL Superuser", initials: "U", email: "operaciones@umbralcollection.com" };

const SU_DEVELOPERS = [
  { id: 1, initials: "PS", name: "Pilará S.A.",              projects: 7,  clients: 28, stage: "Activa",   state: "pending",     last: "06/05/2026", note: "Solicitud de actualización solicitada" },
  { id: 2, initials: "VN", name: "Vista Norte Desarrollos",  projects: 4,  clients: 41, stage: "Activa",   state: "actualizado", last: "12/05/2026", note: null },
  { id: 3, initials: "GR", name: "GRID Inversiones",         projects: 6,  clients: 22, stage: "Activa",   state: "pending",     last: "10/05/2026", note: "Solicitud de actualización solicitada" },
  { id: 4, initials: "TR", name: "Tigre Capital Real Estate", projects: 3, clients: 9,  stage: "Activa",   state: "actualizado", last: "04/05/2026", note: null },
  { id: 5, initials: "OB", name: "Obras del Plata SA",       projects: 5,  clients: 18, stage: "Activa",   state: "pending",     last: "30/04/2026", note: "Solicitud de actualización solicitada" },
  { id: 6, initials: "PA", name: "Patio Norte SRL",          projects: 2,  clients: 12, stage: "On-boarding", state: "actualizado", last: "28/04/2026", note: null },
  { id: 7, initials: "SL", name: "Sur Litoral Desarrollos",  projects: 4,  clients: 14, stage: "Activa",   state: "actualizado", last: "22/04/2026", note: null },
];

const SU_REQUESTS = [
  { id: "REQ-0411", dev: "Pilará S.A.",            type: "Actualización · obra",     project: "Las Lomas 220",   stage: "etapa 1 → etapa 2",   state: "pending",     submitted: "06/05/2026" },
  { id: "REQ-0410", dev: "GRID Inversiones",        type: "Actualización · obra",     project: "Costanera 8",     stage: "fotos + avance",      state: "pending",     submitted: "02/05/2026" },
  { id: "REQ-0409", dev: "Pilará S.A.",             type: "Actualización · obra",     project: "Distrito Quartier", stage: "renta del mes",     state: "pending",     submitted: "15/04/2026" },
  { id: "REQ-0408", dev: "Vista Norte Desarrollos", type: "Alta de inversor",         project: "Quartier Pilar",  stage: "Lucía Sandoval",      state: "actualizado", submitted: "02/05/2026" },
  { id: "REQ-0407", dev: "Pilará S.A.",             type: "Alta de proyecto",         project: "Pilará Reserva III", stage: "ficha completa",   state: "rejected",    submitted: "28/04/2026" },
  { id: "REQ-0406", dev: "Obras del Plata SA",      type: "Actualización · ficha",    project: "Belgrano R 88",   stage: "tipología",           state: "actualizado", submitted: "21/04/2026" },
  { id: "REQ-0405", dev: "GRID Inversiones",        type: "Actualización · valuación", project: "Quartier Norte", stage: "renta semestral",     state: "actualizado", submitted: "16/04/2026" },
  { id: "REQ-0404", dev: "Tigre Capital Real Estate", type: "Alta de inversor",       project: "Tigre Norte",     stage: "Joaquín García L.",   state: "pending",     submitted: "12/04/2026" },
];

// ============================================================
// Side / topbar
// ============================================================
function SuSide({ active = "desarrolladoras" }) {
  return (
    <React.Fragment>
      <div className="crm-side-brand">
        <UmbralMark size={28} rounded={3} />
        <div className="word">UMBRAL<small>SUPERUSER</small></div>
      </div>
      <div className="crm-nav-section">Operación</div>
      <div className={`crm-nav-item ${active === "desarrolladoras" ? "crm-nav-item--active" : ""}`}>
        <span>Desarrolladoras</span><span className="count">{SU_DEVELOPERS.length}</span>
      </div>
      <div className={`crm-nav-item ${active === "solicitudes" ? "crm-nav-item--active" : ""}`}>
        <span>Solicitudes</span>
        <span className="count" style={{ color: "var(--status-pending)" }}>4 pend.</span>
      </div>
      <div className="crm-nav-item">
        <span>Inversores</span><span className="count">144</span>
      </div>
      <div className="crm-nav-item">
        <span>Publicaciones</span><span className="count">68</span>
      </div>

      <div className="crm-nav-section" style={{ marginTop: 16 }}>Sistema</div>
      <div className="crm-nav-item"><span>Plantillas de email</span></div>
      <div className="crm-nav-item"><span>Auditoría</span></div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: "12px 12px 0", fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
        Sólo UMBRAL puede publicar información en la app del inversor.
      </div>
    </React.Fragment>
  );
}

function SuTopbar() {
  return (
    <React.Fragment>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ink)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: 14 }}>U</div>
      <div className="who">
        <div>
          <div>UMBRAL Superuser</div>
          <small>Control editorial · operaciones@umbralcollection.com</small>
        </div>
      </div>
      <div className="spacer"/>
      <div className="right">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--status-pending)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }}/>
          4 solicitudes pendientes
        </span>
        <span style={{ width: 1, alignSelf: "stretch", background: "var(--hairline-2)" }}/>
        <UmbralWordmark small/>
      </div>
    </React.Fragment>
  );
}

// ============================================================
// LOGIN
// ============================================================
function SuLogin() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%", background: "#0F1709" }}>
      <div style={{
        background: "#0F1709", color: "#fff",
        padding: "48px 56px", display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <UmbralMark size={36} rounded={4} bg="#fff" color="#0F1709"/>
          <div style={{ lineHeight: 1 }}>
            <div className="serif" style={{ fontSize: 22, letterSpacing: "0.02em" }}>UMBRAL</div>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>SUPERUSER</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 460 }}>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.65)" }}>Control editorial</div>
          <h1 className="serif" style={{ fontSize: 56, lineHeight: 0.95, margin: "12px 0 18px", textWrap: "balance" }}>
            El umbral entre<br/>cargar y <span style={{ color: "#A8C77A" }}>publicar</span>.
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", maxWidth: 420 }}>
            Acceso restringido para el equipo UMBRAL: aprobá, rechazá y publicá la
            información que ven los inversores en sus dispositivos.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <span>v. MVP 0.1</span><span>·</span><span>Acceso 2FA requerido</span>
        </div>

        <div style={{ position: "absolute", right: -60, bottom: -120, fontSize: 460, fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none" }}>U</div>
      </div>

      <div style={{ padding: "56px 64px", background: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="eyebrow">Acceso superuser</div>
        <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 28px", lineHeight: 1.05 }}>Control UMBRAL</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 380 }}>
          <div className="field">
            <label>Correo UMBRAL</label>
            <input type="email" defaultValue="operaciones@umbralcollection.com"/>
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" defaultValue="••••••••••••"/>
          </div>
          <div className="field">
            <label>Código 2FA</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[..."248391"].map((d,i)=>(
                <input key={i} value={d} readOnly style={{
                  width: 44, height: 48, textAlign: "center", fontFamily: "var(--font-serif)", fontSize: 22,
                  border: "1px solid var(--hairline)", borderRadius: 2,
                }}/>
              ))}
            </div>
          </div>
          <button className="umb-btn umb-btn--primary umb-btn--block" style={{ marginTop: 6 }}>
            Verificar e ingresar
          </button>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 60, fontSize: 11, color: "var(--muted)" }}>
          Acceso registrado · auditoría obligatoria
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DESARROLLADORAS list
// ============================================================
function SuDevelopers({ onNewDev }) {
  const stateLabel = (s) => {
    if (s === "pending") return <Pill kind="pending">Actualización solicitada</Pill>;
    if (s === "rejected") return <Pill kind="rejected">Rechazada</Pill>;
    return <Pill kind="approved">Actualizado</Pill>;
  };
  return (
    <CrmShell side={<SuSide active="desarrolladoras"/>} topbar={<SuTopbar/>}>
      <div className="crm-page-head">
        <div>
          <h1 className="crm-page-title">Desarrolladoras</h1>
          <div className="crm-page-sub">7 desarrolladoras vinculadas · 31 proyectos publicados · 144 inversores</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="umb-btn umb-btn--text">Exportar listado</button>
          <button className="umb-btn umb-btn--primary" onClick={onNewDev}>{Icon.plus()} Nueva desarrolladora</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
        {[
          ["Vinculadas","7","6 activas · 1 on-boarding"],
          ["Solicitudes abiertas","4","3 de Pilará, GRID y Obras"],
          ["Última publicación","12/05/2026","Vista Norte · Quartier"],
          ["SLA promedio","11 h 24 min","desde solicitud → publicado"],
        ].map(([l,v,s],i)=>(
          <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--hairline-2)", borderRadius: 3, padding: "16px 18px" }}>
            <div className="eyebrow">{l}</div>
            <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, margin: "6px 0 2px" }}>{v}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{s}</div>
          </div>
        ))}
      </div>

      <div className="crm-toolbar">
        <div className="search">{Icon.search(14)} Buscar desarrolladora…</div>
        <button className="umb-btn umb-btn--text">{Icon.sort(14)} Ordenar · Última actividad</button>
      </div>

      <div className="crm-table">
        <div className="crm-tr crm-tr--head" style={{ gridTemplateColumns: "2.4fr 1fr 1fr 1.6fr 120px" }}>
          <span>Desarrolladora</span><span>Proyectos</span><span>Inversores</span><span>Estado</span><span></span>
        </div>
        {SU_DEVELOPERS.map(d => (
          <div key={d.id} className="crm-tr crm-tr--row" style={{ gridTemplateColumns: "2.4fr 1fr 1fr 1.6fr 120px" }}>
            <div className="cell-name">
              <div className="placeholder-img" style={{ width: 38, height: 38, borderRadius: 2 }}>
                <span style={{ fontSize: 9 }}>{d.initials}</span>
              </div>
              <div>
                <div className="nm">{d.name}</div>
                <div className="sub">{d.stage} · alta {d.last}</div>
              </div>
            </div>
            <div className="serif" style={{ fontSize: 17 }}>{d.projects}</div>
            <div className="serif" style={{ fontSize: 17 }}>{d.clients}</div>
            <div className="stat">
              {stateLabel(d.state)}
              {d.note && <span className="meta">{d.note}</span>}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="umb-btn umb-btn--ghost" style={{ padding: "6px 10px", fontSize: 12 }}>Ver</button>
            </div>
          </div>
        ))}
      </div>
    </CrmShell>
  );
}

// ============================================================
// NUEVA DESARROLLADORA modal
// ============================================================
function NewDeveloperModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 560 }}>
        <div className="modal-head">
          <div>
            <div className="eyebrow">Alta de partner</div>
            <h3>Nueva desarrolladora</h3>
          </div>
          <button className="x" onClick={onClose}>{Icon.close(16)}</button>
        </div>
        <div className="modal-body">
          <div className="field"><label>Razón social</label><input placeholder="Pilará Bosques S.A."/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>CUIT</label><input placeholder="30-71XXXXXX-Y"/></div>
            <div className="field"><label>País</label><select><option>Argentina</option><option>Uruguay</option></select></div>
          </div>
          <div className="field"><label>Persona de contacto</label><input placeholder="Lucía Acuña"/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
            <div className="field"><label>Email corporativo</label><input placeholder="contacto@..."/></div>
            <div className="field"><label>Teléfono</label><input placeholder="+54 9 11 ..."/></div>
          </div>

          <hr className="hairline"/>
          <div className="eyebrow">Acceso al back office</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Plan</label><select><option>Standard · 5 proyectos</option><option>Plus · 15 proyectos</option><option>Premium · ilimitado</option></select></div>
            <div className="field"><label>Estado inicial</label><select><option>On-boarding</option><option>Activa</option></select></div>
          </div>

          <div style={{ background: "var(--paper-alt)", border: "1px solid var(--hairline-2)", padding: "10px 12px", fontSize: 12, color: "var(--muted)", borderRadius: 2 }}>
            UMBRAL enviará un email de bienvenida con las credenciales del back office a la persona de contacto.
          </div>
        </div>
        <div className="modal-foot">
          <button className="umb-btn umb-btn--text" onClick={onClose}>Cancelar</button>
          <button className="umb-btn umb-btn--primary">Crear desarrolladora</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOLICITUDES list
// ============================================================
function SuRequests({ onOpenRequest }) {
  const stateLabel = (s) => {
    if (s === "pending") return <Pill kind="pending">Pendiente</Pill>;
    if (s === "rejected") return <Pill kind="rejected">Rechazada</Pill>;
    return <Pill kind="approved">Publicada</Pill>;
  };
  return (
    <CrmShell side={<SuSide active="solicitudes"/>} topbar={<SuTopbar/>}>
      <div className="crm-page-head">
        <div>
          <h1 className="crm-page-title">Solicitudes</h1>
          <div className="crm-page-sub">Cola de revisión · 4 pendientes · SLA objetivo 24 hs</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="umb-btn umb-btn--text">Exportar</button>
          <button className="umb-btn umb-btn--ghost">Configurar SLA</button>
        </div>
      </div>

      <div className="crm-toolbar">
        <div className="search">{Icon.search(14)} Buscar por desarrolladora, proyecto o ID…</div>
        <button className="umb-btn umb-btn--text">{Icon.sort(14)} Ordenar · Más antigua</button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <Pill kind="neutral">Todas · 8</Pill>
          <Pill kind="pending">Pendientes · 4</Pill>
          <Pill kind="approved">Publicadas · 3</Pill>
          <Pill kind="rejected">Rechazadas · 1</Pill>
        </div>
      </div>

      <div className="crm-table">
        <div className="crm-tr crm-tr--head" style={{ gridTemplateColumns: "110px 1.6fr 1.6fr 1.6fr 1.2fr 1.2fr 130px" }}>
          <span>ID</span><span>Desarrolladora</span><span>Tipo</span><span>Proyecto · cambio</span><span>Recibida</span><span>Estado</span><span></span>
        </div>
        {SU_REQUESTS.map(r => (
          <div key={r.id} className="crm-tr crm-tr--row" style={{ gridTemplateColumns: "110px 1.6fr 1.6fr 1.6fr 1.2fr 1.2fr 130px" }}>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{r.id}</div>
            <div>{r.dev}</div>
            <div style={{ fontSize: 13 }}>{r.type}</div>
            <div>
              <div>{r.project}</div>
              <div className="sub" style={{ fontSize: 11, color: "var(--muted)" }}>{r.stage}</div>
            </div>
            <div style={{ color: "var(--muted)" }}>{r.submitted}</div>
            <div>{stateLabel(r.state)}</div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {r.state === "pending"
                ? <button className="umb-btn umb-btn--ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => onOpenRequest?.(r)}>Revisar →</button>
                : <button className="umb-btn umb-btn--text" style={{ padding: "6px 10px", fontSize: 12 }}>Ver</button>
              }
            </div>
          </div>
        ))}
      </div>
    </CrmShell>
  );
}

// ============================================================
// SOLICITUD DETAIL modal — with diff
// ============================================================
function RequestDetailModal({ request, onClose }) {
  const r = request || SU_REQUESTS[0];
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 640, maxHeight: "90%" }}>
        <div className="modal-head">
          <div>
            <div className="eyebrow">{r.id} · Solicitud</div>
            <h3>{r.project}</h3>
            <div style={{ display: "flex", gap: 8, marginTop: 8, fontSize: 12, color: "var(--muted)" }}>
              <span>{r.dev}</span><span>·</span><span>{r.type}</span><span>·</span><span>Recibida {r.submitted}</span>
            </div>
          </div>
          <button className="x" onClick={onClose}>{Icon.close(16)}</button>
        </div>
        <div className="modal-body">
          <div className="eyebrow">Cambios propuestos</div>
          <div style={{ background: "var(--paper-alt)", padding: "12px 14px", borderRadius: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr", gap: 10, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", paddingBottom: 8, borderBottom: "1px solid var(--hairline-2)" }}>
              <span>Campo</span><span>Valor actual</span><span>Valor propuesto</span>
            </div>
            <div className="diff-row"><span className="lbl">Etapa</span><span className="old">Etapa 1 de 5 · en pozo</span><span className="new">Etapa 2 de 5 · estructura</span></div>
            <div className="diff-row"><span className="lbl">% Avance</span><span className="old">14 %</span><span className="new">28 %</span></div>
            <div className="diff-row"><span className="lbl">TIR objetivo</span><span className="old">12,5 %</span><span className="new">13,2 %</span></div>
            <div className="diff-row" style={{ borderBottom: "none" }}>
              <span className="lbl">Novedad</span>
              <span className="old">— sin novedad —</span>
              <span className="new">Colocación de losas nivel 3; mampostería 60 %.</span>
            </div>
          </div>

          <div className="eyebrow">Material adjunto</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <ImagePlaceholder label="Foto obra 01" height={96}/>
            <ImagePlaceholder label="Foto obra 02" height={96}/>
            <div style={{ background: "var(--paper-alt)", border: "1px solid var(--hairline-2)", borderRadius: 2, padding: 10, fontSize: 11, color: "var(--muted)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Documento</div>
              <div style={{ color: "var(--ink-2)", fontSize: 12 }}>certificado-obra-may.pdf</div>
              <div>1,2 MB · subido 06/05</div>
            </div>
          </div>

          <div className="eyebrow">Impacto</div>
          <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.7 }}>
            <li>Se actualiza la ficha de proyecto visible para 6 inversores activos.</li>
            <li>Se notifica por email a Santiago Ramírez, María Fernández y 4 inversores más.</li>
            <li>Se publica nueva entrada en blog · sección "Avance de obra".</li>
          </ul>

          <div className="field"><label>Comentario interno (opcional)</label><textarea rows="2" placeholder="Nota visible sólo para UMBRAL…"/></div>
        </div>
        <div className="modal-foot">
          <button className="umb-btn umb-btn--text" onClick={onClose}>Cerrar</button>
          <div style={{ flex: 1 }}/>
          <button className="umb-btn umb-btn--danger">Rechazar</button>
          <button className="umb-btn umb-btn--primary">Aprobar y publicar</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SuLogin, SuDevelopers, NewDeveloperModal,
  SuRequests, RequestDetailModal,
  SuSide, SuTopbar, SU_DEVELOPERS, SU_REQUESTS,
});
