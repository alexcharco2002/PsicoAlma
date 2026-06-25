# Guía para configurar el envío de evaluaciones por correo

El proyecto ya incluye dos caminos para enviar las evaluaciones:

1. **Función serverless en Vercel** con Node.js y Nodemailer. Es la opción recomendada.
2. **EmailJS desde el navegador** como respaldo rápido si no hay servidor configurado.

## Opción recomendada: Vercel + SMTP

La función está en `api/send-evaluation.js` y recibe los datos desde `/api/send-evaluation`.

Configura estas variables en **Vercel > Project Settings > Environment Variables**:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-correo@gmail.com
SMTP_PASS=tu-app-password
SMTP_FROM=tu-correo@gmail.com
RECIPIENT_EMAIL=correo-donde-llegan-las-evaluaciones@gmail.com
```

Notas:

- `SMTP_FROM` es opcional. Si no se configura, se usa `SMTP_USER`.
- Si usas Gmail, no coloques tu contraseña normal. Debes crear una **contraseña de aplicación**.
- `RECIPIENT_EMAIL` es el correo final donde quieres recibir cada evaluación.
- En desarrollo con `npm run dev`, Vite no ejecuta funciones serverless. Para probar el endpoint localmente usa `vercel dev`.

## Opción alternativa: EmailJS

Si quieres probar sin servidor, puedes configurar EmailJS con estas variables:

```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=public_xxx
```

El helper está en `src/lib/emailService.js`. La evaluación primero intenta enviarse por `/api/send-evaluation`; si eso falla, intenta EmailJS cuando esas variables existen.

## Seguridad

Las evaluaciones pueden incluir información sensible. No subas credenciales al repositorio y revisa quién tendrá acceso al correo receptor.
