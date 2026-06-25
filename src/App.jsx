import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import CarePage from './pages/CarePage/CarePage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
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

const pageMap = {
  inicio: HomePage,
  cuidados: CarePage,
  recursos: ResourcesPage,
  comunidad: CommunityPage,
};

function App() {
  const [activePage, setActivePage] = useState('inicio');
  const [comments, setComments] = useState(initialComments);

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

  const Page = pageMap[activePage] ?? HomePage;

  return (
    <main className="app-shell">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <Page comments={comments} addComment={addComment} removeComment={removeComment} onNavigate={setActivePage} />
      <Footer onNavigate={setActivePage} />
    </main>
  );
}

export default App;
