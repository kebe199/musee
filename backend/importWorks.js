// require('dotenv').config(); 


const DATABASE_URL = 'postgresql://neondb_owner:npg_qfhAlDacUM87@ep-solitary-lake-adz1gqim-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const { Pool } = require('pg');
const fs = require('fs');

console.log("DATABASE_URL =", DATABASE_URL);

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // requis pour Neon
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
      const image = work.image || null;
      const audio = toJSONSafe(work.audio);
      const video = work.video || null;
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

      console.log(`✅ Import OK pour id=${id}`);
    } catch (err) {
      console.error(`❌ Erreur import id=${work.id} :`, err.message);
    }
  }

  console.log('✅ Import terminé !');
  await pool.end();
}

importWorks().catch(console.error);
