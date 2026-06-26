import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  UsersRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
import './TreatmentPage.css';

const overviewCards = [
  {
    title: 'Comprender emociones',
    icon: Brain,
    text: 'Se acompaña lo que la persona siente, cómo lo interpreta y de qué manera influye en su vida diaria.',
    points: ['Miedo e incertidumbre', 'Tristeza y enojo', 'Cambios de identidad'],
  },
  {
    title: 'Crear estrategias',
    icon: MessageCircle,
    text: 'El proceso ayuda a construir recursos para manejar ansiedad, pensamientos difíciles y momentos de crisis.',
    points: ['Respiración y regulación', 'Pensamientos más realistas', 'Plan ante momentos difíciles'],
  },
  {
    title: 'Incluir la red',
    icon: UsersRound,
    text: 'La familia y cuidadores pueden participar para mejorar comunicación, apoyo y descanso.',
    points: ['Acuerdos familiares', 'Cuidado del cuidador', 'Comunicación con respeto'],
  },
];

const guidanceCards = [
  {
    title: '¿Cuándo iniciar terapia?',
    icon: AlertCircle,
    text: 'Cuando el malestar se vuelve frecuente, interfiere con el sueño, las decisiones, el tratamiento, las relaciones o la esperanza cotidiana.',
    points: ['Ansiedad o tristeza persistente', 'Aislamiento o irritabilidad', 'Dificultad para afrontar noticias médicas'],
  },
  {
    title: '¿Qué esperar en la primera sesión?',
    icon: MessageCircle,
    text: 'La primera sesión suele servir para conocer la situación, escuchar necesidades, definir objetivos y explicar cómo será el acompañamiento.',
    points: ['No hay obligación de contar todo', 'Se acuerdan prioridades', 'Se explica la confidencialidad'],
  },
  {
    title: 'Apoyo, terapia y crisis',
    icon: ShieldCheck,
    text: 'El apoyo orienta y contiene; la terapia trabaja objetivos sostenidos; la intervención en crisis prioriza seguridad y estabilización inmediata.',
    points: ['Apoyo: orientación inicial', 'Terapia: proceso continuo', 'Crisis: atención urgente'],
  },
  {
    title: 'Persona, cuidador y familia',
    icon: HeartHandshake,
    text: 'La persona puede necesitar adaptación emocional; el cuidador, descanso y límites; la familia, comunicación y acuerdos de cuidado.',
    points: ['Persona: afrontamiento', 'Cuidador: autocuidado', 'Familia: organización y diálogo'],
  },
];

