import mysql from 'mysql2/promise';

async function addPalmistry() {
  console.log('--- Adding Astro-Palmistry Service & Question ---');
  const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'astro',
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL successfully.');

    // 1. Insert Service 10
    const [existingService] = await connection.query(
      'SELECT id FROM services WHERE slug = ?',
      ['astro-palmistry-hand-reading']
    );

    let serviceId = 10;
    if (existingService.length === 0) {
      const [res] = await connection.query(
        `INSERT INTO services 
          (id, slug, title, short_description, description, icon, image_url, price, currency, duration_minutes, consultation_method, display_order, is_active, is_featured)
         VALUES 
          (10, 'astro-palmistry-hand-reading', 'Astro-Palmistry & Hand Reading (Hastarekha)',
           'Discover your destiny, lifespan, career, wealth, and relationship lines through classical Vedic Hastarekha Shastra.',
           'Pandit Puneet Dwivedi evaluates the sacred lines, mounts (Parvatas), signs, and planetary markings of your palms. Astro-Palmistry (Hastarekha Shastra) acts as a living birth chart on your hands, offering invaluable life foresight even without accurate birth time. Gain deep clarity on career lines, Sun line, heart line, life vitality, and marriage lines.',
           'Hand', '/images/service-kundli.jpg', 2100.00, 'INR', 45, 'Hand Photo Analysis & Live Video/Audio Call', 5, 1, 1)
         ON DUPLICATE KEY UPDATE title = VALUES(title), price = VALUES(price)`
      );
      console.log('Inserted Astro-Palmistry Service with ID 10');
    } else {
      serviceId = existingService[0].id;
      console.log('Astro-Palmistry Service already exists with ID', serviceId);
    }

    // 2. Insert Question 13
    const [existingQuestion] = await connection.query(
      'SELECT id FROM problem_questions WHERE question LIKE ?',
      ['%showing your hand%']
    );

    if (existingQuestion.length === 0) {
      await connection.query(
        `INSERT INTO problem_questions
          (id, category_id, service_id, question, description, inquiry_btn_label, display_order, is_active)
         VALUES
          (13, 3, ?, 'Want to know what your future is just by showing your hand ?',
           'Decode your life path, destiny lines, wealth mounts, and relationship future through sacred Vedic Astro-Palmistry by simply sharing clear photos of your palms.',
           'Inquiry', 5, 1)
         ON DUPLICATE KEY UPDATE question = VALUES(question)`,
        [serviceId]
      );
      console.log('Inserted Problem Question 13 for Palmistry');
    } else {
      console.log('Problem question already exists with ID', existingQuestion[0].id);
    }

    await connection.end();
    console.log('✅ Finished adding palmistry feature.');
  } catch (err) {
    console.error('Error running script:', err.message);
  }
}

addPalmistry();
