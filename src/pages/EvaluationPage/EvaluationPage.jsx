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
import { sendWithEmailJS } from '../../lib/emailService';

const evaluationStorageKey = 'psicoalma-evaluations';

const moodOptions = [
  { value: 'muy-bajo', label: 'Muy bajo', icon: CircleAlert, score: 4 },
  { value: 'bajo', label: 'Bajo', icon: Frown, score: 3 },
  { value: 'neutral', label: 'Neutral', icon: Meh, score: 2 },
  { value: 'bien', label: 'Bien', icon: Smile, score: 1 },
  { value: 'excelente', label: 'Excelente', icon: Sparkles, score: 0 },
];

const symptomOptions = [
  { id: 'miedo', label: 'Miedo o preocupacion constante', score: 2 },
  { id: 'tristeza', label: 'Tristeza frecuente', score: 2 },
  { id: 'sueno', label: 'Dificultad para dormir', score: 1 },
  { id: 'cansancio', label: 'Cansancio emocional', score: 1 },
  { id: 'aislamiento', label: 'Ganas de aislarme', score: 2 },
  { id: 'llanto', label: 'Llanto frecuente', score: 2 },
];

const supportOptions = [
  { value: 'fuerte', label: 'Tengo una red de apoyo cercana', score: 0 },
  { value: 'parcial', label: 'Tengo apoyo, pero no siempre esta disponible', score: 2 },
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
    setIsModalOpen(false);
    setStep(0);
    setSentEvaluation(null);
  };

  const submitEvaluation = () => {
    const evaluation = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      form,
      result,
      status: 'pending',
    };

    const saved = JSON.parse(window.localStorage.getItem(evaluationStorageKey) || '[]');
    window.localStorage.setItem(evaluationStorageKey, JSON.stringify([evaluation, ...saved]));
    setSentEvaluation(evaluation);
    // Try to send to serverless endpoint when available
    (async () => {
      try {
        const res = await fetch('/api/send-evaluation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(evaluation),
        });
        if (res.ok) {
          const updated = { ...evaluation, status: 'sent' };
          const remaining = saved;
          window.localStorage.setItem(evaluationStorageKey, JSON.stringify([updated, ...remaining]));
          setSentEvaluation(updated);
        } else {
          // leave as pending
        }
      } catch (err) {
        // network or no server configured — keep local and let user send later
      }
    })();
  };

  const sendByApi = async (evaluation) => {
    // Primero intenta endpoint serverless
    try {
      const res = await fetch('/api/send-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evaluation),
      });
      if (res.ok) {
        const updated = { ...evaluation, status: 'sent' };
        const saved = JSON.parse(window.localStorage.getItem(evaluationStorageKey) || '[]').filter((e) => e.id !== evaluation.id);
        window.localStorage.setItem(evaluationStorageKey, JSON.stringify([updated, ...saved]));
        setSentEvaluation(updated);
        return true;
      }
    } catch (err) {
      // no server o fallo de red, intentaremos EmailJS
    }

    // Fallback: intentar EmailJS (cliente) si está configurado
    try {
      const ok = await sendWithEmailJS(evaluation);
      if (ok) {
        const updated = { ...evaluation, status: 'sent-emailjs' };
        const saved = JSON.parse(window.localStorage.getItem(evaluationStorageKey) || '[]').filter((e) => e.id !== evaluation.id);
        window.localStorage.setItem(evaluationStorageKey, JSON.stringify([updated, ...saved]));
        setSentEvaluation(updated);
        return true;
      }
    } catch (err) {
      // ignore
    }

    return false;
  };

  const resetEvaluation = () => {
    setForm(initialForm);
    setStep(0);
    setSentEvaluation(null);
  };

  return (
    <div className="evaluation-page">
      <section className="evaluation-hero page-section">
        <div className="evaluation-hero__heading">
          <div className="evaluation-hero__label">
            <ShieldCheck size={20} />
            Evaluacion emocional
          </div>
          <h1>Evaluacion psicologica inicial</h1>
        </div>

        <div className="evaluation-intro">
          <h2>Que encontraras aqui</h2>
          <p>
            Esta evaluacion rapida ayuda a identificar senales emocionales frecuentes en personas con enfermedades
            catastroficas, familiares y cuidadores. No reemplaza una consulta profesional, pero puede orientar el primer
            paso para recibir acompanamiento.
          </p>
          <button type="button" className="evaluation-hero__button" onClick={openEvaluation}>
            Empezar evaluacion rapida
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="evaluation-info page-section" aria-label="Informacion de la evaluacion">
        <article>
          <ShieldCheck size={26} />
          <h2>Confidencial</h2>
          <p>Tus respuestas se tratan con respeto y se usan solo para orientar el tipo de apoyo que puedes necesitar.</p>
        </article>
        <article>
          <HeartHandshake size={26} />
          <h2>Humana</h2>
          <p>La evaluacion considera el estado de animo, sintomas emocionales, red de apoyo y situacion personal.</p>
        </article>
        <article>
          <Mail size={26} />
          <h2>Con seguimiento</h2>
          <p>Cuando conectemos el correo, cada solicitud podra llegar al equipo encargado para responder a tiempo.</p>
        </article>
      </section>

      <section className="evaluation-note page-section">
        <div className="evaluation-note__heading">
          <p className="section-kicker">Informacion principal</p>
          <h2>Que se revisa en la evaluacion</h2>
        </div>
        <div className="evaluation-review-grid">
          <article>
            <span>01</span>
            <h3>Datos personales basicos</h3>
            <p>Nombres, correo, edad y relacion con el proceso para orientar mejor el acompanamiento.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Estado de animo actual</h3>
            <p>Una lectura sencilla del nivel emocional que la persona identifica en el momento.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Sintomas recientes</h3>
            <p>Senales como miedo, tristeza, cansancio emocional, aislamiento o dificultad para dormir.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Red de apoyo</h3>
            <p>El nivel de acompanamiento disponible en la familia, amistades o entorno cercano.</p>
          </article>
          <article>
            <span>05</span>
            <h3>Necesidad principal</h3>
            <p>Un comentario final para explicar que tipo de ayuda o contacto necesita la persona.</p>
          </article>
        </div>
      </section>

      {isModalOpen && (
        <EvaluationModal
          canContinue={canContinue}
          closeEvaluation={closeEvaluation}
          form={form}
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
          sendByApi={sendByApi}
        />
      )}
    </div>
  );
}

