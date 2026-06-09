---
title: "PRD: UMBRAL MVP v1 (app del inversor + backoffice)"
area: specs
audiencia: interno
tipo: spec
sensibilidad: interno
owner: "@santiromero1"
estado: borrador
revision-cada: "30d"
ultima-revision: "2026-06-09"
feature-status: backlog
pr-relacionado: ""
tags: [spec, prd, requirements, mvp, app-inversor, backoffice]
relacionado:
  - SPECS/mvp-v1/Discovery-Spec
  - SPECS/mvp-v1/Design-Spec
  - ../../producto/MVP.md
  - ../../producto/UMBRAL_PRODUCTO.md
  - ../../marca/MARCA_UMBRAL.md
---

# PRD — UMBRAL MVP v1

**Versión:** 1.0
**Estado:** Borrador
**Discovery relacionado:** `Discovery-Spec`
**Aplica a:** ✅ App del inversor · ✅ Backoffice · ✅ Backend

---

## 1. Resumen Ejecutivo

La primera versión de UMBRAL hace existir el producto: una **app mobile** donde el inversor ve lo suyo (la valorización de sus m², el avance de su obra, el estado de sus cuotas y el contenido curado de su desarrollo) y un **backoffice desktop** donde el equipo de UMBRAL da de alta desarrollos e inversores, carga contenido, administra pagos, manda avisos y recibe las intenciones de venta. Es el soporte operativo que convierte la propuesta de acompañamiento de la marca en algo real y mostrable.

---

## 2. Contexto

**Problema que resuelve:**
> Ver `Discovery-Spec` §1. En síntesis: durante los años entre la firma y la entrega, el desa pierde imagen, el inversor queda en el aire y UMBRAL no tiene cómo entregar su acompañamiento a escala.

**Por qué ahora:**
UMBRAL existe hoy como marca y como wireframes, pero no como producto. Sin una plataforma operable no hay nada que mostrar a los stakeholders internos ni —más adelante— a una desarrolladora. Este MVP es el primer ladrillo: lo mínimo para que el producto **exista y se sienta UMBRAL** (`UMBRAL_PRODUCTO.md` §7).

---

## 3. Usuarios Objetivo

| Segmento | Descripción | Frecuencia de uso esperada |
|----------|-------------|---------------------------|
| Inversor | Comprador que invirtió en un desarrollo; usa la app para seguir lo suyo entre firma y entrega | Esporádica pero recurrente (ante una novedad, una cuota o una duda) |
| Equipo UMBRAL (Admin UMBRAL) | Opera todo el backoffice: altas, contenido, pagos, avisos, ventas | Frecuente (es su herramienta de trabajo) |
| Desarrollador (cliente B2B) | Quien paga; **sin acceso a la plataforma en el MVP** | — (contacto por fuera) |

---

## 4. Casos de Uso Principales

**CU-01 — Dejar un desarrollo operativo**
Como Admin UMBRAL, quiero dar de alta un desarrollo con sus datos, su plan de cuotas, su contenido y su curva de valorización, para que sus inversores tengan algo real que ver al entrar.

**CU-02 — Sumar un inversor con su código**
Como Admin UMBRAL, quiero dar de alta a un inversor dentro de un desarrollo, generarle su código de referencia único y asociar sus m², para habilitarlo a entrar y ver solo lo suyo.

**CU-03 — Entrar y ver mi inversión**
Como inversor, quiero validar mi código una vez, crear mi cuenta y ver la valorización de mis m², el avance de mi obra y el estado de mis cuotas, para sentir que mi decisión sigue siendo buena.

**CU-04 — Seguir las novedades de mi desarrollo**
Como inversor, quiero ver las novedades, fotos y videos de mi obra y consultar la FAQ, para estar acompañado sin tener que perseguir a nadie.

**CU-05 — Pedir vender mi unidad**
Como inversor, quiero avisar que quiero vender mi unidad respondiendo un par de preguntas, para que UMBRAL me acompañe en la salida.

