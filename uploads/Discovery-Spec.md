---
title: "Discovery: UMBRAL MVP v1 (app del inversor + backoffice)"
area: specs
audiencia: interno
tipo: spec
sensibilidad: interno
owner: "@santiromero1"
estado: borrador
revision-cada: "30d"
ultima-revision: "2026-06-09"
feature-status: backlog
tags: [spec, discovery, mvp, app-inversor, backoffice]
relacionado:
  - SPECS/mvp-v1/PRD-Spec
  - SPECS/mvp-v1/Design-Spec
  - ../../producto/MVP.md
  - ../../producto/UMBRAL_PRODUCTO.md
  - ../../marca/MARCA_UMBRAL.md
---

# Discovery — UMBRAL MVP v1

**Aplica a:** ✅ App del inversor (mobile) · ✅ Backoffice (desktop) · ✅ Backend

> Alcance del MVP definido en `../../producto/MVP.md`. Este Discovery no inventa producto: ordena el problema, la evidencia y las restricciones que justifican ese alcance, para habilitar el PRD y el Design.

---

## 1. Problem Statement

> Sin soluciones, tecnología ni UI. Solo el problema.

### ¿Quién tiene el problema?

Tres actores, en cadena:

1. **El desarrollador inmobiliario** (quien paga). Durante la obra —el tramo más largo del proceso, que dura años— su imagen se desgasta sin que lo note. Es el período donde más se juega el prestigio y donde menos hace por sostenerlo: atiende si lo llaman, no se adelanta, no genera cercanía. Ese desgaste no se ve hasta la entrega o hasta la venta siguiente que no llega.
2. **El inversor** (usuario final). Entre la firma y la entrega queda en silencio y en el aire: no sabe cómo avanza lo suyo, cuánto vale hoy lo que compró, ni a quién recurrir. La relación se vuelve fría y transaccional.
3. **El equipo UMBRAL** (operación). Tiene una propuesta de acompañamiento pero no tiene cómo entregarla de forma ordenada y a escala: sin un lugar único para dar de alta desarrollos e inversores, curar contenido, llevar el estado de pagos y recibir las intenciones de venta, el acompañamiento depende de esfuerzo manual disperso y no es repetible proyecto a proyecto.

### ¿Cuál es la situación actual?

- El desarrollador comunica por mail o grupos de WhatsApp, de forma reactiva. No hay una capa que ocupe el espacio entre la firma y las llaves.
- El inversor recibe poco y nada; cuando aparece una duda, la fricción se traslada al desarrollador.
- UMBRAL no tiene plataforma: la propuesta existe en la marca y en los wireframes, pero no hay un soporte operativo que la haga real ni una "cara linda" que el inversor pueda ver.

### ¿Cuál es el impacto de no resolverlo?

- **Para el desarrollador:** imagen mediocre durante la obra, roce con inversores, y el costo invisible —el inversor que no recompra y no recomienda. Prestigio y ventas futuras perdidas.
- **Para el inversor:** desconfianza, sensación de abandono, pérdida de pertenencia.
- **Para UMBRAL:** sin plataforma no hay producto que mostrar ni vender; la propuesta de valor queda en el plano del relato.

### ¿Qué evidencia tenemos de que este problema es real?

- **Fuente 1 — `MARCA_UMBRAL.md` §6 (El dolor):** validado por el cliente con conversaciones reales con 2 desarrolladoras + 11 años midiendo el comportamiento del inversor. Cita textual del cliente sobre la frustración del desa en la comunicación.
- **Fuente 2 — `UMBRAL_PRODUCTO.md` §1–§4:** define el espacio "entre la firma y la entrega" como el núcleo, la valorización por m² como "la joya visual" y la operación del backoffice como soporte de la propuesta.
- **Fuente 3 — `MVP.md` (§1, §2, §6):** alcance funcional ya acordado con decisiones tomadas (roles, código de referencia, login, pagos, estado de inversión).
- **Fuente 4 — Wireframes referenciados** en `UMBRAL_PRODUCTO.md` §3 (home, bloque verde de valorización, botón "Vender" que reemplaza "Abandonar proyecto", "desarrollos +").

---

## 2. Stakeholders y Restricciones

### Stakeholders

