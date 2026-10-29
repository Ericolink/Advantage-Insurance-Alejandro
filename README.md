# Sitio web de Alejandro Alcazar — Health Insurance Guidance

Sitio bilingüe (inglés/español) e informativo con captación básica de consultas para un agente de seguros médicos en EE. UU. Construido con **Next.js 16** (App Router, páginas estáticas + una Server Action para el formulario), React 19, TypeScript y Tailwind CSS 4. Pensado para Netlify (vale cualquier hosting compatible con Next.js).

La identidad visual y el comportamiento siguen el handoff de Claude Design **«Steady Guidance»** (hojas 01 Identidad y tokens · 02 Componentes y estados · 03 Handoff y datos pendientes).

> **Estado:** lista para revisión del cliente. **No debe publicarse** hasta completar [PENDING_CLIENT_INFO.md](PENDING_CLIENT_INFO.md). `npm run check:launch` dice en todo momento qué falta. Antes de publicar, siga [docs/launch-checklist.md](docs/launch-checklist.md).

## Documentación

| Documento | Para qué |
|---|---|
| [PENDING_CLIENT_INFO.md](PENDING_CLIENT_INFO.md) | Datos y aprobaciones que debe dar Alejandro |
| [docs/editing-content.md](docs/editing-content.md) | Cómo editar textos (EN/ES) y datos del negocio |
| [docs/integrations.md](docs/integrations.md) | Correo del formulario (Resend/webhook), agenda (Calendly), analítica, Search Console |
| [docs/launch-checklist.md](docs/launch-checklist.md) | Comprobaciones previas a la publicación |
| [.env.example](.env.example) | Variables de entorno (sin valores reales) |

## 1. Requisitos e instalación

- Node.js **22.18 o superior** (probado con Node 24) y npm 10+.

```bash
npm install
cp .env.example .env.local   # complete solo lo que necesite
npm run dev                  # http://localhost:3000 (modo revisión)
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo. Muestra los marcadores de pendiente. |
| `npm run build` / `npm start` | Compilación de producción / servirla. |
| `npm test` | Rutas e idiomas, bloqueo de lanzamiento, visibilidad, validación del formulario, paridad EN/ES, ausencia de afirmaciones comerciales y fidelidad a los tokens de diseño. |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript. |
| `npm run check:launch` | Lista lo que falta antes de publicar. |

## 2. Organización

```
src/
  config/        ← DATOS DEL NEGOCIO (site.ts), rutas, visibilidad, bloqueo de lanzamiento
  content/en|es/ ← TODOS los textos visibles, separados por idioma (misma estructura obligatoria)
  components/
    layout/      SiteHeader · TopBar · LanguageSwitch · BrandMark · MainNav · MobileMenu
                 SiteFooter · LegalNav · ReviewBanner · Analytics
    ui/          Button · Section/Container/Eyebrow · Accordion · Notice · Pending · PhotoFrame
                 StepList · CompareColumns · Icon · ExternalLink
    content/     PageHero · Breadcrumbs · DisclosureBlock (+TpmoNotice) · ContactButtons
                 AgentPhoto · OfficialLinks
    sections/    HomeSections · ServiceCard (+ServiceGrid) · CTABand
    pages/       About · Contact · Content (servicios, plantilla de servicio, Medicare, FAQ) · Legal
    forms/       ContactForm · Scheduler
  lib/           i18n, SEO, contacto, validación y envío del formulario, analítica
  app/[lang]/    inicio + ruta comodín para todas las páginas internas
  proxy.ts       "/" → idioma guardado (cookie) o del navegador
