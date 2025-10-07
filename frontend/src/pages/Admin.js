import React, { useEffect, useState } from 'react';
import './Admin.css';

export default function Admin() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/works')
      .then(res => res.json())
      .then(data => {
        setWorks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des œuvres.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-page">
      <h1>Administration des œuvres</h1>
      <div className="admin-actions">
        <button className="btn-primary">Ajouter une œuvre</button>
      </div>
      <div className="admin-works-list">
        {loading && <p>Chargement…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre (fr)</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {works.map(work => (
                <tr key={work.id}>
                  <td>{work.id}</td>
                  <td>{work.title?.fr || work.title?.wo || work.title?.en || '-'}</td>
                  <td>
                    {work.image && (
                      <img src={`http://localhost:4000${work.image}`} alt="" style={{height: 40, borderRadius: 6}} />
                    )}
                  </td>
                  <td>
                    <button className="btn-primary" style={{marginRight: 8}}>Modifier</button>
                    <button className="btn-primary" style={{background: '#ccc', color: '#333'}}>Archiver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}