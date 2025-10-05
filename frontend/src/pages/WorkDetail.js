import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function WorkDetail({ lang }) {
  const { id } = useParams();
  const [work, setWork] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/works/${id}`)
      .then(res => setWork(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!work) return <p>Chargement...</p>;

  return (
    <div className="detail">
      <Link to="/">← Retour</Link>
      <h2>{work.title[lang]}</h2>
      <img src={work.image} alt={work.title[lang]} className="art-image" />
      <p>{work.description[lang]}</p>
      {work.audio && (
        <audio controls src={work.audio}>
          Votre navigateur ne supporte pas l'audio.
        </audio>
      )}
      <p><strong>Historique :</strong> {work.history}</p>
    </div>
  );
}
