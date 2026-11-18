import mysql from 'mysql2/promise';

async function updateDb() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'astro'
  });

  // 1. Update Hero Section
  await conn.query(`
    UPDATE hero_sections 
    SET astrologer_image_url = '/images/puneet-dwivedi-meditation.jpg',
        hero_image_url = '/images/cosmic-galaxy-universe.jpg'
    WHERE id = 1
  `);
  console.log('✅ Hero section updated with Puneet Dwivedi real photo & cosmic galaxy background');

  // 2. Update Astrologer Profile
  await conn.query(`
    UPDATE astrologer_profile 
    SET portrait_image_url = '/images/puneet-dwivedi-portrait.jpg'
    WHERE id = 1
  `);
  console.log('✅ Astrologer profile updated with Puneet Dwivedi portrait photo');

  // 3. Update Puja & Shanti Vidhan Service Image
  await conn.query(`
    UPDATE services 
    SET image_url = '/images/puneet-dwivedi-havan.jpg'
    WHERE slug = 'puja-shanti-vidhan' OR title LIKE '%Puja%'
  `);
  console.log('✅ Puja & Shanti Vidhan service updated with Puneet Dwivedi Vedic Havan photo');

  // 4. Insert into media_library
  await conn.query(`
    INSERT INTO media_library (filename, original_name, file_path, file_size, mime_type, alt_text, category)
    VALUES 
      ('puneet-dwivedi-meditation.jpg', 'puneet-dwivedi-meditation.jpg', '/images/puneet-dwivedi-meditation.jpg', 119999, 'image/jpeg', 'Pandit Puneet Dwivedi Meditating at Sacred Shiva Sanctuary with Diyas', 'profile'),
      ('puneet-dwivedi-portrait.jpg', 'puneet-dwivedi-portrait.jpg', '/images/puneet-dwivedi-portrait.jpg', 174067, 'image/jpeg', 'Pandit Puneet Dwivedi Vedic Meditation with Sacred Rudraksha', 'profile'),
      ('puneet-dwivedi-havan.jpg', 'puneet-dwivedi-havan.jpg', '/images/puneet-dwivedi-havan.jpg', 255562, 'image/jpeg', 'Pandit Puneet Dwivedi Performing Vedic Havan Yagya Ritual', 'services'),
      ('cosmic-galaxy-universe.jpg', 'cosmic-galaxy-universe.jpg', '/images/cosmic-galaxy-universe.jpg', 988649, 'image/jpeg', 'Deep Space Cosmic Galaxy Universe with Golden Stardust', 'general'),
      ('cosmic-celestial-deepspace.jpg', 'cosmic-celestial-deepspace.jpg', '/images/cosmic-celestial-deepspace.jpg', 943810, 'image/jpeg', 'Expansive Celestial Universe Nebula Deep Space', 'general')
    ON DUPLICATE KEY UPDATE alt_text = VALUES(alt_text)
  `);
  console.log('✅ Media library updated with all real photos and cosmic galaxy images');

  await conn.end();
}

updateDb().catch(console.error);
