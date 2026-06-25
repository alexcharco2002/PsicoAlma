import { AlertCircle, ArrowRight, CheckCircle2, CloudRain, HeartPulse, ShieldCheck, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import './DiseasesPage.css';

const impactCards = [
  {
    title: 'Impacto emocional',
    icon: CloudRain,
    text: 'El diagnóstico y los tratamientos pueden activar miedo, tristeza, ansiedad, enojo o incertidumbre.',
    points: ['Miedo al futuro', 'Cambios en autoestima', 'Necesidad de expresar emociones'],
  },
  {
    title: 'Entorno familiar',
    icon: UsersRound,
    text: 'La enfermedad también mueve la vida de familiares y cuidadores, quienes pueden sentirse cansados o confundidos.',
    points: ['Sobrecarga del cuidador', 'Cambios de roles', 'Comunicación y acuerdos'],
  },
  {
    title: 'Apoyo psicológico',
    icon: ShieldCheck,
    text: 'El acompañamiento ayuda a comprender emociones, sostener decisiones y fortalecer la red de apoyo.',
    points: ['Escucha profesional', 'Estrategias de afrontamiento', 'Cuidado del paciente y familia'],
  },
];

const diseases = [
  {
    name: 'Cancer',
    image: '/images/diseases/cancer.jpg',
    fallback:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85',
    description:
      'Grupo de enfermedades caracterizadas por el crecimiento descontrolado de células anormales, con necesidad de tratamientos como quimioterapia, radioterapia o cirugía.',
    details: {
      emotional:
        'Puede generar miedo a la progresión, incertidumbre frente a los tratamientos, cambios en la imagen corporal, cansancio emocional y preocupación por la familia.',
      psychology:
        'El apoyo psicológico trabaja ansiedad, tristeza, aceptación del diagnóstico, comunicación con seres queridos y sentido de vida durante el tratamiento.',
      support: ['Psicoeducación sobre emociones frecuentes', 'Técnicas de respiración y manejo de ansiedad', 'Acompañamiento en cambios de imagen y autoestima', 'Apoyo familiar y toma de decisiones'],
    },
  },
  {
    name: 'Insuficiencia renal crónica',
    image: '/images/diseases/insuficiencia-renal.jpg',
    fallback:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85',
    description:
      'Condición en la que los riñones pierden progresivamente su función, por lo que la persona puede requerir diálisis, trasplante y cambios importantes en su vida diaria.',
    details: {
      emotional:
        'La diálisis, las restricciones alimentarias y la dependencia de controles médicos pueden provocar frustración, tristeza, ansiedad y sensación de pérdida de libertad.',
      psychology:
        'La intervención psicológica ayuda a adaptarse a rutinas médicas, fortalecer adherencia, trabajar miedo al futuro y prevenir agotamiento emocional.',
      support: ['Adaptación a diálisis o trasplante', 'Manejo de frustración y cansancio', 'Plan de autocuidado realista', 'Apoyo al cuidador principal'],
    },
  },
  {
    name: 'Enfermedades cardiovasculares graves',
    image: '/images/diseases/cardiovascular.jpg',
    fallback:
      'https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&w=900&q=85',
    description:
      'Incluyen afectaciones severas del corazón y los vasos sanguíneos que pueden generar miedo, limitaciones físicas, dependencia y preocupación familiar.',
    details: {
      emotional:
        'Después de un evento cardíaco o diagnóstico grave pueden aparecer temor a una recaída, hipervigilancia del cuerpo, ansiedad y cambios en la confianza personal.',
      psychology:
        'El trabajo psicológico puede apoyar cambios de hábitos, manejo del estrés, afrontamiento del miedo y recuperación gradual de seguridad.',
      support: ['Manejo del miedo a recaídas', 'Rutinas de estrés y descanso', 'Motivación para hábitos saludables', 'Comunicación con familia y equipo médico'],
    },
  },
  {
    name: 'Enfermedades neurológicas degenerativas',
    image: '/images/diseases/neurologica.jpg',
    fallback:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=85',
    description:
      'Procesos que afectan progresivamente el sistema nervioso, la movilidad, la memoria o la autonomía, requiriendo acompañamiento continuo del paciente y su familia.',
    details: {
      emotional:
        'La pérdida progresiva de autonomía puede traer duelo anticipado, cambios de identidad, irritabilidad, miedo y preocupación por depender de otros.',
      psychology:
        'La atención psicológica acompaña el duelo por capacidades perdidas, la adaptación familiar, la comunicación y la planificación del cuidado.',
      support: ['Aceptación de cambios progresivos', 'Apoyo en identidad y autonomía', 'Orientación para cuidadores', 'Manejo de duelo anticipado'],
    },
  },
  {
    name: 'VIH/SIDA en etapa avanzada',
    image: '/images/diseases/vih-sida.jpg',
    fallback:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85',
    description:
      'Condición que puede implicar tratamientos prolongados, temor al estigma, cambios emocionales y necesidad de apoyo médico, psicológico y social.',
    details: {
      emotional:
        'Puede vivirse con miedo al rechazo, culpa, vergüenza, ansiedad por el tratamiento y preocupación por la confidencialidad o el estigma social.',
      psychology:
        'El acompañamiento psicológico fortalece autoestima, adherencia al tratamiento, redes seguras y estrategias para afrontar discriminación.',
      support: ['Trabajo sobre estigma y autoestima', 'Adherencia al tratamiento', 'Redes de apoyo seguras', 'Manejo de ansiedad y privacidad'],
    },
  },
  {
    name: 'Enfermedades raras o huérfanas',
    image: '/images/diseases/enfermedades-raras.jpg',
    fallback:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85',
    description:
      'Enfermedades poco frecuentes que suelen requerir diagnósticos complejos, tratamientos especializados y una red de apoyo constante para la familia.',
    details: {
      emotional:
        'La incertidumbre diagnóstica, la falta de información y la búsqueda prolongada de respuestas pueden generar desgaste, desesperanza y soledad.',
      psychology:
        'La psicología ayuda a tolerar la incertidumbre, organizar información, sostener esperanza realista y conectar con redes de apoyo.',
      support: ['Manejo de incertidumbre', 'Acompañamiento familiar', 'Organización de información médica', 'Búsqueda de redes y comunidad'],
    },
  },
];

function DiseasesPage() {
  const [selectedDisease, setSelectedDisease] = useState(null);

  return (
    <div className="diseases-page">
      <section className="diseases-hero page-section">
        <div className="diseases-hero__heading">
          <div className="diseases-hero__label">
            <HeartPulse size={20} />
            Enfermedades catastróficas
          </div>
          <h1>Acerca de las enfermedades catastróficas</h1>
        </div>

        <div className="diseases-intro">
          <h2>¿Qué son las enfermedades catastróficas?</h2>
          <p>
            Una enfermedad catastrófica no solo impacta el cuerpo, también toca las emociones, los sueños y la vida de
            quienes rodean al paciente. El miedo, la tristeza, la incertidumbre y la preocupación pueden estar presentes
            tanto en la persona diagnosticada como en su familia y seres queridos. En este capítulo conoceremos cómo estas
            emociones forman parte del proceso y por qué el apoyo psicológico resulta fundamental para afrontar esta
            experiencia.
          </p>
        </div>
      </section>

      <section className="emotional-impact page-section" aria-label="Impacto emocional">
        {impactCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title}>
              <div className="emotional-impact__top">
                <Icon size={28} />
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

      <section className="diseases-list page-section" aria-labelledby="diseases-title">
        <div className="diseases-list__heading">
          <p className="section-kicker">Información principal</p>
          <h2 id="diseases-title">Principales enfermedades catastróficas</h2>
        </div>

        <div className="diseases-grid">
          {diseases.map((disease) => (
            <article key={disease.name} className="disease-card">
              <div className="disease-card__media">
                <img
                  src={disease.image}
                  alt={disease.name}
                  onError={(event) => {
                    event.currentTarget.src = disease.fallback;
                  }}
                />
              </div>
              <div className="disease-card__content">
                <h3>{disease.name}</h3>
                <p>{disease.description}</p>
                <button type="button" onClick={() => setSelectedDisease(disease)}>
                  Ver más
                  <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="diseases-note page-section">
        <AlertCircle size={24} />
        <p>
          Esta información es educativa y no reemplaza la valoración médica o psicológica profesional. Ante cualquier
          duda, consulta con un especialista de salud.
        </p>
      </section>

      {selectedDisease && <DiseaseModal disease={selectedDisease} onClose={() => setSelectedDisease(null)} />}
    </div>
  );
}

function DiseaseModal({ disease, onClose }) {
  return (
    <div className="disease-modal" role="dialog" aria-modal="true" aria-labelledby="disease-modal-title">
      <div className="disease-modal__backdrop" onClick={onClose} />
      <article className="disease-modal__panel">
        <button type="button" className="disease-modal__close" onClick={onClose} aria-label="Cerrar detalles">
          <X size={22} />
        </button>

        <div className="disease-modal__media">
          <img
            src={disease.image}
            alt={disease.name}
            onError={(event) => {
              event.currentTarget.src = disease.fallback;
            }}
          />
        </div>

        <div className="disease-modal__content">
          <p className="section-kicker">Detalle psicológico</p>
          <h2 id="disease-modal-title">{disease.name}</h2>
          <p>{disease.description}</p>

          <div className="disease-modal__section">
            <h3>Cómo puede vivirse emocionalmente</h3>
            <p>{disease.details.emotional}</p>
          </div>

          <div className="disease-modal__section">
            <h3>Qué trabaja la psicología</h3>
            <p>{disease.details.psychology}</p>
          </div>

          <div className="disease-modal__support">
            <h3>Apoyos recomendados</h3>
            <ul>
              {disease.details.support.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}

export default DiseasesPage;
