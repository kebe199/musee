const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Test de l\'API...');
    
    // Test de la route principale
    const response = await fetch('http://localhost:3001/api/works');
    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Données reçues:', data.length, 'œuvres');
      console.log('Première œuvre:', data[0]?.title?.fr || 'Aucune');
    } else {
      console.log('Erreur:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
  }
}

testAPI();
