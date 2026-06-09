# Propuesta de Implementación — MVP Web UMBRAL

> Propuesta para desarrollar una primera versión funcional, simple e informativa de UMBRAL: un webservice responsive pensado para uso mobile por inversores y un back office web para desarrolladoras y superuser.

Fecha: mayo 2026  
Versión: MVP simplificado v2

---

## 1. Objetivo

El objetivo de esta primera versión es construir una plataforma clara y práctica para que cada inversor pueda entrar desde el navegador de su celular y ver la información básica de sus inversiones activas, cómo están rindiendo y la información general de los proyectos asociados.

Del lado operativo, la plataforma permitirá que las desarrolladoras carguen solicitudes de alta o actualización de proyectos. Esa información no se publica directamente: queda pendiente de revisión y aprobación por parte del superuser de UMBRAL.

La lógica central del MVP es simple:

- El inversor mira información.
- La desarrolladora carga solicitudes.
- UMBRAL revisa, aprueba y publica.

## 2. Alcance Del MVP

El MVP contempla tres superficies principales:

1. Webservice responsive para inversores, diseñado primero para tamaño mobile.
2. Back office web para desarrolladoras.
3. Back office web para superuser UMBRAL.

### App Del Inversor

El inversor podrá:

- Loguearse.
- Ver sus inversiones activas.
- Ver una card general de sus inversiones.
- Ver una card de resumen de inversiones.
- Ver cards de cada inversión individual.
- Entrar al detalle de cada inversión.
- Consultar información general del proyecto asociado.
- Acceder a una sección de soporte dentro del detalle de inversión.

El lado del inversor será puramente informativo. El inversor no carga contenido, no edita datos de inversión y no administra información del proyecto.

### Navegación Del Inversor

La experiencia del inversor tendrá login y una pantalla principal: **Home**.

**Home**

- Card general de inversiones.
- Card de resumen de inversiones.
- Cards con cada inversión individual.
- Acceso al detalle de cada inversión.

**Detalle De Inversión**

- Información específica de esa inversión.
- Información general del proyecto asociado.
- Fotos, videos o links del proyecto.
- Sección de soporte con preguntas frecuentes.
- Trigger para enviar una duda específica por email.

### Back Office Desarrolladora

La desarrolladora podrá:

- Loguearse.
- Ver la lista de sus clientes/inversores.
- Ver la lista de sus proyectos.
- Solicitar la creación de un nuevo proyecto.
- Cargar información general del proyecto.
- Cargar fotos, videos, links y contenido asociado.
- Solicitar actualizaciones sobre proyectos existentes.
- Ver el estado de sus solicitudes: pendiente, aprobada o rechazada.
- Dar de alta inversores asociados a sus proyectos.

La desarrolladora no publica directamente. Todo cambio queda pendiente de aprobación.

### Back Office Superuser UMBRAL

El superuser podrá:

- Loguearse.
- Ver la lista de desarrolladoras.
- Ver solicitudes pendientes de alta o actualización.
- Aprobar solicitudes.
- Rechazar solicitudes.
- Publicar automáticamente la información aprobada en la app.
- Supervisar altas de inversores y envío de credenciales.

El superuser es quien mantiene el control editorial y operativo de la información publicada.

## 3. Alta De Inversores

Cuando una persona invierte en un desarrollo, la desarrolladora la da de alta en el sistema con sus datos básicos y la inversión asociada.

Desde UMBRAL se envían las credenciales de bienvenida por email.

Flujo recomendado:

1. La desarrolladora carga el inversor.
2. El sistema crea el usuario.
3. El inversor queda asociado a una o más inversiones.
4. UMBRAL envía email de bienvenida con acceso.
5. El inversor ingresa y consulta su información.

No habrá signup público.

## 4. Gestión De Proyectos Y Contenido

La información general del proyecto se guardará en base de datos o CMS interno.

Esa información será común para todos los inversores que accedan al proyecto.

Puede incluir:

- Descripción general.
- Estado del proyecto.
- Fotos.
- Videos o links externos.
- Documentos o enlaces relevantes.
- Información comercial/institucional.
- Datos de avance o rendimiento cargados manualmente.

La desarrolladora puede proponer altas y actualizaciones, pero la publicación final depende de la aprobación del superuser.

## 5. Arquitectura General

La solución se construirá como una aplicación web moderna, separada de la landing pública actual.

Stack propuesto:

- Frontend inversor responsive/mobile: Next.js.
- Back office web: Next.js.
- Backend/API: Hono o API integrada en Next.js, según se priorice velocidad.
- Base de datos: Supabase Postgres.
- Autenticación: Supabase Auth.
- Emails: Resend.
- Archivos e imágenes: Supabase Storage o Cloudflare R2.
- Deploy: Vercel.

Para mantener el MVP práctico, se recomienda construir un webservice responsive, pensado primero para tamaño mobile, en lugar de una app nativa. Esto permite validar rápido, reducir costo y dejar mejor preparado un eventual pasaje futuro a app.

## 6. Modelo De Datos Base

El MVP necesita las siguientes entidades:

