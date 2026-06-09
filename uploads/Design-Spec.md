---
title: "Design Spec: UMBRAL MVP v1 (app del inversor + backoffice)"
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
tags: [spec, design, ux, mvp, app-inversor, backoffice]
relacionado:
  - SPECS/mvp-v1/Discovery-Spec
  - SPECS/mvp-v1/PRD-Spec
  - ../../marca/MARCA_UMBRAL.md
  - ../../producto/MVP.md
---

# Design Spec — UMBRAL MVP v1

**Versión:** 1.0
**PRD relacionado:** `PRD-Spec`
**Figma / link al diseño:** _pendiente — los mockups hi-fi se generan a partir de esta spec_
**Aplica a:** ✅ App del inversor (mobile-first) · ✅ Backoffice (desktop)

> **Marca primero.** Toda decisión visual se deriva de `MARCA_UMBRAL.md §11`. El Copy Deck (§5) está escrito en voseo y revisado contra palabras prohibidas. Esta spec es el insumo directo para generar las pantallas demo de la pre-entrega interna.

---

## 0. Fundamentos visuales (resumen operativo de MARCA §11)

> Para que quien diseñe las pantallas no tenga que ir a buscar la marca. Si algo acá choca con `MARCA_UMBRAL.md`, gana la marca.

**Paleta**
| Token | HEX | Uso en producto |
|-------|-----|-----------------|
| Verde primario | `#395714` | Color de marca: header, acentos, CTA primario, bloque de valorización |
| Verde 80% | `#607d4e` | Superficies extensas, fondos secundarios |
| Verde 60% | `#60743c` | Hero, énfasis secundario, anotaciones |
| Verde 40% | `#bfcabb` | Separadores, gradientes, contraste sobre oscuro |
| Verde 10% | `#eef1e8` | Fondos sutiles de bloque (cards, secciones) |
| Off-white | `#fafaf8` | Fondo base de la app |
| Crema | `#f5f4f0` | Superficie alternativa |
| Tinta | `#1a1a1a` | Texto principal |

**Tipografía**
- **DM Serif Display** — títulos, headlines, números grandes (la valorización). Italic para énfasis.
- **Be Vietnam Pro** — UI, cuerpo, labels, navegación, botones.
- **Caveat** — anotaciones manuscritas tipo "nota al margen" / cuaderno de obra (uso puntual, narrativo).

**Logo:** `···U` (U serif verde, antecedida por tres puntos). Variante invertida (blanco sobre verde) para header de marca.

**Estilo:** cuaderno de obra, no render comercial. Sketches arquitectónicos a mano, foto real de obra con anotaciones manuscritas, lenguaje de **hormigón y acero**. Referencias de calidad: **Apple** (claridad, jerarquía), **Berugel** (presencia institucional), **Gobrix** (capa premium arquitectónica).

**Sensación objetivo:** sobrio, cálido, atemporal. "No esperaba esto del mercado inmobiliario."

---

## 1. Inventario de Estados

> Todo lo que puede aparecer en pantalla. Cada estado relevante tiene wireframe (§2) y copy (§5).

### Happy paths

| ID | Flujo | Pantalla(s) involucrada(s) | Frente |
|----|-------|--------------------------|--------|
| HP-01 | Onboarding con código + datos + m² | Onboarding paso 1 (código) → paso 2 (datos + m²) → bienvenida | App |
| HP-02 | Login recurrente | Login (Google / email) → Home | App |
| HP-03 | Ver estado de la inversión | Home del desarrollo (card + valorización + obra + cuotas) | App |
| HP-04 | Ver contenido del desarrollo | Novedades (lista/detalle) · Galería · Videos | App |
| HP-05 | Consultar FAQ | FAQ inline | App |
| HP-06 | Abrir una nueva duda | Formulario de nueva duda → confirmación | App |
| HP-07 | Pedir vender la unidad | Vender (intro → cuestionario → confirmación) | App |
| HP-08 | Dejar un desarrollo operativo | Listado desarrollos → Alta desarrollo (datos + obra + cuotas) | Backoffice |
| HP-09 | Sumar inversor + código | Detalle desarrollo → Alta inversor (código + m²) | Backoffice |
| HP-10 | Cargar contenido | Carga de contenido (imágenes/videos/news/FAQ/valorización) | Backoffice |
| HP-11 | Administrar pagos | Panel de pagos (marcar cuotas) | Backoffice |
| HP-12 | Enviar un aviso | Composición y envío de aviso | Backoffice |
| HP-13 | Gestionar una solicitud de venta | Bandeja de solicitudes | Backoffice |
| HP-14 | Ver trazabilidad del inversor | Métricas por inversor | Backoffice |

