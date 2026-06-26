import HomePage from '../pages/HomePage/HomePage';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import DiseasesPage from '../pages/DiseasesPage/DiseasesPage';
import EvaluationPage from '../pages/EvaluationPage/EvaluationPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import PreventionPage from '../pages/PreventionPage/PreventionPage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';
import TreatmentPage from '../pages/TreatmentPage/TreatmentPage';

export const defaultPageId = 'inicio';

export const appRoutes = [
  { id: 'inicio', path: '/', component: HomePage },
  { id: 'servicios', path: '/servicios', component: ServicesPage },
  { id: 'evaluacion', path: '/evaluacion', component: EvaluationPage },
  { id: 'prevencion', path: '/prevencion', component: PreventionPage },
  { id: 'promocion', path: '/promocion', component: PromotionPage },
  { id: 'tratamiento', path: '/tratamiento', component: TreatmentPage },
  { id: 'enfermedades', path: '/enfermedades', component: DiseasesPage },
  { id: 'contacto', path: '/contacto-general', component: ContactPage },
];

export const pageRegistry = {
  inicio: HomePage,
  servicios: ServicesPage,
  evaluacion: EvaluationPage,
  prevencion: PreventionPage,
  promocion: PromotionPage,
  tratamiento: TreatmentPage,
  enfermedades: DiseasesPage,
  contacto: ContactPage,
};

const routeByPath = new Map(appRoutes.map((route) => [route.path, route]));
const routeById = new Map(appRoutes.map((route) => [route.id, route]));

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function getPageComponent(pageId) {
  return pageRegistry[pageId] ?? pageRegistry[defaultPageId];
}

export function getPageIdFromPath(pathname) {
  return routeByPath.get(normalizePath(pathname))?.id ?? defaultPageId;
}

export function getPathForPage(pageId) {
  return routeById.get(pageId)?.path ?? routeById.get(defaultPageId).path;
}
