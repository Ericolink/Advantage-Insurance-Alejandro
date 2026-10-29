# Cómo editar el contenido (inglés y español)

## Dónde está cada cosa

| Qué | Archivo |
|---|---|
| Teléfono, correo, zona, horario, licencias, NPN, foto, agenda, redes, servicios, aprobaciones, aviso TPMO | `src/config/site.ts` |
| Textos de interfaz (botones, menús, inicio, formulario, marcadores) | `src/content/en/ui.ts` · `src/content/es/ui.ts` |
| Páginas de servicio | `src/content/<idioma>/services.ts` |
| ¿Nuevo en Medicare? | `src/content/<idioma>/guide.ts` |
| Preguntas frecuentes | `src/content/<idioma>/faq.ts` |
| Biografía y «Cómo trabaja Alejandro» | `src/content/<idioma>/about.ts` |
| Privacidad, Términos, Avisos | `src/content/<idioma>/legal.ts` |

## Reglas

1. **Los dos idiomas deben tener la misma estructura.** Si añade una pregunta en `en/faq.ts`, añada su traducción en la misma posición de `es/faq.ts`. TypeScript y `npm test` fallan si no coinciden.
2. `{name}` y `{brand}` se sustituyen solos por el nombre del agente o el nombre comercial.
3. **Nunca invente** licencias, NPN, reseñas, testimonios, años de experiencia, precios, beneficios de planes ni textos regulatorios (CMS/TPMO). Las pruebas detectan algunos casos (precios, «años de experiencia», «garantiza»), pero la responsabilidad es de quien edita.
4. Tono: de usted en español, frases cortas, sin tecnicismos sin explicar, sin urgencia.
5. Tras editar: `npm test` y `npm run typecheck`.

## Datos del negocio (`site.ts`)

Cada dato tiene `value` y `status`:

```ts
email: { value: "alejandro@dominio.com", status: "confirmed" },
```

- `value: null`: aún no lo tenemos.
- `status: "pending"`: se ve **solo en modo revisión**, entre corchetes o en un recuadro rojo discontinuo.
- `status: "confirmed"`: se publica. Úselo **solo con confirmación por escrito de Alejandro**.
- Para decir «no se usará» (WhatsApp, horario, agenda, redes): `{ value: null, status: "confirmed" }`.

**Servicios:** en `services`, cada uno tiene `status` `"confirmed"` (lo vende), `"not-offered"` (desaparece) o `"pending"`.

**Textos aprobados:** en `approvals`, ponga `"confirmed"` cuando se aprueben la biografía, el contenido educativo, las FAQ, la privacidad, los términos, el aviso de no afiliación, el consentimiento y el proceso ACA.

**Aviso TPMO y avisos de marketing:** pegue el texto **exacto** recibido en ambos idiomas. No lo redacte.

**Tiempo de respuesta:** `responseTime: { value: { en: "one business day", es: "un día hábil" }, status: "confirmed" }` añade «Alejandro will reply within…» al mensaje de éxito del formulario.

## Fotos

1. Coloque el archivo en `public/images/` (retrato 4:5, mínimo 1200×1500 px, luz natural; sin estetoscopios ni escenas hospitalarias).
2. En `site.ts`:

```ts
photo: { value: { src: "/images/alejandro.jpg", width: 1200, height: 1500, alt: { en: "Alejandro Alcazar", es: "Alejandro Alcazar" } }, status: "confirmed" },
```

Next.js genera AVIF/WebP y tamaños responsivos. Sin foto, el sitio público no muestra ningún hueco.

## Términos de uso

`legal.ts → terms.sections` está vacío a propósito. Pegue el texto proporcionado por Alejandro o su asesoría (en ambos idiomas, como `TextSection`) y marque `approvals.terms: "confirmed"`; entonces la página aparece en el pie y en el sitemap.

## Logotipo

Sustituya el contenido de `src/components/layout/BrandMark.tsx` (p. ej. con `next/image` y `/public/images/logo.svg`) y `src/app/icon.svg`. Revise `src/app/[lang]/opengraph-image.tsx`.