### Estados de error

| ID | Error | Trigger | Pantalla donde aparece |
|----|-------|---------|----------------------|
| ERR-01 | Fallo de conexión | API no responde en > 5s | Cualquier vista con datos (app y backoffice) |
| ERR-02 | Sesión expirada | Token inválido o vencido | App y backoffice |
| ERR-03 | Permiso denegado | Inversor sin acceso a ese desarrollo | App (intento de acceso cruzado) |
| ERR-04 | Código de referencia inválido / ya usado | Onboarding paso 1 | App — onboarding |
| ERR-05 | Validación de formulario | Campo vacío/ inválido (email, m², datos) | Onboarding, login, nueva duda, vender, altas backoffice |
| ERR-06 | Falla al enviar (duda / vender / aviso) | El submit no llega | App (duda/vender), backoffice (aviso) |

### Estados de carga

| ID | Acción | Tipo de loading |
|----|--------|----------------|
| LOAD-01 | Carga inicial del home / listados | Skeleton screen |
| LOAD-02 | Acción del usuario (submit, confirmar, marcar cuota) | Spinner inline + botón deshabilitado |
| LOAD-03 | Validación de código en onboarding | Spinner inline en el campo |

### Estados vacíos

| ID | Cuándo aparece | Mensaje y acción sugerida |
|----|---------------|--------------------------|
| EMPTY-01 | Inversor recién validado, desarrollo sin contenido aún | "Tu desarrollo está tomando forma." (sin CTA, presencia tranquila) |
| EMPTY-02 | Sección de novedades / videos / FAQ sin cargar | Mensaje breve por sección |
| EMPTY-03 | Backoffice: desarrollo sin inversores | "Todavía no sumaste inversores." + CTA "Dar de alta inversor" |
| EMPTY-04 | Backoffice: bandeja de ventas vacía | "No hay solicitudes por ahora." |
| EMPTY-05 | Backoffice: listado de desarrollos vacío | "Creá tu primer desarrollo." + CTA |

### Estados de permiso / aislamiento

| ID | Segmento sin acceso | Qué ve |
|----|---------------------|--------|
| PERM-01 | Inversor intenta ver un desarrollo que no es suyo | ERR-03 "No tenés acceso a este desarrollo." (nunca datos de otro) |
| PERM-02 | Inversor sin membresía activa | Pantalla que invita a ingresar su código (vuelve a onboarding paso 1) |

> Admin desarrollador (PERM de roles del backoffice) está fuera del MVP: en el backoffice solo existe Admin UMBRAL, que ve todo.

---

## 2. Wireframes (descripción por pantalla)

> Wireframes en texto estructurado, listos para traducir a hi-fi. Orden de arriba hacia abajo. Mobile = 375px. Desktop = 1280px. Las anotaciones marcan comportamiento.

### App del inversor (mobile-first, 375px)

#### HP-01 · Onboarding paso 1 — Código de referencia
```
┌─────────────────────────────┐
│            ···U             │  logo invertido / verde
│                             │
│   Bienvenido a tu umbral.   │  DM Serif Display
│   Ingresá el código que     │  Be Vietnam Pro, gris tinta
│   te dimos para entrar.     │
│                             │
│  ┌───────────────────────┐  │
│  │  Código de referencia │  │  input grande, foco automático
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │       Continuar       │  │  CTA verde primario, full-width
│  └───────────────────────┘  │
│                             │
│  ¿Ya tenés cuenta? Entrá    │  link a login (HP-02)
└─────────────────────────────┘
```
**Anotaciones:**
- El botón "Continuar" queda deshabilitado hasta que el campo tenga contenido.
- Al validar, spinner inline en el campo (LOAD-03). Si el código es inválido/usado → ERR-04 inline bajo el campo, no modal.
- Fondo off-white, una sola columna, mucho aire. Tono ritual ("umbral").

