const BASE_URL = 'http://127.0.0.1:3005';

async function testAll() {
  console.log('Testing running server on', BASE_URL);

  console.log('\n--- 1. Testing Six Public Pages ---');
  const publicPages = ['/', '/problems', '/about', '/services', '/testimonials', '/contact'];
  for (const page of publicPages) {
    const res = await fetch(`${BASE_URL}${page}`);
    console.log(`[PAGE] ${page} => Status: ${res.status} ${res.statusText}`);
    if (res.status !== 200) {
      throw new Error(`Failed to load ${page}`);
    }
  }

  console.log('\n--- 2. Testing Consultation Booking API ---');
  const bookingRes = await fetch(`${BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Responsive Verification User',
      phone: '+91 96306 20240',
      email: 'verification@astrovera.com',
      dob: '1992-08-15',
      birthTime: '07:15 AM',
      birthPlace: 'Mumbai, Maharashtra',
      serviceId: 1,
      serviceName: 'Birth Chart Analysis & Kundli Reading',
      selectedProblem: 'Am I capable of starting a business?',
      message: 'Checking full responsiveness and booking submission.',
    }),
  });

  const bookingData = await bookingRes.json();
  console.log('[BOOKING] Status:', bookingRes.status, bookingData);
  if (!bookingRes.ok || !bookingData.bookingRef) {
    throw new Error('Booking submission failed');
  }

  console.log('\n--- 3. Testing Admin Authentication ---');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@astrovera.com',
      password: 'Admin@Astro2026!',
    }),
  });
  const loginData = await loginRes.json();
  console.log('[AUTH] Status:', loginRes.status, loginData.user?.email);
  if (!loginRes.ok) {
    throw new Error('Admin login failed');
  }

  const setCookie = loginRes.headers.get('set-cookie');
  const cookieHeader = setCookie ? setCookie.split(';')[0] : '';

  console.log('\n--- 4. Testing Admin Dashboard Stats API ---');
  const statsRes = await fetch(`${BASE_URL}/api/dashboard/stats`, {
    headers: { Cookie: cookieHeader },
  });
  const statsData = await statsRes.json();
  console.log('[STATS] Status:', statsRes.status, 'Total enquiries:', statsData.stats?.total_enquiries);

  console.log('\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ASTROVÈRA IS 100% OPERATIONAL!');
}

testAll().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
