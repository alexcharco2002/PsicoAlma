import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import './EvaluationPage.css';

const evaluationStorageKey = 'psicoalma-evaluations';

const moodOptions = [
  { value: 'muy-bajo', label: 'Muy bajo', icon: '😵', score: 4 },
  { value: 'bajo', label: 'Bajo', icon: '☹️', score: 3 },
  { value: 'neutral', label: 'Neutral', icon: '😐', score: 2 },
  { value: 'bien', label: 'Bien', icon: '🙂', score: 1 },
  { value: 'excelente', label: 'Excelente', icon: '😊', score: 0 },
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
  mood: '',
  symptoms: [],
  support: '',
  name: '',
  email: '',
  phone: '',
  medicalSituation: '',
  notes: '',
};

function EvaluationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [sentEvaluation, setSentEvaluation] = useState(null);

  const totalSteps = 4;
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

  const submitEvaluation = () => {
    const evaluation = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      form,
      result,
      status: 'pending-email-connection',
    };

    const saved = JSON.parse(window.localStorage.getItem(evaluationStorageKey) || '[]');
    window.localStorage.setItem(evaluationStorageKey, JSON.stringify([evaluation, ...saved]));
    setSentEvaluation(evaluation);
  };

  const resetEvaluation = () => {
    setForm(initialForm);
    setStep(0);
    setSentEvaluation(null);
  };

  return (
    <div className="evaluation-page">
      <section className="evaluation-header page-section">
        <h1>Dinos como te sientes hoy</h1>
        <p>
          <ShieldCheck size={18} />
          Este es un espacio seguro. Tus respuestas son confidenciales.
        </p>
      </section>

      <section className="evaluation-progress page-section" aria-label="Progreso de evaluacion">
        <div className="evaluation-progress__meta">
          <strong>Progreso de evaluacion</strong>
          <span>Paso {step + 1} de {totalSteps}</span>
        </div>
        <div className="evaluation-progress__track">
          <span style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="evaluation-card page-section">
        {sentEvaluation ? (
          <ResultView result={result} resetEvaluation={resetEvaluation} />
        ) : (
          <>
            {step === 0 && <MoodStep value={form.mood} onChange={(value) => updateField('mood', value)} />}
            {step === 1 && <SymptomsStep selected={form.symptoms} onToggle={toggleSymptom} />}
            {step === 2 && <SupportStep value={form.support} onChange={(value) => updateField('support', value)} />}
            {step === 3 && <ContactStep form={form} updateField={updateField} result={result} />}
          </>
        )}
      </section>

      {!sentEvaluation && (
        <div className="evaluation-actions page-section">
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
  );
}

function MoodStep({ value, onChange }) {
  return (
    <div className="evaluation-step">
      <h2>¿Cual es tu estado de animo general en este momento?</h2>
      <div className="mood-grid">
        {moodOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'mood-option mood-option--selected' : 'mood-option'}
            onClick={() => onChange(option.value)}
          >
            <span>{option.icon}</span>
            <strong>{option.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function SymptomsStep({ selected, onToggle }) {
  return (
    <div className="evaluation-step">
      <h2>¿Que emociones o sintomas has sentido recientemente?</h2>
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

function SupportStep({ value, onChange }) {
  return (
    <div className="evaluation-step">
      <h2>¿Como describes tu red de apoyo actual?</h2>
      <div className="support-options">
        {supportOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'support-option support-option--selected' : 'support-option'}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactStep({ form, updateField, result }) {
  return (
    <div className="evaluation-step">
      <h2>Datos para recibir orientacion</h2>
      <p className="evaluation-step__hint">Cuando conectemos el correo, esta informacion llegara al email que nos indiques.</p>
      <div className="contact-grid">
        <label>
          Nombre
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Tu nombre" />
        </label>
        <label>
          Correo
          <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="correo@ejemplo.com" />
        </label>
        <label>
          Telefono opcional
          <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+593..." />
        </label>
        <label>
          Situacion medica
          <input
            value={form.medicalSituation}
            onChange={(event) => updateField('medicalSituation', event.target.value)}
            placeholder="Diagnostico o situacion actual"
          />
        </label>
        <label className="contact-grid__full">
          Comentario adicional
          <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Cuéntanos brevemente qué necesitas..." />
        </label>
      </div>
      <div className={`evaluation-summary evaluation-summary--${result.level}`}>
        <strong>{result.title}</strong>
        <span>{result.description}</span>
      </div>
    </div>
  );
}

function ResultView({ result, resetEvaluation }) {
  return (
    <div className="evaluation-result">
      <CheckCircle2 size={54} />
      <h2>Evaluacion registrada</h2>
      <div className={`evaluation-summary evaluation-summary--${result.level}`}>
        <strong>{result.title}</strong>
        <span>{result.description}</span>
      </div>
      <p>
        Por ahora se guardo localmente en este navegador. Cuando me pases el correo, conectamos el envio para que cada
        evaluacion llegue automaticamente.
      </p>
      <button type="button" onClick={resetEvaluation}>
        Realizar otra evaluacion
      </button>
    </div>
  );
}

function validateStep(step, form) {
  if (step === 0) {
    return Boolean(form.mood);
  }

  if (step === 1) {
    return form.symptoms.length > 0;
  }

  if (step === 2) {
    return Boolean(form.support);
  }

  return Boolean(form.name.trim() && form.email.trim() && form.medicalSituation.trim());
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
    };
  }

  if (total >= 5) {
    return {
      level: 'recommended',
      title: 'Acompanamiento recomendado',
      description: 'Tus respuestas muestran senales emocionales que pueden beneficiarse de una orientacion psicologica.',
    };
  }

  return {
    level: 'preventive',
    title: 'Orientacion preventiva',
    description: 'Tus respuestas sugieren estabilidad relativa, pero mantener apoyo y autocuidado sigue siendo importante.',
  };
}

export default EvaluationPage;
