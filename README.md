# Sitio web de Alejandro Alcazar — Agente de seguros médicos

Sitio bilingüe (inglés/español) de captación de clientes, **Paquete B**. Construido con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4. Pensado para alojarse en Netlify.

> **Estado:** primera versión lista para revisión. El sitio funciona, pero **no debe publicarse** hasta completar lo indicado en [PENDING_CLIENT_INFO.md](PENDING_CLIENT_INFO.md). Ejecute `npm run check:launch` para ver qué falta.

---

## 1. Requisitos

- Node.js **22.18 o superior** (probado con Node 24).
- npm 10 o superior.

## 2. Instalación y comandos

```bash
npm install
cp .env.example .env.local   # y complete las variables que necesite
npm run dev                  # desarrollo en http://localhost:3000 (modo revisión)
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo. Muestra los marcadores «Pendiente». |
| `npm run build` | Compilación de producción. |
| `npm start` | Sirve la compilación (`npm run build` antes). |
| `npm test` | Pruebas: rutas, idiomas, validación del formulario, contenido y bloqueo de lanzamiento. |
| `npm run lint` / `npm run typecheck` | ESLint y TypeScript. |
| `npm run check:launch` | Lista todo lo que falta antes de publicar. |

## 3. Cómo está organizado

```
src/
  config/
    site.ts           ← TODOS los datos del negocio (teléfono, correo, licencias, servicios…)
    types.ts          ← tipos de esos datos
    routes.ts         ← URLs en inglés y español
    visibility.ts     ← reglas de qué se muestra (confirmado vs. pendiente)
    readiness.ts      ← reglas del bloqueo de lanzamiento
    lead-env.ts       ← lectura de variables de entorno del formulario
  content/
    en/  es/          ← TODOS los textos visibles, separados por idioma
  components/         ← componentes de presentación (layout, secciones, páginas, formulario)
  lib/                ← i18n, SEO, contacto, validación y envío del formulario, analítica
  app/[lang]/         ← rutas: inicio + una ruta comodín para las páginas internas
  proxy.ts            ← redirección de "/" al idioma preferido (cookie de idioma)
tests/                ← pruebas con node:test
scripts/launch-check.ts
```

**Separación:** datos del negocio → `src/config/site.ts`; textos → `src/content/<idioma>/`; presentación → `src/components/`. No hay páginas duplicadas por idioma: cada página es un componente que recibe el idioma.

## 4. Cómo cambiar los datos de Alejandro

Todo está en **`src/config/site.ts`**. Cada dato tiene esta forma:

```ts
phone: { value: "+13055550123", status: "confirmed" },
```

- `value: null` → todavía no tenemos el dato.
- `status: "pending"` → se ve **solo en modo revisión** con un marcador «Pendiente» y **nunca** en el sitio público.
- `status: "confirmed"` → se publica. Márquelo así **solo** cuando Alejandro lo confirme por escrito.

Ejemplos:

```ts
phone:    { value: "+13055550123", status: "confirmed" },          // formato E.164
email:    { value: "alejandro@dominio.com", status: "confirmed" },
whatsapp: { value: null, status: "confirmed" },                     // confirmado que NO usa WhatsApp
licenses: { value: [{ state: "FL", number: "W123456", verifyUrl: "https://…" }], status: "confirmed" },
photo:    { value: { src: "/images/alejandro.jpg", width: 1200, height: 1500,
                     alt: { en: "Alejandro Alcazar", es: "Alejandro Alcazar" } }, status: "confirmed" },
