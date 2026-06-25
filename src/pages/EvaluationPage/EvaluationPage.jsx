import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Frown,
  HeartHandshake,
  Mail,
  Meh,
  ShieldCheck,
  Smile,
  Sparkles,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import './EvaluationPage.css';

const evaluationStorageKey = 'psicoalma-evaluations';

const stepLabels = ['Datos', 'Estado', 'Síntomas', 'Apoyo', 'Seguimiento'];

const moodOptions = [
  { value: 'muy-bajo', label: 'Muy bajo', icon: CircleAlert, score: 4 },
  { value: 'bajo', label: 'Bajo', icon: Frown, score: 3 },
  { value: 'neutral', label: 'Neutral', icon: Meh, score: 2 },
  { value: 'bien', label: 'Bien', icon: Smile, score: 1 },
  { value: 'excelente', label: 'Excelente', icon: Sparkles, score: 0 },
];

const symptomOptions = [
  { id: 'miedo', label: 'Miedo o preocupación constante', score: 2 },
  { id: 'tristeza', label: 'Tristeza frecuente', score: 2 },
  { id: 'sueno', label: 'Dificultad para dormir', score: 1 },
  { id: 'cansancio', label: 'Cansancio emocional', score: 1 },
  { id: 'aislamiento', label: 'Ganas de aislarme', score: 2 },
  { id: 'llanto', label: 'Llanto frecuente', score: 2 },
];

const supportOptions = [
  { value: 'fuerte', label: 'Tengo una red de apoyo cercana', score: 0 },
  { value: 'parcial', label: 'Tengo apoyo, pero no siempre está disponible', score: 2 },
  { value: 'baja', label: 'Me siento con poco apoyo', score: 4 },
];

const initialForm = {
  name: '',
  email: '',
  age: '',
  phone: '',
  role: '',
  medicalSituation: '',
  mood: '',
  symptoms: [],
  support: '',
  notes: '',
  durationWeeks: '',
  suicidalIdeation: '',
  currentTreatment: '',
  copingStrategies: '',
  consentToContact: false,
};

function EvaluationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [sentEvaluation, setSentEvaluation] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;
  const result = useMemo(() => calculateResult(form), [form]);
  const canContinue = validateStep(step, form);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleSymptom = (id) => {
    setForm((current) => {
      const exists = current.symptoms.includes(id);
      return {
        ...current,
        symptoms: exists ? current.symptoms.filter((item) => item !== id) : [...current.symptoms, id],
      };
    });
  };

  const openEvaluation = () => {
    setIsModalOpen(true);
  };

  const closeEvaluation = () => {
    if (isSending) {
      return;
    }

    setIsModalOpen(false);
    setStep(0);
    setSentEvaluation(null);
    setIsSending(false);
  };

  const saveEvaluation = (evaluation) => {
    const saved = JSON.parse(window.localStorage.getItem(evaluationStorageKey) || '[]').filter(
      (item) => item.id !== evaluation.id,
    );
    window.localStorage.setItem(evaluationStorageKey, JSON.stringify([evaluation, ...saved]));
  };

  const sendByApi = async (evaluation) => {
    setIsSending(true);

    try {
      const res = await fetch('/api/send-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evaluation),
      });

      if (res.ok) {
        const updatedEvaluation = { ...evaluation, status: 'sent' };
        saveEvaluation(updatedEvaluation);
        setSentEvaluation(updatedEvaluation);
        setIsSending(false);
        return true;
      }
    } catch (err) {
      // La evaluación queda guardada y se informa al usuario de forma sencilla.
    }

    const updatedEvaluation = { ...evaluation, status: 'failed' };
    saveEvaluation(updatedEvaluation);
    setSentEvaluation(updatedEvaluation);
    setIsSending(false);
    return false;
  };

  const submitEvaluation = () => {
    const evaluation = {
      id: crypto.randomUUID(),
      trackingCode: generateTrackingCode(),
      createdAt: new Date().toISOString(),
      form,
      result,
      status: 'pending',
    };

    saveEvaluation(evaluation);
    setSentEvaluation(evaluation);
    sendByApi(evaluation);
  };

  const resetEvaluation = () => {
    setForm(initialForm);
    setStep(0);
    setSentEvaluation(null);
    setIsSending(false);
  };

  return (
    <div className="evaluation-page">
      <section className="evaluation-hero page-section">
        <div className="evaluation-hero__heading">
          <div className="evaluation-hero__label">
            <ShieldCheck size={20} />
            Evaluación emocional
          </div>
          <h1>Evaluación psicológica inicial</h1>
        </div>

        <div className="evaluation-intro">
          <h2>Qué encontrarás aquí</h2>
          <p>
            Esta evaluación rápida ayuda a identificar señales emocionales frecuentes en personas con enfermedades
            catastróficas, familiares y cuidadores. No reemplaza una consulta profesional, pero puede orientar el primer
            paso para recibir acompañamiento.
          </p>
          <button type="button" className="evaluation-hero__button" onClick={openEvaluation}>
            Empezar evaluación rápida
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="evaluation-info page-section" aria-label="Información de la evaluación">
        <article>
          <ShieldCheck size={26} />
          <h2>Confidencial</h2>
          <p>Tus respuestas se tratan con respeto y se usan solo para orientar el tipo de apoyo que puedes necesitar.</p>
        </article>
        <article>
          <HeartHandshake size={26} />
          <h2>Humana</h2>
          <p>La evaluación considera el estado de ánimo, síntomas emocionales, red de apoyo y situación personal.</p>
        </article>
        <article>
          <Mail size={26} />
          <h2>Con seguimiento</h2>
          <p>Al finalizar, la evaluación se envía al equipo de PsicoAlma para orientar el acompañamiento.</p>
        </article>
      </section>

      <section className="evaluation-note page-section">
        <div className="evaluation-note__heading">
          <p className="section-kicker">Información principal</p>
          <h2>Qué se revisa en la evaluación</h2>
        </div>
        <div className="evaluation-review-grid">
          <article>
            <span>01</span>
            <h3>Datos personales básicos</h3>
            <p>Nombres, correo, edad y relación con el proceso para orientar mejor el acompañamiento.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Estado de ánimo actual</h3>
            <p>Una lectura sencilla del nivel emocional que la persona identifica en el momento.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Síntomas recientes</h3>
            <p>Señales como miedo, tristeza, cansancio emocional, aislamiento o dificultad para dormir.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Red de apoyo</h3>
            <p>El nivel de acompañamiento disponible en la familia, amistades o entorno cercano.</p>
          </article>
          <article>
            <span>05</span>
            <h3>Necesidad principal</h3>
            <p>Un comentario final para explicar qué tipo de ayuda o contacto necesita la persona.</p>
          </article>
        </div>
      </section>

      {isModalOpen && (
        <EvaluationModal
          canContinue={canContinue}
          closeEvaluation={closeEvaluation}
          form={form}
          isSending={isSending}
          progress={progress}
          resetEvaluation={resetEvaluation}
          result={result}
          sentEvaluation={sentEvaluation}
          setStep={setStep}
          step={step}
          submitEvaluation={submitEvaluation}
          toggleSymptom={toggleSymptom}
          totalSteps={totalSteps}
          updateField={updateField}
        />
      )}
    </div>
  );
}

