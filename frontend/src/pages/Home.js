import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkCard from '../components/WorkCard';

export default function Home({ lang }) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/works')
      .then(res => setWorks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home">
      <h2>Liste des œuvres</h2>
      <div className="works-grid">
        {works.map(w => (
          <WorkCard key={w.id} work={w} lang={lang} />
        ))}
      </div>
    </div>
  );
}
