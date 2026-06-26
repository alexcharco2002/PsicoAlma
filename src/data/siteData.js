import {
  Activity,
  BookOpen,
  Brain,
  ClipboardCheck,
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

export const navigation = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'enfermedades', label: 'Enfermedades', path: '/enfermedades' },
  { id: 'tratamiento', label: 'Tratamiento', path: '/tratamiento' },
  { id: 'prevencion', label: 'Prevención', path: '/prevencion' },
  { id: 'promocion', label: 'Promoción', path: '/promocion' },
  { id: 'servicios', label: 'Servicios', path: '/servicios' },
  { id: 'evaluacion', label: 'Evaluación', path: '/evaluacion' },
];

export const careServices = [
  {
    title: 'Evaluación personalizada',
    icon: ClipboardCheck,
    tone: 'primary',
    text: 'Identificamos el estado emocional, red de apoyo y principales necesidades psicológicas.',
  },
  {
    title: 'Diagnóstico emocional',
    icon: Brain,
    tone: 'secondary',
    text: 'Analizamos ansiedad, duelo, miedo, agotamiento y adaptación al proceso médico.',
  },
  {
    title: 'Tratamiento psicológico',
    icon: HeartHandshake,
    tone: 'tertiary',
    text: 'Acompañamiento individual y familiar para fortalecer afrontamiento y comunicación.',
  },
  {
    title: 'Prevención y promoción',
    icon: ShieldCheck,
    tone: 'primary',
    text: 'Recursos para reconocer alertas, cuidar rutinas y sostener el bienestar emocional.',
  },
];

export const resources = [
  {
    title: 'Guía para pacientes',
    icon: BookOpen,
    text: 'Primeros pasos para comprender emociones frecuentes después de un diagnóstico complejo.',
  },
  {
    title: 'Apoyo para cuidadores',
    icon: UsersRound,
    text: 'Herramientas para repartir tareas, pedir ayuda y evitar agotamiento emocional.',
  },
  {
    title: 'Primeros auxilios emocionales',
    icon: Activity,
    text: 'Técnicas breves para momentos de crisis, incertidumbre o noticias difíciles.',
  },
];

export const communityTopics = [
  {
    title: 'Historias de apoyo',
    icon: MessageCircleHeart,
    text: 'Mensajes y comentarios para crear una red de acompañamiento humano.',
  },
  {
    title: 'Familias y cuidadores',
    icon: UsersRound,
    text: 'Espacio para dudas frecuentes sobre cuidado, comunicación y descanso.',
  },
  {
    title: 'Bienestar diario',
    icon: ShieldCheck,
    text: 'Hábitos pequeños que pueden sostener la salud mental durante el tratamiento.',
  },
];
