const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'musee_user',
  host: 'localhost',
  database: 'musee',
  password: 'musee2025',
  port: 5432,
});

// Transforme n'importe quel objet JSON complexe en string JSON
function toJSONSafe(value) {
  if (value === undefined || value === null) return JSON.stringify(null);
  if (typeof value === 'object') return JSON.stringify(value);
  return JSON.stringify(value);
}

async function importWorks() {
  const works = JSON.parse(fs.readFileSync('./data/works.json', 'utf8'));

  for (const work of works) {
    try {
      const id = work.id;
      const title = toJSONSafe(work.title);
      const description = toJSONSafe(work.description);
      const image = work.image || null;   // <-- rester en TEXT pour le frontend
      const audio = toJSONSafe(work.audio);
      const video = work.video || null;   // <-- rester en TEXT
      const history = toJSONSafe(work.history);
      const culturalcontext = toJSONSafe(work.culturalContext);
      const significance = toJSONSafe(work.significance);
      const likes = work.likes || 0;
      const likedBy = toJSONSafe(work.likedBy || []);

      await pool.query(
        `INSERT INTO works
          (id, title, description, image, audio, video, history, culturalcontext, significance, likes, likedby)
         VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO NOTHING`,
        [id, title, description, image, audio, video, history, culturalcontext, significance, likes, likedBy]
      );

      console.log(`Import OK pour id=${id}`);
    } catch (err) {
      console.error(`Erreur import id=${work.id} :`, err.message);
    }
  }

  console.log('Import terminé !');
  await pool.end();
}

importWorks().catch(console.error);
