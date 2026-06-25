import emailjs from '@emailjs/browser';

export async function sendWithEmailJS(evaluation) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return false;
  }

  const templateParams = {
    id: evaluation.id,
    createdAt: evaluation.createdAt,
    name: evaluation.form.name || '',
    email: evaluation.form.email || '',
    age: evaluation.form.age || '',
    phone: evaluation.form.phone || '',
    role: evaluation.form.role || '',
    medicalSituation: evaluation.form.medicalSituation || '',
    mood: evaluation.form.mood || '',
    symptoms: (evaluation.form.symptoms || []).join(', '),
    support: evaluation.form.support || '',
    durationWeeks: evaluation.form.durationWeeks || '',
    suicidalIdeation: evaluation.form.suicidalIdeation || '',
    currentTreatment: evaluation.form.currentTreatment || '',
    copingStrategies: evaluation.form.copingStrategies || '',
    consentToContact: evaluation.form.consentToContact ? 'sí' : 'no',
    notes: evaluation.form.notes || '',
    diagnostic: evaluation.result?.diagnostic || evaluation.result?.description || '',
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (err) {
    console.error('EmailJS send error', err);
    return false;
  }
}