const treatments = [
  {
    title: 'Psicoterapia individual',
    text: 'Espacio personal para expresar emociones, trabajar miedo, tristeza, ansiedad y adaptación al proceso de salud.',
    details: {
      goal:
        'Busca ofrecer un espacio seguro para hablar de lo que ocurre, comprender reacciones emocionales y construir formas de afrontamiento acordes a la historia de cada persona.',
      usefulFor:
        'Puede ser útil cuando hay ansiedad, tristeza, miedo al futuro, cambios en la autoestima, dificultad para comunicar lo que se siente o necesidad de tomar decisiones importantes.',
      work: ['Escucha terapéutica y validación emocional', 'Identificación de necesidades personales', 'Manejo de ansiedad y tristeza', 'Plan de autocuidado y apoyo'],
    },
  },
  {
    title: 'Terapia cognitivo conductual',
    text: 'Ayuda a identificar pensamientos que aumentan el malestar y construir estrategias más saludables para afrontar situaciones difíciles.',
    details: {
      goal:
        'Se centra en la relación entre pensamientos, emociones y conductas. Ayuda a reconocer ideas que intensifican el sufrimiento y a practicar respuestas más útiles.',
      usefulFor:
        'Suele aplicarse en ansiedad, preocupación constante, miedo a recaídas, evitación, insomnio relacionado con preocupaciones y pensamientos catastróficos.',
      work: ['Registro de pensamientos y emociones', 'Reestructuración de ideas poco útiles', 'Exposición gradual a situaciones temidas', 'Técnicas de relajación y solución de problemas'],
    },
  },
  {
    title: 'Acompañamiento en duelo',
    text: 'Apoyo para procesar pérdidas, cambios de vida, incertidumbre o despedidas simbólicas dentro del proceso de enfermedad.',
    details: {
      goal:
        'Acompaña pérdidas reales o simbólicas: salud, independencia, proyectos, imagen corporal o seres queridos. No busca acelerar el duelo, sino sostenerlo con cuidado.',
      usefulFor:
        'Puede ayudar cuando hay dolor persistente, culpa, enojo, dificultad para aceptar cambios o necesidad de despedirse de etapas de vida que ya no son iguales.',
      work: ['Validación del dolor y la pérdida', 'Trabajo con culpa o enojo', 'Rituales de despedida y memoria', 'Reconstrucción de sentido y apoyo'],
    },
  },
  {
    title: 'Terapia familiar',
    text: 'Fortalece la comunicación, distribución de responsabilidades y apoyo emocional entre la persona, familia y cuidadores.',
    details: {
      goal:
        'Ayuda a que la familia entienda el proceso, mejore la comunicación y distribuya responsabilidades sin cargar todo sobre una sola persona.',
      usefulFor:
        'Es especialmente útil cuando existen conflictos, silencios, sobreprotección, agotamiento del cuidador o dificultad para hablar sobre decisiones médicas y emocionales.',
      work: ['Mapeo de roles familiares', 'Acuerdos de cuidado y descanso', 'Comunicación clara y respetuosa', 'Apoyo al cuidador principal'],
    },
  },
  {
    title: 'Intervención en crisis',
    text: 'Atención breve para momentos de ansiedad intensa, noticias médicas difíciles, desbordamiento emocional o sensación de no poder continuar.',
    details: {
      goal:
        'Busca estabilizar emocionalmente a la persona en un momento de alta intensidad, reducir el riesgo y organizar pasos inmediatos de seguridad y apoyo.',
      usefulFor:
        'Puede ser necesaria ante ataques de pánico, desesperación intensa, noticias inesperadas, conflictos familiares graves o sensación de descontrol emocional.',
      work: ['Contención emocional inmediata', 'Respiración y orientación al presente', 'Identificación de riesgos y apoyos', 'Plan de acción para las próximas horas'],
    },
  },
  {
    title: 'Psicoeducación',
    text: 'Brinda información clara sobre emociones, autocuidado, señales de alerta y recursos para vivir el proceso con mayor comprensión.',
    details: {
      goal:
        'Entrega información comprensible para que la persona, la familia o los cuidadores entiendan reacciones emocionales normales, señales de alerta y formas de pedir ayuda.',
      usefulFor:
        'Es útil al inicio del diagnóstico, durante tratamientos prolongados o cuando la familia necesita comprender cómo apoyar sin invalidar ni sobrecargar.',
      work: ['Explicación de emociones frecuentes', 'Señales de alerta emocional', 'Herramientas de autocuidado', 'Orientación para pedir apoyo profesional'],
    },
  },
];

const processSteps = [
  'Escucha inicial y reconocimiento de necesidades.',
  'Identificación del estado emocional y red de apoyo.',
  'Definición de objetivos terapéuticos realistas.',
  'Acompañamiento, seguimiento y ajustes según el proceso.',
];

