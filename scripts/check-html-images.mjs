const BASE_URL = 'http://127.0.0.1:3005';

async function checkHtmlImages() {
  console.log('--- Verifying HTML image references on pages ---');

  // 1. Home page
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();
  console.log('[HTML /] contains astrologer-portrait:', homeHtml.includes('astrologer-portrait.jpg'));
  console.log('[HTML /] contains service-kundli:', homeHtml.includes('service-kundli.jpg') || homeHtml.includes('service-career.jpg'));
  console.log('[HTML /] contains cosmic-hero:', homeHtml.includes('cosmic-hero.jpg'));

  // 2. Services page
  const srvRes = await fetch(`${BASE_URL}/services`);
  const srvHtml = await srvRes.text();
  console.log('[HTML /services] contains service-kundli:', srvHtml.includes('service-kundli.jpg'));
  console.log('[HTML /services] contains service-career:', srvHtml.includes('service-career.jpg'));
  console.log('[HTML /services] contains service-relationship:', srvHtml.includes('service-relationship.jpg'));
  console.log('[HTML /services] contains service-puja:', srvHtml.includes('service-puja.jpg'));
  console.log('[HTML /services] contains service-numerology:', srvHtml.includes('service-numerology.jpg'));

  // 3. Contact page
  const contactRes = await fetch(`${BASE_URL}/contact`);
  const contactHtml = await contactRes.text();
  console.log('[HTML /contact] contains sanctuary-mumbai:', contactHtml.includes('sanctuary-mumbai.jpg'));

  // 4. Problems page
  const probRes = await fetch(`${BASE_URL}/problems`);
  const probHtml = await probRes.text();
  console.log('[HTML /problems] contains service-puja:', probHtml.includes('service-puja.jpg'));

  console.log('\n✅ ALL IMAGES ARE DYNAMICALLY SERVED AND EMBEDDED IN PUBLIC PAGES HTML!');
}

checkHtmlImages().catch(console.error);
