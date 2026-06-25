import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  MessageCircleHeart,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UsersRound,
  X,
} from 'lucide-react';

const storageKey = 'psicoalma-comments';

const navItems = [
  ['Inicio', 'inicio'],
  ['Servicios', 'servicios'],
  ['Planes', 'planes'],
  ['Especialistas', 'especialistas'],
  ['Comentarios', 'comentarios'],
  ['Contacto', 'contacto'],
];

const services = [
  {
    id: 'evaluacion',
    title: 'Evaluacion personalizada',
    icon: ClipboardList,
    color: 'primary',
    text: 'Conocemos el estado emocional, red de apoyo, sintomas de ansiedad o tristeza y necesidades del paciente.',
    link: 'Explorar evaluacion',
  },
  {
    id: 'diagnostico',
    title: 'Diagnostico emocional',
    icon: Stethoscope,
    color: 'secondary',
    text: 'Identificamos el impacto psicologico de una enfermedad catastrofica y los factores que necesitan acompanamiento.',
    link: 'Ver enfoque clinico',
  },
  {
    id: 'tratamiento',
    title: 'Tratamiento y apoyo',
    icon: HeartHandshake,
    color: 'tertiary',
    text: 'Sesiones individuales y familiares para fortalecer afrontamiento, comunicacion y adherencia al tratamiento medico.',
    link: 'Conocer tratamiento',
  },
  {
    id: 'prevencion',
    title: 'Prevencion y promocion',
    icon: BookOpen,
    color: 'primary',
    text: 'Guias, recursos y herramientas para reconocer senales de alerta y promover salud mental durante el proceso.',
    link: 'Ver recursos',
  },
];

const plans = [
  {
    title: 'Individual',
    icon: Heart,
    badge: 'Recomendado',
    tone: 'primary',
    text: 'Sesiones 1 a 1 para sostener ansiedad, miedo, duelo, dolor emocional y cambios en el proyecto de vida.',
  },
  {
    title: 'Familiar',
    icon: UsersRound,
    badge: 'Red de apoyo',
    tone: 'secondary',
    text: 'Orientacion para mejorar comunicacion, reparto de cuidados, contencion y toma de decisiones sensibles.',
  },
  {
    title: 'Cuidadores',
    icon: ShieldCheck,
    badge: 'Autocuidado',
    tone: 'tertiary',
    text: 'Acompanamiento para quienes cuidan y tambien necesitan descanso, escucha y herramientas practicas.',
  },
];

const specialists = [
  {
    name: 'Dra. Elena Martinez',
    area: 'Psicologia clinica',
    rating: '4.9',
    text: 'Especialista en ansiedad, adaptacion a diagnosticos complejos y acompanamiento compasivo.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Lic. Carlos Ruiz',
    area: 'Terapia familiar',
    rating: '4.8',
    text: 'Enfoque en comunicacion, vinculos familiares y apoyo a cuidadores principales.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Dra. Sofia Valdes',
    area: 'Duelo y perdida',
    rating: '5.0',
    text: 'Acompanamiento humanista en duelo anticipado, cambios vitales y transiciones delicadas.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Lic. Javier Soto',
    area: 'Terapia cognitiva',
    rating: '4.7',
    text: 'Herramientas practicas para pensamientos intrusivos, estres y habitos de autocuidado.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=85',
  },
];

const initialComments = [
  {
    id: 'sample-1',
    name: 'Equipo PsicoAlma',
    message:
      'Este espacio puede usarse para testimonios, mensajes de apoyo o comentarios revisados antes de publicarse.',
    date: '2026-06-24',
  },
];

