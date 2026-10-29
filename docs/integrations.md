# Integraciones: formulario, agenda, analítica y Search Console

Todas las claves se configuran como **variables de entorno** (Netlify → *Site configuration → Environment variables*, y `.env.local` en desarrollo). Nunca se suben al repositorio. Después de cambiarlas, **vuelva a desplegar**.

## 1. Destino del formulario (obligatorio para activarlo)

Hasta que haya al menos un destino, el formulario dice al visitante que la solicitud **no se envió** y ofrece llamar. `npm run check:launch` lo marca como bloqueante.

### Opción A — Correo con Resend

1. Cree una cuenta en <https://resend.com> y verifique el dominio de Alejandro (registros DNS que indica Resend).
2. Cree una API key (permiso *Sending access*).
3. Variables:
   - `RESEND_API_KEY`: la clave. Solo se usa en el servidor y nunca llega al navegador.
   - `LEAD_EMAIL_TO`: buzón que recibe las solicitudes.
   - `LEAD_EMAIL_FROM`: remitente verificado, p. ej. `Sitio web <solicitudes@dominio.com>`.

El correo llega con etiquetas bilingües: nombre, teléfono, correo (si lo dio), idioma de la página, tema, horario, mensaje, el **texto exacto de consentimiento aceptado** y la fecha/hora. Si el visitante dio un correo, se usa como `reply-to`.

### Opción B — Webhook (Zapier, Make, n8n, Google Apps Script, CRM…)

- `LEAD_WEBHOOK_URL`: recibe cada solicitud como JSON por `POST`.
- `LEAD_WEBHOOK_SECRET` (opcional): se envía en la cabecera `X-Lead-Secret` para que el receptor rechace peticiones ajenas.

Puede usar ambas opciones a la vez: basta con que una acepte la solicitud para mostrar el éxito.

### Cómo probarlo

1. Configure el destino en `.env.local` y ejecute `npm run dev`.
2. Envíe el formulario en `/en/contact#request` con datos de prueba ficticios.
3. Compruebe que llega el correo o la petición del webhook (p. ej. con <https://webhook.site> en pruebas) y que el sitio muestra el mensaje verde de éxito.
4. Con un destino mal configurado, el sitio debe mostrar el error con el teléfono como alternativa.

> **Pendiente:** no se ha podido probar la entrega real porque no hay credenciales ni buzón de Alejandro. Se verificó el caso «sin destino» (mensaje honesto de no enviado).

### Antiabuso y privacidad

- Honeypot oculto (los bots que lo rellenan reciben un falso éxito y no se entrega nada).
- Límite de 5 intentos por IP cada 10 minutos (por instancia; suficiente para abuso casual).
- No se usa CAPTCHA de rompecabezas (WCAG 3.3.8). Si hubiera spam real, se puede añadir una verificación invisible.
- No se guarda nada en el navegador ni en el servidor; los registros solo contienen el motivo del fallo.

## 2. Agenda (Calendly u otra)

En `src/config/site.ts`:

```ts
scheduling: { value: { provider: "Calendly", url: "https://calendly.com/usuario/consulta", allowEmbed: true }, status: "confirmed" },
```

- Con URL confirmada aparece el bloque **«Book a time / Reservar una cita»** en Contacto (`#schedule`), y los botones «Schedule a Consultation» llevan ahí.
- Sin URL, el bloque **no se muestra** (solo un marcador en modo revisión) y los botones llevan al formulario. Nunca se muestra una cita como confirmada: la confirmación la envía el propio sistema de agenda.
- `allowEmbed: true` añade «Mostrar el calendario aquí»: el iframe de terceros **solo se carga si el visitante lo pide**.
- Si no habrá agenda: `scheduling: { value: null, status: "confirmed" }`.

## 3. Google Analytics 4 (opcional)

- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`.
- GA **no se carga** hasta que el visitante pulsa «Permitir». «Preferencias de analítica» (pie de página) permite cambiar la decisión.
- Eventos: `call_click`, `whatsapp_click`, `email_click`, `schedule_click`, `schedule_open`, `lead_submit_success`, `lead_submit_error`. Solo llevan la ubicación del botón y el idioma, **nunca** datos personales ni respuestas del formulario.
- No hay píxeles publicitarios. Añadir alguno requiere autorización y revisar consentimiento y privacidad.

## 4. Google Search Console (recomendado)

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: valor `content` de la etiqueta HTML de verificación (o verifique por DNS).
- Tras el lanzamiento, envíe `https://<dominio>/sitemap.xml`.
- Google Business Profile: no creado; requiere la cuenta y autorización de Alejandro.
