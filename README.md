# ASTROVÈRA – Luxury Vedic Astrology Platform
> **Brand Concept: Luxury Meets Spirituality.**

ASTROVÈRA is a complete, production-ready luxury astrology web platform featuring an international-grade public website and an advanced administrative panel and CMS. Guided by Master Vedic Astrologer **Puneet Dwivedi**, ASTROVÈRA blends classical Parashari Jyotish and mathematical planetary calculations with conscious, modern life strategy.

---

## 1. Business & Brand Overview

- **Brand Name**: ASTROVÈRA
- **Astrologer**: Puneet Dwivedi
- **Phone / WhatsApp**: [+91 96306 20240](tel:+919630620240)
- **Email**: contact@astrovera.com
- **Sanctuary Address**: Mira Road East, Shanti Garden, Near Cluster 3, Mumbai, Maharashtra – 401107.
- **Operating Hours**: Monday – Sunday: 10:00 AM – 08:30 PM (IST)
- **Spiritual Motto**: *ॐ नमः शिवाय • OM NAMAH SHIVAYA*

---

## 2. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **Form Management & Validation**: React Hook Form, Zod
- **UI Notifications**: Sonner
- **Charts & Data Visualizations**: Recharts
- **Database Engine**: MySQL 8 / MariaDB (Database Name: `astro`)
- **Database Driver**: `mysql2/promise` with connection pooling and prepared statements *(Strictly no Prisma / no Drizzle ORM)*
- **Authentication**: Custom HTTP-only secure cookie session, JWT tokens via `jose`, password hashing via `bcryptjs`

---

## 3. Strict 6 Public Pages

The public website consists of **EXACTLY SIX MAIN PAGES**:

1. **Home (`/`)**:
   - Celestial hero section with astrologer portrait and headline: *"Discover Your Destiny. Understand Your Universe."*
   - Hindi tagline: *"Apne grahon ki sthiti, jeevan ke lakshyon aur bhavishya ki sambhavnayon ko samajhne ke liye personalised astrological guidance prapt karein."*
   - Astrologer about preview (15+ Years, 12,000+ charts analyzed).
   - Featured astrology services with honorariums and direct booking action.
   - The ASTROVÈRA Difference (Vedic precision, zero fear-mongering, absolute confidentiality).
   - Three genuine client testimonials.
   - Problems We Help With category previews.
   - Sacred spiritual CTA banner (*OM NAMAH SHIVAYA*).

2. **Problems We Help With (`/problems`)**:
   - **CAREER**: Stream selection after 10th/12th, business capabilities, job breakthroughs, JEE & NEET prospects.
   - **LOVE LIFE**: Marriage timing, relationship trust, marital friction, child conception blessings.
   - **LIFE PROBLEMS**: Financial stagnation & debt remedies, yearly wealth & health shifts, salary increments, family fulfillment.
   - Every question features an **Inquiry button** that opens the booking form with the question auto-selected, plus direct WhatsApp enquiry.
   - Information banner for Express Chat, Puja & Shanti Vidhan rituals.
   - Ethical guidance notice: zero false claims or unverified outcome guarantees.

3. **About Astrologer (`/about`)**:
   - Official portrait of Pandit Puneet Dwivedi.
   - Professional biography, 15+ years classical lineage in Mumbai.
   - Dynamic qualifications and specialisations stored in MySQL.
   - Personal journey and astrological philosophy: *"Planets do not dictate your fate; they indicate the karmic terrain you chose to navigate."*
   - Professional ethics and 100% medical-grade confidentiality pledge.

4. **Astrology Services (`/services`)**:
   - Dynamic service offerings (Birth Chart Analysis, Career & Business Blueprint, Marriage & Relationship Harmony, Annual Horoscope, Numerology, 1-on-1 Personal Video Session, Express Chat, Puja & Shanti Vidhan).
   - Displays duration, pricing, and consultation methods (Video / Audio / In-Person).
   - 4-Step Consultation Process: *Submit Birth Details → Mathematical Kundli Analysis → Private 1-on-1 Session → Remedies & Auspicious Timing*.

5. **Testimonials (`/testimonials`)**:
   - Real, verified client feedback from Mumbai and worldwide.
   - Genuine 5-star ratings, locations, and optional video testimonial embeds.
   - Moderation gate: only admin-approved and published reviews appear publicly.