#### HP-01 · Onboarding paso 2 — Datos + m²
```
┌─────────────────────────────┐
│  ‹ Volver        Paso 2 de 2 │
│                             │
│   Contanos quién sos.       │  DM Serif Display
│                             │
│  Nombre y apellido          │  label + input
│  Email                      │  label + input
│  Tus metros invertidos (m²) │  label + input numérico
│   ⓘ Después lo confirmamos   │  helper Caveat, sutil
│      con vos.               │
│                             │
│  ┌───────────────────────┐  │
│  │      Crear cuenta     │  │  CTA verde, full-width
│  └───────────────────────┘  │
└─────────────────────────────┘
```
**Anotaciones:**
- m² es el dato que alimenta la valorización (RF-A-03). El helper aclara que UMBRAL lo confirma (RF-X-02) — honestidad, no bloquea.
- Validación inline al submit (ERR-05).

#### HP-02 · Login
```
┌─────────────────────────────┐
│            ···U             │
│   Volvé a entrar.           │  DM Serif Display
│                             │
│  ┌───────────────────────┐  │
│  │  Continuar con Google │  │  botón secundario con ícono
│  └───────────────────────┘  │
│        ──── o ────          │
│  Email                      │
│  Contraseña                 │
│  ┌───────────────────────┐  │
│  │        Entrar         │  │  CTA verde
│  └───────────────────────┘  │
│  ¿Olvidaste tu contraseña?  │
└─────────────────────────────┘
```
**Anotaciones:**
- No pide código de referencia (eso es alta, no login). 
- Credenciales inválidas → ERR-05 inline.

#### HP-03 · Home del desarrollo — la joya visual
```
┌─────────────────────────────┐
│  ···U            ⚙          │  header marca + ajustes
│                             │
│  ┌───────────────────────┐  │  CARD DEL DESARROLLO
│  │ [foto/sketch de obra] │  │  imagen con anotación Caveat
│  │  Nombre del desarrollo│  │  DM Serif Display
│  │  Rango xxx–yyy · tus  │  │
│  │  120 m² · En obra     │  │  chips de estado
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │  BLOQUE VALORIZACIÓN (verde)
│  │ Tu valor              │  │  título, fondo verde primario
│  │                       │  │
│  │   USD 312.000   ↗     │  │  número grande DM Serif, +$
│  │   Proyección de       │  │
│  │   tus 120 m²          │  │
│  │   [curva ascendente]  │  │  gráfico de valorización
│  └───────────────────────┘  │
│                             │
│  Avance de obra        72%  │  barra de progreso
│  ▓▓▓▓▓▓▓▓░░                │
│                             │
│  Tus cuotas                 │
│  ● Cuota 8  Pagada          │  lista compacta
│  ○ Cuota 9  Pendiente       │
│                             │
│  Novedades de obra      →   │  acceso a HP-04
│  [card de última novedad]   │
│                             │
├─────────────────────────────┤
│  🏠 Inicio  📷 Contenido     │  bottom nav
│  ❔ Ayuda    ⊘ Vender        │
└─────────────────────────────┘
```
**Anotaciones:**
- El bloque "Tu valor" es el héroe de la pantalla: fondo verde primario, número en DM Serif Display, flecha/curva ascendente. Es lo que diferencia a UMBRAL de un comunicador de obra.
- Cuotas presentadas como acompañamiento, no cobranza. Sin rojo agresivo en "Pendiente" (usar tinta/verde 60%).
- Bottom nav: "Ayuda" (no "soporte"), "Vender" (no "abandonar"). "Vender" se diferencia visualmente pero **no** en rojo de alarma — es una línea de salida, no un botón de pánico.
- Si falta contenido: bloques en EMPTY-01/02, nunca dato inventado (AC-A03c).

