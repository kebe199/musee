import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCurrentEmail } from '../auth';
import { getWork, likeWork } from '../api';
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
  const [hasAudio, setHasAudio] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setLoading(true);
    getWork(id)
      .then(({ data }) => {
        setWork(data);
        setLikes(data.likes || 0);
        try {
          const email = (getCurrentEmail() || '').toLowerCase();
          const likedBy = Array.isArray(data.likedBy) ? data.likedBy.map(v => String(v).toLowerCase()) : [];
          setLiked(!!email && likedBy.includes(email));
        } catch { setLiked(false); }
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Erreur');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Helper: pick URL whether field is a string or a localized object
  const pickMediaUrl = (m) => {
    if (!m) return '';
    if (typeof m === 'string') return m;
    if (typeof m === 'object') {
      return m[lang] || m.fr || m.en || m.wo || '';
    }
    return '';
  };

  // Compute media URLs from work
  const audioUrl = pickMediaUrl(work?.audio);
  const videoUrl = pickMediaUrl(work?.video);

  // Verify that the audio file is reachable before rendering the player
  useEffect(() => {
    let aborted = false;
    async function verifyAudio() {
      if (!audioUrl) { setHasAudio(false); return; }
      try {
        const res = await fetch(audioUrl, { method: 'HEAD' });
        if (!aborted) setHasAudio(res.ok);
      } catch (_) {
        if (!aborted) setHasAudio(false);
      }
    }
    verifyAudio();
    return () => { aborted = true; };
  }, [audioUrl]);

  // Video: if a URL exists, show the player (optional: could HEAD check like audio)
  useEffect(() => {
    setHasVideo(!!videoUrl);
  }, [videoUrl]);

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

  async function handleLike() {
    const email = getCurrentEmail();
    if (!email) {
      alert('Veuillez vous connecter pour aimer cette œuvre.');
      return;
    }
    try {
      const { data } = await likeWork(id, email);
      if (data && typeof data.likes === 'number') {
        setLikes(data.likes);
        if (typeof data.liked === 'boolean') setLiked(data.liked);
      }
    } catch (_) {
      // ignore silently or show a toast
    }
  }

  if (loading) return <div className="loading">{translations[lang].loading}</div>;
  if (error) return <div className="error">{translations[lang].error}</div>;
  if (!work) return <div className="error">{translations[lang].error}</div>;

  return (
    <div className="detail">
      <div className="detail-header">
        <Link to="/" className="back-link">{translations[lang].back}</Link>
        <h1>{work.title[lang]}</h1>
      </div>
      {showVideo && hasVideo && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setShowVideo(false)}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 12, maxWidth: '90vw', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Vidéo</h3>
              <button className="btn-secondary" onClick={() => setShowVideo(false)}>Fermer</button>
            </div>
            <video controls src={videoUrl} style={{ width: '80vw', maxWidth: 900, height: 'auto', borderRadius: 8 }} />
          </div>
        </div>
      )}
      
      <div className="detail-content">
        <div className="artwork-section" style={{ position: 'relative' }}>
          <img src={work.image} alt={work.title[lang]} className="art-image" />
          {(hasAudio || hasVideo) && (
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 10 }}>
              {hasAudio && (
                <button
                  aria-label="Audio"
                  onClick={toggleAudio}
                  title={translations[lang].audioDescription}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '2px solid #ff6b35',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                >
                  <span role="img" aria-label="audio">🔊</span>
                </button>
              )}
              {hasVideo && (
                <button
                  aria-label="Vidéo"
                  onClick={() => setShowVideo(true)}
                  title="Vidéo"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '2px solid #ff6b35',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                >
                  <span role="img" aria-label="video">🎬</span>
                </button>
              )}
            </div>
          )}
          <div style={{marginTop: 12}}>
            <div style={{fontWeight: 600, marginBottom: 8}}>❤ {likes} aime(s)</div>
            <button className="btn-primary" onClick={handleLike}>{liked ? "Je n'aime plus" : 'Aimer'}</button>
          </div>
          {hasAudio && (
            <div className="audio-section">
              <h3>🔊 {translations[lang].audioDescription}</h3>
              <audio 
                id="work-audio"
                controls 
                src={audioUrl}
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

          {hasVideo && (
            <div className="audio-section" style={{ marginTop: 20 }}>
              <h3>🎬 Vidéo</h3>
              <video 
                controls 
                src={videoUrl}
                style={{ width: '100%', borderRadius: 12 }}
              />
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
                <span>{
                  typeof work.history === 'string' 
                    ? work.history 
                    : (work.history?.[lang] || work.history?.fr || '')
                }</span>
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
