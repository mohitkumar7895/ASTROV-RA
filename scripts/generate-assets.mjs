import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, '..', 'public', 'images');

// 1. Astrologer Portrait SVG
const portraitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D24"/>
      <stop offset="50%" stop-color="#111B3A"/>
      <stop offset="100%" stop-color="#060919"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E4B8"/>
      <stop offset="50%" stop-color="#D6B56D"/>
      <stop offset="100%" stop-color="#9C782E"/>
    </linearGradient>
    <radialGradient id="aura" cx="50%" cy="38%" r="40%">
      <stop offset="0%" stop-color="#D6B56D" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#D6B56D" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#bgGrad)"/>
  
  <!-- Outer Gold Border -->
  <rect x="25" y="25" width="750" height="950" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.6"/>
  <rect x="35" y="35" width="730" height="930" rx="12" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="6,6" stroke-opacity="0.3"/>

  <!-- Golden Aura & Sacred Mandala Center -->
  <circle cx="400" cy="380" r="300" fill="url(#aura)"/>
  <circle cx="400" cy="380" r="220" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.4"/>
  <circle cx="400" cy="380" r="160" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="4,8" stroke-opacity="0.5"/>
  <circle cx="400" cy="380" r="100" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.3"/>

  <!-- Astrological 12-Ray Wheel -->
  <g stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.25">
    <line x1="400" y1="160" x2="400" y2="600"/>
    <line x1="180" y1="380" x2="620" y2="380"/>
    <line x1="244" y1="224" x2="556" y2="536"/>
    <line x1="244" y1="536" x2="556" y2="224"/>
  </g>

  <!-- Astrologer Stylized Silhouette / Icon -->
  <g transform="translate(400, 360)">
    <!-- Vedic Halo / Tilak -->
    <path d="M-6 -75 Q0 -95 6 -75 Q0 -55 -6 -75" fill="url(#goldGrad)" />
    <!-- Head -->
    <circle cx="0" cy="-35" r="55" fill="#15234A" stroke="url(#goldGrad)" stroke-width="2"/>
    <!-- Sholka / Aura Radiance -->
    <circle cx="0" cy="-35" r="72" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="2,6"/>
    <!-- Torso / Vedic Attire -->
    <path d="M-120 180 C-100 45, -60 25, 0 25 C60 25, 100 45, 120 180 Z" fill="#15234A" stroke="url(#goldGrad)" stroke-width="2"/>
    <!-- Traditional Stole / Angavastram -->
    <path d="M-50 25 Q-10 110 -65 180" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M10 25 Q25 90 60 180" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="3,3"/>
  </g>

  <!-- Astrologer Title Plaque -->
  <rect x="150" y="650" width="500" height="240" rx="12" fill="#0C1433" stroke="url(#goldGrad)" stroke-width="1.5"/>
  <rect x="160" y="660" width="480" height="220" rx="8" fill="none" stroke="url(#goldGrad)" stroke-width="0.5" stroke-dasharray="4,4"/>

  <!-- Brand & Name -->
  <text x="400" y="710" font-family="'Cinzel', serif" font-size="28" font-weight="700" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">PUNEET DWIVEDI</text>
  <text x="400" y="745" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" fill="#F5F0E6" text-anchor="middle" letter-spacing="3">MASTER VEDIC ASTROLOGER</text>
  <text x="400" y="780" font-family="'Inter', sans-serif" font-size="13" fill="#8F9CAE" text-anchor="middle">15+ Years Experience • 12,000+ Consultations</text>
  
  <line x1="280" y1="805" x2="520" y2="805" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.4"/>
  <text x="400" y="840" font-family="'Cinzel', serif" font-size="14" fill="#D6B56D" text-anchor="middle" letter-spacing="2">ASTROVÈRA OFFICIAL PORTRAIT</text>
  <text x="400" y="862" font-family="'Inter', sans-serif" font-size="11" fill="#64748B" text-anchor="middle">Mumbai, Maharashtra • Verified Vedic Practitioner</text>