#### HP-04 · Contenido (novedades / galería / videos)
- Tabs o secciones: **Novedades** (lista de cards con fecha, título, thumbnail) · **Fotos** (grilla 2 col) · **Videos** (cards con embed de YouTube).
- Detalle de novedad: imagen grande, título DM Serif, cuerpo, fecha. Estética cuaderno de obra (anotaciones Caveat sobre las fotos).
- Vacío por sección → EMPTY-02.

#### HP-05 · FAQ
- Lista de acordeones (pregunta → respuesta inline). Tono cálido. Vacío → EMPTY-02.

#### HP-06 · Nueva duda
- Formulario: campo "Tu duda" (textarea), opcional "asunto". CTA "Enviar". Confirmación cálida al enviar. Errores ERR-05/06.

#### HP-07 · Vender (línea de salida)
```
Paso A — Intro:
  "Quiero vender mi unidad"   título sobrio
  Texto breve: UMBRAL te acompaña en la salida.
  CTA "Continuar"

Paso B — Cuestionario:
  ¿Por qué querés vender? (motivo, opciones + texto libre)
  ¿En qué plazo lo pensás? (opcional)
  CTA "Enviar solicitud"

Paso C — Confirmación:
  ✓ "Recibimos tu solicitud. Te vamos a contactar."
  Tono que comunica oportunidad, no fuga.
```
**Anotaciones:** nunca la palabra "abandonar". El envío dispara mail al equipo (RF-A-06) y aparece en la bandeja del backoffice (HP-13).

### Backoffice (desktop, 1280px)

> Layout general: sidebar izquierda (navegación) + área de contenido. Densidad de información mayor que la app, pero **simple y operable por alguien no técnico** (regla número uno, MVP §4.1).

#### HP-08 · Listado de desarrollos + Alta
```
┌────────────┬──────────────────────────────────────────┐
│  ···U      │  Desarrollos          [+ Nuevo desarrollo] │
│            │  ┌──────────────────────────────────────┐ │
│ Desarrollos│  │ Nombre │ Estado obra │ Inversores │ … │ │
│ Solicitudes│  │ Torre X│ En obra 72% │ 94         │ ›│ │
│ Avisos     │  └──────────────────────────────────────┘ │
│            │  (vacío → EMPTY-05: "Creá tu primer …")    │
└────────────┴──────────────────────────────────────────┘
```
- **Alta/edición de desarrollo:** formulario con secciones: Datos base (nombre, rango, ubicación) · Estado de obra (etiqueta + % avance) · **Plan de cuotas** (cantidad, montos, vencimientos — tabla editable).

#### HP-09 · Detalle de desarrollo → Inversores + Alta de inversor
- Tabla de inversores: nombre, email, m² (con chip confirmado/no confirmado), código de referencia, último ingreso.
- **Alta de inversor:** form (nombre, email, m²). Al guardar → el sistema **genera y muestra el código de referencia único** con botón "Copiar" (para entregarlo por fuera). Chip de m²: "No confirmado" por defecto, acción "Confirmar".

#### HP-10 · Carga de contenido (por desarrollo)
- Pestañas: **Imágenes** (uploader + grilla) · **Videos** (campo de link YouTube + lista) · **Novedades** (editor simple: título + cuerpo + imagen + publicar) · **FAQ** (pares pregunta/respuesta) · **Valorización** (carga de la curva por m²: puntos/valores).

#### HP-11 · Panel de pagos
- Tabla: filas = inversores (o cuotas del plan), columnas = cuotas. Cada celda: toggle Pagada / Pendiente. Cambio guarda inline (LOAD-02). Refleja directo en la app del inversor.

#### HP-12 · Composición y envío de avisos
- Selección de desarrollo + segmento destino. Tipo: Novedad de obra / Recordatorio de cuota. Editor de asunto + cuerpo. Preview. CTA "Enviar". Copy guía: tono de acompañamiento, no cobranza.

