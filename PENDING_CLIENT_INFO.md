# Información pendiente de Alejandro Alcazar

Lista de todo lo que debemos recibir o aprobar **antes de publicar**. Cada dato se guarda en `src/config/site.ts` (o en los archivos de texto indicados) y se marca como `confirmed` solo con confirmación **por escrito**.

`npm run check:launch` muestra en todo momento qué queda pendiente. 🔴 = bloquea la publicación · 🟡 = conviene decidirlo.

## Identidad y perfil

- [ ] 🟡 **Nombre comercial definitivo** — ¿se usa una agencia/marca o el propio nombre? Confirmar la ortografía profesional (**Alcazar** o **Alcázar**).
- [ ] 🟡 **Fotografía profesional** — alta resolución, con autorización de uso en la web. Mientras tanto se muestra un monograma en el modo revisión.
- [ ] 🔴 **Biografía** — en inglés y español (o en un idioma y la traducimos para que la apruebe). Sin años de experiencia, premios ni cifras que no pueda acreditar.
- [ ] 🔴 **Idiomas de atención** — ¿atiende en inglés y en español?
- [ ] 🟡 **Logotipo y colores** — la identidad actual (azul marino + verde azulado, logotipo tipográfico) es provisional.

## Contacto

- [x] **Teléfono del negocio** — (915) 373-2864.
- [ ] 🔴 **Correo electrónico del negocio** — el público y el que recibirá las solicitudes (pueden ser distintos).
- [ ] 🟡 **WhatsApp** — ¿lo usa para el negocio? Si sí, el número. Si no, se elimina el botón.
- [ ] 🔴 **Zona geográfica de atención** — estados/condados/ciudades (debe coincidir con los estados donde tiene licencia).
- [ ] 🟡 **Horario de atención** — si desea publicarlo.
- [ ] 🟡 **Enlace de agenda** — Calendly u otra herramienta (¿cuenta propia?), y si permite mostrar el calendario incrustado.
- [ ] 🟡 **Redes sociales** del negocio, si existen.

## Credenciales

- [ ] 🔴 **Número(s) de licencia** por estado, verificables.
- [ ] 🔴 **NPN** (National Producer Number), verificable en NIPR.
- [ ] 🟡 **Enlaces de verificación** de cada licencia (Departamento de Seguros del estado).

## Productos

Confirmar cuáles comercializa realmente (los no confirmados no aparecerán en el sitio público):

- [ ] Medicare y Medicare Advantage
- [ ] Medicare Supplement / Medigap
- [ ] Medicare Parte D
- [ ] Doble elegibilidad Medicare-Medicaid / D-SNP
- [ ] Medicaid
- [ ] Mercado ACA / Obamacare
- [ ] Orientación para quienes cumplen 65 años

## Cumplimiento y textos legales

- [ ] 🔴 **Aviso TPMO vigente, texto exacto** (en inglés y español), si comercializa Medicare Advantage o Parte D. Incluye el número de organizaciones y planes que representa: **no podemos redactarlo nosotros**.
- [ ] 🟡 **Avisos de marketing** exigidos por aseguradoras/FMO, texto exacto, o confirmación de que no se requieren.
- [ ] 🔴 **Aprobación del aviso de no afiliación con el gobierno** (borrador en `src/content/*/legal.ts`).
- [ ] 🔴 **Aprobación del contenido educativo**: páginas de servicios y «Nuevo en Medicare» (`src/content/*/services.ts`, `guide.ts`).
- [ ] 🔴 **Aprobación de las preguntas frecuentes** (`src/content/*/faq.ts`).
- [ ] 🔴 **Texto de consentimiento de contacto** del formulario (y, si usará mensajes de texto o llamadas automatizadas, el texto adicional que exija su asesoría).
- [ ] 🔴 **Proceso de consentimiento y documentación para ACA**, si vende Marketplace (la casilla del formulario no lo sustituye).
- [ ] 🔴 **Aviso de privacidad aprobado** (borrador en `src/content/*/legal.ts`), incluido el plazo de conservación de las solicitudes y el responsable del sitio.
- [ ] 🟡 **Autorizaciones de logotipos de aseguradoras y testimonios**, solo si se quieren usar (actualmente no se usa ninguno).

## Técnico y cuentas

- [ ] 🔴 **Dominio** — ¿ya lo tiene? ¿Quién lo administra? Acceso a DNS para el correo (Resend) y el hosting.
- [ ] 🔴 **Destino de las solicitudes** — buzón para recibirlas (Resend) o herramienta/CRM vía webhook.
- [ ] 🟡 **Herramientas de terceros que contratará**: hosting (Netlify), Resend, Calendly, Google Analytics 4, Google Search Console, Google Business Profile. Para cada una: ¿cuenta a nombre de quién?
- [ ] 🟡 **Autorización** para crear/gestionar el Google Business Profile, si lo desea.
