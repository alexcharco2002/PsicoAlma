import { AlertCircle, ArrowRight, Brain, CheckCircle2, HeartHandshake, MessageCircle, UsersRound } from 'lucide-react';
import './TreatmentPage.css';

const treatments = [
  {
    title: 'Psicoterapia individual',
    text: 'Espacio personal para expresar emociones, trabajar miedo, tristeza, ansiedad y adaptacion al diagnostico o tratamiento medico.',
  },
  {
    title: 'Terapia cognitivo conductual',
    text: 'Ayuda a identificar pensamientos que aumentan el malestar y construir estrategias mas saludables para afrontar situaciones dificiles.',
  },
  {
    title: 'Acompanamiento en duelo',
    text: 'Apoyo para procesar perdidas, cambios de vida, incertidumbre o despedidas simbolicas dentro del proceso de enfermedad.',
  },
  {
    title: 'Terapia familiar',
    text: 'Fortalece la comunicacion, distribucion de responsabilidades y apoyo emocional entre paciente, familia y cuidadores.',
  },
  {
    title: 'Intervencion en crisis',
    text: 'Atencion breve para momentos de ansiedad intensa, noticias medicas dificiles, desbordamiento emocional o sensacion de no poder continuar.',
  },
  {
    title: 'Psicoeducacion',
    text: 'Brinda informacion clara sobre emociones, autocuidado, senales de alerta y recursos para vivir el proceso con mayor comprension.',
  },
];

const processSteps = [
  'Escucha inicial y reconocimiento de necesidades.',
  'Identificacion del estado emocional y red de apoyo.',
  'Definicion de objetivos terapeuticos realistas.',
  'Acompanamiento, seguimiento y ajustes segun el proceso.',
];

function TreatmentPage({ onNavigate }) {
  return (
    <div className="treatment-page">
      <section className="treatment-hero page-section">
        <div className="treatment-hero__heading">
          <div className="treatment-hero__label">
            <HeartHandshake size={20} />
            Tratamiento psicologico
          </div>
          <h1>Formas de apoyo para afrontar el proceso emocional</h1>
        </div>

        <div className="treatment-intro">
          <h2>Que se trabaja aqui</h2>
          <p>
            El tratamiento psicologico busca acompanar a la persona y su entorno en momentos de miedo, incertidumbre,
            duelo, cansancio emocional o cambios importantes en la vida diaria. Cada proceso debe adaptarse a las
            necesidades del paciente, familia o cuidador.
          </p>
          <button type="button" className="treatment-intro__button" onClick={() => onNavigate('evaluacion')}>
            Empezar evaluacion
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="treatment-overview page-section" aria-label="Enfoque del tratamiento">
        <article>
          <Brain size={26} />
          <h2>Comprender emociones</h2>
          <p>Se trabaja lo que la persona siente y como esas emociones influyen en su vida diaria.</p>
        </article>
        <article>
          <MessageCircle size={26} />
          <h2>Crear estrategias</h2>
          <p>Se aprenden recursos para manejar ansiedad, pensamientos dificiles y momentos de crisis.</p>
        </article>
        <article>
          <UsersRound size={26} />
          <h2>Incluir la red</h2>
          <p>La familia y cuidadores pueden participar para mejorar comunicacion, apoyo y descanso.</p>
        </article>
      </section>

      <section className="treatment-list page-section" aria-labelledby="treatment-title">
        <div className="treatment-list__heading">
          <p className="section-kicker">Atencion principal</p>
          <h2 id="treatment-title">Tratamientos psicologicos mas comunes</h2>
        </div>

        <div className="treatment-grid">
          {treatments.map((treatment, index) => (
            <article key={treatment.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{treatment.title}</h3>
              <p>{treatment.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="treatment-process page-section" aria-labelledby="process-title">
        <div>
          <CheckCircle2 size={28} />
          <h2 id="process-title">Como suele iniciar un tratamiento</h2>
          <p>
            Antes de elegir una tecnica, es importante conocer la historia, el momento emocional y los apoyos disponibles.
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
          <h2>El tratamiento no es igual para todos</h2>
          <p>
            La mejor opcion depende del estado emocional, diagnostico, entorno familiar y recursos de apoyo. Una
            evaluacion inicial ayuda a orientar el camino adecuado.
          </p>
          <button type="button" onClick={() => onNavigate('contacto')}>
            Hablar con contactos
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default TreatmentPage;