#### HP-13 · Bandeja de solicitudes de venta
- Lista de solicitudes: inversor, desarrollo, motivo, fecha, estado (Pendiente / En gestión). Click → detalle con datos del inversor. Vacío → EMPTY-04.

#### HP-14 · Métricas por inversor
- Vista de solo lectura: cantidad de logins, último ingreso, fecha de alta. Sin analítica avanzada.

---

## 3. Mockups de Alta Fidelidad

**Figma — link al proyecto:** _pendiente (se genera a partir de esta spec)_
**Versión del design system usada:** v0 — los fundamentos visuales de §0 son el design system inicial.

### Breakpoints cubiertos
- [x] **Mobile (375px)** — prioritario en la app del inversor
- [ ] Tablet (768px) — adaptación de la app (no prioritario en la demo)
- [x] **Desktop (1280px)** — prioritario en el backoffice

### Estados a diseñar en alta fidelidad para la pre-entrega (prioridad)
**App (la cara linda — máximo cuidado):**
- [ ] HP-01 — Onboarding (2 pasos)
- [ ] HP-02 — Login
- [ ] HP-03 — Home con valorización (**pantalla estrella de la demo**)
- [ ] HP-04 — Contenido (novedades + galería + videos)
- [ ] HP-05 — FAQ
- [ ] HP-07 — Vender (3 pasos)
- [ ] EMPTY-01 — Desarrollo sin contenido aún
- [ ] ERR-04 — Código inválido

**Backoffice:**
- [ ] HP-08 — Listado + Alta de desarrollo (con plan de cuotas)
- [ ] HP-09 — Detalle + Alta de inversor con código generado
- [ ] HP-10 — Carga de contenido
- [ ] HP-11 — Panel de pagos
- [ ] HP-12 — Envío de aviso
- [ ] HP-13 — Bandeja de ventas

---

## 4. Interaction Spec

### Transiciones y animaciones
| Elemento | Tipo de transición | Duración | Easing |
|----------|-------------------|----------|--------|
| Cambio de paso en onboarding/vender | Slide horizontal | 250ms | ease-in-out |
| Modal de confirmación | Fade in + scale | 200ms | ease-out |
| Aviso / toast | Slide desde arriba | 250ms | ease-in-out |
| Curva de valorización (entrada) | Dibujado progresivo de la línea | 600ms | ease-out |
| Skeleton → contenido | Fade cross | 150ms | ease |

> Animación sobria, nunca decorativa de más. El "dibujado" de la curva refuerza la idea de valor que crece, sin caer en efecto gratuito.

### Comportamiento de formularios
**Validación:**
- [x] En tiempo real (onChange) para campos críticos: email, código de referencia, m².
- [x] Al submit para el resto.
- [x] Inline bajo cada campo (no modal).

**Mensajes de error por campo:**
| Campo | Error | Mensaje (voseo) |
|-------|-------|-----------------|
| Email | Formato inválido | "Ingresá un email válido." |
| Código de referencia | Inválido / no encontrado / usado | "Ese código no es válido. Revisalo e intentá de nuevo." |
| m² | Vacío / no numérico | "Ingresá tus metros invertidos." |
| Contraseña | Incorrecta | "Email o contraseña incorrectos." |

### Feedback de acciones
| Acción | Feedback | Duración visible |
|--------|----------|-----------------|
| Guardado exitoso (backoffice) | Toast "Listo, se guardó." | 3s |
| Código de inversor generado | Card con código + botón "Copiar" + "Copiado ✓" | persistente |
| Cuota marcada | Cambio inmediato del estado en la celda | inmediato |
| Error de red | Aviso + botón "Reintentar" | hasta que se cierra |
| Solicitud "Vender" enviada | Confirmación cálida + mail al equipo | pantalla de confirmación |
| Aviso enviado | Toast "Aviso enviado a los inversores." | 3s |

