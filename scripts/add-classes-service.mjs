import mysql from 'mysql2/promise';

async function addService() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'astro',
  });

  console.log('Connected to MySQL DB astro...');

  // Check if service already exists
  const [rows] = await db.query('SELECT id FROM services WHERE slug = ?', ['astrology-education-classes']);
  if (rows.length > 0) {
    console.log('Service already exists with ID:', rows[0].id);
    await db.query(`
      UPDATE services SET 
        title = 'Vedic Astrology & Scripture Masterclasses',
        short_description = 'Learn Kundli reading, 9 Navagrahas, 12 Rashis, 27 Nakshatras, 12 Bhavas, and Bhagavad Gita wisdom. Professional online classes. Limited seats.',
        description = 'Pandit Puneet Dwivedi teaches comprehensive Vedic Astrology and Hindu spiritual scriptures to dedicated students worldwide. Master Kundli reading, planetary dasha cycles, 12 houses (Bhavas), 9 Navagrahas, 27 Nakshatras, alongside deep wisdom from Shrimad Bhagavad Gita (Karma, Bhakti & Jnana Yoga), Bhagavata Purana, Shiva Purana, and Vishnu Purana. Conducted professionally online in small batches with personal attention. Hurry up – seats are strictly limited per cohort. Inquire for fee structure and batch timings.',
        consultation_method = 'Professional Online Classes (Live Interactive)',
        price = 0,
        duration_minutes = 60,
        is_active = 1,
        is_featured = 1,
        display_order = 10,
        image_url = '/images/puneet-dwivedi-meditation.jpg'
      WHERE id = ?
    `, [rows[0].id]);
    console.log('Service updated successfully.');
  } else {
    const [res] = await db.query(`
      INSERT INTO services (
        title, slug, short_description, description, price, currency, duration_minutes,
        consultation_method, icon, image_url, is_active, is_featured, display_order
      ) VALUES (
        'Vedic Astrology & Scripture Masterclasses',
        'astrology-education-classes',
        'Learn Kundli reading, 9 Navagrahas, 12 Rashis, 27 Nakshatras, 12 Bhavas, and Bhagavad Gita wisdom. Professional online classes. Limited seats.',
        'Pandit Puneet Dwivedi teaches comprehensive Vedic Astrology and Hindu spiritual scriptures to dedicated students worldwide. Master Kundli reading, planetary dasha cycles, 12 houses (Bhavas), 9 Navagrahas, 27 Nakshatras, alongside deep wisdom from Shrimad Bhagavad Gita (Karma, Bhakti & Jnana Yoga), Bhagavata Purana, Shiva Purana, and Vishnu Purana. Conducted professionally online in small batches with personal attention. Hurry up – seats are strictly limited per cohort. Inquire for fee structure and batch timings.',
        0, 'INR', 60,
        'Professional Online Classes (Live Interactive)',
        'Sparkles',
        '/images/puneet-dwivedi-meditation.jpg',
        1, 1, 10
      )
    `);
    console.log('Service inserted successfully with ID:', res.insertId);
  }

  await db.end();
  console.log('Done.');
}

addService().catch(console.error);
