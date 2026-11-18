import mysql from 'mysql2/promise';

async function check() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'astro',
  });

  const [heroes] = await conn.query('SELECT id, astrologer_image_url, hero_image_url FROM hero_sections');
  console.log('Heroes:', heroes);

  const [profiles] = await conn.query('SELECT id, name, portrait_image_url, profile_image_url FROM astrologer_profile');
  console.log('Profiles:', profiles);

  // Update hero and profile to point to the new high quality AI images
  await conn.query(`
    UPDATE hero_sections 
    SET astrologer_image_url = '/images/astrologer-portrait.jpg',
        hero_image_url = '/images/cosmic-hero.jpg'
    WHERE id = 1
  `);

  await conn.query(`
    UPDATE astrologer_profile
    SET portrait_image_url = '/images/astrologer-about.jpg',
        profile_image_url = '/images/astrologer-portrait.jpg'
    WHERE id = 1
  `);

  console.log('Successfully updated database images!');
  await conn.end();
}

check().catch(console.error);
