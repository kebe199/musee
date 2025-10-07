const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',         // adapte selon ta config
  host: 'localhost',
  database: 'musee',
  password: 'Cheikh0una',   // adapte selon ta config
  port: 5432,
});

async function importWorks() {
  const works = JSON.parse(fs.readFileSync('./data/works.json', 'utf8'));
  for (const work of works) {
    await pool.query(
      `INSERT INTO works
        (id, title, description, image, audio, video, history, culturalcontext, significance)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO NOTHING`,
      [
        work.id,
        work.title,
        work.description,
        work.image,
        work.audio,
        work.video,
        work.history,
        work.culturalContext,
        work.significance
      ]
    );
  }
  console.log('Import terminé !');
  await pool.end();
}

importWorks().catch(console.error);