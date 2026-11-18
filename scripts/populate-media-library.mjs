import mysql from 'mysql2/promise';

async function populateMedia() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'astro',
  });

  const media = [
    {
      filename: 'astrologer-portrait.jpg',
      original: 'Pandit Puneet Dwivedi - Portrait',
      path: '/images/astrologer-portrait.jpg',
      type: 'image/jpeg',
      alt: 'Pandit Puneet Dwivedi Master Vedic Astrologer Portrait',
      category: 'astrologer',
    },
    {
      filename: 'astrologer-about.jpg',
      original: 'Pandit Puneet Dwivedi - Study Room',
      path: '/images/astrologer-about.jpg',
      type: 'image/jpeg',
      alt: 'Pandit Puneet Dwivedi Examining Janam Kundli',
      category: 'astrologer',
    },
    {
      filename: 'cosmic-hero.jpg',
      original: 'Deep Space Nebula & Golden Constellations',
      path: '/images/cosmic-hero.jpg',
      type: 'image/jpeg',
      alt: 'Cosmic Nebula with Golden Constellation Star Map',
      category: 'hero',
    },
    {
      filename: 'sanctuary-mumbai.jpg',
      original: 'Mumbai Consultation Sanctuary',
      path: '/images/sanctuary-mumbai.jpg',
      type: 'image/jpeg',
      alt: 'ASTROVÈRA Consultation Sanctuary Mira Road East Mumbai',
      category: 'location',
    },
    {
      filename: 'service-kundli.jpg',
      original: 'Vedic Kundli Birth Chart',
      path: '/images/service-kundli.jpg',
      type: 'image/jpeg',
      alt: 'Handcrafted Vedic Kundli with Crystals and Gold Leaf',
      category: 'services',
    },
    {
      filename: 'service-career.jpg',
      original: 'Career Astrolabe & Compass',
      path: '/images/service-career.jpg',
      type: 'image/jpeg',
      alt: 'Antique Brass Astrolabe and Career Celestial Navigation',
      category: 'services',
    },
    {
      filename: 'service-relationship.jpg',
      original: 'Cosmic Relationship Harmony Rings',
      path: '/images/service-relationship.jpg',
      type: 'image/jpeg',
      alt: 'Intertwined Celestial Rings for Marriage and Synastry',
      category: 'services',
    },
    {
      filename: 'service-puja.jpg',
      original: 'Sacred Vedic Havan & Puja Ritual',
      path: '/images/service-puja.jpg',
      type: 'image/jpeg',
      alt: 'Vedic Havan Kund with Sacred Fire and Marigolds',
      category: 'services',
    },
    {
      filename: 'service-numerology.jpg',
      original: 'Sacred Numerology & Sri Yantra',
      path: '/images/service-numerology.jpg',
      type: 'image/jpeg',
      alt: 'Golden 3D Sri Yantra and Numerology Glyphs',
      category: 'services',
    },
  ];

  for (const m of media) {
    await conn.query(
      `INSERT INTO media_library (filename, original_name, file_path, file_size, mime_type, alt_text, category, uploaded_by)
       VALUES (?, ?, ?, 900000, ?, ?, ?, 1)`,
      [m.filename, m.original, m.path, m.type, m.alt, m.category]
    );
  }

  const [count] = await conn.query('SELECT COUNT(*) as total FROM media_library');
  console.log('Total items in Media Library:', count[0].total);

  await conn.end();
}

populateMedia().catch(console.error);
