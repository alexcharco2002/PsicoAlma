import { AlertCircle, ArrowRight, CheckCircle2, CloudRain, HeartPulse, ShieldCheck, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import InlineMediaCard from '../../components/InlineMediaCard/InlineMediaCard';
import { pageIntroMedia } from '../../data/mediaAssets';
import './DiseasesPage.css';

const impactCards = [
  {
    title: 'Impacto emocional',
    icon: CloudRain,
    text: 'Recibir una noticia difícil puede mover el ánimo, la esperanza y la forma en que cada persona mira su día a día.',
    points: ['Miedo al futuro', 'Cambios en la autoestima', 'Necesidad de expresar emociones'],
  },
  {
    title: 'Entorno familiar',
    icon: UsersRound,
    text: 'La familia y las personas cercanas también necesitan orientación, descanso y espacios para hablar con calma.',
    points: ['Sobrecarga del cuidador', 'Cambios de roles', 'Comunicación y acuerdos'],
  },
  {
    title: 'Apoyo psicológico',
    icon: ShieldCheck,
    text: 'El acompañamiento ayuda a ordenar emociones, sostener decisiones y fortalecer una red de apoyo más humana.',
    points: ['Escucha profesional', 'Estrategias de afrontamiento', 'Cuidado de la persona y la familia'],
  },
];

const diseases = [
  {
    name: 'Cáncer',
    image: '/images/diseases/cancer.jpg',
    fallback: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85',
    description:
      'Grupo de enfermedades caracterizadas por el crecimiento descontrolado de células anormales, con necesidad de tratamientos como quimioterapia, radioterapia o cirugía.',
    details: {
      emotions: ['Miedo a la progresión o recaída', 'Ansiedad antes de controles médicos', 'Tristeza por cambios físicos o de rutina'],
      familyChallenges: ['Redistribuir tareas de cuidado', 'Hablar del diagnóstico sin ocultar emociones', 'Evitar que una sola persona cargue todo'],
      patientActions: ['Expresar dudas al equipo de salud', 'Registrar emociones y síntomas', 'Pedir ayuda concreta cuando se sienta agotamiento'],
      familyActions: ['Escuchar sin minimizar el miedo', 'Acompañar a citas si la persona lo desea', 'Respetar tiempos de descanso y privacidad'],
      whenSeekSupport: 'Cuando el miedo, la tristeza, el aislamiento o la angustia impiden dormir, comer, decidir o continuar el tratamiento con claridad.',
    },
  },
  {
    name: 'Insuficiencia renal crónica',
    image: '/images/diseases/insuficiencia-renal.jpg',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=85',
    description:
      'Condición en la que los riñones pierden progresivamente su función, por lo que la persona puede requerir diálisis, trasplante y cambios importantes en su vida diaria.',
    details: {
      emotions: ['Frustración por las restricciones', 'Cansancio emocional por rutinas médicas', 'Sensación de pérdida de independencia'],
      familyChallenges: ['Adaptarse a horarios de diálisis', 'Organizar alimentación y traslados', 'Cuidar sin sobreproteger'],
      patientActions: ['Construir una rutina realista', 'Hablar sobre cansancio o irritabilidad', 'Reconocer avances pequeños en la adaptación'],
      familyActions: ['Apoyar la adherencia sin presionar', 'Repartir tareas de transporte y cuidado', 'Validar la frustración de la persona'],
      whenSeekSupport: 'Cuando aparece desesperanza, rechazo persistente del tratamiento, irritabilidad intensa o sensación de no poder continuar.',
    },
  },
  {
    name: 'Enfermedades cardiovasculares graves',
    image: '/images/diseases/cardiovascular.jpg',
    fallback: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
    description:
      'Incluyen afectaciones severas del corazón y los vasos sanguíneos que pueden generar miedo, limitaciones físicas, dependencia y preocupación familiar.',
    details: {
      emotions: ['Temor a una recaída', 'Hipervigilancia ante señales corporales', 'Inseguridad para retomar actividades'],
      familyChallenges: ['No convertir el cuidado en control excesivo', 'Acompañar cambios de hábitos', 'Manejar el miedo familiar después de una crisis'],
      patientActions: ['Consultar dudas sobre actividad y descanso', 'Practicar estrategias de manejo del estrés', 'Retomar actividades de forma gradual'],
      familyActions: ['Apoyar hábitos saludables sin culpar', 'Crear rutinas tranquilas en casa', 'Acompañar sin transmitir alarma constante'],
      whenSeekSupport: 'Cuando el miedo al esfuerzo, la ansiedad corporal o la tristeza dificultan la recuperación y la confianza personal.',
    },
  },
  {
    name: 'Enfermedades neurológicas degenerativas',
    image: '/images/diseases/neurologica.jpg',
    fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85',
    description:
      'Procesos que afectan progresivamente el sistema nervioso, la movilidad, la memoria o la autonomía, por lo que requieren acompañamiento continuo para la persona y su familia.',
    details: {
      emotions: ['Duelo por capacidades que cambian', 'Miedo a depender de otros', 'Irritabilidad o tristeza ante la pérdida de autonomía'],
      familyChallenges: ['Planificar cuidados progresivos', 'Respetar la dignidad de la persona', 'Prevenir agotamiento del cuidador principal'],
      patientActions: ['Participar en decisiones mientras sea posible', 'Expresar preferencias de cuidado', 'Mantener actividades significativas adaptadas'],
      familyActions: ['Hablar con claridad y ternura', 'Organizar descansos para cuidadores', 'Favorecer autonomía en lo que aún puede hacer'],
      whenSeekSupport: 'Cuando el duelo anticipado, la carga familiar o los cambios de conducta generan sufrimiento persistente o conflictos frecuentes.',
    },
  },
  {
    name: 'VIH/SIDA en etapa avanzada',
    image: '/images/diseases/vih-sida.jpg',
    fallback: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85',
    description:
      'Condición que puede implicar tratamientos prolongados, temor al estigma, cambios emocionales y necesidad de apoyo médico, psicológico y social.',
    details: {
      emotions: ['Miedo al rechazo', 'Vergüenza o culpa', 'Ansiedad por confidencialidad y tratamiento'],
      familyChallenges: ['Construir un entorno sin juicios', 'Respetar la privacidad', 'Acompañar sin estigmatizar'],
      patientActions: ['Buscar información confiable', 'Identificar personas seguras para hablar', 'Mantener seguimiento médico y emocional'],
      familyActions: ['Cuidar la confidencialidad', 'Evitar comentarios culpabilizantes', 'Apoyar la adherencia al tratamiento'],
      whenSeekSupport: 'Cuando el estigma, la culpa, el miedo o el aislamiento afectan la autoestima, la adherencia o las relaciones cercanas.',
    },
  },
  {
    name: 'Enfermedades raras o huérfanas',
    image: '/images/diseases/enfermedades-raras.jpg',
    fallback: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
    description:
      'Enfermedades poco frecuentes que suelen requerir diagnósticos complejos, tratamientos especializados y una red de apoyo constante para la familia.',
    details: {
      emotions: ['Incertidumbre por falta de respuestas', 'Sensación de soledad', 'Desgaste por trámites y búsqueda de especialistas'],
      familyChallenges: ['Organizar información médica', 'Sostener esperanza realista', 'Conectar con redes o comunidades de apoyo'],
      patientActions: ['Anotar síntomas, dudas y necesidades', 'Pedir explicaciones claras al equipo médico', 'Buscar espacios seguros para hablar del cansancio'],
      familyActions: ['Acompañar en trámites sin invalidar emociones', 'Compartir responsabilidades', 'Buscar asociaciones o redes relacionadas'],
      whenSeekSupport: 'Cuando la incertidumbre, el cansancio familiar o la sensación de soledad generan angustia constante o desesperanza.',
    },
  },
];

const detailGroups = [
  { key: 'emotions', title: 'Emociones frecuentes' },
  { key: 'familyChallenges', title: 'Retos familiares' },
  { key: 'patientActions', title: 'Qué puede hacer la persona' },
  { key: 'familyActions', title: 'Qué puede hacer la familia' },
];

function DiseasesPage() {
  const [selectedDisease, setSelectedDisease] = useState(null);

  return (
    <div className="diseases-page">
      <section className="diseases-hero page-section">
        <div className="diseases-hero__heading">
          <div className="diseases-hero__label">
            <HeartPulse size={20} />
            Comprender el proceso
          </div>
          <h1>Entender lo que se vive también por dentro</h1>
        </div>

        <div className="diseases-intro">
          <h2>Un proceso que también toca las emociones</h2>
          <p>
            Una enfermedad catastrófica no solo impacta el cuerpo, también toca las emociones, los sueños y la vida de
            quienes rodean a la persona. El miedo, la tristeza, la incertidumbre y la preocupación pueden estar presentes
            tanto en la persona diagnosticada como en su familia y seres queridos. En este capítulo conoceremos cómo estas
            emociones forman parte del proceso y por qué el apoyo psicológico resulta fundamental para afrontar esta
            experiencia.
          </p>
          <InlineMediaCard media={pageIntroMedia.diseases} />
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
          <p className="section-kicker">Acompañamiento principal</p>
          <h2 id="diseases-title">Procesos de salud que pueden necesitar más apoyo</h2>
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
                  Conocer con calma
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
          duda o malestar intenso, busca acompañamiento de un especialista de salud.
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
          <p className="section-kicker">Acompañamiento emocional</p>
          <h2 id="disease-modal-title">{disease.name}</h2>
          <p>{disease.description}</p>

          <div className="disease-modal__details">
            {detailGroups.map((group) => (
              <section key={group.key} className="disease-modal__section">
                <h3>{group.title}</h3>
                <ul>
                  {disease.details[group.key].map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="disease-modal__support">
            <h3>Cuándo buscar acompañamiento</h3>
            <p>{disease.details.whenSeekSupport}</p>
          </section>
        </div>
      </article>
    </div>
  );
}

export default DiseasesPage;
