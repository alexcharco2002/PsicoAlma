import { AlertCircle, CloudRain, HeartPulse, ShieldCheck, UsersRound } from 'lucide-react';
import './DiseasesPage.css';

const diseases = [
  {
    name: 'Cancer',
    image: '/images/diseases/cancer.jpg',
    fallback:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85',
    description:
      'Grupo de enfermedades caracterizadas por el crecimiento descontrolado de celulas anormales, con necesidad de tratamientos como quimioterapia, radioterapia o cirugia.',
  },
  {
    name: 'Insuficiencia renal cronica',
    image: '/images/diseases/insuficiencia-renal.jpg',
    fallback:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85',
    description:
      'Condicion en la que los rinones pierden progresivamente su funcion, por lo que la persona puede requerir dialisis, trasplante y cambios importantes en su vida diaria.',
  },
  {
    name: 'Enfermedades cardiovasculares graves',
    image: '/images/diseases/cardiovascular.jpg',
    fallback:
      'https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&w=900&q=85',
    description:
      'Incluyen afectaciones severas del corazon y los vasos sanguineos que pueden generar miedo, limitaciones fisicas, dependencia y preocupacion familiar.',
  },
  {
    name: 'Enfermedades neurologicas degenerativas',
    image: '/images/diseases/neurologica.jpg',
    fallback:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=85',
    description:
      'Procesos que afectan progresivamente el sistema nervioso, la movilidad, la memoria o la autonomia, requiriendo acompanamiento continuo del paciente y su familia.',
  },
  {
    name: 'VIH/SIDA en etapa avanzada',
    image: '/images/diseases/vih-sida.jpg',
    fallback:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85',
    description:
      'Condicion que puede implicar tratamientos prolongados, temor al estigma, cambios emocionales y necesidad de apoyo medico, psicologico y social.',
  },
  {
    name: 'Enfermedades raras o huerfanas',
    image: '/images/diseases/enfermedades-raras.jpg',
    fallback:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85',
    description:
      'Enfermedades poco frecuentes que suelen requerir diagnosticos complejos, tratamientos especializados y una red de apoyo constante para la familia.',
  },
];

function DiseasesPage() {
  return (
    <div className="diseases-page">
      <section className="diseases-hero page-section">
        <div className="diseases-hero__heading">
          <div className="diseases-hero__label">
            <HeartPulse size={20} />
            Enfermedades catastroficas
          </div>
          <h1>Acerca de las enfermedades catastroficas</h1>
        </div>

        <div className="diseases-intro">
          <h2>Introduccion</h2>
          <p>
            Una enfermedad catastrofica no solo impacta el cuerpo, tambien toca las emociones, los suenos y la vida de
            quienes rodean al paciente. El miedo, la tristeza, la incertidumbre y la preocupacion pueden estar presentes
            tanto en la persona diagnosticada como en su familia y seres queridos. En este capitulo conoceremos como estas
            emociones forman parte del proceso y por que el apoyo psicologico resulta fundamental para afrontar esta
            experiencia.
          </p>
        </div>
      </section>

      <section className="emotional-impact page-section" aria-label="Impacto emocional">
        <article>
          <CloudRain size={28} />
          <h2>Impacto emocional</h2>
          <p>El miedo, la tristeza y la incertidumbre pueden aparecer desde el diagnostico y durante el tratamiento.</p>
        </article>
        <article>
          <UsersRound size={28} />
          <h2>Entorno familiar</h2>
          <p>La familia y los cuidadores tambien viven preocupacion, cansancio y cambios en su vida diaria.</p>
        </article>
        <article>
          <ShieldCheck size={28} />
          <h2>Apoyo psicologico</h2>
          <p>El acompanamiento ayuda a comprender emociones, sostener decisiones y fortalecer redes de apoyo.</p>
        </article>
      </section>

      <section className="diseases-list page-section" aria-labelledby="diseases-title">
        <div className="diseases-list__heading">
          <p className="section-kicker">Informacion principal</p>
          <h2 id="diseases-title">Principales enfermedades catastroficas</h2>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="diseases-note page-section">
        <AlertCircle size={24} />
        <p>
          Esta informacion es educativa y no reemplaza la valoracion medica o psicologica profesional. Ante cualquier
          duda, consulta con un especialista de salud.
        </p>
      </section>
    </div>
  );
}

export default DiseasesPage;