### Navegación y gestos
- [x] El back del dispositivo/navegador funciona en todos los flujos (incluido onboarding y vender).
- [x] Sin trampas de teclado: foco sale de modales con Escape.
- [x] App: bottom nav persistente (Inicio · Contenido · Ayuda · Vender).
- [x] Backoffice: sidebar persistente; breadcrumb en vistas anidadas (Desarrollo › Inversores › Alta).

---

## 5. Copy Deck

> Todo el texto visible. **Voseo rioplatense, tono sobrio/cálido/arquitectónico, frases cortas.** Sin palabras prohibidas (postventa, CRM, comunicador, soporte, atención al cliente, promesa). Vocabulario de reemplazo aplicado (`UMBRAL_PRODUCTO.md §6`).

### Títulos y headlines
| Pantalla / componente | Copy |
|----------------------|------|
| Onboarding paso 1 | "Bienvenido a tu umbral." / "Ingresá el código que te dimos para entrar." |
| Onboarding paso 2 | "Contanos quién sos." |
| Login | "Volvé a entrar." |
| Home — card | (nombre del desarrollo) · "En obra" |
| Home — valorización | "Tu valor" / "Proyección de tus {m²} m²" |
| Home — obra | "Avance de obra" |
| Home — cuotas | "Tus cuotas" |
| Home — contenido | "Novedades de obra" |
| FAQ | "Preguntas frecuentes" |
| Nueva duda | "¿Tenés una duda? Escribinos." |
| Vender intro | "Quiero vender mi unidad" |
| Vender intro (texto) | "Si querés salir, te acompañamos en la venta. Contanos un poco para empezar." |
| Vender confirmación | "Recibimos tu solicitud." / "Te vamos a contactar." |
| Backoffice — desarrollos | "Desarrollos" |
| Backoffice — alta inversor | "Nuevo inversor" |
| Backoffice — pagos | "Pagos" |
| Backoffice — avisos | "Avisos" |
| Backoffice — ventas | "Solicitudes de venta" |

### Labels de formulario
| Campo | Label | Placeholder | Tooltip/helper |
|-------|-------|-------------|---------|
| Código | "Código de referencia" | "Ej: UMB-2026-...." | — |
| Nombre | "Nombre y apellido" | — | — |
| Email | "Email" | "tunombre@email.com" | — |
| m² (inversor) | "Tus metros invertidos (m²)" | — | "Después lo confirmamos con vos." |
| Contraseña | "Contraseña" | — | — |
| Nueva duda | "Tu duda" | "Escribí lo que quieras consultar" | — |
| Motivo (vender) | "¿Por qué querés vender?" | — | — |
| m² (backoffice) | "Metros invertidos (m²)" | — | chip: "No confirmado" / "Confirmado" |
| Plan de cuotas | "Plan de cuotas" | — | "Cantidad, montos y vencimientos del desarrollo" |

### Mensajes de error
| Código | Mensaje para el usuario (voseo) | Nota interna |
|--------|--------------------------------|--------------|
| ERR-01 | "No pudimos conectarnos. Revisá tu conexión e intentá de nuevo." | + botón Reintentar |
| ERR-02 | "Tu sesión expiró. Volvé a ingresar." | |
| ERR-03 | "No tenés acceso a este desarrollo." | aislamiento; nunca mostrar datos de otro |
| ERR-04 | "Ese código no es válido. Revisalo e intentá de nuevo." | inline, onboarding |
| ERR-05 | (por campo, ver §4) | inline |
| ERR-06 | "No pudimos enviar tu mensaje. Probá de nuevo." | + Reintentar |

### Textos de estados vacíos
| Estado | Título | Subtítulo | CTA |
|--------|--------|-----------|-----|
| EMPTY-01 | "Tu desarrollo está tomando forma." | "Pronto vas a ver acá las novedades de tu obra." | — |
| EMPTY-02 | "Todavía no hay nada por acá." | (según sección: novedades / videos / FAQ) | — |
| EMPTY-03 | "Todavía no sumaste inversores." | — | "Dar de alta inversor" |
| EMPTY-04 | "No hay solicitudes por ahora." | — | — |
| EMPTY-05 | "Creá tu primer desarrollo." | — | "Nuevo desarrollo" |

