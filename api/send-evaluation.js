import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';

const moodLabels = {
  'muy-bajo': 'Muy bajo',
  bajo: 'Bajo',
  neutral: 'Neutral',
  bien: 'Bien',
  excelente: 'Excelente',
};

const symptomLabels = {
  miedo: 'Miedo o preocupación constante',
  tristeza: 'Tristeza frecuente',
  sueno: 'Dificultad para dormir',
  cansancio: 'Cansancio emocional',
  aislamiento: 'Ganas de aislarme',
  llanto: 'Llanto frecuente',
};

const supportLabels = {
  fuerte: 'Red de apoyo cercana',
  parcial: 'Apoyo parcial',
  baja: 'Poco apoyo',
};

const intensityLabels = {
  poco: 'Poco',
  moderado: 'Moderado',
  mucho: 'Mucho',
  demasiado: 'Demasiado',
};

const frequencyLabels = {
  'algunos-dias': 'Algunos días',
  'mitad-dias': 'Más de la mitad de los días',
  'casi-todos': 'Casi todos los días',
};

const dailyImpactLabels = {
  leve: 'Afecta poco la rutina',
  moderado: 'Afecta sueño, estudio, trabajo o relaciones',
  alto: 'Dificulta actividades importantes',
};

const supportNetworkLabels = {
  familia: 'Familia',
  amistades: 'Amistades',
  pareja: 'Pareja',
  'personal-medico': 'Personal médico',
  nadie: 'No cuenta con nadie ahora',
};

const helpReasonLabels = {
  hablar: 'Quiere hablar con alguien',
  ansiedad: 'Miedo o ansiedad',
  familia: 'Orientación familiar',
  agotamiento: 'Agotamiento',
  diagnostico: 'Dificultad para afrontar el diagnóstico',
  cuidador: 'Apoyo como cuidador/a',
};

const urgencyTodayLabels = {
  no: 'No',
  'necesito-apoyo': 'Necesita apoyo pronto',
  'riesgo-hoy': 'Sí, se siente en riesgo hoy',
};

const medicalSituationLabels = {
  cancer: 'Cáncer',
  renal: 'Enfermedad renal crónica',
  cardiaca: 'Enfermedad cardíaca grave',
  neurologica: 'Enfermedad neurológica',
  cuidados: 'Proceso de cuidado o acompañamiento familiar',
  otro: 'Otro',
};

const supportNeedLabels = {
  escucha: 'Necesita ser escuchado/a',
  orientacion: 'Orientación para afrontar el proceso',
  familia: 'Apoyo para la familia',
  recursos: 'Recursos o recomendaciones',
  otro: 'Otro',
};

const treatmentLabels = {
  ninguno: 'No tiene seguimiento actualmente',
  psicologico: 'Terapia psicológica',
  medico: 'Seguimiento médico',
  ambos: 'Seguimiento médico y psicológico',
  otro: 'Otro',
};

const copingLabels = {
  hablar: 'Hablar con alguien de confianza',
  respiracion: 'Respiración, relajación o meditación',
  actividad: 'Actividad física o caminatas',
  ninguna: 'Aún no tiene estrategias',
  otro: 'Otro',
};

const roleLabels = {
  paciente: 'Paciente',
  familiar: 'Familiar',
  cuidador: 'Cuidador/a',
  profesional: 'Profesional o estudiante',
};

const suicidalIdeationLabels = {
  no: 'No',
  aVeces: 'A veces',
  si: 'Sí',
};

const priorityLabels = {
  priority: 'Prioridad alta',
  recommended: 'Seguimiento recomendado',
  preventive: 'Orientación preventiva',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  loadLocalEnv();

  const evaluation = req.body;
  const form = evaluation?.form || {};
  const result = evaluation?.result || {};

  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = normalizeSecret(process.env.SMTP_PASS);
  const recipient = process.env.RECIPIENT_EMAIL;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !recipient) {
    return res.status(500).json({
      error: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and RECIPIENT_EMAIL.',
      missing: {
        SMTP_HOST: !host,
        SMTP_USER: !user,
        SMTP_PASS: !pass,
        RECIPIENT_EMAIL: !recipient,
      },
    });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });

  const priorityLabel = priorityLabels[result.level] || 'Evaluación';
  const trackingCode = evaluation?.trackingCode || evaluation?.id || 'sin código';
  const subject = `[${priorityLabel}] PsicoAlma ${trackingCode} - ${form.name || 'Sin nombre'}`;
  const text = buildEmailText(evaluation, form, result);
  const html = buildEmailHtml(evaluation, form, result);

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: form.email || undefined,
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error sending mail', {
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
      message: err.message,
    });

    return res.status(500).json({
      error: 'Error sending mail',
      code: err.code,
      responseCode: err.responseCode,
      detail: process.env.NODE_ENV === 'production' ? undefined : err.response || err.message,
    });
  }
}

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');

  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      return;
    }

    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');

    process.env[key] = value;
  });
}

