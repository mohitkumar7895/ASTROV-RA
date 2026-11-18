const BASE_URL = 'http://127.0.0.1:3005';

const images = [
  '/images/astrologer-portrait.jpg',
  '/images/astrologer-about.jpg',
  '/images/cosmic-hero.jpg',
  '/images/sanctuary-mumbai.jpg',
  '/images/service-kundli.jpg',
  '/images/service-career.jpg',
  '/images/service-relationship.jpg',
  '/images/service-puja.jpg',
  '/images/service-numerology.jpg',
];

async function verifyImages() {
  console.log('--- Verifying Image Assets over HTTP ---');
  for (const img of images) {
    const res = await fetch(`${BASE_URL}${img}`);
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length');
    console.log(`[IMG] ${img} => Status: ${res.status}, Type: ${contentType}, Size: ${contentLength} bytes`);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch image: ${img}`);
    }
  }
  console.log('\n✅ ALL 9 LUXURY AI IMAGES ARE ACCESSIBLE OVER HTTP (STATUS 200)!');
}

verifyImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