### Avisos y notificaciones que dispara esta feature
| Trigger | Destinatario | Asunto / título | Resumen |
|---------|-------------|-----------------|---------|
| Nueva novedad de obra | inversor | "Novedades de {desarrollo}" | Aviso de acompañamiento; link a la app |
| Recordatorio de cuota | inversor | "Tu próxima cuota de {desarrollo}" | Presentado como acompañamiento, **no** cobranza fría |
| Solicitud de venta | equipo UMBRAL | "Solicitud de venta — {inversor} / {desarrollo}" | Motivo + datos, para actuar |
| Nueva duda | equipo UMBRAL | "Nueva consulta — {inversor} / {desarrollo}" | Texto de la duda |

> Internamente puede ser "notificación"; hacia el inversor se presenta como **acompañamiento / novedad de obra**, nunca como cobranza fría (`UMBRAL_PRODUCTO.md §4, §6`).

### Checklist de marca del Copy Deck
- [x] Todo en voseo rioplatense
- [x] Sin palabras prohibidas (postventa, CRM, comunicador, soporte, atención al cliente, promesa)
- [x] "Vender" (no "abandonar") · "Ayuda" (no "soporte") · recordatorios como acompañamiento
- [x] Sin promesas de tech inexistente (sin "tiempo real")
- [ ] Revisado por el guardián de marca: @santiromero1 — Fecha: ____

---

## 6. Component Inventory

### Componentes existentes que se reutilizan
| Componente | Variante | Link al design system |
|------------|----------|------|
| — (no hay design system previo; este MVP lo inicia) | | |

### Componentes nuevos a crear
| Componente | Descripción | Reutilizable |
|------------|-------------|--------------|
| Botón primario / secundario | Verde primario / outline. Estados: normal, hover, disabled, loading | sí |
| Input + label + error inline | Campo de texto/numérico con validación inline | sí |
| Card de desarrollo | Imagen + nombre + chips de estado (app) | sí |
| Bloque de valorización | Fondo verde, número grande DM Serif, curva ascendente | sí (estrella) |
| Barra de progreso de obra | % avance | sí |
| Lista de cuotas | Ítems pagada/pendiente (tono acompañamiento) | sí |
| Bottom nav (app) | Inicio · Contenido · Ayuda · Vender | sí |
| Card de novedad | Fecha + título + thumbnail + cuerpo | sí |
| Acordeón FAQ | Pregunta/respuesta inline | sí |
| Stepper (onboarding / vender) | Paso X de N + transición slide | sí |
| Toast / aviso | Éxito / error con reintentar | sí |
| Chip de estado | "Confirmado / No confirmado", "En obra", "Pendiente" | sí |
| Sidebar backoffice | Navegación persistente + breadcrumb | sí |
| Tabla (backoffice) | Listados de desarrollos / inversores / cuotas / ventas | sí |
| Generador de código | Card con código + copiar | sí |
| Uploader de contenido | Imágenes / link de video / editor de novedad | sí |
| Toggle de cuota | Pagada / Pendiente con guardado inline | sí |

---

## 7. Criterio de Salida de Design Spec

- [x] Todos los estados del inventario (§1) tienen wireframe (§2) o están descriptos
- [x] Breakpoints relevantes cubiertos (mobile para app, desktop para backoffice)
- [x] Interaction spec completa para formularios y transiciones
- [x] Copy Deck completo y revisado contra la marca (voseo, palabras prohibidas, honestidad)
- [x] Estados de aislamiento (PERM-*) diseñados
- [x] Component inventory distingue qué se construye vs qué ya existe
- [ ] Implementabilidad confirmada por quien va a construir (Santiago front / Olivier back) — pendiente
- [ ] Mockups hi-fi generados ("claude design") y enlazados en §3 — pendiente
- [ ] Sign-off de producto: @santiromero1 — Fecha: ____
- [ ] Sign-off de marca: @santiromero1 (interino) — Fecha: ____

---

*Siguiente paso: 🚪 Gate 1 — Alineación de stakeholders + marca. Luego `Technical-Spec.md`.*
