import { spawn } from 'child_process';
import http from 'http';

const PORT = 3005;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForReady(url, maxRetries = 25) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch (e) {
      await sleep(1000);
    }
  }
  return false;
}

async function runTests() {
  console.log('🚀 Starting ASTROVÈRA Next.js Server on port', PORT);
  const server = spawn('npx.cmd', ['next', 'start', '-p', String(PORT)], {
    stdio: 'ignore',
    shell: true,
  });

  // Wait for server to spin up and be ready
  const isReady = await waitForReady(`${BASE_URL}/`);
  if (!isReady) {
    throw new Error('Server did not start in time on port ' + PORT);
  }
  console.log('✅ Server is alive and responding on', BASE_URL);

  try {
    console.log('\n--- 1. Testing Six Public Pages ---');
    const publicPages = ['/', '/problems', '/about', '/services', '/testimonials', '/contact'];
    for (const page of publicPages) {
      const res = await fetch(`${BASE_URL}${page}`);
      console.log(`[PAGE] ${page} => Status: ${res.status} ${res.statusText}`);
      if (res.status !== 200) {
        throw new Error(`Failed to load public page: ${page}`);
      }
    }

    console.log('\n--- 2. Testing Consultation Booking Submission ---');
    const bookingRes = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Rohit Sharma',
        phone: '+91 99988 77766',
        email: 'rohit@example.com',
        dob: '1987-04-30',
        birthTime: '11:45 AM',
        birthPlace: 'Nagpur, MH',
        serviceName: 'Career & Business Astrology',
        preferredDate: '2026-11-25',
        selectedProblem: 'Am I capable of starting a business?',
        message: 'Looking for planetary guidance regarding venture launch.',
      }),
    });
    const bookingData = await bookingRes.json();
    console.log('Booking API Response:', bookingData);
    if (!bookingData.bookingRef) {
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
    console.log('Login Response:', loginData);
    if (!loginData.success) {
      throw new Error('Admin login failed');
    }

    const setCookie = loginRes.headers.get('set-cookie');
    console.log('Auth Cookie Header Received:', Boolean(setCookie));

    // Extract cookie value
    const cookie = setCookie ? setCookie.split(';')[0] : '';

    console.log('\n--- 4. Testing Authenticated /api/auth/me ---');
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: cookie },
    });
    const meData = await meRes.json();
    console.log('Admin Session Identity:', meData);

    console.log('\n--- 5. Testing Authenticated Dashboard Stats ---');
    const statsRes = await fetch(`${BASE_URL}/api/dashboard/stats`, {
      headers: { Cookie: cookie },
    });
    const statsData = await statsRes.json();
    console.log('Dashboard Real MySQL Stats:');
    console.log(' - Total Enquiries:', statsData.stats.totalEnquiries);
    console.log(' - New Enquiries:', statsData.stats.newEnquiries);
    console.log(' - Active Services:', statsData.stats.activeServices);
    console.log(' - Published Testimonials:', statsData.stats.publishedTestimonials);
    console.log(' - Monthly Trends Count:', statsData.stats.monthlyTrends.length);

    console.log('\n--- 6. Testing CMS Hero Section API ---');
    const heroRes = await fetch(`${BASE_URL}/api/content/hero?pageSlug=home`);
    const heroData = await heroRes.json();
    console.log('Hero Headline from MySQL:', heroData.hero.headline);

    console.log('\n🌟 ALL SYSTEM CHECKS PASSED WITH 100% SUCCESS! 🌟');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exitCode = 1;
  } finally {
    server.kill();
    // Kill child processes
    spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { stdio: 'ignore' });
  }
}

runTests();
