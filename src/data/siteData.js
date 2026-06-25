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
  { id: 'cuidados', label: 'Cuidados', path: '/cuidados' },
  { id: 'recursos', label: 'Recursos', path: '/recursos' },
  { id: 'comunidad', label: 'Comunidad', path: '/comunidad' },
];

export const careServices = [
  {
    title: 'Evaluacion personalizada',
    icon: ClipboardCheck,
    tone: 'primary',
    text: 'Identificamos el estado emocional, red de apoyo y principales necesidades psicologicas.',
  },
  {
    title: 'Diagnostico emocional',
    icon: Brain,
    tone: 'secondary',
    text: 'Analizamos ansiedad, duelo, miedo, agotamiento y adaptacion al proceso medico.',
  },
  {
    title: 'Tratamiento psicologico',
    icon: HeartHandshake,
    tone: 'tertiary',
    text: 'Acompanamiento individual y familiar para fortalecer afrontamiento y comunicacion.',
  },
  {
    title: 'Prevencion y promocion',
    icon: ShieldCheck,
    tone: 'primary',
    text: 'Recursos para reconocer alertas, cuidar rutinas y sostener el bienestar emocional.',
  },
];

export const resources = [
  {
    title: 'Guia para pacientes',
    icon: BookOpen,
    text: 'Primeros pasos para comprender emociones frecuentes despues de un diagnostico complejo.',
  },
  {
    title: 'Apoyo para cuidadores',
    icon: UsersRound,
    text: 'Herramientas para repartir tareas, pedir ayuda y evitar agotamiento emocional.',
  },
  {
    title: 'Primeros auxilios emocionales',
    icon: Activity,
    text: 'Tecnicas breves para momentos de crisis, incertidumbre o noticias dificiles.',
  },
];

export const communityTopics = [
  {
    title: 'Historias de apoyo',
    icon: MessageCircleHeart,
    text: 'Mensajes y comentarios para crear una red de acompanamiento humano.',
  },
  {
    title: 'Familias y cuidadores',
    icon: UsersRound,
    text: 'Espacio para dudas frecuentes sobre cuidado, comunicacion y descanso.',
  },
  {
    title: 'Bienestar diario',
    icon: ShieldCheck,
    text: 'Habitos pequenos que pueden sostener la salud mental durante el tratamiento.',
  },
];
