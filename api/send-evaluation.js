const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const evaluation = req.body;

  // Read SMTP settings from environment variables
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.RECIPIENT_EMAIL;

  if (!host || !user || !pass || !recipient) {
    return res.status(500).json({ error: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and RECIPIENT_EMAIL.' });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  });

  const subject = `Nueva evaluación desde PsicoAlma — ${evaluation.form.name || 'Sin nombre'}`;
  const body = `Evaluación recibida:\n\nID: ${evaluation.id}\nFecha: ${evaluation.createdAt}\n\nDatos personales:\nNombre: ${evaluation.form.name}\nCorreo: ${evaluation.form.email}\nEdad: ${evaluation.form.age}\nTeléfono: ${evaluation.form.phone}\nRelación: ${evaluation.form.role}\nSituación médica: ${evaluation.form.medicalSituation}\n\nRespuestas:\nEstado de ánimo: ${evaluation.form.mood}\nSíntomas: ${evaluation.form.symptoms.join(', ')}\nRed de apoyo: ${evaluation.form.support}\nDuración (semanas): ${evaluation.form.durationWeeks || 'no indicado'}\nPensamientos suicidas: ${evaluation.form.suicidalIdeation || 'no indicado'}\nTratamiento actual: ${evaluation.form.currentTreatment || 'no indicado'}\nEstrategias de afrontamiento: ${evaluation.form.copingStrategies || 'no indicado'}\nConsentimiento para contacto: ${evaluation.form.consentToContact ? 'sí' : 'no'}\n\nDiagnóstico sugerido:\n${evaluation.result.diagnostic || evaluation.result.description}\n\nNotas adicionales:\n${evaluation.form.notes || 'ninguna'}\n`;

  try {
    await transporter.sendMail({
      from: `${user}`,
      to: recipient,
      subject,
      text: body,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ error: 'Error sending mail' });
  }
};
