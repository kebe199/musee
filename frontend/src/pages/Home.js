import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkCard from '../components/WorkCard';

const translations = {
  fr: {
    title: "Collection des Œuvres",
    subtitle: "Découvrez le patrimoine culturel africain",
    loading: "Chargement des œuvres...",
    error: "Erreur lors du chargement",
    search: "Rechercher une œuvre...",
    noResults: "Aucune œuvre trouvée",
    resultsCount: "œuvres trouvées"
  },
  en: {
    title: "Art Collection",
    subtitle: "Discover African cultural heritage",
    loading: "Loading artworks...",
    error: "Error loading artworks",
    search: "Search for an artwork...",
    noResults: "No artworks found",
    resultsCount: "artworks found"
  },
  wo: {
    title: "Jëmmiinu Aada",
    subtitle: "Xamal aada Afrig",
    loading: "Nangu jëmmiinu...",
    error: "Jàppal nangu jëmmiinu",
    search: "Seet jëmmiinu...",
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

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/works')
      .then(res => {
        setWorks(res.data);
        setFilteredWorks(res.data);
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
      
      <div className="works-grid">
        {filteredWorks.map(w => (
          <WorkCard key={w.id} work={w} lang={lang} />
        ))}
      </div>
    </div>
  );
}