function EvaluationModal({
  canContinue,
  closeEvaluation,
  form,
  isSending,
  progress,
  resetEvaluation,
  result,
  sentEvaluation,
  setStep,
  step,
  submitEvaluation,
  toggleSymptom,
  totalSteps,
  updateField,
}) {
  return (
    <div className="evaluation-modal" role="dialog" aria-modal="true" aria-labelledby="evaluation-modal-title">
      <div className="evaluation-modal__backdrop" onClick={closeEvaluation} />
      <div className="evaluation-modal__panel">
        <button
          type="button"
          className="evaluation-modal__close"
          onClick={closeEvaluation}
          aria-label="Cerrar evaluación"
          disabled={isSending}
        >
          <X size={22} />
        </button>

        <header className="evaluation-modal__header">
          <h2 id="evaluation-modal-title">Dinos cómo te sientes hoy</h2>
          <p>
            <ShieldCheck size={17} />
            Este es un espacio seguro. Tus respuestas son confidenciales.
          </p>
        </header>

        {!sentEvaluation && (
          <section className="evaluation-progress" aria-label="Progreso de evaluación">
            <div className="evaluation-progress__meta">
              <strong>{stepLabels[step]}</strong>
              <span>
                Paso {step + 1} de {totalSteps}
              </span>
            </div>
            <div className="evaluation-progress__steps" aria-label="Pasos de la evaluación">
              {stepLabels.map((label, index) => (
                <span key={label} className={index <= step ? 'evaluation-progress__step evaluation-progress__step--active' : 'evaluation-progress__step'}>
                  {label}
                </span>
              ))}
            </div>
            <div className="evaluation-progress__track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </section>
        )}

        <section className="evaluation-card">
          {sentEvaluation ? (
            <ResultView
              isSending={isSending}
              result={result}
              resetEvaluation={resetEvaluation}
              sentEvaluation={sentEvaluation}
            />
          ) : (
            <>
              {step === 0 && <PersonalStep form={form} updateField={updateField} />}
              {step === 1 && <MoodStep value={form.mood} onChange={(value) => updateField('mood', value)} />}
              {step === 2 && <SymptomsStep selected={form.symptoms} onToggle={toggleSymptom} />}
              {step === 3 && <SupportStep form={form} updateField={updateField} result={result} />}
              {step === 4 && <AdditionalStep form={form} updateField={updateField} />}
            </>
          )}
        </section>

        {!sentEvaluation && (
          <div className="evaluation-actions">
            <button
              type="button"
              className="evaluation-actions__secondary"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
            >
              <ArrowLeft size={18} />
              Anterior
            </button>
            {step < totalSteps - 1 ? (
              <button
                type="button"
                className="evaluation-actions__primary"
                onClick={() => setStep((current) => current + 1)}
                disabled={!canContinue}
              >
                Siguiente
                <ArrowRight size={18} />
              </button>
            ) : (
              <button type="button" className="evaluation-actions__primary" onClick={submitEvaluation} disabled={!canContinue}>
                Enviar evaluación
                <Mail size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PersonalStep({ form, updateField }) {
  const hasEmailValue = form.email.trim().length > 0;
  const hasAgeValue = String(form.age).trim().length > 0;
  const isEmailInvalid = hasEmailValue && !isValidEmail(form.email);
  const isAgeInvalid = hasAgeValue && !isValidAge(form.age);

  return (
    <div className="evaluation-step">
      <h3>Primero, cuéntanos sobre ti</h3>
      <p className="evaluation-step__hint">Estos datos ayudan a orientar mejor la respuesta del equipo.</p>
      <div className="contact-grid">
        <label>
          Nombres completos
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Tu nombre" />
        </label>
        <label>
          Correo electrónico
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="correo@ejemplo.com"
          />
          {isEmailInvalid && <small className="field-error">Escribe un correo válido para poder dar seguimiento.</small>}
        </label>
        <label>
          Edad
          <input
            type="number"
            min="1"
            max="120"
            value={form.age}
            onChange={(event) => updateField('age', event.target.value)}
            placeholder="Ej. 32"
          />
          {isAgeInvalid && <small className="field-error">Ingresa una edad válida entre 1 y 120 años.</small>}
        </label>
        <label>
          Teléfono opcional
          <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+593..." />
        </label>
        <label>
          Relación con el proceso
          <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="paciente">Soy paciente</option>
            <option value="familiar">Soy familiar</option>
            <option value="cuidador">Soy cuidador/a</option>
            <option value="profesional">Soy profesional o estudiante</option>
          </select>
        </label>
        <label>
          Situación médica
          <input
            value={form.medicalSituation}
            onChange={(event) => updateField('medicalSituation', event.target.value)}
            placeholder="Diagnóstico o situación actual"
          />
        </label>
      </div>
    </div>
  );
}

function MoodStep({ value, onChange }) {
  return (
    <div className="evaluation-step">
      <h3>¿Cuál es tu estado de ánimo general en este momento?</h3>
      <div className="mood-grid">
        {moodOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              className={value === option.value ? 'mood-option mood-option--selected' : 'mood-option'}
              onClick={() => onChange(option.value)}
            >
              <Icon size={34} />
              <strong>{option.label}</strong>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SymptomsStep({ selected, onToggle }) {
  return (
    <div className="evaluation-step">
      <h3>¿Qué emociones o síntomas has sentido recientemente?</h3>
      <p className="evaluation-step__hint">Puedes seleccionar una o varias opciones.</p>
      <div className="symptom-grid">
        {symptomOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected.includes(option.id) ? 'symptom-option symptom-option--selected' : 'symptom-option'}
            onClick={() => onToggle(option.id)}
          >
            <CheckCircle2 size={20} />
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SupportStep({ form, updateField, result }) {
  return (
    <div className="evaluation-step">
      <h3>¿Cómo describes tu red de apoyo actual?</h3>
      <div className="support-options">
        {supportOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={form.support === option.value ? 'support-option support-option--selected' : 'support-option'}
            onClick={() => updateField('support', option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <label className="notes-field">
        Comentario adicional opcional
        <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Cuéntanos brevemente qué necesitas..." />
      </label>
      {form.support && (
        <div className={`evaluation-summary evaluation-summary--${result.level}`}>
          <strong>{result.title}</strong>
          <span>{result.description}</span>
        </div>
      )}
    </div>
  );
}

function AdditionalStep({ form, updateField }) {
  return (
    <div className="evaluation-step">
      <h3>Algunas preguntas adicionales</h3>
      <p className="evaluation-step__hint">Estas preguntas ayudan a precisar la orientación final.</p>
      <div className="additional-grid">
        <label>
          ¿Cuánto tiempo llevas con estos síntomas? (semanas aproximadas)
          <input
            type="number"
            min="0"
            value={form.durationWeeks}
            onChange={(event) => updateField('durationWeeks', event.target.value)}
            placeholder="Ej. 4"
          />
        </label>

        <label>
          ¿Has tenido pensamientos de hacerte daño o suicidas?
          <select value={form.suicidalIdeation} onChange={(event) => updateField('suicidalIdeation', event.target.value)}>
            <option value="">Selecciona</option>
            <option value="no">No</option>
            <option value="aVeces">A veces</option>
            <option value="si">Sí</option>
          </select>
        </label>

        <label>
          Tratamiento o seguimiento actual (si aplica)
          <input
            value={form.currentTreatment}
            onChange={(event) => updateField('currentTreatment', event.target.value)}
            placeholder="Ej. terapia semanal, medicamentos..."
          />
        </label>

        <label>
          Estrategias que usas para manejarlo
          <input
            value={form.copingStrategies}
            onChange={(event) => updateField('copingStrategies', event.target.value)}
            placeholder="Ej. caminatas, hablar con amigos..."
          />
        </label>
      </div>

      {(form.suicidalIdeation === 'si' || form.suicidalIdeation === 'aVeces') && (
        <div className="risk-alert">
          <CircleAlert size={22} />
          <p>
            Si sientes que podrías hacerte daño o estás en riesgo inmediato, busca ayuda urgente, contacta a una persona
            de confianza o acude al servicio de emergencias más cercano.
          </p>
        </div>
      )}

      <label className={form.consentToContact ? 'consent-checkbox consent-checkbox--checked' : 'consent-checkbox'}>
        <input type="checkbox" checked={form.consentToContact} onChange={(event) => updateField('consentToContact', event.target.checked)} />
        <span>
          <strong>Acepto el uso responsable de mis respuestas</strong>
          <small>
            Autorizo que PsicoAlma use esta información únicamente para orientación y posible contacto relacionado con
            esta evaluación.
          </small>
        </span>
      </label>
    </div>
  );
}

function ResultView({ isSending, result, resetEvaluation, sentEvaluation }) {
  const wasSent = sentEvaluation?.status === 'sent';
  const hasFailed = sentEvaluation?.status === 'failed';
  const isPriority = result.level === 'priority';

  return (
    <div className="evaluation-result">
      <CheckCircle2 size={54} />
      <h3>Evaluación registrada</h3>
      {sentEvaluation?.trackingCode && <p className="tracking-code">Código de seguimiento: {sentEvaluation.trackingCode}</p>}
      <div className={`evaluation-summary evaluation-summary--${result.level}`}>
        <strong>{result.title}</strong>
        <span>{result.description}</span>
      </div>
      {isPriority && (
        <div className="risk-alert risk-alert--result">
          <CircleAlert size={22} />
          <p>
            Si hay riesgo inmediato, busca ayuda urgente o comunícate con una persona de confianza. Esta evaluación no
            sustituye atención de emergencia.
          </p>
        </div>
      )}
      <div className="evaluation-diagnosis">
        <h4>Orientación sugerida</h4>
        <p>{result.diagnostic || result.description}</p>
      </div>
      <p>
        Gracias por compartir cómo te sientes. Esta información ayuda a orientar una respuesta más humana y adecuada.
      </p>
      <div
        className={`evaluation-mail-status ${wasSent ? 'evaluation-mail-status--sent' : ''} ${
          hasFailed ? 'evaluation-mail-status--failed' : ''
        }`}
      >
        {isSending && 'Estamos enviando tu evaluación al equipo de PsicoAlma...'}
        {wasSent && 'Listo. Tu evaluación fue enviada al equipo de PsicoAlma.'}
        {hasFailed && 'No pudimos enviar la evaluación en este momento. Inténtalo nuevamente en unos minutos o comunícate desde Contactos.'}
        {!isSending && !wasSent && !hasFailed && 'Estamos registrando tu evaluación...'}
      </div>
      <div className="evaluation-result__actions">
        <button type="button" onClick={resetEvaluation} className="evaluation-actions__secondary">
          Realizar otra evaluación
        </button>
      </div>
    </div>
  );
}

function validateStep(step, form) {
  if (step === 0) {
    return Boolean(
      form.name.trim() &&
        isValidEmail(form.email) &&
        isValidAge(form.age) &&
        form.role &&
        form.medicalSituation.trim(),
    );
  }

  if (step === 1) {
    return Boolean(form.mood);
  }

  if (step === 2) {
    return form.symptoms.length > 0;
  }

  if (step === 3) {
    return Boolean(form.support);
  }

  return Boolean(form.suicidalIdeation && form.consentToContact);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function isValidAge(age) {
  const parsedAge = Number(age);
  return Number.isInteger(parsedAge) && parsedAge >= 1 && parsedAge <= 120;
}

function generateTrackingCode() {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PA-${year}-${random}`;
}

function calculateResult(form) {
  const moodScore = moodOptions.find((option) => option.value === form.mood)?.score ?? 0;
  const symptomScore = form.symptoms.reduce((total, id) => {
    return total + (symptomOptions.find((option) => option.id === id)?.score ?? 0);
  }, 0);
  const supportScore = supportOptions.find((option) => option.value === form.support)?.score ?? 0;
  const suicidalScore = form.suicidalIdeation === 'si' ? 8 : form.suicidalIdeation === 'aVeces' ? 4 : 0;
  const total = moodScore + symptomScore + supportScore + suicidalScore;

  if (form.suicidalIdeation === 'si' || total >= 9) {
    return {
      level: 'priority',
      title: 'Atención psicológica prioritaria',
      description: 'Tus respuestas sugieren una carga emocional alta. Es recomendable recibir acompañamiento profesional pronto.',
      diagnostic: `Orientación prioritaria (${total}). Se recomienda contacto pronto con un profesional de salud mental. Si existe riesgo de daño personal, es importante buscar ayuda urgente, acudir a servicios de emergencia o apoyarse en una persona de confianza.`,
    };
  }

  if (total >= 5) {
    return {
      level: 'recommended',
      title: 'Acompañamiento recomendado',
      description: 'Tus respuestas muestran señales emocionales que pueden beneficiarse de una orientación psicológica.',
      diagnostic: `Orientación recomendada (${total}). Se sugiere iniciar acompañamiento psicológico o seguimiento con un profesional. Estrategias reportadas: ${form.copingStrategies || 'no reportadas'}.`,
    };
  }

  return {
    level: 'preventive',
    title: 'Orientación preventiva',
    description: 'Tus respuestas sugieren estabilidad relativa, pero mantener apoyo y autocuidado sigue siendo importante.',
    diagnostic: `Orientación preventiva (${total}). Mantener autocuidado, red de apoyo y observación de cambios emocionales. Si los síntomas empeoran, considera buscar apoyo profesional.`,
  };
}

export default EvaluationPage;