function EvaluationModal({
  canContinue,
  closeEvaluation,
  form,
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
  sendByApi,
}) {
  return (
    <div className="evaluation-modal" role="dialog" aria-modal="true" aria-labelledby="evaluation-modal-title">
      <div className="evaluation-modal__backdrop" onClick={closeEvaluation} />
      <div className="evaluation-modal__panel">
        <button type="button" className="evaluation-modal__close" onClick={closeEvaluation} aria-label="Cerrar evaluacion">
          <X size={22} />
        </button>

        <header className="evaluation-modal__header">
          <h2 id="evaluation-modal-title">Dinos como te sientes hoy</h2>
          <p>
            <ShieldCheck size={17} />
            Este es un espacio seguro. Tus respuestas son confidenciales.
          </p>
        </header>

        {!sentEvaluation && (
          <section className="evaluation-progress" aria-label="Progreso de evaluacion">
            <div className="evaluation-progress__meta">
              <strong>Progreso de evaluacion</strong>
              <span>Paso {step + 1} de {totalSteps}</span>
            </div>
            <div className="evaluation-progress__track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </section>
        )}

        <section className="evaluation-card">
          {sentEvaluation ? (
            <ResultView result={result} resetEvaluation={resetEvaluation} sendByApi={() => sendByApi(sentEvaluation)} sentEvaluation={sentEvaluation} />
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
            <button type="button" className="evaluation-actions__secondary" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
              <ArrowLeft size={18} />
              Anterior
            </button>
            {step < totalSteps - 1 ? (
              <button type="button" className="evaluation-actions__primary" onClick={() => setStep((current) => current + 1)} disabled={!canContinue}>
                Siguiente
                <ArrowRight size={18} />
              </button>
            ) : (
              <button type="button" className="evaluation-actions__primary" onClick={submitEvaluation} disabled={!canContinue}>
                Enviar evaluacion
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
  return (
    <div className="evaluation-step">
      <h3>Primero, cuentanos sobre ti</h3>
      <p className="evaluation-step__hint">Estos datos ayudan a orientar mejor la respuesta del equipo.</p>
      <div className="contact-grid">
        <label>
          Nombres completos
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Tu nombre" />
        </label>
        <label>
          Correo electronico
          <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="correo@ejemplo.com" />
        </label>
        <label>
          Edad
          <input type="number" min="1" max="120" value={form.age} onChange={(event) => updateField('age', event.target.value)} placeholder="Ej. 32" />
        </label>
        <label>
          Telefono opcional
          <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+593..." />
        </label>
        <label>
          Relacion con el proceso
          <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
            <option value="">Selecciona una opcion</option>
            <option value="paciente">Soy paciente</option>
            <option value="familiar">Soy familiar</option>
            <option value="cuidador">Soy cuidador/a</option>
            <option value="profesional">Soy profesional o estudiante</option>
          </select>
        </label>
        <label>
          Situacion medica
          <input
            value={form.medicalSituation}
            onChange={(event) => updateField('medicalSituation', event.target.value)}
            placeholder="Diagnostico o situacion actual"
          />
        </label>
      </div>
    </div>
  );
}

function MoodStep({ value, onChange }) {
  return (
    <div className="evaluation-step">
      <h3>Cual es tu estado de animo general en este momento?</h3>
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
      <h3>Que emociones o sintomas has sentido recientemente?</h3>
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
      <h3>Como describes tu red de apoyo actual?</h3>
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
        <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Cuentanos brevemente que necesitas..." />
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
      <p className="evaluation-step__hint">Estas preguntas ayudan a precisar la recomendación final.</p>
      <label>
        ¿Cuánto tiempo llevas con estos síntomas? (semanas aproximadas)
        <input type="number" min="0" value={form.durationWeeks} onChange={(e) => updateField('durationWeeks', e.target.value)} placeholder="Ej. 4" />
      </label>

      <label>
        ¿Has tenido pensamientos de hacerte daño o suicidas?
        <select value={form.suicidalIdeation} onChange={(e) => updateField('suicidalIdeation', e.target.value)}>
          <option value="">Selecciona</option>
          <option value="no">No</option>
          <option value="aVeces">A veces</option>
          <option value="si">Si</option>
        </select>
      </label>

      <label>
        Tratamiento o seguimiento actual (si aplica)
        <input value={form.currentTreatment} onChange={(e) => updateField('currentTreatment', e.target.value)} placeholder="Ej. terapia semanal, medicamentos..." />
      </label>

      <label>
        Estrategias que usas para manejarlo
        <input value={form.copingStrategies} onChange={(e) => updateField('copingStrategies', e.target.value)} placeholder="Ej. caminatas, hablar con amigos..." />
      </label>

      <label className="consent-checkbox">
        <input type="checkbox" checked={form.consentToContact} onChange={(e) => updateField('consentToContact', e.target.checked)} />
        Consiento que el equipo me contacte por correo si es necesario
      </label>
    </div>
  );
}

function ResultView({ result, resetEvaluation, sendByApi, sentEvaluation }) {
  return (
    <div className="evaluation-result">
      <CheckCircle2 size={54} />
      <h3>Evaluacion registrada</h3>
      <div className={`evaluation-summary evaluation-summary--${result.level}`}>
        <strong>{result.title}</strong>
        <span>{result.description}</span>
      </div>
      <div className="evaluation-diagnosis">
        <h4>Diagnóstico sugerido</h4>
        <p>
          {result.diagnostic || result.description}
        </p>
      </div>
      <p>
        Esta evaluación se guardó localmente en tu navegador. Si configuras el envío por correo, podrás recibirla en
        el buzón del equipo responsable.
      </p>
      <div className="evaluation-result__actions">
        {sentEvaluation?.status !== 'sent' && (
          <button type="button" onClick={sendByApi} className="evaluation-actions__primary">
            Enviar ahora por correo
          </button>
        )}
        <button type="button" onClick={resetEvaluation} className="evaluation-actions__secondary">
          Realizar otra evaluacion
        </button>
      </div>
    </div>
  );
}

function validateStep(step, form) {
  if (step === 0) {
    return Boolean(form.name.trim() && form.email.trim() && form.age && form.role && form.medicalSituation.trim());
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

  // step 4 (preguntas adicionales) es opcional
  return true;
}

function calculateResult(form) {
  const moodScore = moodOptions.find((option) => option.value === form.mood)?.score ?? 0;
  const symptomScore = form.symptoms.reduce((total, id) => {
    return total + (symptomOptions.find((option) => option.id === id)?.score ?? 0);
  }, 0);
  const supportScore = supportOptions.find((option) => option.value === form.support)?.score ?? 0;
  const total = moodScore + symptomScore + supportScore;

  if (total >= 9) {
    return {
      level: 'priority',
      title: 'Atencion psicologica prioritaria',
      description: 'Tus respuestas sugieren una carga emocional alta. Es recomendable recibir acompanamiento profesional pronto.',
      diagnostic: `Carga alta (${total}). Recomendado contacto inmediato con profesional. Si hay pensamientos suicidas o la duracion supera las ${form.durationWeeks || 'varias'} semanas, favor priorizar la busqueda de ayuda.`,
    };
  }

  if (total >= 5) {
    return {
      level: 'recommended',
      title: 'Acompanamiento recomendado',
      description: 'Tus respuestas muestran senales emocionales que pueden beneficiarse de una orientacion psicologica.',
      diagnostic: `Carga moderada (${total}). Se sugiere iniciar orientacion psicologica o seguimiento con profesional. Revisa estrategias de afrontamiento: ${form.copingStrategies || 'no reportadas'}.`,
    };
  }

  return {
    level: 'preventive',
    title: 'Orientacion preventiva',
    description: 'Tus respuestas sugieren estabilidad relativa, pero mantener apoyo y autocuidado sigue siendo importante.',
    diagnostic: `Carga baja (${total}). Mantener autocuidado y red de apoyo. Si los sintomas empeoran, considera buscar apoyo profesional.`,
  };
}

export default EvaluationPage;
