import {
  ArrowRight,
  HeartHandshake,
  MessageCircleHeart,
  Moon,
  Repeat,
  ShieldCheck,
  SmilePlus,
  UsersRound,
} from 'lucide-react';
import './PromotionPage.css';

const promotionPillars = [
  {
    title: 'Hábitos de bienestar emocional',
    icon: SmilePlus,
    text: 'Pequeñas acciones sostenidas pueden ayudar a conservar calma, claridad y esperanza realista durante el proceso.',
    points: ['Respirar con pausa', 'Nombrar emociones', 'Celebrar avances pequeños'],
  },
  {
    title: 'Redes de apoyo',
    icon: UsersRound,
    text: 'Nadie debería atravesar una enfermedad compleja en soledad. La red ayuda a distribuir carga y sostener compañía.',
    points: ['Personas de confianza', 'Apoyo familiar', 'Profesionales de salud'],
  },
  {
    title: 'Comunicación familiar',
    icon: MessageCircleHeart,
    text: 'Hablar con respeto y claridad disminuye malentendidos, silencios dolorosos y sobrecarga en una sola persona.',
    points: ['Pedir ayuda concreta', 'Escuchar sin juzgar', 'Acordar responsabilidades'],
  },
];

const healthyRoutines = [
  {
    title: 'Rutina de descanso',
    text: 'Establecer horarios flexibles para dormir, descansar y tomar pausas ayuda a recuperar energía emocional.',
  },
  {
    title: 'Movimiento amable',
    text: 'Cuando el equipo médico lo permite, caminar suave o estirar puede apoyar el ánimo y reducir tensión.',
  },
  {
    title: 'Espacios de conversación',
    text: 'Reservar momentos breves para hablar de emociones evita que todo el diálogo gire solo alrededor de la enfermedad.',
  },
  {
    title: 'Registro de necesidades',
    text: 'Anotar dudas, síntomas emocionales y apoyos necesarios facilita pedir ayuda de forma más clara.',
  },
];

const caregiverCare = [
  'Aceptar que el cansancio también necesita atención.',
  'Pedir ayuda específica en tareas de cuidado, trámites o acompañamiento.',
  'Tomar pausas sin culpa para comer, dormir o respirar.',
  'Compartir decisiones importantes con la familia o el equipo de salud.',
  'Buscar orientación psicológica si aparece agotamiento, irritabilidad o tristeza persistente.',
];

function PromotionPage({ onNavigate }) {
  return (
    <div className="promotion-page">
      <section className="promotion-hero page-section">
        <div className="promotion-hero__heading">
          <div className="promotion-hero__label">
            <HeartHandshake size={20} />
            Bienestar cotidiano
          </div>
          <h1>Crear hábitos que sostienen la calma y la esperanza</h1>
        </div>

        <div className="promotion-intro">
          <h2>Qué se fortalece aquí</h2>
          <p>
            La promoción psicológica se enfoca en fortalecer hábitos, vínculos y rutinas que sostienen el bienestar
            emocional de la persona, familiares y cuidadores durante una enfermedad compleja.
          </p>
          <button type="button" className="promotion-intro__button" onClick={() => onNavigate('evaluacion')}>
            Iniciar evaluación con calma
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="promotion-overview page-section" aria-label="Pilares de promoción psicológica">
        {promotionPillars.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title}>
              <div className="promotion-overview__top">
                <Icon size={26} />
                <h2>{card.title}</h2>
              </div>
              <p>{card.text}</p>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>
                    <ShieldCheck size={17} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="promotion-routines page-section" aria-labelledby="promotion-routines-title">
        <div className="promotion-routines__heading">
          <p className="section-kicker">Rutinas saludables</p>
          <h2 id="promotion-routines-title">Acciones que pueden sostener el día a día</h2>
        </div>

        <div className="promotion-routines__grid">
          {healthyRoutines.map((routine, index) => (
            <article key={routine.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{routine.title}</h3>
              <p>{routine.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="promotion-caregiver page-section" aria-labelledby="caregiver-title">
        <div className="promotion-caregiver__content">
          <div>
            <Moon size={28} />
            <h2 id="caregiver-title">Autocuidado del cuidador</h2>
            <p>
              Cuidar a otra persona puede traer amor, responsabilidad y también agotamiento. El cuidador necesita apoyo
              para no sostener todo en silencio.
            </p>
          </div>
          <ul>
            {caregiverCare.map((item) => (
              <li key={item}>
                <SmilePlus size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="promotion-note page-section">
        <Repeat size={24} />
        <div>
          <h2>Promover bienestar no significa negar el dolor</h2>
          <p>
            Significa crear condiciones para atravesar el proceso con más apoyo, comunicación, descanso y herramientas
            emocionales. Si el malestar aumenta, la prevención y la evaluación inicial pueden orientar el siguiente paso.
          </p>
          <div className="promotion-note__actions">
          <button type="button" onClick={() => onNavigate('prevencion')}>
              Revisar señales
              <ArrowRight size={18} />
            </button>
            <button type="button" onClick={() => onNavigate('contacto')}>
              Hablar con alguien
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PromotionPage;