**CU-06 — Acompañar y administrar desde el backoffice**
Como Admin UMBRAL, quiero marcar cuotas, mandar avisos y ver las solicitudes de venta, para sostener la presencia y actuar a tiempo.

---

## 5. Requisitos Funcionales

> Prioridad: Must / Should / Could / Won't (MoSCoW). IDs `RF-A-*` = app del inversor, `RF-B-*` = backoffice, `RF-X-*` = transversal/backend.

### 5.1 Must Have

#### RF-B-01 — Alta y configuración de desarrollos
**Descripción:** El Admin UMBRAL crea un desarrollo y carga sus datos base, su estado de obra y su plan de cuotas (definido a nivel desarrollo).
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-B01a:** GIVEN un Admin UMBRAL autenticado WHEN completa los datos base de un desarrollo (nombre, rango, estado de obra) y guarda THEN el desarrollo queda creado y aparece en el listado de desarrollos.
- **AC-B01b:** GIVEN un desarrollo creado WHEN el admin define su plan de cuotas (cantidad, montos, vencimientos) THEN el plan queda asociado al desarrollo y disponible para marcar pagos (RF-B-04).
- **AC-B01c:** GIVEN un desarrollo sin contenido cargado WHEN un inversor de ese desarrollo entra a la app THEN ve el estado vacío correspondiente (EMPTY) y no un error.

#### RF-B-02 — Alta de inversores y código de referencia único
**Descripción:** Dentro de un desarrollo, el admin da de alta inversores, genera un **código de referencia único por inversor** y asocia inversor ↔ desarrollo ↔ m².
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-B02a:** GIVEN un desarrollo creado WHEN el admin da de alta un inversor THEN el sistema genera un código de referencia único (1 código = 1 inversor) y lo muestra para entregarlo por fuera.
- **AC-B02b:** GIVEN un inversor dado de alta WHEN el admin asocia sus m² invertidos THEN queda registrada la membresía (inversor × desarrollo × m²).
- **AC-B02c:** GIVEN un código ya generado WHEN el admin consulta el inversor THEN el código es trazable a esa persona (no compartido entre inversores).

#### RF-B-03 — Carga de contenido por desarrollo
**Descripción:** El admin carga, por desarrollo, imágenes, videos (links/YouTube), novedades (news), FAQ y la curva de valorización por m².
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-B03a:** GIVEN un desarrollo WHEN el admin sube imágenes / agrega links de video / publica una novedad / agrega un ítem de FAQ THEN ese contenido aparece en la app de los inversores de ese desarrollo.
- **AC-B03b:** GIVEN un desarrollo WHEN el admin carga la curva de valorización por m² THEN el inversor ve su proyección de valor calculada sobre sus m² (RF-A-03).
- **AC-B03c:** GIVEN contenido cargado en el desarrollo A WHEN un inversor del desarrollo B entra THEN no ve nada del desarrollo A (aislamiento).

#### RF-B-04 — Administración de pagos
**Descripción:** El admin marca a mano cada cuota del plan como pagada o pendiente. Sin integración con cobranza.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-B04a:** GIVEN un plan de cuotas definido WHEN el admin marca una cuota como pagada/pendiente THEN el estado se refleja para el/los inversores correspondientes en la app.
- **AC-B04b:** GIVEN una cuota marcada WHEN el inversor abre el estado de su inversión THEN ve sus cuotas pagadas y pendientes presentadas como acompañamiento, no como cobranza fría.

#### RF-B-05 — Envío de avisos por mail
**Descripción:** El admin envía avisos por mail a los inversores de un desarrollo: nuevas novedades de obra y recordatorios de cuota.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-B05a:** GIVEN un desarrollo con inversores WHEN el admin compone y envía un aviso THEN los inversores de ese desarrollo reciben el mail y nadie de otro desarrollo lo recibe.
- **AC-B05b:** GIVEN un recordatorio de cuota WHEN se compone THEN el copy se presenta como acompañamiento (voseo, tono cálido), sin lenguaje de cobranza.

