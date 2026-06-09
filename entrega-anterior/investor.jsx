// ============================================================
// UMBRAL · Inversor (Mobile, responsive web)
// 4 screens: Login · Home · Detalle Inversión · Blog
// ============================================================

const INV_USER = { name: "Santiago Ramírez", initials: "SR", email: "santiago.ramirez@mail.com" };

const INV_PORTFOLIO = {
  invested: 245000,
  current: 271400,
  yieldUsd: 26400,
  yieldPct: 10.8,
  yieldYtd: 7.2,
  projects: 3,
  nextMilestone: "Etapa 4 · 14/06",
};

const INV_PROJECTS = [
  {
    id: "pilara-forest",
    name: "Pilará Forest",
    developer: "Pilará S.A.",
    location: "Pilar, Buenos Aires",
    invested: 120000, current: 137600,
    yield: 14.7, ytd: 8.4,
    stage: "En obra · Etapa 3 de 5",
    pillKind: "neutral",
    progress: 0.6,
    delivery: "Marzo 2027",
    surface: "92 m²",
    unit: "Lote 14 · Torre Norte",
    series: [100, 101, 103, 105, 104, 107, 109, 111, 113, 115, 117, 114.7],
  },
  {
    id: "quartier-madero",
    name: "Distrito Quartier",
    developer: "Vista Norte Desarrollos",
    location: "Puerto Madero, CABA",
    invested: 85000, current: 92650,
    yield: 9.0, ytd: 5.1,
    stage: "Entregado · Renta",
    pillKind: "approved",
    progress: 1,
    delivery: "Entregado 09/2025",
    surface: "54 m²",
    unit: "Unidad 8B",
    series: [100, 101, 102, 103, 104, 104.5, 105, 106, 106.5, 107.5, 108.5, 109],
  },
  {
    id: "costanera-8",
    name: "Costanera 8",
    developer: "GRID Inversiones",
    location: "Vicente López, BA",
    invested: 40000, current: 41150,
    yield: 2.9, ytd: 2.9,
    stage: "En pozo · Etapa 1 de 5",
    pillKind: "pending",
    progress: 0.15,
    delivery: "Noviembre 2028",
    surface: "76 m²",
    unit: "Lote 3 · Torre B",
    series: [100, 100.2, 100.5, 100.8, 101.1, 101.4, 101.7, 102, 102.3, 102.5, 102.7, 102.9],
  },
];

