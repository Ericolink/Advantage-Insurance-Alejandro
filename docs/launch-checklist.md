# Lista de comprobación previa a la publicación

Marque cada punto antes de pasar el sitio a producción. Ninguno de estos puntos es asesoría legal.

## Datos y aprobaciones

- [ ] `npm run check:launch` no muestra elementos **BLOCKING**.
- [ ] Cada dato `confirmed` de `site.ts` tiene confirmación **por escrito** de Alejandro (guarde el correo o mensaje).
- [ ] Solo los servicios que Alejandro vende están `confirmed`; el resto, `not-offered`.
- [ ] Aviso TPMO (si vende Medicare Advantage o Parte D): texto exacto y vigente en ambos idiomas.
- [ ] Aviso de no afiliación, privacidad, términos, consentimiento y contenido educativo aprobados por Alejandro o su responsable de cumplimiento.
- [ ] Proceso de consentimiento ACA aprobado (si vende Marketplace).
- [ ] No hay logotipos de aseguradoras ni testimonios sin autorización escrita.

## Técnico

- [ ] `site.url` contiene el dominio final (`https://…`, sin barra final).
- [ ] Destino del formulario configurado y **probado con un envío real** ([integrations.md](integrations.md)).
- [ ] `netlify.toml`: eliminado `NEXT_PUBLIC_SHOW_PENDING`, activado `REQUIRE_LAUNCH_READY = "1"`.
- [ ] La compilación de lanzamiento termina sin errores.
- [ ] `npm test`, `npm run lint` y `npm run typecheck` pasan.
- [ ] HTTPS activo en el dominio.
- [ ] No hay secretos en el repositorio (solo en variables de entorno).

## Revisión en el sitio publicado

- [ ] No aparece la banda «Review version», ningún texto `[ENTRE CORCHETES]` ni recuadros rojos discontinuos. En el HTML no existe el atributo `data-pending`.
- [ ] El teléfono del top bar, el header, el hero y las bandas CTA abre la llamada (`tel:`) con el número correcto.
- [ ] El selector English/Español lleva a la página equivalente en todas las páginas.
- [ ] Menú compacto (móvil y <1280 px): se abre, se cierra con Escape y devuelve el foco al botón.
- [ ] Formulario: errores al salir del campo y al enviar; envío real recibido; mensaje de éxito.
- [ ] Agenda (si existe): el botón abre la página correcta del proveedor.
- [ ] Navegación completa con teclado y foco siempre visible; zoom al 200% sin scroll horizontal; prueba rápida con VoiceOver (iOS) o NVDA.
- [ ] Anchos de 375, 640, 768, 1024 y 1440 px correctos.
- [ ] `robots.txt` permite el rastreo, `sitemap.xml` lista solo páginas aprobadas y Search Console está verificado.