#### RF-B-06 — Bandeja de solicitudes de venta
**Descripción:** El admin ve las solicitudes de "Vender" con el motivo y los datos del inversor para que el equipo actúe.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-B06a:** GIVEN un inversor que envió una solicitud de venta (RF-A-06) WHEN el admin abre la bandeja THEN ve la solicitud con motivo, inversor, desarrollo y fecha.
- **AC-B06b:** GIVEN una solicitud en la bandeja WHEN el admin la gestiona THEN puede cambiar su estado (ej: pendiente → en gestión).

#### RF-A-01 — Onboarding con código de referencia y m²
**Descripción:** El inversor ingresa, por única vez, el código de referencia que le dio UMBRAL, lo que lo valida y lo asocia a su desarrollo, y completa datos básicos incluyendo sus m² de inversión.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-A01a:** GIVEN un código de referencia válido y no usado WHEN el inversor lo ingresa THEN queda asociado a su desarrollo y avanza a completar sus datos.
- **AC-A01b:** GIVEN un código inválido o ya usado WHEN el inversor lo ingresa THEN ve un mensaje de error claro (voseo) y no avanza.
- **AC-A01c:** GIVEN el onboarding WHEN el inversor declara sus m² THEN el valor queda registrado como **declarado** y pendiente de confirmación por el backoffice (ver RF-X-02), sin bloquear el acceso.

#### RF-A-02 — Login (Google + email/contraseña)
**Descripción:** El inversor crea su cuenta y entra con Google o con email/contraseña. El login recurrente no vuelve a pedir el código.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-A02a:** GIVEN un inversor con cuenta WHEN entra con Google o email/contraseña THEN accede a su home sin reingresar el código de referencia.
- **AC-A02b:** GIVEN credenciales inválidas WHEN intenta entrar THEN ve un error claro y no accede.
- **AC-A02c:** GIVEN una sesión vencida WHEN intenta operar THEN se le pide reingresar (ERR-02).

#### RF-A-03 — Home del desarrollo y estado de la inversión
**Descripción:** El inversor ve la card de su desarrollo y su estado de inversión: proyección de valor por sus m² (la joya visual), avance de obra y estado de cuotas.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-A03a:** GIVEN un inversor con membresía activa WHEN abre su home THEN ve la card del desarrollo (nombre, rango, sus m², estado) y el bloque de valorización calculado sobre sus m².
- **AC-A03b:** GIVEN datos de obra y de cuotas cargados WHEN abre el home THEN ve el avance de obra y el estado de sus cuotas (pagadas/pendientes).
- **AC-A03c:** GIVEN un dato aún no cargado por el backoffice WHEN abre el home THEN ve el estado vacío de ese bloque, no un error ni un dato inventado.

#### RF-A-04 — Contenido del desarrollo (novedades, fotos, videos) y FAQ
**Descripción:** El inversor ve las novedades, la galería de fotos y los videos cargados, y consulta la FAQ inline.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-A04a:** GIVEN contenido cargado en su desarrollo WHEN el inversor navega el contenido THEN ve novedades, fotos y videos solo de su desarrollo.
- **AC-A04b:** GIVEN una FAQ cargada WHEN el inversor la abre THEN ve las preguntas y respuestas inline.

#### RF-A-06 — Pedir vender la unidad
**Descripción:** El inversor pide vender su unidad: responde un cuestionario breve de confirmación (motivo) que dispara un mail al equipo de UMBRAL. En la UI se llama "Vender" / "Quiero vender mi unidad", nunca "abandonar".
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-A06a:** GIVEN un inversor en su desarrollo WHEN abre el flujo "Vender" y completa el cuestionario de motivo THEN se registra la solicitud y se dispara un mail al equipo.
- **AC-A06b:** GIVEN la solicitud enviada WHEN se confirma THEN el inversor ve una confirmación cálida (no un cierre triste) y la solicitud aparece en la bandeja del backoffice (RF-B-06).