// ----------------------------------------------------------------
// LOGIN
// ----------------------------------------------------------------
function InvLogin() {
  return (
    <div className="mob" style={{ position: "relative", display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{
        padding: "120px 28px 0",
        display: "flex", flexDirection: "column",
        alignItems: "stretch",
      }}>
        {/* Big serif U mark */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <UmbralMark size={88} rounded={6} />
        </div>
        <h1 className="serif" style={{
          fontSize: 40, lineHeight: 0.95, margin: "0 0 6px",
          textAlign: "center", color: "var(--ink)",
        }}>
          Umbral<br/><span style={{ color: "var(--umbral-green)" }}>Collection</span>
        </h1>
        <p style={{
          textAlign: "center", color: "var(--muted)", fontSize: 12,
          letterSpacing: "0.22em", textTransform: "uppercase",
          margin: "0 0 40px",
        }}>
          Acceso para inversores
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field field--mobile">
            <label>Correo electrónico</label>
            <input type="email" defaultValue="santiago.ramirez@mail.com" />
          </div>
          <div className="field field--mobile">
            <label>Contraseña</label>
            <input type="password" defaultValue="••••••••••••" />
          </div>
          <button className="umb-btn umb-btn--primary umb-btn--block" style={{ marginTop: 10 }}>
            Ingresar
          </button>
          <a style={{
            textAlign: "center", marginTop: 6,
            color: "var(--umbral-green)", fontSize: 12,
            textDecoration: "none",
          }} href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>

      <div style={{
        marginTop: "auto", padding: "32px 28px 60px",
        textAlign: "center", color: "var(--muted)", fontSize: 10,
        letterSpacing: "0.22em", textTransform: "uppercase",
      }}>
        — Cada umbral marca un antes y un después —
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// HOME
// ----------------------------------------------------------------
function InvHome({ onOpenProject }) {
  const p = INV_PORTFOLIO;
  return (
    <div className="mob" style={{ position: "relative" }}>
      <div className="mob-pad">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Avatar initials={INV_USER.initials} size={40} />
          <div style={{ flex: 1, lineHeight: 1.15 }}>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Bienvenido</div>
            <div className="serif" style={{ fontSize: 20 }}>Hola, Santiago</div>
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid var(--hairline)", background: "var(--paper)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink)",
          }}>{Icon.help(16)}</button>
        </div>

        {/* Portfolio card */}
        <div style={{
          background: "var(--umbral-green)",
          color: "#fff",
          padding: "22px 22px 20px",
          borderRadius: 6,
          marginBottom: 14,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -30, right: -30,
            width: 130, height: 130, borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}/>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Mi portfolio</div>
          <div className="serif" style={{ fontSize: 38, lineHeight: 1, marginTop: 8 }}>
            USD {p.current.toLocaleString("es-AR")}
          </div>
          <div style={{
            display: "flex", alignItems: "baseline", gap: 8, marginTop: 8,
            fontSize: 13, color: "rgba(255,255,255,0.85)",
          }}>
            <span style={{ fontWeight: 500, color: "#D9E6BF" }}>↗ {pct(p.yieldPct)}</span>
            <span>·</span>
            <span>{fmt(p.yieldUsd, { sign: true })} acumulado</span>
          </div>
          <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.12)", margin: "18px 0 14px" }}/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Invertido</div>
              <div className="serif" style={{ fontSize: 17, marginTop: 4 }}>{fmt(p.invested).replace("USD ","$")}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>YTD</div>
              <div className="serif" style={{ fontSize: 17, marginTop: 4 }}>{pct(p.yieldYtd)}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Proyectos</div>
              <div className="serif" style={{ fontSize: 17, marginTop: 4 }}>{p.projects}</div>
            </div>
          </div>
        </div>

        {/* Summary strip */}
        <div className="mob-card" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          padding: "14px 16px",
          gap: 12,
          marginBottom: 28,
        }}>
          <div className="metric">
            <div className="lbl">Próximo hito</div>
            <div className="val" style={{ fontSize: 14, fontFamily: "var(--font-sans)" }}>{p.nextMilestone}</div>
            <div className="sub">Pilará Forest · estructura</div>
          </div>
          <div className="metric" style={{ borderLeft: "1px solid var(--hairline-2)", paddingLeft: 12 }}>
            <div className="lbl">Renta del mes</div>
            <div className="val" style={{ fontSize: 14, fontFamily: "var(--font-sans)" }}>USD 412</div>
            <div className="sub">Distrito Quartier · 09/2026</div>
          </div>
        </div>

        {/* Investments */}
        <SectionHead title="Mis inversiones" action={
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{INV_PROJECTS.length} activas</span>
        }/>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {INV_PROJECTS.map(prj => (
            <div key={prj.id} className="proj-card" onClick={() => onOpenProject?.(prj.id)}>
              <div className="thumb placeholder-img" style={{ minHeight: 96 }}>
                <span style={{ fontSize: 8 }}>{prj.name.slice(0,3).toUpperCase()}</span>
              </div>
              <div className="info">
                <div className="meta">{prj.location}</div>
                <div className="nm">{prj.name}</div>
                <div style={{ marginTop: 2 }}><Pill kind={prj.pillKind}>{prj.stage}</Pill></div>
                <div style={{ marginTop: 6 }}>
                  <Meter value={prj.progress} />
                </div>
              </div>
              <div className="yield">
                <div style={{ textAlign: "right" }}>
                  <div className="pct">{pct(prj.yield)}</div>
                  <div className="lbl">Rend.</div>
                </div>
                <div style={{ color: "var(--muted)" }}>{Icon.chevron(14)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomTabs active="home" />
    </div>
  );
}

function BottomTabs({ active = "home", onChange }) {
  return (
    <div className="mob-tabbar">
      <div className={`mob-tab ${active === "blog" ? "mob-tab--active" : ""}`} onClick={() => onChange?.("blog")}>
        {Icon.blog(16)} Blog
      </div>
      <div className={`mob-tab ${active === "home" ? "mob-tab--active" : ""}`} onClick={() => onChange?.("home")}>
        {Icon.home(16)} Home
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// DETALLE DE INVERSIÓN
// ----------------------------------------------------------------
function InvDetail({ projectId = "pilara-forest", onBack }) {
  const prj = INV_PROJECTS.find(p => p.id === projectId) || INV_PROJECTS[0];
  const [tab, setTab] = React.useState("rendimiento");

  return (
    <div className="mob" style={{ position: "relative" }}>
      <div className="mob-pad" style={{ padding: "56px 0 110px" }}>
        {/* nav */}
        <div style={{ padding: "0 18px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid var(--hairline)", background: "var(--paper)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink)",
          }}>{Icon.back(18)}</button>
          <div style={{ flex: 1, lineHeight: 1.1 }}>
            <div className="eyebrow">Detalle de inversión</div>
            <div className="serif" style={{ fontSize: 18 }}>{prj.developer}</div>
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid var(--hairline)", background: "var(--paper)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink)",
          }}>{Icon.help(16)}</button>
        </div>

        {/* hero */}
        <div style={{ padding: "0 18px" }}>
          <ImagePlaceholder label={`Foto · ${prj.name}`} height={196} style={{ borderRadius: 4 }} />
          <div style={{ marginTop: 14 }}>
            <Pill kind={prj.pillKind}>{prj.stage}</Pill>
          </div>
          <h2 className="serif" style={{ fontSize: 30, margin: "10px 0 4px", lineHeight: 1.05 }}>{prj.name}</h2>
          <div style={{ color: "var(--muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            {Icon.pin(12)} {prj.location} · {prj.unit}
          </div>
        </div>

        {/* metrics row */}
        <div style={{ padding: "20px 18px 0" }}>
          <div className="mob-card" style={{ padding: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div className="metric metric--big">
                <div className="lbl">Valuación actual</div>
                <div className="val">USD {prj.current.toLocaleString("es-AR")}</div>
                <div className="sub" style={{ color: "var(--umbral-green)" }}>{pct(prj.yield)} acumulado</div>
              </div>
              <div className="metric metric--big">
                <div className="lbl">Invertido</div>
                <div className="val">USD {prj.invested.toLocaleString("es-AR")}</div>
                <div className="sub">Ingreso 03/2025</div>
              </div>
            </div>
            <hr className="hairline" style={{ margin: "16px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div className="metric">
                <div className="lbl">TIR objetivo</div>
                <div className="val" style={{ fontSize: 16 }}>14,8 %</div>
              </div>
              <div className="metric">
                <div className="lbl">Avance obra</div>
                <div className="val" style={{ fontSize: 16 }}>{Math.round(prj.progress*100)} %</div>
              </div>
              <div className="metric">
                <div className="lbl">Entrega</div>
                <div className="val" style={{ fontSize: 14, fontFamily: "var(--font-sans)" }}>{prj.delivery}</div>
              </div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div style={{ padding: "20px 18px 0", display: "flex", gap: 4, borderBottom: "1px solid var(--hairline-2)" }}>
          {["rendimiento","proyecto","soporte"].map(t => (
            <button key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 12px", border: "none", background: "transparent",
                fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase",
                color: tab === t ? "var(--umbral-green)" : "var(--muted)",
                borderBottom: tab === t ? "2px solid var(--umbral-green)" : "2px solid transparent",
                marginBottom: -1, cursor: "pointer", fontWeight: 500,
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* tab content */}
        {tab === "rendimiento" && (
          <div style={{ padding: "18px 18px 0" }}>
            <div className="mob-card" style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <div className="eyebrow">Valuación · últimos 12 meses</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>USD base 100</div>
              </div>
              <PerformanceChart width={310} height={140} data={prj.series}/>
            </div>
            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                ["3 meses", "+2,1 %"], ["6 meses", "+5,8 %"], ["12 meses", pct(prj.yield)]
              ].map(([l,v],i)=>(
                <div key={i} className="mob-card" style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{l}</div>
                  <div className="serif" style={{ fontSize: 18, color: "var(--umbral-green)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "proyecto" && (
          <div style={{ padding: "18px 18px 0", display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="mob-card" style={{ padding: "14px 16px" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Ficha del proyecto</div>
              {[
                ["Desarrolladora", prj.developer],
                ["Tipología", "Departamento · 2 ambientes"],
                ["Superficie", prj.surface],
                ["Unidad", prj.unit],
                ["Entrega estimada", prj.delivery],
                ["Etapa", prj.stage],
              ].map(([k,v],i)=>(
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", gap: 8,
                  padding: "8px 0", borderBottom: i < 5 ? "1px solid var(--hairline-2)" : "none",
                  fontSize: 13,
                }}>
                  <span style={{ color: "var(--muted)" }}>{k}</span>
                  <span style={{ textAlign: "right", color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Última actualización · 12/05/2026</div>
              <ImagePlaceholder label="Foto de obra · Estructura nivel 3" height={140} style={{ borderRadius: 4 }} />
              <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: "10px 0 0" }}>
                Avanza la colocación de losas en el nivel 3. Se completó el 60 % de la mampostería interior y comienza la
                instalación sanitaria primaria.
              </p>
            </div>
          </div>
        )}
        {tab === "soporte" && (
          <div style={{ padding: "18px 18px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="eyebrow">Preguntas frecuentes</div>
            {[
              "¿Cómo se calcula la valuación mensual?",
              "¿Qué pasa si la obra se retrasa?",
              "¿Puedo transferir mi participación?",
              "¿Dónde figuran los documentos firmados?",
            ].map((q,i)=>(
              <div key={i} className="mob-card" style={{
                padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
                fontSize: 13,
              }}>
                <span>{q}</span>
                <span style={{ color: "var(--muted)" }}>{Icon.chevron(12)}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div style={{ padding: "22px 18px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="umb-btn umb-btn--primary umb-btn--block">Hacer una pregunta</button>
          <button className="umb-btn umb-btn--text" style={{ alignSelf: "center", color: "var(--umbral-green)" }}>
            Ver documentos del proyecto →
          </button>
        </div>
      </div>

      <BottomTabs active="home"/>
    </div>
  );
}

// ----------------------------------------------------------------
// BLOG
// ----------------------------------------------------------------
const INV_ARTICLES = [
  { tag: "Mercado", date: "18/05/2026", title: "Por qué Pilará concentra hoy el 38 % de la demanda premium de zona Norte", read: "5 min" },
  { tag: "UMBRAL", date: "12/05/2026", title: "Avances de obra · cómo leer el reporte mensual de tus inversiones", read: "3 min" },
  { tag: "Análisis", date: "06/05/2026", title: "Renta vs. valor: dos formas de medir el rendimiento real en dólares", read: "7 min" },
  { tag: "Mercado", date: "29/04/2026", title: "Costanera y Vicente López: ciclo de obra y proyección 2026-2028", read: "4 min" },
];

function InvBlog() {
  const featured = INV_ARTICLES[0];
  const rest = INV_ARTICLES.slice(1);
  return (
    <div className="mob" style={{ position: "relative" }}>
      <div className="mob-pad">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <div className="eyebrow">UMBRAL Collection</div>
            <h1 className="serif" style={{ fontSize: 32, margin: "2px 0 0" }}>Blog & novedades</h1>
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid var(--hairline)", background: "var(--paper)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink)",
          }}>{Icon.bell(16)}</button>
        </div>

        {/* featured */}
        <div className="mob-card" style={{ overflow: "hidden", marginBottom: 22 }}>
          <ImagePlaceholder label="Imagen destacada" height={180} style={{ borderRadius: 0 }} />
          <div style={{ padding: "14px 16px 16px" }}>
            <div style={{ display: "flex", gap: 10, fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              <span style={{ color: "var(--umbral-green)" }}>{featured.tag}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.read}</span>
            </div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 10, textWrap: "pretty" }}>
              {featured.title}
            </div>
            <button className="umb-btn umb-btn--ghost" style={{ padding: "8px 12px", fontSize: 12 }}>
              Leer artículo →
            </button>
          </div>
        </div>

        <SectionHead title="Más artículos" />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rest.map((a,i)=>(
            <div key={i} className="mob-card" style={{ padding: 0, display: "flex", overflow: "hidden" }}>
              <div className="placeholder-img" style={{ width: 84, flexShrink: 0 }}>
                <span style={{ fontSize: 8 }}>{a.tag.slice(0,3).toUpperCase()}</span>
              </div>
              <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  <span style={{ color: "var(--umbral-green)" }}>{a.tag}</span> · {a.date}
                </div>
                <div className="serif" style={{ fontSize: 15, lineHeight: 1.2, textWrap: "pretty" }}>{a.title}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.read} lectura</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomTabs active="blog"/>
    </div>
  );
}

Object.assign(window, { InvLogin, InvHome, InvDetail, InvBlog, BottomTabs });
