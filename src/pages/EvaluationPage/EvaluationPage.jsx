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

const stepLabels = ['Datos', 'Estado', 'Síntomas', 'Impacto', 'Apoyo', 'Seguimiento'];

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

const intensityOptions = [
  { value: 'poco', label: 'Poco', score: 1 },
  { value: 'moderado', label: 'Moderado', score: 2 },
  { value: 'mucho', label: 'Mucho', score: 3 },
  { value: 'demasiado', label: 'Demasiado', score: 4 },
];

const frequencyOptions = [
  { value: 'algunos-dias', label: 'Algunos días', score: 1 },
  { value: 'mitad-dias', label: 'Más de la mitad de los días', score: 2 },
  { value: 'casi-todos', label: 'Casi todos los días', score: 4 },
];

const dailyImpactOptions = [
  { value: 'leve', label: 'Afecta poco mi rutina', score: 1 },
  { value: 'moderado', label: 'Afecta sueño, estudio, trabajo o relaciones', score: 3 },
  { value: 'alto', label: 'Me cuesta cumplir actividades importantes', score: 5 },
];

const supportNetworkOptions = [
  { id: 'familia', label: 'Familia' },
  { id: 'amistades', label: 'Amistades' },
  { id: 'pareja', label: 'Pareja' },
  { id: 'personal-medico', label: 'Personal médico' },
  { id: 'nadie', label: 'No cuento con nadie ahora' },
];

const helpReasonOptions = [
  { value: 'hablar', label: 'Quiero hablar con alguien' },
  { value: 'ansiedad', label: 'Tengo miedo o ansiedad' },
  { value: 'familia', label: 'Necesito orientación familiar' },
  { value: 'agotamiento', label: 'Me siento agotado/a' },
  { value: 'diagnostico', label: 'No sé cómo afrontar el diagnóstico' },
  { value: 'cuidador', label: 'Necesito apoyo como cuidador/a' },
];

const urgencyOptions = [
  { value: 'no', label: 'No' },
  { value: 'necesito-apoyo', label: 'Necesito apoyo pronto' },
  { value: 'riesgo-hoy', label: 'Sí, me siento en riesgo hoy' },
];

const medicalSituationOptions = [
  { value: 'cancer', label: 'Cáncer' },
  { value: 'renal', label: 'Enfermedad renal crónica' },
  { value: 'cardiaca', label: 'Enfermedad cardíaca grave' },
  { value: 'neurologica', label: 'Enfermedad neurológica' },
  { value: 'cuidados', label: 'Proceso de cuidado o acompañamiento familiar' },
  { value: 'otro', label: 'Otro' },
];

const supportNeedOptions = [
  { value: 'escucha', label: 'Necesito ser escuchado/a' },
  { value: 'orientacion', label: 'Necesito orientación para afrontar el proceso' },
  { value: 'familia', label: 'Necesito apoyo para mi familia' },
  { value: 'recursos', label: 'Necesito recursos o recomendaciones' },
  { value: 'otro', label: 'Otro' },
];

const treatmentOptions = [
  { value: 'ninguno', label: 'No tengo seguimiento actualmente' },
  { value: 'psicologico', label: 'Terapia psicológica' },
  { value: 'medico', label: 'Seguimiento médico' },
  { value: 'ambos', label: 'Seguimiento médico y psicológico' },
  { value: 'otro', label: 'Otro' },
];

const copingOptions = [
  { value: 'hablar', label: 'Hablar con alguien de confianza' },
  { value: 'respiracion', label: 'Respiración, relajación o meditación' },
  { value: 'actividad', label: 'Actividad física o caminatas' },
  { value: 'ninguna', label: 'Aún no tengo estrategias' },
  { value: 'otro', label: 'Otro' },
];

const initialForm = {
  name: '',
  email: '',
  age: '',
  phone: '',
  role: '',
  medicalSituation: '',
  medicalSituationOther: '',
  mood: '',
  symptoms: [],
  symptomIntensity: '',
  frequency: '',
  dailyImpact: '',
  support: '',
  supportNetwork: [],
  supportNeed: '',
  notes: '',
  durationWeeks: '',
  urgencyToday: '',
  helpReason: '',
  suicidalIdeation: '',
  currentTreatment: '',
  currentTreatmentOther: '',
  copingStrategies: '',
  copingStrategiesOther: '',
  consentToContact: false,
};

function EvaluationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [sentEvaluation, setSentEvaluation] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const totalSteps = stepLabels.length;
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

  const toggleSupportNetwork = (id) => {
    setForm((current) => {
      const exists = current.supportNetwork.includes(id);
      const nextNetwork = exists ? current.supportNetwork.filter((item) => item !== id) : [...current.supportNetwork, id];

      return {
        ...current,
        supportNetwork: id === 'nadie' && !exists ? ['nadie'] : nextNetwork.filter((item) => item !== 'nadie' || id === 'nadie'),
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
            Orientación emocional
          </div>
          <h1>Un primer paso para entender cómo te sientes</h1>
        </div>

        <div className="evaluation-intro">
          <h2>Cómo funciona este espacio</h2>
          <p>
            Esta evaluación rápida ayuda a identificar señales emocionales frecuentes en personas que atraviesan una
            enfermedad compleja, familiares y cuidadores. No reemplaza una consulta profesional, pero puede orientar el
            primer paso para recibir acompañamiento.
          </p>
          <button type="button" className="evaluation-hero__button" onClick={openEvaluation}>
            Iniciar evaluación con calma
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

      <section className="evaluation-privacy page-section" aria-label="Privacidad y alcance de la evaluación">
        <article>
          <ShieldCheck size={24} />
          <div>
            <h2>Uso responsable</h2>
            <p>Tus respuestas se usan solo con fines de orientación y posible seguimiento relacionado con esta evaluación.</p>
          </div>
        </article>
        <article>
          <HeartHandshake size={24} />
          <div>
            <h2>Alcance profesional</h2>
            <p>Esta evaluación no reemplaza atención médica o psicológica profesional, valoración especializada ni tratamiento.</p>
          </div>
        </article>
        <article>
          <CircleAlert size={24} />
          <div>
            <h2>Riesgo inmediato</h2>
            <p>Si estás en riesgo inmediato o podrías hacerte daño, busca ayuda urgente o acude a emergencias.</p>
          </div>
        </article>
      </section>

      <section className="evaluation-note page-section">
        <div className="evaluation-note__heading">
          <p className="section-kicker">Ruta de orientación</p>
          <h2>Qué revisamos para acompañarte mejor</h2>
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
            <p>Una selección final para explicar qué tipo de ayuda o contacto necesita la persona.</p>
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
          toggleSupportNetwork={toggleSupportNetwork}
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
  toggleSupportNetwork,
  toggleSymptom,
  totalSteps,
  updateField,
}) {
  return (
    <div className="evaluation-modal" role="dialog" aria-modal="true" aria-labelledby="evaluation-modal-title">
      <div className="evaluation-modal__backdrop" onClick={closeEvaluation} />
      <div className="evaluation-modal__panel">
        <header className="evaluation-modal__top">
          <div className="evaluation-modal__header">
            <h2 id="evaluation-modal-title">Dinos cómo te sientes hoy</h2>
            <p>
              <ShieldCheck size={17} />
              Este es un espacio seguro. Tus respuestas se tratan con respeto.
            </p>
          </div>

          <button
            type="button"
            className="evaluation-modal__close"
            onClick={closeEvaluation}
            aria-label="Cerrar evaluación"
            disabled={isSending}
          >
            <X size={22} />
          </button>

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
        </header>

        <main className="evaluation-modal__body">
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
                {step === 3 && <ImpactStep form={form} updateField={updateField} />}
                {step === 4 && <SupportStep form={form} updateField={updateField} result={result} toggleSupportNetwork={toggleSupportNetwork} />}
                {step === 5 && <AdditionalStep form={form} updateField={updateField} />}
              </>
            )}
          </section>
        </main>

        {!sentEvaluation && (
          <footer className="evaluation-modal__footer">
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
          </footer>
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
            <option value="persona">Soy la persona que vive el proceso</option>
            <option value="familiar">Soy familiar</option>
            <option value="cuidador">Soy cuidador/a</option>
            <option value="profesional">Soy profesional o estudiante</option>
          </select>
        </label>
        <label>
          Situación médica
          <select
            value={form.medicalSituation}
            onChange={(event) => updateField('medicalSituation', event.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {medicalSituationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {form.medicalSituation === 'otro' && (
          <label>
            Describe brevemente tu situación
            <input
              value={form.medicalSituationOther}
              onChange={(event) => updateField('medicalSituationOther', event.target.value)}
              placeholder="Escribe lo que consideres importante"
            />
          </label>
        )}
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

function ImpactStep({ form, updateField }) {
  return (
    <div className="evaluation-step">
      <h3>¿Qué tanto está afectando tu vida diaria?</h3>
      <p className="evaluation-step__hint">Esto ayuda a comprender la intensidad, frecuencia e impacto del malestar.</p>

      <div className="scale-section">
        <h4>Intensidad emocional</h4>
        <div className="scale-grid">
          {intensityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={form.symptomIntensity === option.value ? 'scale-option scale-option--selected' : 'scale-option'}
              onClick={() => updateField('symptomIntensity', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="scale-section">
        <h4>Frecuencia reciente</h4>
        <div className="scale-grid scale-grid--three">
          {frequencyOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={form.frequency === option.value ? 'scale-option scale-option--selected' : 'scale-option'}
              onClick={() => updateField('frequency', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="scale-section">
        <h4>Funcionamiento diario</h4>
        <div className="scale-grid scale-grid--three">
          {dailyImpactOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={form.dailyImpact === option.value ? 'scale-option scale-option--selected' : 'scale-option'}
              onClick={() => updateField('dailyImpact', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportStep({ form, updateField, result, toggleSupportNetwork }) {
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
      <div className="scale-section">
        <h4>¿Con quién cuentas actualmente?</h4>
        <div className="support-network-grid">
          {supportNetworkOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={form.supportNetwork.includes(option.id) ? 'network-option network-option--selected' : 'network-option'}
              onClick={() => toggleSupportNetwork(option.id)}
            >
              <CheckCircle2 size={18} />
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="scale-section">
        <h4>¿Qué apoyo te gustaría recibir en esta etapa?</h4>
        <div className="help-reason-grid">
          {supportNeedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={form.supportNeed === option.value ? 'reason-option reason-option--selected' : 'reason-option'}
              onClick={() => updateField('supportNeed', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {form.supportNeed === 'otro' && (
        <label className="notes-field">
          Cuéntanos qué apoyo necesitas
          <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Escribe lo que consideres importante" />
        </label>
      )}
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
      <h3>¿Qué tipo de ayuda necesitas ahora?</h3>
      <p className="evaluation-step__hint">Estas respuestas ayudan a priorizar el seguimiento y orientar mejor el acompañamiento.</p>

      <div className="scale-section">
        <h4>Motivo principal de ayuda</h4>
        <div className="help-reason-grid">
          {helpReasonOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={form.helpReason === option.value ? 'reason-option reason-option--selected' : 'reason-option'}
              onClick={() => updateField('helpReason', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

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
          ¿Te sientes en peligro de hacerte daño hoy?
          <select value={form.urgencyToday} onChange={(event) => updateField('urgencyToday', event.target.value)}>
            <option value="">Selecciona</option>
            {urgencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          <select
            value={form.currentTreatment}
            onChange={(event) => updateField('currentTreatment', event.target.value)}
          >
            <option value="">Selecciona</option>
            {treatmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Estrategias que usas para manejarlo
          <select
            value={form.copingStrategies}
            onChange={(event) => updateField('copingStrategies', event.target.value)}
          >
            <option value="">Selecciona</option>
            {copingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {(form.currentTreatment === 'otro' || form.copingStrategies === 'otro') && (
        <div className="additional-grid additional-grid--compact">
          {form.currentTreatment === 'otro' && (
            <label>
              Describe tu seguimiento actual
              <input
                value={form.currentTreatmentOther}
                onChange={(event) => updateField('currentTreatmentOther', event.target.value)}
                placeholder="Escribe lo que consideres importante"
              />
            </label>
          )}
          {form.copingStrategies === 'otro' && (
            <label>
              Describe tu estrategia de afrontamiento
              <input
                value={form.copingStrategiesOther}
                onChange={(event) => updateField('copingStrategiesOther', event.target.value)}
                placeholder="Escribe lo que consideres importante"
              />
            </label>
          )}
        </div>
      )}

      {(form.suicidalIdeation === 'si' || form.suicidalIdeation === 'aVeces' || form.urgencyToday === 'riesgo-hoy') && (
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
      {result.metrics && (
        <div className="result-metrics" aria-label="Resumen por categorías">
          <span>Estado emocional: {getMetricLabel(result.metrics.emotional)}</span>
          <span>Riesgo: {getMetricLabel(result.metrics.risk)}</span>
          <span>Red de apoyo: {getMetricLabel(result.metrics.support)}</span>
          <span>Rutina diaria: {getMetricLabel(result.metrics.functioning)}</span>
        </div>
      )}
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
        Gracias por compartir cómo te sientes. Esta información ayuda a orientar una respuesta más humana y cuidadosa.
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
        form.medicalSituation &&
        (form.medicalSituation !== 'otro' || form.medicalSituationOther.trim()),
    );
  }

  if (step === 1) {
    return Boolean(form.mood);
  }

  if (step === 2) {
    return form.symptoms.length > 0;
  }

  if (step === 3) {
    return Boolean(form.symptomIntensity && form.frequency && form.dailyImpact);
  }

  if (step === 4) {
    return Boolean(form.support && form.supportNetwork.length > 0 && form.supportNeed && (form.supportNeed !== 'otro' || form.notes.trim()));
  }

  return Boolean(
    form.helpReason &&
      form.urgencyToday &&
      form.suicidalIdeation &&
      form.currentTreatment &&
      (form.currentTreatment !== 'otro' || form.currentTreatmentOther.trim()) &&
      form.copingStrategies &&
      (form.copingStrategies !== 'otro' || form.copingStrategiesOther.trim()) &&
      form.consentToContact,
  );
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

function getMetricLabel(score) {
  if (score >= 8) {
    return 'alto';
  }

  if (score >= 4) {
    return 'moderado';
  }

  return 'bajo';
}

function calculateResult(form) {
  const moodScore = moodOptions.find((option) => option.value === form.mood)?.score ?? 0;
  const symptomScore = form.symptoms.reduce((total, id) => {
    return total + (symptomOptions.find((option) => option.id === id)?.score ?? 0);
  }, 0);
  const intensityScore = intensityOptions.find((option) => option.value === form.symptomIntensity)?.score ?? 0;
  const frequencyScore = frequencyOptions.find((option) => option.value === form.frequency)?.score ?? 0;
  const dailyImpactScore = dailyImpactOptions.find((option) => option.value === form.dailyImpact)?.score ?? 0;
  const supportScore = supportOptions.find((option) => option.value === form.support)?.score ?? 0;
  const suicidalScore = form.suicidalIdeation === 'si' ? 8 : form.suicidalIdeation === 'aVeces' ? 4 : 0;
  const urgencyScore = form.urgencyToday === 'riesgo-hoy' ? 10 : form.urgencyToday === 'necesito-apoyo' ? 3 : 0;
  const noNetworkScore = form.supportNetwork.includes('nadie') ? 3 : 0;
  const total = moodScore + symptomScore + intensityScore + frequencyScore + dailyImpactScore + supportScore + suicidalScore + urgencyScore + noNetworkScore;
  const metrics = {
    emotional: moodScore + symptomScore + intensityScore + frequencyScore,
    risk: suicidalScore + urgencyScore,
    support: supportScore + noNetworkScore,
    functioning: dailyImpactScore,
  };

  if (form.suicidalIdeation === 'si' || form.urgencyToday === 'riesgo-hoy' || total >= 16) {
    return {
      level: 'priority',
      title: 'Atención psicológica prioritaria',
      description: 'Tus respuestas sugieren una carga emocional alta. Es recomendable recibir acompañamiento profesional pronto.',
      diagnostic: `Orientación prioritaria (${total}). Se recomienda contacto pronto con un profesional de salud mental. Si existe riesgo de daño personal, es importante buscar ayuda urgente, acudir a servicios de emergencia o apoyarse en una persona de confianza.`,
      metrics,
    };
  }

  if (total >= 8) {
    return {
      level: 'recommended',
      title: 'Acompañamiento recomendado',
      description: 'Tus respuestas muestran señales emocionales que pueden beneficiarse de una orientación psicológica.',
      diagnostic: `Orientación recomendada (${total}). Se sugiere iniciar acompañamiento psicológico o seguimiento con un profesional. Estrategias reportadas: ${form.copingStrategies || 'no reportadas'}.`,
      metrics,
    };
  }

  return {
    level: 'preventive',
    title: 'Orientación preventiva',
    description: 'Tus respuestas sugieren estabilidad relativa, pero mantener apoyo y autocuidado sigue siendo importante.',
    diagnostic: `Orientación preventiva (${total}). Mantener autocuidado, red de apoyo y observación de cambios emocionales. Si los síntomas empeoran, considera buscar apoyo profesional.`,
    metrics,
  };
}

export default EvaluationPage;
