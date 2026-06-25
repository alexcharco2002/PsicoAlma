import { Send, X } from 'lucide-react';
import { useState } from 'react';
import { communityTopics } from '../../data/siteData';
import './CommunityPage.css';

function CommunityPage({ comments, addComment, removeComment }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      return;
    }

    addComment({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="community-page">
      <section className="community-hero page-section">
        <p className="section-kicker">Comunidad</p>
        <h1 className="section-title">Comentarios y red de apoyo</h1>
        <p className="section-copy">
          Esta pestana mantiene la mini base de datos local. Despues podemos reemplazarla por Supabase o Firebase para
          que los comentarios sean reales y compartidos.
        </p>
      </section>

      <section className="community-topics page-section">
        {communityTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <article key={topic.title}>
              <Icon size={26} />
              <h2>{topic.title}</h2>
              <p>{topic.text}</p>
            </article>
          );
        })}
      </section>

      <section className="comments-layout page-section">
        <form className="comment-form" onSubmit={submit}>
          <h2>Nuevo comentario</h2>
          <label>
            Nombre
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Tu nombre" />
          </label>
          <label>
            Correo opcional
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="correo@ejemplo.com"
            />
          </label>
          <label>
            Mensaje
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Escribe un comentario o testimonio..."
            />
          </label>
          <button type="submit">
            Guardar comentario
            <Send size={18} />
          </button>
        </form>

        <div className="comment-list">
          {comments.map((comment) => (
            <article key={comment.id} className="comment-card">
              <div>
                <h3>{comment.name}</h3>
                <span>{comment.date}</span>
              </div>
              <p>{comment.message}</p>
              <button type="button" aria-label="Eliminar comentario" onClick={() => removeComment(comment.id)}>
                <X size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CommunityPage;