const colorMap = {
  primary: {
    icon: 'bg-primary/10 text-primary',
    title: 'text-primary',
    hover: 'hover:border-primary hover:shadow-primary/10',
    badge: 'bg-primary-fixed text-on-primary-fixed-variant',
  },
  secondary: {
    icon: 'bg-secondary/10 text-secondary',
    title: 'text-secondary',
    hover: 'hover:border-secondary hover:shadow-secondary/10',
    badge: 'bg-secondary-container text-on-secondary-fixed-variant',
  },
  tertiary: {
    icon: 'bg-tertiary/10 text-tertiary',
    title: 'text-tertiary',
    hover: 'hover:border-tertiary hover:shadow-tertiary/10',
    badge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  },
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments]);

  const commentCount = useMemo(() => comments.length, [comments]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanName = form.name.trim();
    const cleanMessage = form.message.trim();

    if (!cleanName || !cleanMessage) {
      return;
    }

    setComments((current) => [
      {
        id: crypto.randomUUID(),
        name: cleanName,
        email: form.email.trim(),
        message: cleanMessage,
        date: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);
    setForm({ name: '', email: '', message: '' });
  };

  const removeComment = (id) => {
    setComments((current) => current.filter((comment) => comment.id !== id));
  };

  return (
    <main className="min-h-screen bg-background text-on-surface">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero commentCount={commentCount} />
      <Services />
      <Plans />
      <Specialists />
      <Guidance />
      <Comments
        comments={comments}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        removeComment={removeComment}
      />
      <Contact />
      <Footer />
    </main>
  );
}

function Header({ isMenuOpen, setIsMenuOpen }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-4 md:px-10">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-fixed text-primary">
            <Sparkles size={22} aria-hidden="true" />
          </span>
          <span className="text-xl font-extrabold text-primary">PsicoAlma</span>
        </a>

        <div className="hidden h-full items-center gap-2 lg:flex">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-on-primary shadow-sm transition hover:bg-primary-container md:inline-flex"
        >
          Pedir ayuda
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-full bg-surface-container-low text-primary lg:hidden"
          aria-label="Abrir menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-outline-variant px-4 pb-4 lg:hidden">
          <div className="mx-auto grid max-w-container gap-2 pt-3">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface-variant"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ commentCount }) {
  return (
    <section id="inicio" className="bg-gradient-to-b from-surface-bright to-background pt-24">
      <div className="mx-auto grid min-h-[82vh] max-w-container items-center gap-12 px-4 py-12 md:px-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container px-5 py-2 text-sm font-bold text-on-secondary-fixed-variant">
            <Heart size={18} aria-hidden="true" />
            Estamos contigo
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-on-surface md:text-6xl lg:text-7xl">
            No estas solo en este camino
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-on-surface-variant">
            Apoyo psicologico, recursos especializados y acompanamiento humano para personas con enfermedades catastroficas, familias y cuidadores.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-on-primary shadow-xl shadow-primary/15 transition hover:-translate-y-0.5"
            >
              Empezar ahora
              <ArrowRight size={20} aria-hidden="true" />
            </a>
            <a
              href="#planes"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-4 text-base font-bold text-primary transition hover:bg-primary-fixed"
            >
              Saber mas
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-on-surface-variant">
            <div className="flex -space-x-3">
              {specialists.slice(0, 3).map((person) => (
                <img
                  key={person.name}
                  src={person.image}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-sm font-semibold">
              Red de apoyo profesional y {commentCount} comentarios guardados en esta demo
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-primary/10">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
              alt="Profesional brindando acompanamiento emocional"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 max-w-[250px] rounded-2xl border border-outline-variant bg-white p-5 shadow-xl sm:-left-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary-container text-secondary">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <span className="font-bold text-on-surface">Acompanamiento seguro</span>
            </div>
            <p className="text-sm leading-6 text-on-surface-variant">
              Orientacion sensible, humana y enfocada en cada etapa del proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-container px-4 py-20 md:px-10">
      <SectionHeader
        eyebrow="Servicios"
        title="Servicios disenados para tu bienestar"
        text="Herramientas y apoyo profesional para navegar cada etapa del cuidado con claridad y paz mental."
        centered
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 3).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        <div className="overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-highest transition hover:shadow-xl md:col-span-2">
          <div className="grid min-h-[320px] md:grid-cols-[1.25fr_0.75fr]">
            <div className="flex flex-col justify-center p-8 md:p-10">
              <h3 className="text-2xl font-bold text-on-surface">Comunidad de cuidado</h3>
              <p className="mt-4 max-w-xl leading-7 text-on-surface-variant">
                Un entorno moderado para compartir experiencias, sentirse escuchado y encontrar recursos utiles durante el tratamiento.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">#ApoyoFamiliar</span>
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">#CuidadoEmocional</span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=85"
              alt="Grupo conversando en un espacio de apoyo"
              className="h-full min-h-72 w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl bg-primary p-10 text-center text-on-primary">
          <Star className="mb-4" size={46} fill="currentColor" aria-hidden="true" />
          <p className="text-4xl font-extrabold">4.9/5</p>
          <p className="mt-2 font-semibold opacity-90">Satisfaccion de nuestra red</p>
          <div className="my-6 h-px w-full bg-white/20" />
          <p className="italic opacity-85">"Me ayudo a sentirme acompanada y menos perdida."</p>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  const colors = colorMap[service.color];

  return (
    <article
      id={service.id}
      className={`group flex min-h-[300px] flex-col rounded-3xl border border-outline-variant bg-white p-8 transition hover:-translate-y-1 hover:shadow-2xl ${colors.hover}`}
    >
      <span className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${colors.icon}`}>
        <Icon size={28} aria-hidden="true" />
      </span>
      <h3 className="text-xl font-bold text-on-surface">{service.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-on-surface-variant">{service.text}</p>
      <a href={`#${service.id}`} className="mt-7 inline-flex items-center gap-2 font-bold text-primary transition group-hover:gap-3">
        {service.link}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}

function Plans() {
  return (
    <section id="planes" className="bg-surface-container-low py-20">
      <div className="mx-auto max-w-container px-4 md:px-10">
        <SectionHeader
          eyebrow="Planes de acompanamiento"
          title="Elige el espacio que mejor se adapte al momento actual"
          text="Planes pensados para pacientes, familias y cuidadores que atraviesan enfermedades de alto impacto."
          centered
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const colors = colorMap[plan.tone];
            return (
              <article
                key={plan.title}
                className="glass-card flex min-h-[290px] flex-col rounded-xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className={`mb-5 grid h-12 w-12 place-items-center rounded-full ${colors.icon}`}>
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className={`text-xl font-bold ${colors.title}`}>{plan.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-on-surface-variant">{plan.text}</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${colors.badge}`}>{plan.badge}</span>
                  <a href="#contacto" className="font-bold text-primary hover:underline">
                    Ver mas
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section id="especialistas" className="mx-auto max-w-container px-4 py-20 md:px-10">
      <div className="flex flex-col justify-between gap-8 border-t border-outline-variant pt-12 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Especialistas"
          title="Profesionales listos para apoyarte"
          text="Una red de perfiles orientados al cuidado emocional en contextos medicos complejos."
        />
        <div className="flex flex-wrap gap-3">
          {['Todos', 'Psicologia', 'Terapia familiar', 'Duelo', 'Cuidadores'].map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 ${
                index === 0
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {specialists.map((person) => (
          <article
            key={person.name}
            className="group overflow-hidden rounded-xl border border-outline-variant bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={person.image}
                alt={person.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-sm backdrop-blur-sm">
                <Star className="text-yellow-500" size={16} fill="currentColor" aria-hidden="true" />
                <span className="text-sm font-bold">{person.rating}</span>
              </div>
            </div>
            <div className="flex min-h-56 flex-col p-6">
              <h3 className="text-xl font-bold text-on-surface">{person.name}</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-secondary">{person.area}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-on-surface-variant">{person.text}</p>
              <a
                href="#contacto"
                className="mt-5 inline-flex justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary transition hover:bg-primary-container"
              >
                Agendar sesion
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Guidance() {
  return (
    <>
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-container px-4 text-center md:px-10">
          <MessageCircleHeart className="mx-auto mb-8 text-primary/40" size={72} aria-hidden="true" />
          <blockquote className="mx-auto max-w-4xl text-3xl font-semibold italic leading-tight text-on-surface md:text-5xl">
            "Cuidar la salud mental no elimina la enfermedad, pero puede hacer que nadie tenga que vivirla en soledad."
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary/30" />
            <cite className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Equipo PsicoAlma</cite>
            <div className="h-px w-12 bg-primary/30" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-20 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary-container p-8 text-center md:p-16">
          <div className="relative z-10">
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-on-primary-container md:text-5xl">
              Necesitas ayuda para elegir?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-on-primary-container/80">
              Realiza una orientacion breve para identificar si necesitas evaluacion, apoyo familiar, tratamiento o recursos de prevencion.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#contacto" className="rounded-full bg-white px-10 py-4 font-bold text-primary shadow-lg transition hover:bg-surface-bright">
                Hablar con un asesor
              </a>
              <a
                href="#comentarios"
                className="rounded-full border border-white/30 bg-primary px-10 py-4 font-bold text-on-primary transition hover:bg-primary/90"
              >
                Dejar comentario
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Comments({ comments, form, setForm, handleSubmit, removeComment }) {
  return (
    <section id="comentarios" className="bg-white py-20">
      <div className="mx-auto grid max-w-container gap-10 px-4 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="Comentarios"
            title="Mini base de datos local"
            text="Los comentarios se guardan en el navegador con localStorage. Es perfecto para practicar antes de conectar Supabase o Firebase."
          />

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-3xl border border-outline-variant bg-surface p-6 shadow-soft">
            <label className="grid gap-2 text-sm font-bold text-on-surface">
              Nombre
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="rounded-xl border-outline-variant bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                placeholder="Tu nombre"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-on-surface">
              Correo opcional
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="rounded-xl border-outline-variant bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                placeholder="correo@ejemplo.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-on-surface">
              Mensaje
              <textarea
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="min-h-32 resize-y rounded-xl border-outline-variant bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                placeholder="Escribe un comentario o testimonio..."
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-on-primary transition hover:bg-primary-container"
            >
              Guardar comentario
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="grid content-start gap-4">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-on-surface">{comment.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{comment.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeComment(comment.id)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-container-low text-on-surface-variant transition hover:bg-error-container hover:text-on-error-container"
                  aria-label="Eliminar comentario"
                >
                  <X size={17} />
                </button>
              </div>
              <p className="mt-4 leading-7 text-on-surface-variant">{comment.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-container px-4 py-20 md:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeader
            eyebrow="Contacto general"
            title="Primer contacto con cuidado y respeto"
            text="Esta seccion puede conectarse mas adelante con WhatsApp, correo institucional o un formulario real desplegado en Vercel."
          />
        </div>
        <div className="grid gap-4">
          <ContactItem icon={Phone} title="Telefono" value="+593 000 000 000" />
          <ContactItem icon={Mail} title="Correo" value="contacto@psicoalma.org" />
          <ContactItem icon={CalendarCheck} title="Horario" value="Lunes a viernes, 08:00 a 17:00" />
          <ContactItem icon={MapPin} title="Atencion" value="Modalidad presencial y digital" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-white py-16">
      <div className="mx-auto grid max-w-container gap-10 px-4 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="text-primary" size={28} aria-hidden="true" />
            <span className="text-xl font-extrabold text-primary">PsicoAlma</span>
          </div>
          <p className="leading-7 text-on-surface-variant">
            Tecnologia con proposito humano para el acompanamiento psicologico en salud y bienestar emocional.
          </p>
        </div>

        <FooterList title="Plataforma" items={['Evaluaciones', 'Comunidad', 'Sesiones', 'Seguridad']} />
        <FooterList title="Recursos" items={['Guias de cuidado', 'Primeros auxilios emocionales', 'Familias', 'Centro de ayuda']} />

        <div>
          <h4 className="mb-6 text-lg font-bold text-on-surface">Contacto</h4>
          <div className="space-y-4 text-on-surface-variant">
            <p className="flex items-center gap-3">
              <Mail className="text-primary" size={20} aria-hidden="true" />
              contacto@psicoalma.org
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} aria-hidden="true" />
              Ecuador
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-container flex-col justify-between gap-4 border-t border-outline-variant px-4 pt-8 text-sm text-outline md:flex-row md:px-10">
        <p>© 2026 PsicoAlma. Disenado para la empatia.</p>
        <div className="flex gap-6">
          <a href="#inicio" className="hover:text-primary">Terminos</a>
          <a href="#inicio" className="hover:text-primary">Privacidad</a>
          <a href="#contacto" className="hover:text-primary">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, text, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-on-surface md:text-5xl">{title}</h2>
      <p className="mt-4 leading-8 text-on-surface-variant">{text}</p>
    </div>
  );
}

function ContactItem({ icon: Icon, title, value }) {
  return (
    <div className="flex gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-fixed text-primary">
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <p className="font-bold text-on-surface">{title}</p>
        <p className="mt-1 text-on-surface-variant">{value}</p>
      </div>
    </div>
  );
}

function FooterList({ title, items }) {
  return (
    <div>
      <h4 className="mb-6 text-lg font-bold text-on-surface">{title}</h4>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a href="#inicio" className="flex items-center gap-2 text-on-surface-variant transition hover:text-primary">
              {item}
              <ChevronRight size={15} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
