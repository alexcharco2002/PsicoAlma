import HomePage from '../pages/HomePage/HomePage';
import CarePage from '../pages/CarePage/CarePage';
import ResourcesPage from '../pages/ResourcesPage/ResourcesPage';
import CommunityPage from '../pages/CommunityPage/CommunityPage';

export const defaultPageId = 'inicio';

export const pageRegistry = {
  inicio: HomePage,
  cuidados: CarePage,
  recursos: ResourcesPage,
  comunidad: CommunityPage,
};

export function getPageComponent(pageId) {
  return pageRegistry[pageId] ?? pageRegistry[defaultPageId];
}