tests/           node:test
```

No hay páginas duplicadas por idioma: cada página es un componente que recibe el idioma; los textos salen de `src/content/<idioma>/`.

## 3. Rutas

| Página | Inglés | Español |
|---|---|---|
| Inicio | `/en` | `/es` |
| Sobre Alejandro | `/en/about` | `/es/sobre-alejandro` |
| Servicios | `/en/services` | `/es/servicios` |
| Servicio (plantilla) | `/en/services/[slug]` | `/es/servicios/[slug]` |
| ¿Nuevo en Medicare? | `/en/new-to-medicare` | `/es/nuevo-en-medicare` |
| Preguntas frecuentes | `/en/faq` | `/es/preguntas` |
| Contacto | `/en/contact` | `/es/contacto` |
| Privacidad · Términos · Avisos | `/en/privacy` · `/en/terms` · `/en/disclosures` | `/es/privacidad` · `/es/terminos` · `/es/avisos` |

- Los slugs están en `src/config/routes.ts`; los de cada servicio, en `site.ts`.
- El selector de idioma lleva a **la misma página** en el otro idioma. `/` redirige según la cookie `NEXT_LOCALE` (solo guarda `en`/`es`) o el navegador (inglés por defecto).
- URL antiguas (`/es/preguntas-frecuentes`, `/en/disclaimers`) redirigen con 308.
- **Servicios pendientes** solo existen en modo revisión; en el sitio público dan 404 y no aparecen en tarjetas, formulario ni sitemap.
- **Términos** no existe en el sitio público hasta que su texto esté aprobado (`approvals.terms`).

## 4. Modos de publicación

| Modo | Cuándo | Qué se ve |
|---|---|---|
| **Revisión** | `npm run dev` o `NEXT_PUBLIC_SHOW_PENDING=1` | Banda superior de revisión; textos `[ENTRE CORCHETES]` y recuadros rojos discontinuos para lo que falta; servicios pendientes; espacios para fotos. Nunca indexable. |
| **Público** | compilación sin esa variable | Solo datos confirmados. Ningún marcador llega al HTML. |
| **Lanzamiento** | `REQUIRE_LAUNCH_READY=1` | Como el público, pero **la compilación falla** si queda algo bloqueante. |

`netlify.toml` está en modo revisión. Al lanzar, siga sus comentarios.

## 5. Identidad visual (Steady Guidance)

- **Tokens** en el bloque `@theme` de `src/app/globals.css`, con los valores exactos del handoff: `red-600 #B42332`, `red-700 #861D2A`, `navy-900 #18324B`, `navy-50`, `gray-700/600/500/200/50`, `green-700/50`. La paleta y la escala tipográfica por defecto de Tailwind están **eliminadas**: solo existen los tokens del diseño, y `tests/design-tokens.test.ts` falla si un componente usa otro color o un tamaño menor de 16 px.
- **Tipografía:** Public Sans (autoalojada por `next/font`, pesos 400/600/700/800), texto base 18 px, mínimo 16 px, escala fluida H1 36→56, H2 30→40, H3 22→26.
- **Rojo:** un botón rojo por zona, la marca y la línea de acento de los eyebrows. Nunca fondo de sección, texto de cuerpo ni único indicador de error.
- **Foco:** anillo navy de 3 px con 3 px de separación (blanco sobre navy). Objetivos táctiles ≥ 48 px.
- **Movimiento:** solo transiciones de color de 150 ms (y el giro del icono del acordeón), anuladas con `prefers-reduced-motion`.
- **Logotipo provisional:** `src/components/layout/BrandMark.tsx` y `src/app/icon.svg`. La imagen para redes se genera en `src/app/[lang]/opengraph-image.tsx`.

**Única desviación del handoff:** la navegación de escritorio en línea (con el CTA) aparece desde **1280 px** en lugar de 1024 px. Entre 1024 y 1279 px se usa el menú compacto, porque las etiquetas en español no caben en una fila a 1024 px con el tamaño mínimo de texto. Por la misma razón, el lema del logotipo se oculta en el header entre 1280 y 1535 px.

## 6. Formulario de contacto

Campos (según el handoff): **nombre\***, **teléfono\***, correo (opcional), mejor horario, tema, mensaje breve (opcional, 500 caracteres, con aviso de no incluir datos médicos) y **consentimiento\***. No pide números de Medicare o del Seguro Social, fecha de nacimiento, diagnósticos, medicamentos ni ingresos, y el servidor ignora cualquier campo adicional.

- Validación al salir de cada campo y al enviar, con resumen de errores enlazado y enfocado, `aria-invalid` y mensajes con icono y texto.
- Server Action (`src/lib/submit-lead.ts`) que vuelve a validar, con honeypot antispam y límite de intentos por IP.
- Botón «Sending…» deshabilitado durante el envío (sin envíos duplicados).
- **Nunca simula un envío:** sin destino configurado, el visitante lee que la solicitud **no** se envió. El éxito solo aparece si al menos un destino aceptó la solicitud. Un fallo de red muestra un error con el teléfono como alternativa.
- Nada se guarda en el navegador ni en el servidor del sitio; los registros solo contienen el motivo del fallo, nunca datos del visitante.

Configuración: [docs/integrations.md](docs/integrations.md).

## 7. SEO

- Título, descripción, canonical, `hreflang` (en-US, es-US, x-default) y Open Graph en cada página.
- `robots.txt` bloquea y `sitemap.xml` está vacío mientras no haya `site.url` o esté activo el modo revisión.
- Las páginas cuyo texto no está aprobado llevan `noindex` y quedan fuera del sitemap, incluso en una compilación indexable.
- Datos estructurados (`Person`, `BreadcrumbList`) solo con datos confirmados y con dominio. Sin dirección, horario, reseñas ni coordenadas inventadas.

## 8. Despliegue (Netlify)

1. Suba el repositorio a GitHub/GitLab y, en Netlify, *Add new site → Import an existing project* (usa `netlify.toml`).
2. Configure las variables de entorno ([docs/integrations.md](docs/integrations.md)).
3. Conecte el dominio y active HTTPS.
4. Para lanzar: complete `site.ts`, ponga `url`, siga los comentarios de `netlify.toml` y la [lista de comprobación](docs/launch-checklist.md).

## 9. Cumplimiento: aclaraciones

El sitio incluye **espacios** para el aviso TPMO, el aviso de no afiliación, avisos de marketing, privacidad, términos y consentimiento. Su presencia **no significa** que el sitio cumpla las normas de CMS, estatales, de la FTC/TCPA o de las aseguradoras. Todos los textos legales y regulatorios deben aprobarlos Alejandro o su responsable de cumplimiento; nada de esto es asesoría legal. No se usan logotipos de aseguradoras ni testimonios.

## 10. Fuera del alcance de esta fase

CRM, automatizaciones, chatbot con IA, portal de clientes, cotizador, inscripción a planes, base de datos de información médica, integraciones con aseguradoras, píxeles publicitarios y campañas.
