import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const translations = {
  fr: {
    back: "← Retour à la collection",
    loading: "Chargement de l'œuvre...",
    error: "Erreur lors du chargement",
    history: "Historique et contexte culturel",
    audioDescription: "Description audio",
    audioNotSupported: "Votre navigateur ne supporte pas l'audio.",
    playAudio: "▶️ Écouter la description",
    pauseAudio: "⏸️ Pause",
    culturalContext: "Contexte culturel",
    origin: "Origine",
    significance: "Signification"
  },
  en: {
    back: "← Back to collection",
    loading: "Loading artwork...",
    error: "Error loading artwork",
    history: "History and cultural context",
    audioDescription: "Audio description",
    audioNotSupported: "Your browser does not support audio.",
    playAudio: "▶️ Listen to description",
    pauseAudio: "⏸️ Pause",
    culturalContext: "Cultural context",
    origin: "Origin",
    significance: "Significance"
  },
  wo: {
    back: "← Dellu ci jëmmiinu",
    loading: "Nangu jëmmiinu...",
    error: "Jàppal nangu jëmmiinu",
    history: "Taariix ak cosaanu aada",
    audioDescription: "Xamal ci audio",
    audioNotSupported: "Browser bi du ko jëfandikoo audio.",
    playAudio: "▶️ Déglu xamal bi",
    pauseAudio: "⏸️ Dàq",
    culturalContext: "Cosaanu aada",
    origin: "Jëmm",
    significance: "Màggal"
  }
};

export default function WorkDetail({ lang }) {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/api/works/${id}`)
      .then(res => {
        setWork(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const toggleAudio = () => {
    const audio = document.getElementById('work-audio');
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  if (loading) return <div className="loading">{translations[lang].loading}</div>;
  if (error) return <div className="error">{translations[lang].error}</div>;
  if (!work) return <div className="error">{translations[lang].error}</div>;

  return (
    <div className="detail">
      <div className="detail-header">
        <Link to="/" className="back-link">{translations[lang].back}</Link>
        <h1>{work.title[lang]}</h1>
      </div>
      
      <div className="detail-content">
        <div className="artwork-section">
          <img src={work.image} alt={work.title[lang]} className="art-image" />
          {work.audio && (
            <div className="audio-section">
              <h3>{translations[lang].audioDescription}</h3>
              <audio 
                id="work-audio"
                controls 
                src={work.audio}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                {translations[lang].audioNotSupported}
              </audio>
              <button onClick={toggleAudio} className="audio-toggle">
                {isPlaying ? translations[lang].pauseAudio : translations[lang].playAudio}
              </button>
            </div>
          )}
        </div>

        <div className="description-section">
          <h2>{work.title[lang]}</h2>
          <p className="description">{work.description[lang]}</p>
          
          <div className="cultural-info">
            <h3>{translations[lang].culturalContext}</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>{translations[lang].origin}:</strong>
                <span>{work.history}</span>
              </div>
              {work.culturalContext && (
                <div className="info-item">
                  <strong>Contexte culturel:</strong>
                  <span>{work.culturalContext[lang]}</span>
                </div>
              )}
              {work.significance && (
                <div className="info-item">
                  <strong>Signification:</strong>
                  <span>{work.significance[lang]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