#### RF-X-01 — Aislamiento por membresía (inversor × desarrollo)
**Descripción:** El backend enforcea que cada inversor acceda únicamente a su(s) desarrollo(s). No depende del front.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-X01a:** GIVEN un inversor con membresía en el desarrollo A WHEN intenta acceder a datos del desarrollo B (por API directa o manipulación) THEN el backend lo deniega (ERR-03 / PERM-01).
- **AC-X01b:** GIVEN un inversor sin membresía activa WHEN intenta entrar THEN no ve ningún desarrollo.

#### RF-X-02 — Confirmación de m² en backoffice
**Descripción:** El m² lo declara el inversor en el onboarding; el backoffice puede marcarlo como **confirmado** o **no confirmado**. El valor declarado por el inversor se conserva siempre, aun sin confirmar.
**Prioridad:** Must

**Acceptance Criteria:**
- **AC-X02a:** GIVEN un inversor que declaró sus m² WHEN el admin abre su ficha THEN ve el valor declarado y el estado de confirmación (por defecto: no confirmado).
- **AC-X02b:** GIVEN un m² declarado WHEN el admin lo confirma THEN el estado pasa a confirmado sin alterar el valor declarado.
- **AC-X02c:** GIVEN un m² no confirmado WHEN se calcula la valorización del inversor THEN se calcula igual sobre el valor declarado (el MVP no bloquea la vista por falta de confirmación). *(Decisión a validar en Gate 1: si la valorización debe esperar confirmación.)*

---

### 5.2 Should Have

#### RF-A-05 — Abrir una nueva duda
**Descripción:** El inversor abre una nueva duda sobre su desarrollo mediante un formulario.
**Prioridad:** Should

**Acceptance Criteria:**
- **AC-A05a:** GIVEN un inversor en su desarrollo WHEN completa el formulario de nueva duda y lo envía THEN la duda queda registrada / notificada al equipo.

#### RF-B-07 — Trazabilidad básica del inversor
**Descripción:** El admin ve métricas históricas simples por inversor (cantidad de logins, último ingreso y similares). Solo lectura.
**Prioridad:** Should

**Acceptance Criteria:**
- **AC-B07a:** GIVEN un inversor con actividad WHEN el admin abre su vista de métricas THEN ve cantidad de logins y último ingreso.
- **AC-B07b:** GIVEN esta vista WHEN el admin la consulta THEN es solo lectura (sin pretensión de analítica avanzada).

---

### 5.3 Could Have

#### RF-A-07 — Login biométrico en mobile
**Descripción:** Reingreso rápido con biometría del dispositivo, además de Google / email.
**Prioridad:** Could

---

### 5.4 Won't Have (este ciclo)

- **Multi-desarrollo en la app (el "+")** — Razón: `MVP.md §5` lo define como visión futura. *(Nota: `UMBRAL_PRODUCTO.md §7` lo listaba en v1; se resuelve a favor de MVP.md. Si se decide incluir, vuelve a Must.)*
- **Acceso de la desarrolladora al backoffice (rol Admin desarrollador)** — Razón: en el MVP la desa se contacta por fuera (`MVP.md §3, §5`).
- **Integración con cobranza real** — Razón: en el MVP los pagos se marcan a mano (`MVP.md §6`).
- **Banca UMBRAL, Cartilla, beneficios, documentos/escrituras, línea de tiempo detallada, comunidad entre inversores** — Razón: visión futura, se construyen por madurez (`MVP.md §5`).

---

## 6. Requisitos No Funcionales

### Performance
| Requisito | Target | Método de verificación |
|-----------|--------|----------------------|
| Latencia de endpoints críticos | P95 < 300ms | Test de carga |
| Tiempo de carga del home (app mobile) | < 2s en 3G | Lighthouse en CI |