function normalizeSecret(value = '') {
  return value.replace(/\s+/g, '');
}

function field(value, fallback = 'No indicado') {
  return value === undefined || value === null || String(value).trim() === '' ? fallback : String(value).trim();
}

function formatDate(value) {
  if (!value) {
    return 'Sin fecha';
  }

  return new Intl.DateTimeFormat('es-EC', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Guayaquil',
  }).format(new Date(value));
}

function getSymptomNames(symptoms = []) {
  return symptoms.map((symptom) => symptomLabels[symptom] || symptom);
}

function getSupportNetworkNames(network = []) {
  return network.map((item) => supportNetworkLabels[item] || item);
}

function optionLabel(labels, value, otherValue) {
  if (value === 'otro') {
    return otherValue ? `Otro: ${otherValue}` : 'Otro';
  }

  return labels[value] || field(value);
}

function escapeHtml(value) {
  return field(value, '').replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function buildEmailText(evaluation, form, result) {
  const optionalLines = [
    form.durationWeeks ? `Duración (semanas): ${form.durationWeeks}` : '',
    form.suicidalIdeation ? `Pensamientos suicidas: ${suicidalIdeationLabels[form.suicidalIdeation] || form.suicidalIdeation}` : '',
    form.currentTreatment ? `Tratamiento actual: ${optionLabel(treatmentLabels, form.currentTreatment, form.currentTreatmentOther)}` : '',
    form.copingStrategies ? `Estrategias de afrontamiento: ${optionLabel(copingLabels, form.copingStrategies, form.copingStrategiesOther)}` : '',
  ].filter(Boolean);

  return `Evaluación recibida desde PsicoAlma

Código de seguimiento: ${evaluation?.trackingCode || 'sin código'}
ID interno: ${evaluation?.id || 'sin ID'}
Fecha: ${formatDate(evaluation?.createdAt)}

Datos personales:
Nombre: ${field(form.name)}
Correo: ${field(form.email)}
Edad: ${field(form.age)}
Teléfono: ${field(form.phone)}
Relación: ${roleLabels[form.role] || field(form.role)}
Situación médica: ${optionLabel(medicalSituationLabels, form.medicalSituation, form.medicalSituationOther)}

Respuestas principales:
Estado de ánimo: ${moodLabels[form.mood] || field(form.mood)}
Síntomas: ${getSymptomNames(form.symptoms).join(', ') || 'No indicado'}
Intensidad: ${intensityLabels[form.symptomIntensity] || field(form.symptomIntensity)}
Frecuencia: ${frequencyLabels[form.frequency] || field(form.frequency)}
Impacto diario: ${dailyImpactLabels[form.dailyImpact] || field(form.dailyImpact)}
Red de apoyo: ${supportLabels[form.support] || field(form.support)}
Personas de apoyo: ${getSupportNetworkNames(form.supportNetwork).join(', ') || 'No indicado'}
Apoyo solicitado: ${optionLabel(supportNeedLabels, form.supportNeed, form.notes)}
Motivo principal: ${helpReasonLabels[form.helpReason] || field(form.helpReason)}
Urgencia actual: ${urgencyTodayLabels[form.urgencyToday] || field(form.urgencyToday)}
Consentimiento para contacto: ${form.consentToContact ? 'Sí' : 'No'}

${optionalLines.length ? `Información adicional:\n${optionalLines.join('\n')}\n` : ''}
Orientación sugerida:
${field(result.diagnostic || result.description)}

Notas adicionales:
${field(form.notes, 'Ninguna')}
`;
}

function buildEmailHtml(evaluation, form, result) {
  const symptoms = getSymptomNames(form.symptoms);
  const supportNetwork = getSupportNetworkNames(form.supportNetwork);
  const optionalRows = [
    form.durationWeeks ? detailRow('Duración de síntomas', `${form.durationWeeks} semana(s)`) : '',
    form.suicidalIdeation ? detailRow('Pensamientos de daño', suicidalIdeationLabels[form.suicidalIdeation] || form.suicidalIdeation) : '',
    form.currentTreatment ? detailRow('Tratamiento actual', optionLabel(treatmentLabels, form.currentTreatment, form.currentTreatmentOther)) : '',
    form.copingStrategies ? detailRow('Estrategias de afrontamiento', optionLabel(copingLabels, form.copingStrategies, form.copingStrategiesOther)) : '',
  ].filter(Boolean);

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#edf8ff;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#061e2b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:22px;overflow:hidden;border:1px solid #c7d6e3;">
      <tr>
        <td style="padding:30px 34px;background:#1976d2;color:#ffffff;">
          <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">PsicoAlma</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Nueva evaluación recibida</h1>
          <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#e7f2ff;">${escapeHtml(formatDate(evaluation?.createdAt))}</p>
          <div style="display:inline-block;margin-top:14px;padding:8px 12px;border-radius:999px;background:#ffffff;color:#1976d2;font-size:13px;font-weight:800;">
            ${escapeHtml(priorityLabels[result.level] || 'Evaluación')} · ${escapeHtml(evaluation?.trackingCode || 'Sin código')}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 34px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding:18px;border-radius:18px;background:#edf8ff;border:1px solid #d8e8f5;">
                <div style="font-size:13px;color:#455a64;font-weight:700;">Orientación sugerida</div>
                <div style="margin-top:8px;font-size:20px;font-weight:800;color:#061e2b;">${escapeHtml(result.title || 'Evaluación registrada')}</div>
                <p style="margin:8px 0 0;font-size:15px;line-height:1.6;color:#455a64;">${escapeHtml(result.diagnostic || result.description || 'No generado')}</p>
              </td>
            </tr>
          </table>

          ${sectionTitle('Datos personales')}
          ${detailGrid([
            ['Nombre', form.name],
            ['Correo', form.email],
            ['Edad', form.age],
            ['Teléfono', form.phone],
            ['Relación', roleLabels[form.role] || form.role],
            ['Situación médica', optionLabel(medicalSituationLabels, form.medicalSituation, form.medicalSituationOther)],
          ])}

          ${sectionTitle('Respuestas principales')}
          ${detailGrid([
            ['Estado de ánimo', moodLabels[form.mood] || form.mood],
            ['Síntomas', symptoms.join(', ') || 'No indicado'],
            ['Intensidad', intensityLabels[form.symptomIntensity] || form.symptomIntensity],
            ['Frecuencia', frequencyLabels[form.frequency] || form.frequency],
            ['Impacto diario', dailyImpactLabels[form.dailyImpact] || form.dailyImpact],
            ['Red de apoyo', supportLabels[form.support] || form.support],
            ['Personas de apoyo', supportNetwork.join(', ') || 'No indicado'],
            ['Apoyo solicitado', optionLabel(supportNeedLabels, form.supportNeed, form.notes)],
            ['Motivo principal', helpReasonLabels[form.helpReason] || form.helpReason],
            ['Urgencia actual', urgencyTodayLabels[form.urgencyToday] || form.urgencyToday],
            ['Consentimiento para contacto', form.consentToContact ? 'Sí' : 'No'],
          ])}

          ${
            optionalRows.length
              ? `${sectionTitle('Información adicional')}<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${optionalRows.join('')}</table>`
              : ''
          }

          ${sectionTitle('Notas adicionales')}
          <div style="padding:16px 18px;border:1px solid #d8e8f5;border-radius:16px;background:#f8fcff;font-size:15px;line-height:1.7;color:#263238;">
            ${escapeHtml(field(form.notes, 'Ninguna'))}
          </div>

          <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#607d8b;">
            Código de seguimiento: ${escapeHtml(evaluation?.trackingCode || 'sin código')}<br>
            ID interno: ${escapeHtml(evaluation?.id || 'sin ID')}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function sectionTitle(title) {
  return `<h2 style="margin:28px 0 12px;font-size:17px;color:#1976d2;">${escapeHtml(title)}</h2>`;
}

function detailGrid(rows) {
  const cells = rows
    .map(([label, value]) => detailRow(label, value))
    .join('');

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${cells}</table>`;
}

function detailRow(label, value) {
  return `<tr>
    <td style="width:34%;padding:12px 14px;border:1px solid #d8e8f5;background:#f8fcff;font-size:13px;font-weight:700;color:#455a64;">${escapeHtml(label)}</td>
    <td style="padding:12px 14px;border:1px solid #d8e8f5;background:#ffffff;font-size:15px;color:#061e2b;line-height:1.5;">${escapeHtml(field(value))}</td>
  </tr>`;
}
