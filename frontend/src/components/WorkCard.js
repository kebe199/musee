import React from 'react';
import { Link } from 'react-router-dom';

const translations = {
  fr: {
    seeMore: "Voir plus",
    audioAvailable: "🎵 Audio disponible"
  },
  en: {
    seeMore: "See more",
    audioAvailable: "🎵 Audio available"
  },
  wo: {
    seeMore: "Gis ci kanam",
    audioAvailable: "🎵 Audio am na"
  }
};

export default function WorkCard({ work, lang }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={work.image} alt={work.title[lang]} />
        {work.audio && (
          <div className="audio-indicator">
            {translations[lang].audioAvailable}
          </div>
        )}
      </div>
      <div className="card-content">
        <h3>{work.title[lang]}</h3>
        <p className="description">{work.description[lang].slice(0, 120)}...</p>
        <Link to={`/work/${work.id}`} className="btn-primary">
          {translations[lang].seeMore}
        </Link>
      </div>
    </div>
  );
}
