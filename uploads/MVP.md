---
title: "MVP — alcance funcional"
area: producto
audiencia: interno
tipo: especificación
sensibilidad: interno
owner: "@santiromero1"
estado: borrador
revision-cada: "90d"
ultima-revision: "2026-06-08"
tags: [producto, mvp, alcance, roles, vistas]
relacionado: [UMBRAL_PRODUCTO.md, ../marca/MARCA_UMBRAL.md]
---

# UMBRAL — MVP

> Define el alcance funcional de la primera versión: qué es, cómo funciona, qué roles existen y qué hace y ve cada uno.
> Se apoya en `UMBRAL_PRODUCTO.md` (bases del producto) y en `../marca/MARCA_UMBRAL.md` (fuente de verdad de marca: si algo de acá choca con la marca, gana la marca).
> Idioma: español rioplatense (voseo). Última actualización: junio 2026.

---

## 1. Qué es UMBRAL

UMBRAL acompaña al inversor durante el tramo más largo e incierto de su experiencia: **entre la firma y la entrega**. Ese intervalo dura años, y es justo donde el desarrollador se queda en silencio y el inversor queda en el aire.

La **propuesta de valor es para el desarrollador**: UMBRAL eleva su imagen durante la obra, evita el roce con sus inversores y convierte a cada inversor en un activo (recompra, referido, prestigio) en lugar de un riesgo. La plataforma es el **soporte** de esa propuesta, no la propuesta en sí.

El servicio se divide en **dos productos sobre un mismo backend**:

- **App del inversor** (mobile-first) — la cara linda. El inversor ve novedades, información de su desarrollo, fotos y videos, el estado de su inversión, una base de preguntas frecuentes, puede abrir nuevas dudas y puede pedir vender su unidad.
- **Backoffice** (desktop) — el centro de operación. En el MVP lo opera **únicamente el equipo de UMBRAL**. Da de alta desarrollos e inversores, carga contenido e información, administra el estado de pagos y envía recordatorios por mail.

> **Lo que UMBRAL no es.** No es postventa, no es CRM, no es un comunicador, no es atención al cliente. Es un sistema de **acompañamiento** que, durante la obra, eleva la imagen del desarrollador y convierte la experiencia del inversor en recompra y referido. Las palabras *postventa, CRM, comunicador, soporte* (para describir a UMBRAL) y *promesa* están prohibidas en UI y copy externo (MARCA §3, §10).

---

## 2. Cómo funciona

### 2.1 Flujo del Admin UMBRAL (backoffice)

1. **Por fuera de la plataforma**, UMBRAL se contacta con la desarrolladora para conseguir de antemano: quiénes son sus inversores, las imágenes/videos/novedades del desarrollo y el plan de cuotas. La desarrolladora **no tiene acceso** al sistema en el MVP.
2. El admin **da de alta el desarrollo** y carga sus datos base, estado de obra y plan de cuotas.
3. Dentro de ese desarrollo, **da de alta a cada inversor** y genera un **código de referencia único por inversor** que después le entrega por fuera. Asocia inversor ↔ desarrollo ↔ m² invertidos.
4. **Carga manualmente el contenido** de la app: imágenes, videos, novedades, FAQ y la proyección de valor por m².
5. **Administra los pagos**: marca a mano cada cuota del plan como pagada o pendiente.
6. **Envía avisos por mail** a los inversores: nuevas novedades de obra y recordatorios de cuota.
7. **Gestiona las solicitudes de venta** que llegan desde la app.

### 2.2 Flujo del Inversor (app)

1. **Onboarding por única vez**: ingresa el **código de referencia** que le dio UMBRAL — eso lo valida como inversor legítimo y lo asocia a su desarrollo. Completa datos básicos, incluyendo sus **m² de inversión** (que se usan para la valorización).
2. **Crea su cuenta y entra**: login con **Google** o con **email/contraseña**.
3. Dentro ve la **información de su desarrollo** (novedades, fotos, videos), el **estado de su inversión** (valorización de sus m² + avance de obra + estado de cuotas) y la **FAQ**.
4. Puede **abrir una nueva duda** sobre su desarrollo mediante un formulario.
5. Puede **pedir vender** su unidad: responde un par de preguntas que confirman su decisión y eso dispara un mail al equipo de UMBRAL.

### 2.3 Aislamiento (requisito de seguridad)

Cada inversor ve **únicamente su(s) desarrollo(s)**. El aislamiento lo enforcea el backend a nivel de permisos (por la membresía inversor × desarrollo), no el front.

---

## 3. Roles / usuarios

