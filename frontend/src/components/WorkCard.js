import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkCard({ work, lang }) {
  return (
    <div className="card">
      <img src={work.image} alt={work.title[lang]} />
      <h3>{work.title[lang]}</h3>
      <p>{work.description[lang].slice(0, 100)}...</p>
      <Link to={`/work/${work.id}`}>Voir plus</Link>
    </div>
  );
}