</svg>`;

// 2. Astrologer About Graphic SVG
const aboutSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="900" height="1100">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D24"/>
      <stop offset="60%" stop-color="#111B3A"/>
      <stop offset="100%" stop-color="#0C1433"/>
    </linearGradient>
    <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E4B8"/>
      <stop offset="50%" stop-color="#D6B56D"/>
      <stop offset="100%" stop-color="#A48238"/>
    </linearGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#bgGrad2)"/>
  <rect x="30" y="30" width="840" height="1040" rx="16" fill="none" stroke="url(#gold2)" stroke-width="1.5" stroke-opacity="0.5"/>

  <!-- Celestial Astrolabe Wheel -->
  <g transform="translate(450, 420)">
    <circle cx="0" cy="0" r="280" fill="none" stroke="url(#gold2)" stroke-width="2" stroke-opacity="0.3"/>
    <circle cx="0" cy="0" r="240" fill="none" stroke="url(#gold2)" stroke-width="1" stroke-dasharray="6,6" stroke-opacity="0.4"/>
    <circle cx="0" cy="0" r="180" fill="#0C1433" stroke="url(#gold2)" stroke-width="1.5"/>

    <!-- Zodiac Constellation Nodes -->
    ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
      const rad = (deg * Math.PI) / 180;
      const x = Math.round(240 * Math.cos(rad));
      const y = Math.round(240 * Math.sin(rad));
      return `<circle cx="${x}" cy="${y}" r="4" fill="#D6B56D"/>`;
    }).join('\n    ')}

    <!-- Inner Jyotish Diamond Grid (North Indian Kundli Chart) -->
    <rect x="-110" y="-110" width="220" height="220" fill="none" stroke="url(#gold2)" stroke-width="1.5"/>
    <line x1="-110" y1="-110" x2="110" y2="110" stroke="url(#gold2)" stroke-width="1"/>
    <line x1="-110" y1="110" x2="110" y2="-110" stroke="url(#gold2)" stroke-width="1"/>
    <polygon points="0,-110 110,0 0,110 -110,0" fill="none" stroke="url(#gold2)" stroke-width="1.5"/>

    <!-- Central Symbol -->
    <text x="0" y="8" font-family="'Cinzel', serif" font-size="22" font-weight="700" fill="url(#gold2)" text-anchor="middle">ॐ</text>
  </g>

  <!-- Bio Plaque -->
  <rect x="100" y="780" width="700" height="240" rx="16" fill="#080D24" stroke="url(#gold2)" stroke-width="1"/>
  <text x="450" y="835" font-family="'Cinzel', serif" font-size="28" font-weight="700" fill="url(#gold2)" text-anchor="middle" letter-spacing="3">PANDIT PUNEET DWIVEDI</text>
  <text x="450" y="870" font-family="'Montserrat', sans-serif" font-size="14" fill="#F5F0E6" text-anchor="middle" letter-spacing="2">VEDIC JYOTISH &amp; LIFE COUNSELOR</text>
  <text x="450" y="905" font-family="'Inter', sans-serif" font-size="14" fill="#8F9CAE" text-anchor="middle">15+ Years of Dedicated Classical Practice • Mumbai, India</text>
  <text x="450" y="940" font-family="'Inter', sans-serif" font-size="13" fill="#D6B56D" text-anchor="middle">Parashari • Jaimini • Prashna Kundli • Graha Shanti Vidhan</text>
  <text x="450" y="980" font-family="'Inter', sans-serif" font-size="12" fill="#64748B" text-anchor="middle">Verified Official Astrologer Profile • Confidential &amp; Ethical Counsel</text>
</svg>`;

// 3. Cosmic Hero SVG
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="nebulaCenter" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1F2F66" stop-opacity="0.8"/>
      <stop offset="40%" stop-color="#111B3A" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#080D24" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="goldGlow" cx="50%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#D6B56D" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#D6B56D" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#nebulaCenter)"/>
  <rect width="1920" height="1080" fill="url(#goldGlow)"/>

  <!-- Constellations & Sacred Orbits -->
  <g stroke="#D6B56D" stroke-opacity="0.15" fill="none">
    <ellipse cx="960" cy="540" rx="700" ry="320" stroke-width="1.5" transform="rotate(-15 960 540)"/>
    <ellipse cx="960" cy="540" rx="850" ry="400" stroke-width="1" stroke-dasharray="4,8" transform="rotate(10 960 540)"/>
    <ellipse cx="960" cy="540" rx="500" ry="220" stroke-width="1.5" transform="rotate(-5 960 540)"/>
    <circle cx="960" cy="540" r="300" stroke-width="1" stroke-dasharray="8,8"/>
    <circle cx="960" cy="540" r="160" stroke-width="1.5"/>
  </g>

  <!-- Glowing Stars -->
  <g fill="#FFFFFF">
    <circle cx="200" cy="180" r="2" opacity="0.8"/>
    <circle cx="450" cy="120" r="1.5" opacity="0.6"/>
    <circle cx="820" cy="140" r="2.5" fill="#D6B56D" opacity="0.9"/>
    <circle cx="1200" cy="200" r="2" opacity="0.7"/>
    <circle cx="1600" cy="150" r="3" fill="#D6B56D" opacity="0.9"/>
    <circle cx="1780" cy="320" r="1.5" opacity="0.5"/>
    <circle cx="300" cy="750" r="2.5" fill="#D6B56D" opacity="0.8"/>
    <circle cx="700" cy="850" r="1.5" opacity="0.6"/>
    <circle cx="1300" cy="800" r="2" opacity="0.7"/>
    <circle cx="1650" cy="720" r="2" fill="#D6B56D" opacity="0.8"/>
    <circle cx="960" cy="920" r="3" fill="#D6B56D" opacity="0.9"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'astrologer-portrait.svg'), portraitSvg);
fs.writeFileSync(path.join(imgDir, 'astrologer-about.svg'), aboutSvg);
fs.writeFileSync(path.join(imgDir, 'cosmic-hero.svg'), heroSvg);

// Write .jpg files with SVG content so <img> or next/image loading .jpg loads smoothly
fs.writeFileSync(path.join(imgDir, 'astrologer-portrait.jpg'), portraitSvg);
fs.writeFileSync(path.join(imgDir, 'astrologer-about.jpg'), aboutSvg);
fs.writeFileSync(path.join(imgDir, 'cosmic-hero.jpg'), heroSvg);

console.log('✅ Generated luxury placeholder images in public/images/');
