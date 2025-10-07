import React from 'react';
import './Admin.css';

export default function Admin() {
  return (
    <div className="admin-page">
      <h1>Administration des œuvres</h1>
      <div className="admin-actions">
        <button className="btn-primary">Ajouter une œuvre</button>
      </div>
      <div className="admin-works-list">
        {/* Ici s'affichera la liste des œuvres avec options modifier/archiver/supprimer */}
        <p>Liste des œuvres à venir…</p>
      </div>
    </div>
  );
}