### Seguridad y aislamiento
- [x] Autenticación requerida: **sí** (app e backoffice).
- [x] Roles con acceso: **inversor** (app, solo lo suyo) · **admin UMBRAL** (backoffice, todo). Admin desarrollador: fuera del MVP.
- [x] Toca datos de inversores → respeta el aislamiento por membresía (`UMBRAL_PRODUCTO.md §5`, RF-X-01).
- [x] El backoffice del MVP solo tiene Admin UMBRAL (ve todo); la distinción con Admin desarrollador queda para el futuro.
- [x] Validación de inputs (código de referencia, email, m², formularios).

### Alineación de Marca
- [x] Todo copy visible en voseo rioplatense y tono sobrio/arquitectónico.
- [x] Sin palabras prohibidas (postventa, CRM, comunicador, soporte, atención al cliente, promesa).
- [x] Nada promete comportamiento inexistente (sin "tiempo real").
- [x] "Vender" (no "abandonar"); "Ayuda/Acompañamiento" (no "soporte"); recordatorios de cuota como acompañamiento.

### Disponibilidad
| Requisito | Target |
|-----------|--------|
| Uptime | Best-effort en MVP (sin SLA formal); definir en Technical Spec |

### Accesibilidad
- Nivel WCAG: AA (objetivo).
- Mobile-first (app del inversor): **sí**.
- Soporte para lectores de pantalla: deseable; verificar en componentes clave (formularios, valorización).

---

## 7. Out of Scope

- **Multi-desarrollo en la app (el "+")** — Se pospone porque MVP.md lo define como visión futura.
- **Rol Admin desarrollador en el backoffice** — Se pospone porque la desa se contacta por fuera en el MVP.
- **Integración con sistema de cobranza** — Se pospone; los pagos se marcan a mano.
- **Banca UMBRAL, Cartilla, beneficios, documentos, línea de tiempo detallada, comunidad** — Se posponen; visión futura por madurez.
- **Internacionalización / inglés en la plataforma** — Se pospone (MARCA §15 lo menciona sin timeline).

---

## 8. Dependencias

| Dependencia | Tipo | Estado | Doc de referencia |
|-------------|------|--------|-------------------|
| Datos provistos por la desa por fuera (inversores, contenido, plan de cuotas) | de producto | bloqueante para poblar un desarrollo real | `MVP.md §2.1` |
| Proveedor de auth (Google + email/contraseña) | técnica | a definir | Technical Spec (Olivier) |
| Servicio de envío de mails | técnica | a definir | Technical Spec (Olivier) |
| Identidad visual (paleta, tipografías, logo) | de marca | resuelta | `MARCA_UMBRAL.md §11` |

---

## 9. Métricas de Éxito

> Copiadas del Discovery para que el PRD sea autocontenido.

**Métrica primaria:** operación sin fricción → un operador no técnico deja un desarrollo operativo de punta a punta (alta de desarrollo + ≥1 inversor con código + contenido base + valorización) en una sola sesión, sin asistencia → medido en la demo interna del MVP.
**Guardrails:** 0 fugas de aislamiento (RF-X-01) · 0 palabras prohibidas en copy visible · 0 promesas de tech inexistente.

---

## 10. Historial de Revisiones

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2026-06-09 | @santiromero1 | Borrador inicial |

---

## 11. Criterio de Salida del PRD

- [x] Todos los requisitos Must tienen acceptance criteria en formato Given-When-Then
- [x] Out of scope documentado con al menos 3 ítems
- [x] Dependencias identificadas con estado
- [x] Requisitos de seguridad/aislamiento evaluados
- [x] Requisitos de marca evaluados (voseo, palabras prohibidas, honestidad)
- [ ] Revisado por quien implementa (Olivier) — pendiente
- [ ] Sign-off técnico (backend): Olivier — Fecha: ____
- [ ] Sign-off de producto: @santiromero1 — Fecha: ____
- [ ] Sign-off del stakeholder principal (dueña de la idea): @_____ — Fecha: ____
- [x] Versionado como PRD v1.0

---

*Siguiente paso: completar `Design-Spec.md`*
