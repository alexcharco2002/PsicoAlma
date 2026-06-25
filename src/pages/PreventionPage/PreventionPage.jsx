import { AlertTriangle, ArrowRight, HeartPulse, Moon, ShieldCheck, SmilePlus, UsersRound } from 'lucide-react';
import './PreventionPage.css';

const preventionTips = [
  {
    title: 'Reconocer emociones',
    text: 'Nombrar miedo, tristeza, enojo o incertidumbre ayuda a comprender lo que esta pasando y pedir apoyo a tiempo.',
  },
  {
    title: 'Mantener rutinas pequenas',
    text: 'Dormir, alimentarse, hidratarse y tener pausas breves puede sostener la estabilidad emocional durante el proceso.',
  },
  {
    title: 'Hablar con alguien seguro',
    text: 'Compartir lo que se siente con una persona de confianza reduce el aislamiento y mejora la sensación de acompañamiento.',
  },
  {
    title: 'Pedir ayuda profesional',
    text: 'Buscar apoyo psicológico no significa debilidad; es una forma de cuidar la salud mental y tomar mejores decisiones.',
  },
];

const warningSigns = [
  'Llanto frecuente o tristeza que no disminuye.',
  'Miedo intenso, crisis de ansiedad o sensacion de no poder respirar.',
  'Aislamiento, perdida de interes o falta de energia por varios dias.',
  'Dificultad para dormir, comer o realizar actividades basicas.',
  'Pensamientos de desesperanza o de no querer continuar.',
];

const preventionOverview = [
  {
    title: 'Detectar a tiempo',
    icon: HeartPulse,
    text: 'Observar cambios emocionales permite buscar apoyo antes de que el malestar se vuelva más intenso o difícil de manejar.',
    points: ['Cambios de ánimo', 'Señales de ansiedad', 'Cansancio emocional'],
  },
  {
    title: 'Activar la red',
    icon: UsersRound,
    text: 'La familia, amistades y profesionales pueden ayudar a distribuir responsabilidades y sostener el acompañamiento diario.',
    points: ['Pedir ayuda concreta', 'Organizar tareas', 'Evitar el aislamiento'],
  },
  {
    title: 'Cuidar el descanso',
    icon: Moon,
    text: 'El sueño, las pausas y las rutinas simples ayudan a recuperar energía emocional durante el proceso de enfermedad.',
    points: ['Pausas breves', 'Rutinas de sueño', 'Espacios de calma'],
  },
];

function PreventionPage({ onNavigate }) {
  return (
    <div className="prevention-page">
      <section className="prevention-hero page-section">
        <div className="prevention-hero__heading">
          <div className="prevention-hero__label">
            <ShieldCheck size={20} />
            Prevención psicológica
          </div>
          <h1>Cuidar la mente también es parte del tratamiento</h1>
        </div>

        <div className="prevention-intro">
          <h2>Qué se va a tratar aquí</h2>
          <p>
            La prevención psicológica permite reconocer señales emocionales antes de que se vuelvan más difíciles de
            manejar. En esta página encontrarás consejos, alertas y acciones sencillas para pacientes, familiares y
            cuidadores.
          </p>
          <button type="button" className="prevention-intro__button" onClick={() => onNavigate('evaluacion')}>
            Hacer evaluación rápida
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="prevention-overview page-section" aria-label="Pilares de prevención">
        {preventionOverview.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title}>
              <div className="prevention-overview__top">
                <Icon size={26} />
                <h2>{card.title}</h2>
              </div>
              <p>{card.text}</p>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>
                    <SmilePlus size={17} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="prevention-tips page-section" aria-labelledby="prevention-tips-title">
        <div className="prevention-tips__heading">
          <p className="section-kicker">Consejos principales</p>
          <h2 id="prevention-tips-title">Acciones para proteger el bienestar emocional</h2>
        </div>

        <div className="prevention-tips__grid">
          {preventionTips.map((tip, index) => (
            <article key={tip.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="prevention-warning page-section" aria-labelledby="warning-title">
        <div className="prevention-warning__content">
          <div>
            <AlertTriangle size={28} />
            <h2 id="warning-title">Señales de alerta emocional</h2>
            <p>
              Si una o varias de estas señales aparecen con intensidad o duran varios días, es recomendable buscar apoyo
              profesional o contactar a una persona de confianza.
            </p>
          </div>
          <ul>
            {warningSigns.map((sign) => (
              <li key={sign}>
                <SmilePlus size={18} />
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="prevention-note page-section">
        <ShieldCheck size={24} />
        <div>
          <h2>La prevención también acompaña a la familia</h2>
          <p>
            Los cuidadores también necesitan descanso, escucha y orientación. Cuidar a quien cuida evita agotamiento y
            fortalece el apoyo al paciente.
          </p>
          <button type="button" onClick={() => onNavigate('contacto')}>
            Contactar apoyo
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default PreventionPage;