| Rol | Quién es | Acceso |
|---|---|---|
| **Admin UMBRAL** (superuser) | El equipo de UMBRAL | Backoffice. Ve y opera **todos** los desarrollos. |
| **Inversor** (user) | El comprador que invirtió en un desarrollo | App mobile. Ve **solo lo suyo**. |

> En el MVP **no existe** un rol de desarrolladora con acceso a la plataforma. El contacto con la desarrolladora es por fuera. (Queda como rol futuro: ver §5.)

---

## 4. Funcionalidad y vistas por usuario

### 4.1 Admin UMBRAL (backoffice — desktop)

Regla número uno: **simple, sin fricción, operable por alguien no técnico**.

**Funcionalidad**

- **Dar de alta y configurar desarrollos**: datos base, estado de obra, plan de cuotas del desarrollo.
- **Dar de alta inversores** dentro de un desarrollo y **generar el código de referencia único** por inversor. Asociar inversor ↔ desarrollo ↔ m².
- **Cargar contenido por desarrollo**: imágenes, videos (links/YouTube), novedades (news), FAQ y la curva de valorización por m².
- **Administrar pagos**: marcar a mano cada cuota como pagada/pendiente, sobre el plan de cuotas definido a nivel desarrollo.
- **Enviar avisos por mail** a los inversores de un desarrollo: nuevas novedades y recordatorios de cuota.
- **Bandeja de solicitudes de venta**: ver motivo y datos del inversor para que el equipo actúe.
- **Ver trazabilidad básica del inversor**: métricas históricas simples por inversor (cantidad de logins, último ingreso y similares) para tener data de uso. Solo lectura, sin pretensión de analítica avanzada.

**Vistas**

- Listado de desarrollos · Alta/edición de desarrollo (incluye plan de cuotas).
- Detalle de desarrollo → listado de inversores · Alta de inversor (con código de referencia) · Carga de contenido (imágenes/videos/news/FAQ/valorización).
- Panel de pagos del desarrollo (marcar cuotas).
- Composición y envío de avisos por mail.
- Bandeja de solicitudes de venta.
- Vista de métricas básicas por inversor.

### 4.2 Inversor (app — mobile-first)

**Funcionalidad**

- **Onboarding con código de referencia** y carga de datos (incluye m² de inversión).
- **Login** con Google o email/contraseña.
- **Ver el estado de su inversión**: proyección de valor por sus m² (la joya visual), avance de obra y estado de sus cuotas (pagadas/pendientes).
- **Ver información del desarrollo**: novedades, fotos y videos que cargó el admin.
- **FAQ** del desarrollo, accesible inline.
- **Abrir una nueva duda** sobre su desarrollo vía formulario.
- **Pedir vender su unidad**: cuestionario breve de confirmación (motivo) que dispara un mail al equipo. En la UI se llama **Vender** / "Quiero vender mi unidad" — nunca "abandonar".

**Vistas**

- Onboarding (código de referencia + datos + m²) · Login.
- Home del desarrollo: card del desarrollo (nombre, rango, m², estado) + bloque de valorización por m² + estado de obra + estado de cuotas.
- Contenido: novedades, galería de fotos, videos.
- FAQ.
- Formulario de nueva duda.
- Flujo "Vender" (cuestionario de confirmación).

> **Nota de copy/UI (MARCA §10).** Evitar "soporte" → usar "Ayuda", "Acompañamiento" o "Estamos". A los recordatorios de cuota presentarlos como acompañamiento, no como cobranza fría. Tono sobrio, cálido, arquitectónico, frases cortas, voseo.

---

## 5. Fuera del MVP (visión futura)

Se nombran como visión, se construyen por madurez (el desa "compra futuro", MARCA §8):

- **Acceso de la desarrolladora al backoffice** (rol Admin desarrollador, con permisos acotados: ver sus desarrollos, % vendido, mediciones).
- **Multi-desarrollo en la app** para un mismo inversor (el "+").
- **Integración con cobranza** real (en el MVP los pagos se marcan a mano).
- Banca UMBRAL, Cartilla, beneficios, documentos/escrituras, línea de tiempo detallada, comunidad entre inversores.

---

## 6. Decisiones tomadas (registro)

| Decisión | Resolución MVP |
|---|---|
| Roles del MVP | Solo Admin UMBRAL + Inversor. La desarrolladora se contacta por fuera. |
| Código de referencia | 1 código único por inversor (trazable). |
| Login del inversor | Google + email/contraseña. |
| Pagos | Incluidos. Plan de cuotas **por desarrollo**; el admin marca cada cuota a mano. |
| Estado de inversión (app) | Valorización por m² + estado de obra + estado de pagos. |
| Trazabilidad del inversor | Métricas históricas simples (logins, último ingreso) visibles para el admin. |