```

**Servicios:** en `services`, cambie `status` de cada producto a `"confirmed"` (lo vende), `"not-offered"` (desaparece del sitio) o déjelo en `"pending"`.

**Textos aprobados:** en `approvals`, marque `"confirmed"` cuando el cliente/cumplimiento apruebe la biografía, el contenido educativo, las preguntas frecuentes, el aviso de privacidad, el aviso de no afiliación, el consentimiento de contacto y el proceso ACA.

**Aviso TPMO:** pegue el texto exacto y vigente en `tpmoDisclaimer` (en inglés y español). Nunca lo redacte usted.

**Biografía:** en `src/content/en/about.ts` y `src/content/es/about.ts`.

**Dominio:** `url: "https://www.su-dominio.com"` (sin barra final). Sin dominio, el sitio no es indexable.

## 5. Modos de publicación

| Modo | Cuándo | Qué se ve |
|---|---|---|
| **Revisión** | `npm run dev`, o `NEXT_PUBLIC_SHOW_PENDING=1` | Banda superior de «versión de revisión», marcadores «Pendiente», servicios pendientes. Nunca indexable. |
| **Público** | compilación sin esa variable | Solo datos confirmados. Lo pendiente desaparece (los servicios pendientes dan 404). |
| **Lanzamiento** | `REQUIRE_LAUNCH_READY=1` | Como el público, pero **la compilación falla** si queda algo bloqueante. |

`netlify.toml` está configurado en **modo revisión** para todos los despliegues. Al lanzar, siga las instrucciones de ese archivo (quitar `NEXT_PUBLIC_SHOW_PENDING`, activar `REQUIRE_LAUNCH_READY`).

## 6. Idiomas y traducciones

- URLs: `/en/...` y `/es/...`, con slugs traducidos definidos en `src/config/routes.ts` (p. ej. `/en/about` ↔ `/es/sobre-alejandro`).
- `/` redirige al idioma guardado en la cookie `NEXT_LOCALE` (solo contiene `en` o `es`) o al del navegador.
- El selector de idioma lleva a la **misma página** en el otro idioma.
- Cada página traducida declara `lang`, título, descripción, canonical y `hreflang`.
- Para editar textos: `src/content/en/*.ts` y `src/content/es/*.ts`. TypeScript y `npm test` fallan si un idioma tiene claves que el otro no.
- `{name}` y `{brand}` en los textos se sustituyen automáticamente por el nombre del agente / nombre comercial.

## 7. Formulario de contacto

Solo pide: nombre, medio de contacto preferido (teléfono/WhatsApp/correo), teléfono **o** correo según la opción, idioma, tema general, horario preferido y consentimiento. **No pide** números de Medicare o Seguro Social, fecha de nacimiento, diagnósticos, medicamentos ni ingresos, y el servidor descarta cualquier campo adicional.

Funcionamiento:
1. Validación en el navegador (mensajes traducidos, resumen de errores con foco, `aria-invalid`).
2. Server Action (`src/lib/submit-lead.ts`) que **vuelve a validar**, aplica un honeypot antispam y un límite de intentos por IP.
3. Envío real a los destinos configurados. Si no hay ninguno, el visitante ve que la solicitud **no** se envió y se le ofrece llamar o escribir. Nunca se simula un envío.
4. Mensaje de confirmación en pantalla solo cuando al menos un destino aceptó la solicitud.

No se guardan solicitudes en el navegador (`localStorage`) ni en el servidor del sitio.

### Configurar el correo (Resend)

1. Cree una cuenta en <https://resend.com> y verifique el dominio de Alejandro (registros DNS).
2. Cree una API key.
3. Configure en Netlify (Site configuration → Environment variables) y en `.env.local`:
   - `RESEND_API_KEY` — la clave.
   - `LEAD_EMAIL_TO` — buzón que recibe las solicitudes.
   - `LEAD_EMAIL_FROM` — remitente verificado, p. ej. `Sitio web <solicitudes@dominio.com>`.
4. **Vuelva a desplegar** (las variables se leen al compilar y al enviar).

El correo llega con etiquetas en español e inglés, incluye el texto exacto de consentimiento aceptado y la fecha/hora.

### Alternativa: webhook

`LEAD_WEBHOOK_URL` (Zapier, Make, n8n, Google Apps Script, un CRM…) recibe cada solicitud como JSON por `POST`. `LEAD_WEBHOOK_SECRET` (opcional) se envía en el encabezado `X-Lead-Secret`. Puede usar correo y webhook a la vez: basta con que uno acepte la solicitud.

## 8. Agenda (Calendly u otra)

En `site.ts`:

```ts
scheduling: { value: { provider: "Calendly", url: "https://calendly.com/usuario/consulta", allowEmbed: true }, status: "confirmed" },
```

- Se muestra un botón «Agendar una cita» en la página de contacto (abre la agenda en una pestaña nueva).
- Con `allowEmbed: true` aparece además «Mostrar el calendario aquí»: el calendario de terceros **solo se carga si el visitante lo pide**.
- Si se configura un seguimiento de eventos de Calendly, hágalo en la cuenta de Calendly.

## 9. Analítica (Google Analytics 4)

1. Cree una propiedad GA4 y copie el ID de medición (`G-XXXXXXXXXX`).
2. Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` y vuelva a desplegar.

Comportamiento:
- GA **no se carga** hasta que el visitante pulsa «Permitir» en un aviso discreto. «Preferencias de analítica» (pie de página) permite cambiar la decisión.
- Señales de Google y personalización de anuncios desactivadas.
- Eventos de conversión enviados: `call_click`, `whatsapp_click`, `email_click`, `schedule_click`, `schedule_open`, `lead_submit_success`, `lead_submit_error`. Solo incluyen la ubicación del botón y el idioma. **Nunca** nombre, teléfono, correo, tema ni respuestas del formulario.
- Marque estos eventos como «eventos clave» en GA4 si desea medir conversiones.
- No hay píxeles publicitarios. Antes de añadir alguno, revise consentimiento y requisitos aplicables.

## 10. Google Search Console y SEO

- `sitemap.xml` y `robots.txt` se generan automáticamente. **Mientras no haya `site.url` o esté activo el modo revisión, robots.txt bloquea a los buscadores y el sitemap está vacío.**
- Verificación: en Search Console elija el método «Etiqueta HTML», copie el valor de `content` y póngalo en `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. (Alternativa: verificación por DNS en el proveedor del dominio.)
- Envíe `https://su-dominio.com/sitemap.xml` en Search Console tras el lanzamiento.
- Cada página tiene título, descripción, canonical, `hreflang` (en-US, es-US, x-default) y Open Graph (imagen generada en `src/app/[lang]/opengraph-image.tsx`).
- Datos estructurados: `BreadcrumbList` y `Person` **solo con datos confirmados** y solo cuando existe dominio. No se añade dirección, horario ni reseñas.
- **Google Business Profile:** no se ha creado. Requiere la cuenta y autorización de Alejandro.

## 11. Identidad visual

Provisional: azul marino + verde azulado suave, fondos blanco y gris muy claro, tipografía **Atkinson Hyperlegible Next** (diseñada para lectores con baja visión), texto base de 18 px.

- Colores, radios y espaciados: bloque `@theme` en `src/app/globals.css`.
- Tipografía: `src/app/[lang]/layout.tsx`.
- Logotipo tipográfico provisional: `src/components/layout/Logo.tsx` (sustitúyalo por la imagen del logotipo aprobado). Icono del navegador: `src/app/icon.svg`.
- Fotografías: colóquelas en `public/images/` y referéncielas desde `site.ts`. Next.js las optimiza (AVIF/WebP, tamaños responsivos).

## 12. Despliegue en Netlify

1. Suba el proyecto a un repositorio Git (GitHub/GitLab/Bitbucket).
2. En Netlify: *Add new site → Import an existing project*. Netlify detecta Next.js y usa `netlify.toml` (`npm run build`).
3. Configure las variables de entorno (sección 7 y 9).
4. Conecte el dominio de Alejandro (*Domain management*) y active HTTPS.
5. Para el lanzamiento: complete `site.ts`, ponga `url`, siga las instrucciones de `netlify.toml` y despliegue. Si algo bloqueante falta, la compilación fallará indicando qué.

## 13. Servicios externos que requieren cuenta

| Servicio | Para qué | ¿Obligatorio? |
|---|---|---|
| Netlify (u otro hosting compatible con Next.js) | Alojamiento | Sí |
| Registrador de dominio | Dominio propio | Sí |
| Resend (o webhook: Zapier/Make/etc.) | Recibir solicitudes del formulario | Sí, al menos uno |
| Calendly u otra agenda | Citas en línea | Opcional |
| Google Analytics 4 | Métricas | Opcional |
| Google Search Console | Indexación | Recomendado |
| Google Business Profile | Ficha local | Opcional, con autorización del cliente |

## 14. Cumplimiento: aclaraciones importantes

- El sitio incluye **espacios** para el aviso TPMO, el aviso de no afiliación, avisos de marketing, aviso de privacidad y consentimiento. Su presencia **no significa** que el sitio cumpla con las normas de CMS, estatales, de la FTC/TCPA o de las aseguradoras. Todos los textos legales deben ser revisados y aprobados por Alejandro o su responsable de cumplimiento.
- El texto TPMO, el número de organizaciones/planes representados y los avisos de las aseguradoras **no se han redactado**: deben venir del cliente.
- Para ACA/Marketplace, la casilla de contacto **no sustituye** los consentimientos y la documentación que el negocio deba obtener.
- No se usan logotipos de aseguradoras ni testimonios.

## 15. Pruebas realizadas en esta versión

- `npm test`: 25 pruebas (rutas e idioma, bloqueo de lanzamiento, visibilidad, validación del formulario, paridad de contenido EN/ES, ausencia de precios y afirmaciones comerciales).
- `npm run typecheck`, `npm run lint`, `npm run build` (modos revisión, público y lanzamiento).
- Pruebas de extremo a extremo con Chrome sin interfaz: ausencia de desbordamiento horizontal a 390 px y 1366 px, un único `h1` por página, controles etiquetados, enlace «Saltar al contenido», menú móvil con teclado, selector de idioma que conserva la página, validación y envío real del formulario a un webhook local, honeypot y ausencia de errores de JavaScript.

## 16. Posibles ampliaciones (fase 2, no incluidas)

CRM y automatizaciones de seguimiento · campañas publicitarias y píxeles (con consentimiento) · recordatorios de citas · testimonios autorizados · blog/artículos educativos · página por ciudad/condado (SEO local) · integración del formulario con el CRM del cliente · panel de solicitudes. Quedan fuera del Paquete B: cotizador, comparador de planes, inscripciones, Scope of Appointment, portal de clientes y chat con IA.
#   A d v a n t a g e - I n s u r a n c e - A l e j a n d r o  
 