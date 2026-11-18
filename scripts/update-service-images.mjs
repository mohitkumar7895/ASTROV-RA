import mysql from 'mysql2/promise';

async function updateServiceImages() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'astro',
  });

  const mappings = [
    { slug: 'birth-chart-analysis', image: '/images/service-kundli.jpg' },
    { slug: 'kundli-reading', image: '/images/service-kundli.jpg' },
    { slug: 'career-astrology', image: '/images/service-career.jpg' },
    { slug: 'marriage-relationship', image: '/images/service-relationship.jpg' },
    { slug: 'horoscope-analysis', image: '/images/service-career.jpg' },
    { slug: 'numerology', image: '/images/service-numerology.jpg' },
    { slug: 'numerology-reading', image: '/images/service-numerology.jpg' },
    { slug: 'personal-consultation', image: '/images/sanctuary-mumbai.jpg' },
    { slug: 'chat-consultation', image: '/images/service-kundli.jpg' },
    { slug: 'puja-shanti-vidhan', image: '/images/service-puja.jpg' },
  ];

  for (const item of mappings) {
    await conn.query('UPDATE services SET image_url = ? WHERE slug = ?', [item.image, item.slug]);
  }

  const [rows] = await conn.query('SELECT id, slug, title, image_url FROM services');
  console.log('Updated services with new luxury images:', rows);

  await conn.end();
}

updateServiceImages().catch(console.error);
