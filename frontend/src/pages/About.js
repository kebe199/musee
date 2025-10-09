import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page" style={{maxWidth: 700, margin: "0 auto", padding: 24}}>
      <h1>À propos du Musée des Civilisations Noires</h1>
      <p>
        Le Musée des Civilisations Noires (MCN) est un espace dédié à la valorisation, la préservation et la diffusion du patrimoine culturel africain et de la diaspora.
      </p>
      <h2>Nos missions</h2>
      <ul>
        <li>Présenter la richesse et la diversité des civilisations noires</li>
        <li>Promouvoir les artistes africains contemporains et historiques</li>
        <li>Éduquer et sensibiliser le public à l'histoire et à la culture africaine</li>
      </ul>
      <h2>Localisation</h2>
      <p>
        Place Soweto, Dakar, Sénégal<br/>
        <a href="https://maps.app.goo.gl/Ehre3a6QdV4FH5MV9?g_st=ipc" target="_blank" rel="noopener noreferrer">Voir sur Google Maps</a>
      </p>
      <h2>Horaires d'ouverture</h2>
      <ul>
        <li>Lundi - Samedi : 9h00 - 18h00</li>
        <li>Dimanche et jours fériés : fermé</li>
      </ul>
      <h2>Contacts</h2>
      <ul>
        <li>Email : contact@mcn.sn</li>
        <li>Téléphone : +221 33 889 11 80</li>
        <li>Facebook : <a href="https://facebook.com/mcn.sn" target="_blank" rel="noopener noreferrer">mcn.sn</a></li>
      </ul>
      <h2>Les œuvres et artistes</h2>
      <p>
        Le musée présente une collection variée d'œuvres d'art, d'objets historiques et d'expositions temporaires mettant en lumière des artistes africains majeurs et émergents.
      </p>
      <h2>Équipe & partenaires</h2>
      <p>
        Notre équipe est composée de passionnés d'art, de chercheurs et de médiateurs culturels. Nous collaborons avec de nombreux partenaires locaux et internationaux.
      </p>
    </div>
  );
}