function TreatmentPage({ onNavigate }) {
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  return (
    <div className="treatment-page">
      <section className="treatment-hero page-section">
        <div className="treatment-hero__heading">
          <div className="treatment-hero__label">
            <HeartHandshake size={20} />
            Acompañamiento emocional
          </div>
          <h1>Formas de apoyo para afrontar el proceso emocional</h1>
        </div>

        <div className="treatment-intro">
          <h2>Cómo puede ayudarte este espacio</h2>
          <p>
            El tratamiento psicológico busca acompañar a la persona y su entorno en momentos de miedo, incertidumbre,
            duelo, cansancio emocional o cambios importantes en la vida diaria. Cada proceso debe adaptarse a las
            necesidades de la persona, familia o cuidador.
          </p>
          <button type="button" className="treatment-intro__button" onClick={() => onNavigate('evaluacion')}>
            Iniciar evaluación con calma
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="treatment-overview page-section" aria-label="Enfoque del tratamiento">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title}>
              <div className="treatment-overview__top">
                <Icon size={26} />
                <h2>{card.title}</h2>
              </div>
              <p>{card.text}</p>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={17} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="treatment-guidance page-section" aria-labelledby="treatment-guidance-title">
        <div className="treatment-guidance__heading">
          <p className="section-kicker">Antes de iniciar</p>
          <h2 id="treatment-guidance-title">Dudas frecuentes antes de recibir acompañamiento</h2>
        </div>

        <div className="treatment-guidance__grid">
          {guidanceCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title}>
                <div className="treatment-guidance__top">
                  <Icon size={24} />
                  <h3>{card.title}</h3>
                </div>
                <p>{card.text}</p>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={17} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="treatment-list page-section" aria-labelledby="treatment-title">
        <div className="treatment-list__heading">
          <p className="section-kicker">Apoyos principales</p>
          <h2 id="treatment-title">Acompañamientos psicológicos más comunes</h2>
        </div>

        <div className="treatment-grid">
          {treatments.map((treatment, index) => (
            <article key={treatment.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{treatment.title}</h3>
              <p>{treatment.text}</p>
              <button type="button" onClick={() => setSelectedTreatment(treatment)}>
                Conocer más
                <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="treatment-process page-section" aria-labelledby="process-title">
        <div>
          <CheckCircle2 size={28} />
          <h2 id="process-title">Cómo suele iniciar el acompañamiento</h2>
          <p>
            Antes de elegir una técnica, es importante conocer la historia, el momento emocional y los apoyos disponibles.
          </p>
        </div>
        <ul>
          {processSteps.map((step) => (
            <li key={step}>
              <CheckCircle2 size={18} />
              {step}
            </li>
          ))}
        </ul>
      </section>

      <section className="treatment-note page-section">
        <AlertCircle size={24} />
        <div>
          <h2>Cada proceso necesita su propio ritmo</h2>
          <p>
            La mejor opción depende del estado emocional, diagnóstico, entorno familiar y recursos de apoyo. Una
            evaluación inicial ayuda a orientar el camino adecuado.
          </p>
          <button type="button" onClick={() => onNavigate('contacto')}>
            Hablar con alguien
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {selectedTreatment && <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />}
    </div>
  );
}

function TreatmentModal({ treatment, onClose }) {
  return (
    <div className="treatment-modal" role="dialog" aria-modal="true" aria-labelledby="treatment-modal-title">
      <div className="treatment-modal__backdrop" onClick={onClose} />
      <article className="treatment-modal__panel">
        <button type="button" className="treatment-modal__close" onClick={onClose} aria-label="Cerrar detalles">
          <X size={22} />
        </button>

        <div className="treatment-modal__aside">
          <ShieldCheck size={34} />
          <p className="section-kicker">Acompañamiento terapéutico</p>
          <h2 id="treatment-modal-title">{treatment.title}</h2>
          <p>{treatment.text}</p>
        </div>

        <div className="treatment-modal__content">
          <section>
            <h3>Objetivo principal</h3>
            <p>{treatment.details.goal}</p>
          </section>
          <section>
            <h3>Cuándo puede acompañar</h3>
            <p>{treatment.details.usefulFor}</p>
          </section>
          <section>
            <h3>Qué se trabaja</h3>
            <ul>
              {treatment.details.work.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}

export default TreatmentPage;
