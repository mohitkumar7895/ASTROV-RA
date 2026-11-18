async function check() {
  const res = await fetch('http://127.0.0.1:3005/');
  const html = await res.text();
  console.log('Has AV logo:', html.includes('AV'));
  console.log('Has ASTROVERA title:', html.includes('ASTROVÈRA'));
  console.log('Has Home link:', html.includes('href="/"'));
  console.log('Has Problems link:', html.includes('href="/problems"'));
  console.log('Has Phone:', html.includes('96306 20240'));
  console.log('Has Book Consultation button:', html.includes('Book Consultation'));
}
check().catch(console.error);
