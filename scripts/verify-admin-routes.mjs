const BASE_URL = 'http://127.0.0.1:3005';

async function testAdmin() {
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@astrovera.com',
      password: 'Admin@Astro2026!',
    }),
  });
  const setCookie = loginRes.headers.get('set-cookie');
  const cookieHeader = setCookie ? setCookie.split(';')[0] : '';

  const adminRoutes = [
    '/admin/login',
    '/admin/dashboard',
    '/admin/bookings',
    '/admin/content',
    '/admin/services',
    '/admin/problems',
    '/admin/testimonials',
    '/admin/media',
    '/admin/seo',
    '/admin/settings',
    '/admin/users',
  ];

  console.log('\n--- Testing All Admin Routes with Auth Cookie ---');
  for (const r of adminRoutes) {
    const res = await fetch(`${BASE_URL}${r}`, {
      headers: { Cookie: cookieHeader },
    });
    console.log(`[ADMIN] ${r} => Status: ${res.status}`);
    if (res.status !== 200) {
      throw new Error(`Admin route ${r} failed with status ${res.status}`);
    }
  }

  console.log('✅ ALL 11 ADMIN ROUTES RETURNED 200 OK!');
}

testAdmin().catch(console.error);