- Usuarios con roles: inversor, desarrolladora, superuser.
- Desarrolladoras.
- Proyectos.
- Media de proyectos: fotos, videos, links.
- Inversiones: relación inversor-proyecto, monto y rendimiento.
- Solicitudes pendientes: altas y actualizaciones de proyectos.

Esto cubre el ciclo principal:

1. Desarrolladora carga información.
2. Superuser aprueba o rechaza.
3. Inversor visualiza información publicada.

## 7. Pantallas Estimadas

### Webservice inversor

- Login.
- Home.
- Detalle de inversión.
- Información del proyecto dentro del detalle de inversión.
- Soporte / preguntas frecuentes dentro del detalle de inversión.
- Envío de duda específica por email.
- Estados de carga, vacío y error.

### Back office

- Login.
- Vista superuser: lista de desarrolladoras.
- Vista superuser: solicitudes pendientes.
- Vista desarrolladora: lista de clientes.
- Vista desarrolladora: lista de proyectos.
- Formulario de alta de proyecto.
- Formulario de actualización de proyecto.
- Formulario de alta de inversor.
- Estados de solicitud: pendiente, aprobada, rechazada.

Total estimado: **14 a 18 pantallas/estados principales**.

## 8. Tiempo De Implementación

La estimación de trabajo para este MVP simplificado es de **220 a 260 horas**.

Escenario recomendado:

- **7 a 9 semanas**.
- Vos como developer principal.
- Apoyo frontend part-time para acelerar UI mobile, back office y pulido visual.

Escenario alternativo:

- **9 a 11 semanas** si el desarrollo lo realizás solo.

El alcance es más simple del lado del inversor que la propuesta anterior, pero incorpora un flujo de aprobación para desarrolladoras que debe implementarse con cuidado.

## 9. Inversión

La implementación inicial del MVP se puede mantener en:

**USD 5.000**

Este valor contempla:

- Diseño funcional del producto.
- Arquitectura técnica.
- Desarrollo frontend y backend.
- Base de datos y permisos.
- Webservice responsive para inversor, diseñado para tamaño mobile.
- Back office para desarrolladora.
- Back office para superuser.
- Flujo de solicitudes pendientes.
- Emails de bienvenida y recuperación.
- Storage de archivos.
- Deploy inicial.
- QA y ajustes de cierre.
- 15 días de estabilización posterior al lanzamiento.

El valor no incluye:

- Costos mensuales de infraestructura.
- Dominio, servicios externos o herramientas pagas.
- Mantenimiento mensual posterior.
- App mobile nativa.
- Cambios estructurales fuera del alcance aprobado.
- Asesoría legal, contable o redacción legal formal.

## 10. Costos Operativos Estimados

Antes de operar con usuarios reales, el proyecto puede mantenerse cercano a costo cero usando planes gratuitos para desarrollo y demo.

Con el primer cliente real, se estima una infraestructura mensual inicial de aproximadamente:

**USD 45 a USD 65 mensuales**

Los valores pueden variar según uso real, cantidad de archivos, volumen de emails y pricing vigente de cada proveedor.

## 11. Fuera De Alcance Del MVP

Para mantener una primera versión viable, quedan fuera:

- App mobile nativa.
- WhatsApp Business.
- Chat interno.
- Pagos o cobros dentro de la plataforma.
- Firma digital.
- Banca UMBRAL.
- Cartilla UMBRAL.
- Comunidad entre inversores.
- Automatizaciones avanzadas.
- Reportes exportables complejos.
- Integraciones con software externo.
- Carga directa sin aprobación del superuser.

## 12. Evolución Posterior

Luego del MVP, la evolución debería definirse en base al uso real de inversores y desarrolladoras.

Posibles líneas futuras:

- Reportes automáticos para desarrolladoras.
- Mejoras en rendimiento y métricas de inversión.
- Importación masiva de inversores.
- Archivo histórico optimizado.
- Notificaciones por WhatsApp.
- App nativa si el uso lo justifica.
- Módulos de beneficios o cartilla curada.

La recomendación es validar primero el circuito básico antes de sumar nuevas capas.

## 13. Próximos Pasos

Para avanzar, se recomienda:

1. Validar el alcance simplificado.
2. Definir qué significa "rendimiento" en esta etapa: valor manual, porcentaje, monto acumulado u otro indicador.
3. Definir el contenido inicial de preguntas frecuentes de soporte.
4. Definir a qué casilla llega la duda específica enviada por email.
5. Definir si los videos se suben al sistema o se cargan como links externos.
6. Confirmar si habrá apoyo frontend part-time.
7. Iniciar Sprint 0: repositorio, base visual, modelo de datos, auth y primer flujo end-to-end.

## 14. Cierre

Esta versión del MVP prioriza lo esencial: que el inversor pueda acceder rápido a información clara sobre sus inversiones, y que UMBRAL mantenga control sobre lo que se publica.

El sistema no intenta resolver todos los módulos futuros. Construye una base operativa simple para validar el producto, ordenar la información y preparar una evolución más robusta a partir del uso real.
