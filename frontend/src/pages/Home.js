import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkCard from '../components/WorkCard';

const translations = {
  fr: {
    title: "Collection des Œuvres",
    subtitle: "Découvrez le patrimoine culturel africain",
    loading: "Chargement des œuvres...",
    error: "Erreur lors du chargement",
    search: "🔍 Rechercher une œuvre...",
    noResults: "Aucune œuvre trouvée",
    resultsCount: "œuvres trouvées"
  },
  en: {
    title: "Art Collection",
    subtitle: "Discover African cultural heritage",
    loading: "Loading artworks...",
    error: "Error loading artworks",
    search: "🔍 Search for an artwork...",
    noResults: "No artworks found",
    resultsCount: "artworks found"
  },
  wo: {
    title: "Jëmmiinu Aada",
    subtitle: "Xamal aada Afrig",
    loading: "Nangu jëmmiinu...",
    error: "Jàppal nangu jëmmiinu",
    search: "🔍 Seet jëmmiinu...",
    noResults: "Jëmmiinu gisul",
    resultsCount: "jëmmiinu gis na"
  }
};

export default function Home({ lang }) {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [topLiked, setTopLiked] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/api/works`)
      .then(res => {
        setWorks(res.data);
        setFilteredWorks(res.data);
        // compute most liked
        const withLikes = (res.data || []).map(w => ({ ...w, likes: typeof w.likes === 'number' ? w.likes : 0 }));
        if (withLikes.length) {
          const top = withLikes.reduce((a, b) => (b.likes > (a?.likes || 0) ? b : a), withLikes[0]);
          setTopLiked(top);
        } else {
          setTopLiked(null);
        }
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWorks(works);
    } else {
      const filtered = works.filter(work => 
        work.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWorks(filtered);
    }
  }, [searchTerm, works, lang]);

  if (loading) return <div className="loading">{translations[lang].loading}</div>;
  if (error) return <div className="error">{translations[lang].error}</div>;

  return (
    <div className="home">
      <div
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25)), url(${process.env.PUBLIC_URL}/img/museum-hero.jpg)`
        }}
      >
        <h2>{translations[lang].title}</h2>
        <p className="subtitle">{translations[lang].subtitle}</p>
        
        <div className="search-section">
          <input
            type="text"
            placeholder={translations[lang].search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <div className="search-results">
              {filteredWorks.length > 0 ? (
                <p>{filteredWorks.length} {translations[lang].resultsCount}</p>
              ) : (
                <p>{translations[lang].noResults}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {topLiked && (
        <div className="highlight" style={{background:'#fff', borderRadius:12, padding:16, margin:'16px 0', boxShadow:'0 4px 18px rgba(0,0,0,0.06)'}}>
          <h3 style={{marginTop:0}}>❤ Œuvre la plus aimée</h3>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <img src={topLiked.image} alt={topLiked.title[lang]} style={{height:60, width:60, objectFit:'cover', borderRadius:8}} />
            <div>
              <div style={{fontWeight:700}}>{topLiked.title[lang]}</div>
              <div style={{color:'#555'}}>❤ {topLiked.likes || 0} aime(s)</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="works-grid">
        {filteredWorks.map(w => (
          <WorkCard key={w.id} work={w} lang={lang} />
        ))}
      </div>
    </div>
  );
}
