import HomePage from '../pages/HomePage/HomePage';
import CarePage from '../pages/CarePage/CarePage';
import ResourcesPage from '../pages/ResourcesPage/ResourcesPage';
import CommunityPage from '../pages/CommunityPage/CommunityPage';
import DiseasesPage from '../pages/DiseasesPage/DiseasesPage';

export const defaultPageId = 'inicio';

export const appRoutes = [
  { id: 'inicio', path: '/', component: HomePage },
  { id: 'cuidados', path: '/cuidados', component: CarePage },
  { id: 'enfermedades', path: '/enfermedades', component: DiseasesPage },
  { id: 'recursos', path: '/recursos', component: ResourcesPage },
  { id: 'comunidad', path: '/comunidad', component: CommunityPage },
];

export const pageRegistry = {
  inicio: HomePage,
  cuidados: CarePage,
  enfermedades: DiseasesPage,
  recursos: ResourcesPage,
  comunidad: CommunityPage,
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
