Guía: Configurar envío de evaluaciones por correo

Este proyecto incluye dos opciones para enviar las evaluaciones por correo:

1) Función serverless (Node.js + nodemailer) — recomendada para control total y uso de SMTP.
2) Envío cliente usando EmailJS — opción rápida sin servidor, usa servicio de terceros.

A. Función serverless (ya incluida en `api/send-evaluation.js`)

Requisitos:
- Entorno de despliegue que soporte funciones Serverless (Vercel, Netlify, etc.).
- Variables de entorno:
  - `SMTP_HOST` (ej. smtp.gmail.com)
  - `SMTP_PORT` (ej. 587 o 465)
  - `SMTP_USER` (usuario SMTP)
  - `SMTP_PASS` (contraseña o app password)
  - `RECIPIENT_EMAIL` (correo que recibirá las evaluaciones)

Pasos:
1. Instala dependencias (si usas Vercel esto se hace durante deploy):

```bash
npm install nodemailer
```

2. Añade las variables de entorno en tu proveedor (Vercel Dashboard → Environment Variables).
3. Despliega. La ruta usada por el cliente es `/api/send-evaluation`.
4. Cuando se envíe una evaluación desde la app, la función intentará enviar un correo al `RECIPIENT_EMAIL`.

B. Envío cliente con EmailJS (sin servidor)

Ventajas: rápido para pruebas, no requiere servidor propio. Desventajas: dependes de un servicio externo y debes exponer la `publicKey` (EmailJS usa keys públicas).

Requisitos:
- Cuenta en https://www.emailjs.com/
- Crear un `Service` (SMTP o integrado), un `Template` y obtener el `Public Key`.
- Variables de entorno en Vite (local `.env` o en el host) con prefijo `VITE_`:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

Pasos:
1. Instala la librería cliente:

```bash
npm install @emailjs/browser
```

2. En tu archivo `.env` (no lo subas a git):

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=public_xxx
```

3. La app ya incluye un helper en `src/lib/emailService.js` que usa `import.meta.env` para leer estas variables. Si están presentes, el cliente intentará usar EmailJS como fallback si la función serverless no responde.

4. Crea un `Template` en EmailJS con campos que correspondan a los nombres enviados (`name`, `email`, `age`, `mood`, `symptoms`, `diagnostic`, etc.).

C. Pruebas locales

- Para probar la función serverless localmente, puedes usar adaptadores como `vercel dev` o `netlify dev` que ejecutan funciones localmente.
- Para pruebas de correo sin enviar a producción, considera servicios tipo Mailtrap o cuentas de prueba.

D. Seguridad y privacidad

- Las evaluaciones contienen información sensible. Asegúrate de almacenar las credenciales en variables de entorno y no en el repositorio.
- Considera políticas de retención y acceso seguro para los correos recibidos.

Si quieres, puedo:
- Añadir la integración EmailJS directamente en el front (ya añadí el helper, pero falta instalar la dependencia y configurar plantilla).
- Adaptar la función serverless a otro proveedor (por ejemplo, agregar soporte para SendGrid).
- Generar el template recomendado para EmailJS.

Dime cuál prefieres que implemente a continuación y lo hago.