| Rol | Nombre | Tipo de involucramiento | Nivel de influencia |
|-----|--------|------------------------|---------------------|
| Dueña de la idea / negocio | (impulsora de UMBRAL — contactó a Olivier) | Visión, prioridades, recibe la pre-entrega | Alta |
| Frontend + producto | @santiromero1 (Santiago) | Responsable de front, escribe specs, aprueba producto | Alta |
| Backend / tech | Olivier | Implementa y aprueba lo técnico del backend compartido | Alta |
| Guardián de marca | @santiromero1 (interino) | Valida copy y posicionamiento contra `MARCA_UMBRAL.md` | Alta |
| Desarrollador (cliente B2B) | — (fuera del MVP) | Validar valor para su negocio (visión futura) | Media |
| Inversor representativo | — (a reclutar) | Validar problema y solución | Media |

> **Audiencia de la pre-entrega:** stakeholders internos de UMBRAL. La demo de pantallas valida que el producto refleja la visión antes de seguir construyendo. La desarrolladora no participa todavía (no tiene acceso en el MVP).

### Restricciones Técnicas

- [x] **Un backend compartido** sirve a los dos frontends (app + backoffice). Lo que carga el backoffice aparece directo en la app, sin duplicar lógica.
- [x] **Dos frontends separados:** app mobile-first (inversor) y backoffice desktop (operación).
- [x] **Aislamiento por (inversor × desarrollo)** enforced en el backend a nivel de permisos, no en el front. Requisito de seguridad, no de UI.
- [x] **Login del inversor:** Google + email/contraseña.
- [x] **Pagos marcados a mano:** sin integración con sistema de cobranza del desa en el MVP.
- [x] **Contenido cargado manualmente** por el equipo (imágenes, videos por link/YouTube, novedades, FAQ, curva de valorización).

### Restricciones de Negocio

- [x] **La desarrolladora no accede al sistema en el MVP.** Todo el contacto con ella es por fuera de la plataforma. El rol "Admin desarrollador" queda como visión futura.
- [x] **Roles del MVP:** solo Admin UMBRAL (superuser) + Inversor.
- [x] **Mercado objetivo:** desa mediano premium, ~90+ inversores por proyecto, inicio en CABA.
- [x] **El desa "compra futuro":** la visión se nombra completa aunque se construya por madurez (MARCA §8). El MVP es el primer ladrillo, no el producto final.

### Alineación de Marca (obligatorio en UMBRAL)

- [x] **Introduce copy/UI visible** → revisar palabras prohibidas y tono (`MARCA_UMBRAL.md` §3, §10). La app y el backoffice tienen copy visible.
- [x] **Nombra acciones y vistas** → validar contra el vocabulario de reemplazo (`UMBRAL_PRODUCTO.md` §6): "Vender" (no "abandonar"), "Ayuda/Acompañamiento" (no "soporte"), "Novedades de obra" (no "notificaciones de cobranza").
- [x] **Riesgo de prometer comportamiento inexistente** → nada de "tiempo real". Usar "tus metros avanzan. Cada etapa se comunica, se registra y se comparte".
- [ ] No introduce nada visible al usuario.

### Aislamiento de datos (obligatorio en UMBRAL)

- [x] **Toca datos del inversor** → la solución debe respetar el aislamiento por (inversor × desarrollo). Cada inversor ve solo su(s) desarrollo(s).
- [x] **Toca el backoffice** → en el MVP solo existe Admin UMBRAL (ve y opera todo). Admin desarrollador es futuro.
- [ ] No toca datos sensibles.

### Dependencias

| Dependencia | Estado | Responsable |
|-------------|--------|-------------|
| Datos provistos por la desarrolladora por fuera (inversores, imágenes/videos/novedades, plan de cuotas) | Bloqueante para poblar un desarrollo real | Equipo UMBRAL (gestión externa) |
| Identidad visual aplicable (paleta, tipografías DM Serif Display / Be Vietnam Pro / Caveat, logo ···U) | Resuelta — definida en `MARCA_UMBRAL.md` §11 | Guardián de marca |
| Proveedor de auth (Google + email/contraseña) | A definir en Technical Spec | Olivier (backend) |
| Envío de mails (avisos, recordatorios, alerta de "Vender") | A definir en Technical Spec | Olivier (backend) |

---

