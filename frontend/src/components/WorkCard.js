import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const translations = {
  fr: {
    seeMore: "Voir plus",
    audioAvailable: "🎵 Audio disponible",
    bookmark: "Enregistrer",
    like: "J'aime"
  },
  en: {
    seeMore: "See more",
    audioAvailable: "🎵 Audio available",
    bookmark: "Bookmark",
    like: "Like"
  },
  wo: {
    seeMore: "Gis ci kanam",
    audioAvailable: "🎵 Audio am na",
    bookmark: "Dafay aar",
    like: "Bëgg naa"
  }
};

export default function WorkCard({ work, lang }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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
        <p className="description">{work.description[lang]?.slice(0, 120)}...</p>
        <div className="card-actions">
          <Link to={`/work/${work.id}`} className="btn-primary">
            {translations[lang].seeMore}
          </Link>
          <div className="card-icons">
            <button
              className={`icon-btn${bookmarked ? ' active' : ''}`}
              title={translations[lang].bookmark}
              onClick={() => setBookmarked(b => !b)}
              aria-label={translations[lang].bookmark}
              type="button"
            >
              {bookmarked ? (
                // Signet plein
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff6b35" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              ) : (
                // Signet vide
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              )}
            </button>
            <button
              className={`icon-btn${liked ? ' active' : ''}`}
              title={translations[lang].like}
              onClick={() => setLiked(l => !l)}
              aria-label={translations[lang].like}
              type="button"
            >
              {liked ? (
                // Cœur plein
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#ff6b35" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z"/>
                </svg>
              ) : (
                // Cœur vide
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z"/>
                </svg>
              )}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
