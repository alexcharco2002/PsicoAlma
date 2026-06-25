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
    text: 'Compartir lo que se siente con una persona de confianza reduce el aislamiento y mejora la sensacion de acompanamiento.',
  },
  {
    title: 'Pedir ayuda profesional',
    text: 'Buscar apoyo psicologico no significa debilidad; es una forma de cuidar la salud mental y tomar mejores decisiones.',
  },
];

const warningSigns = [
  'Llanto frecuente o tristeza que no disminuye.',
  'Miedo intenso, crisis de ansiedad o sensacion de no poder respirar.',
  'Aislamiento, perdida de interes o falta de energia por varios dias.',
  'Dificultad para dormir, comer o realizar actividades basicas.',
  'Pensamientos de desesperanza o de no querer continuar.',
];

function PreventionPage({ onNavigate }) {
  return (
    <div className="prevention-page">
      <section className="prevention-hero page-section">
        <div className="prevention-hero__heading">
          <div className="prevention-hero__label">
            <ShieldCheck size={20} />
            Prevencion psicologica
          </div>
          <h1>Cuidar la mente tambien es parte del tratamiento</h1>
        </div>

        <div className="prevention-intro">
          <h2>Que se va a tratar aqui</h2>
          <p>
            La prevencion psicologica permite reconocer senales emocionales antes de que se vuelvan mas dificiles de
            manejar. En esta pagina encontraras consejos, alertas y acciones sencillas para pacientes, familiares y
            cuidadores.
          </p>
          <button type="button" className="prevention-intro__button" onClick={() => onNavigate('evaluacion')}>
            Hacer evaluacion rapida
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="prevention-overview page-section" aria-label="Pilares de prevencion">
        <article>
          <HeartPulse size={26} />
          <h2>Detectar a tiempo</h2>
          <p>Observar cambios emocionales permite buscar apoyo antes de llegar a una crisis.</p>
        </article>
        <article>
          <UsersRound size={26} />
          <h2>Activar la red</h2>
          <p>Familia, amigos y profesionales pueden ayudar a distribuir cargas y acompanamiento.</p>
        </article>
        <article>
          <Moon size={26} />
          <h2>Cuidar el descanso</h2>
          <p>El sueno y las pausas son parte esencial del bienestar emocional.</p>
        </article>
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
            <h2 id="warning-title">Senales de alerta emocional</h2>
            <p>
              Si una o varias de estas senales aparecen con intensidad o duran varios dias, es recomendable buscar apoyo
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
          <h2>La prevencion tambien acompana a la familia</h2>
          <p>
            Los cuidadores tambien necesitan descanso, escucha y orientacion. Cuidar a quien cuida evita agotamiento y
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
