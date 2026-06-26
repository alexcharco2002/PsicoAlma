import { useEffect, useState } from 'react';
import { PhoneCall } from 'lucide-react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { getPageComponent, getPageIdFromPath, getPathForPage } from './routes/pageRegistry';
import './App.css';

const storageKey = 'psicoalma-comments';

const initialComments = [
  {
    id: 'sample-1',
    name: 'Equipo PsicoAlma',
    message: 'Este espacio guarda comentarios localmente para practicar el flujo antes de conectar una base de datos real.',
    date: '2026-06-24',
  },
];

function App() {
  const [activePage, setActivePage] = useState(() => getPageIdFromPath(window.location.pathname));
  const [comments, setComments] = useState(initialComments);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const cleanPath = getPathForPage(getPageIdFromPath(window.location.pathname));
      window.history.replaceState({}, '', cleanPath);
    }

    const syncPageWithPath = () => {
      setActivePage(getPageIdFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', syncPageWithPath);
    return () => window.removeEventListener('popstate', syncPageWithPath);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    setComments((current) => [
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString().slice(0, 10),
        ...comment,
      },
      ...current,
    ]);
  };

  const removeComment = (id) => {
    setComments((current) => current.filter((comment) => comment.id !== id));
  };

  const navigateToPage = (pageId) => {
    const nextPath = getPathForPage(pageId);
    setActivePage(pageId);

    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState({}, '', nextPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Page = getPageComponent(activePage);

  return (
    <main className={isDarkMode ? 'app-shell app-shell--dark' : 'app-shell'}>
      <Header
        activePage={activePage}
        isDarkMode={isDarkMode}
        onNavigate={navigateToPage}
        onToggleDarkMode={() => setIsDarkMode((current) => !current)}
      />
      <Page
        comments={comments}
        addComment={addComment}
        removeComment={removeComment}
        isDarkMode={isDarkMode}
        onNavigate={navigateToPage}
      />
      <button type="button" className="urgent-help-button" onClick={() => navigateToPage('contacto')}>
        <PhoneCall size={20} />
        <span>
          Ayuda urgente
          <small>Contactar apoyo</small>
        </span>
      </button>
      <Footer onNavigate={navigateToPage} />
    </main>
  );
}

export default App;