## 3. Usuarios y Jobs-to-be-Done

### Segmentos afectados

- [x] **Inversor** (usuario final de la app, mobile-first)
- [x] **Equipo UMBRAL** (opera todo el backoffice)
- [ ] Desarrollador (cliente B2B que paga) — fuera del MVP
- [ ] Admin desarrollador (opera su desarrollo) — visión futura

### Jobs-to-be-Done

> "Cuando [situación], quiero [motivación], para [resultado esperado]"

**Inversor**
- Cuando pasan meses desde que firmé y no sé nada de mi inversión, quiero ver cómo avanza mi obra y cuánto valen hoy mis m², para sentir que lo que compré sigue siendo una buena decisión.
- Cuando me surge una duda sobre mi desarrollo, quiero preguntar sin tener que perseguir a nadie por teléfono, para resolverla con tranquilidad.
- Cuando necesito o quiero salir de mi inversión, quiero avisar que quiero vender mi unidad, para que UMBRAL me acompañe en esa salida en lugar de quedar a la deriva.

**Equipo UMBRAL**
- Cuando sumo una desarrolladora nueva, quiero dar de alta su desarrollo y sus inversores rápido y sin trabarme, para tener el proyecto operativo sin depender de alguien técnico.
- Cuando tengo novedades de obra o llega el momento de una cuota, quiero cargar el contenido y avisar a los inversores del desarrollo, para sostener la presencia que eleva la imagen del desa.
- Cuando un inversor pide vender, quiero verlo a tiempo con su motivo y sus datos, para que el equipo actúe antes de perder al inversor.

---

## 4. Métricas de Éxito

> Métrica primaria elegida para el MVP: **operación sin fricción**. El primer hito es que el equipo UMBRAL pueda hacer existir y operar un desarrollo completo sin ayuda técnica, y que el inversor pueda ver "lo suyo" tal como lo imaginó la marca.

### Métrica primaria

| Métrica | Estado actual | Target | Timeframe | Cómo se mide |
|---------|--------------|--------|-----------|--------------|
| Tiempo y autonomía para dejar un desarrollo operativo (alta de desarrollo + ≥1 inversor con código + contenido base + valorización cargada) por un operador no técnico, sin asistencia | No existe plataforma (hoy: imposible / manual disperso) | Un operador no técnico lo completa de punta a punta en una sola sesión, sin pedir ayuda | Demo interna del MVP | Observación directa en la pre-entrega + checklist de pasos completados sin bloqueo |

### Métricas secundarias

| Métrica | Dirección esperada | Cómo se mide |
|---------|-------------------|--------------|
| Inversor que activa su código de referencia y llega al home con su valorización visible | ↑ | Recorrido de prueba en la demo (happy path completo sin errores) |
| Trazabilidad básica del inversor visible para el admin (logins, último ingreso) | Presente y legible | Vista de métricas por inversor en el backoffice |
| Solicitudes de "Vender" que llegan a la bandeja con motivo + datos | ↑ (que el flujo dispare y registre) | Bandeja de solicitudes en el backoffice |

### Métricas de guardrail

> No deben empeorar / deben cumplirse siempre.

| Métrica | Umbral mínimo aceptable |
|---------|------------------------|
| Aislamiento por membresía | 0 casos en que un inversor vea un desarrollo que no es suyo |
| Cumplimiento de marca en copy visible | 0 palabras prohibidas (postventa, CRM, comunicador, soporte, atención al cliente, promesa); todo en voseo |
| Honestidad técnica | 0 promesas de comportamiento inexistente (ej: "tiempo real") |

---

## 5. Criterio de Salida de Discovery

- [x] Problem statement escrito sin mencionar soluciones y acordado por producto y stakeholders
- [x] Al menos una fuente de evidencia primaria documenta el problema (MARCA §6: 2 desarrolladoras + 11 años)
- [x] Stakeholders mapeados con nivel de involucramiento
- [x] Restricciones técnicas y de negocio documentadas
- [x] Alineación de marca evaluada (palabras prohibidas, tono, honestidad)
- [x] Aislamiento de datos evaluado (la feature toca datos del inversor)
- [x] Métricas de éxito definidas con targets y forma de medición
- [x] Dependencias identificadas con estado

---

*Siguiente paso: completar `PRD-Spec.md`*
