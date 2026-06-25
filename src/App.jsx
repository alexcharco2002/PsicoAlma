import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { defaultPageId, getPageComponent } from './routes/pageRegistry';
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
  const [activePage, setActivePage] = useState(defaultPageId);
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

  const Page = getPageComponent(activePage);

  return (
    <main className="app-shell">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <Page comments={comments} addComment={addComment} removeComment={removeComment} onNavigate={setActivePage} />
      <Footer onNavigate={setActivePage} />
    </main>
  );
}

export default App;