6. **Contact & Booking (`/contact`)**:
   - Complete booking form with Kundli calculation inputs (Date of Birth, Birth Time, Birth Place, Service, Preferred Slot, Message).
   - Generates unique reference code (e.g. `AST-xxxx-xxxx`) stored in MySQL.
   - Direct call and WhatsApp buttons to `+91 96306 20240`.
   - Mumbai office address and Google Maps integration.

---

## 4. Advanced Admin Dashboard & CMS

Admin routes are secured under `/admin`:

- **`/admin/login`**: Secure authentication with password hashing and session generation.
- **`/admin/dashboard`**:
  - Live metric cards (Total enquiries, new enquiries, pending, confirmed, active services, testimonials).
  - Monthly Enquiry Trends (Recharts AreaChart).
  - Status Distribution (Recharts PieChart).
  - Service Popularity (Recharts BarChart).
  - Recent enquiries table with status updates and WhatsApp client link.
- **`/admin/content` (CMS)**:
  - Homepage Hero manager (Headlines, Hindi tagline, CTA labels and URLs, astrologer portrait image URL).
  - Astrologer Profile & Bio manager (Name, title, experience count, qualifications line-by-line, philosophy, ethics pledge).
  - Page Content Sections (Why Choose Us, Spiritual Mantra CTA, Ethics).
- **`/admin/services`**: Full CRUD for astrology services, price, duration, consultation method, active toggle, homepage feature toggle.
- **`/admin/problems`**: Category CRUD and question CRUD, linked service association, and inquiry button label management.
- **`/admin/testimonials`**: Review approvals, publishing toggle, homepage feature toggle, star ratings, and video URL management.
- **`/admin/bookings`**:
  - Full enquiry management with search (name, phone, booking ID), status filter, service filter, and date filters.
  - Status transitions: *New, Contacted, Pending, Confirmed, Completed, Cancelled*.
  - Full booking detail modal with Kundli birth details and client message.
  - Astrologer internal private notes history.
  - 1-click WhatsApp client contact and Click-to-Call.
  - CSV export.
- **`/admin/media`**: Central media library for image uploads, file previews, copy URL, and deletion.
- **`/admin/seo`**: Per-page SEO title, meta description, focus keywords, canonical URL, Open Graph title, description, and image.
- **`/admin/settings`**: Phone numbers, WhatsApp, email, Mumbai address, Google Maps URL, announcement bar text & toggle, floating WhatsApp button toggle, and maintenance mode.
- **`/admin/users`**: Administrative user management with role-based access (*Super Admin, Content Manager, Booking Manager*), active status toggle, and password resets.

---

## 5. Default Super Admin Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@astrovera.com`
- **Password**: `Admin@Astro2026!`

*(You can update this password or create additional administrators from `/admin/users`)*

---

## 6. MySQL Database Setup

1. Make sure MySQL is running on `127.0.0.1:3306`.
2. Configure `.env.local` with your MySQL credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=astro

   AUTH_SECRET=astrovèra_super_secure_jwt_token_secret_key_luxury_cosmic_2026
   APP_URL=http://localhost:3000
   ```
3. Initialize the database schema and seed data:
   ```bash
   npm run db:init
   ```
   This automatically creates the `astro` database and all **19 relational tables**:
   1. `admins`
   2. `admin_sessions`
   3. `roles`
   4. `permissions`
   5. `role_permissions`
   6. `website_settings`
   7. `pages_content`
   8. `hero_sections`
   9. `astrologer_profile`
   10. `services`
   11. `problem_categories`
   12. `problem_questions`
   13. `testimonials`
   14. `enquiries`
   15. `enquiry_notes`
   16. `media_library`
   17. `seo_metadata`
   18. `social_links`
   19. `activity_logs`

---

## 7. Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Start
```bash
npm run build
npm start
```

---

## 8. Security & Ethical Standards

- **Prepared Statements**: All database operations use parameterized queries through `mysql2/promise` to prevent SQL injection.
- **HTTP-Only Cookies**: Administrative session tokens are stored in secure, HTTP-only cookies with SameSite lax protection.
- **Password Protection**: Passwords hashed using `bcryptjs` with salt rounds.
- **Zero Fear-Mongering**: In accordance with classical Vedic integrity, ASTROVÈRA does not make superstitious guarantees regarding medical, relationship, or financial lottery outcomes. All consultations are strictly confidential.
