import { query, execute } from './db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import {
  WebsiteSetting,
  HeroSection,
  AstrologerProfile,
  AstrologyService,
  ProblemCategory,
  ProblemQuestion,
  Testimonial,
  Enquiry,
  EnquiryNote,
  MediaItem,
  SeoMetadata,
  SocialLink,
  ActivityLog,
  AdminUser,
} from '@/types';

// ==========================================
// 1. SETTINGS QUERIES
// ==========================================
export async function getWebsiteSettings(): Promise<Record<string, string>> {
  const rows = await query<RowDataPacket[]>('SELECT setting_key, setting_value FROM website_settings');
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.setting_key] = row.setting_value || '';
  }
  return settings;
}

export async function updateWebsiteSetting(key: string, value: string, category = 'general'): Promise<void> {
  await execute(
    `INSERT INTO website_settings (setting_key, setting_value, category)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), category = VALUES(category)`,
    [key, value, category]
  );
}

// ==========================================
// 2. HERO QUERIES
// ==========================================
export async function getHeroSection(pageSlug = 'home'): Promise<HeroSection | null> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM hero_sections WHERE page_slug = ? LIMIT 1',
    [pageSlug]
  );
  if (!rows || rows.length === 0) return null;
  return rows[0] as HeroSection;
}

export async function updateHeroSection(pageSlug: string, data: Partial<HeroSection>): Promise<void> {
  await execute(
    `UPDATE hero_sections SET
      headline = COALESCE(?, headline),
      subheadline = COALESCE(?, subheadline),
      hindi_tagline = COALESCE(?, hindi_tagline),
      description = COALESCE(?, description),
      badge_text = COALESCE(?, badge_text),
      primary_cta_label = COALESCE(?, primary_cta_label),
      primary_cta_url = COALESCE(?, primary_cta_url),
      primary_cta_enabled = COALESCE(?, primary_cta_enabled),
      secondary_cta_label = COALESCE(?, secondary_cta_label),
      secondary_cta_url = COALESCE(?, secondary_cta_url),
      secondary_cta_enabled = COALESCE(?, secondary_cta_enabled),
      hero_image_url = COALESCE(?, hero_image_url),
      astrologer_image_url = COALESCE(?, astrologer_image_url)
     WHERE page_slug = ?`,
    [
      data.headline,
      data.subheadline,
      data.hindi_tagline,
      data.description,
      data.badge_text,
      data.primary_cta_label,
      data.primary_cta_url,
      data.primary_cta_enabled !== undefined ? (data.primary_cta_enabled ? 1 : 0) : null,
      data.secondary_cta_label,
      data.secondary_cta_url,
      data.secondary_cta_enabled !== undefined ? (data.secondary_cta_enabled ? 1 : 0) : null,
      data.hero_image_url,
      data.astrologer_image_url,
      pageSlug,
    ]
  );
}

// ==========================================
// 3. ASTROLOGER PROFILE
// ==========================================
export async function getAstrologerProfile(): Promise<AstrologerProfile | null> {
  const rows = await query<RowDataPacket[]>('SELECT * FROM astrologer_profile LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const p = rows[0];
  let qualifications: string[] = [];
  let specialisations: string[] = [];
  try {
    qualifications = typeof p.qualifications === 'string' ? JSON.parse(p.qualifications) : p.qualifications || [];
  } catch {}
  try {
    specialisations = typeof p.specialisations === 'string' ? JSON.parse(p.specialisations) : p.specialisations || [];
  } catch {}

  return {
    ...p,
    qualifications,
    specialisations,
  } as AstrologerProfile;
}

export async function updateAstrologerProfile(data: Partial<AstrologerProfile>): Promise<void> {
  const quals = Array.isArray(data.qualifications) ? JSON.stringify(data.qualifications) : data.qualifications;
  const specs = Array.isArray(data.specialisations) ? JSON.stringify(data.specialisations) : data.specialisations;

  await execute(
    `UPDATE astrologer_profile SET
      name = COALESCE(?, name),
      title = COALESCE(?, title),
      short_bio = COALESCE(?, short_bio),
      biography = COALESCE(?, biography),
      experience_years = COALESCE(?, experience_years),
      consultations_count = COALESCE(?, consultations_count),
      qualifications = COALESCE(?, qualifications),
      specialisations = COALESCE(?, specialisations),
      personal_journey = COALESCE(?, personal_journey),
      philosophy = COALESCE(?, philosophy),
      values = COALESCE(?, values),
      ethics_pledge = COALESCE(?, ethics_pledge),
      contact_number = COALESCE(?, contact_number),
      whatsapp_number = COALESCE(?, whatsapp_number),
      location = COALESCE(?, location),
      profile_image_url = COALESCE(?, profile_image_url),
      portrait_image_url = COALESCE(?, portrait_image_url)
     WHERE id = 1`,
    [
      data.name,
      data.title,
      data.short_bio,
      data.biography,
      data.experience_years,
      data.consultations_count,
      quals,
      specs,
      data.personal_journey,
      data.philosophy,
      data.values,
      data.ethics_pledge,
      data.contact_number,
      data.whatsapp_number,
      data.location,
      data.profile_image_url,
      data.portrait_image_url,
    ]
  );
}

// ==========================================
// 4. SERVICES
// ==========================================
export const VEDIC_CLASSES_SERVICE: AstrologyService = {
  id: 9,
  slug: 'astrology-education-classes',
  title: 'Vedic Astrology & Scripture Masterclasses',
  short_description: 'Learn Kundli reading, 9 Navagrahas, 12 Rashis, 27 Nakshatras, 12 Bhavas, and Bhagavad Gita wisdom. Professional online classes. Limited seats.',
  description: 'Pandit Puneet Dwivedi teaches comprehensive Vedic Astrology and Hindu spiritual scriptures to dedicated students worldwide. Master Kundli reading, planetary dasha cycles, 12 houses (Bhavas), 9 Navagrahas, 27 Nakshatras, alongside deep wisdom from Shrimad Bhagavad Gita (Karma, Bhakti & Jnana Yoga), Bhagavata Purana, Shiva Purana, and Vishnu Purana. Conducted professionally online in small batches with personal attention. Hurry up – seats are strictly limited per cohort. Inquire for fee structure and batch timings.',
  icon: 'Sparkles',
  image_url: '/images/puneet-dwivedi-meditation.jpg',
  price: 0,
  currency: 'INR',
  duration_minutes: 60,
  consultation_method: 'Professional Online Classes (Live Interactive)',
  display_order: 9,
  is_active: 1,
  is_featured: 1,
  created_at: '2026-11-19T10:44:02.000Z',
  updated_at: '2026-11-19T10:44:02.000Z',
};

export async function getActiveServices(): Promise<AstrologyService[]> {
  try {
    const rows = await query<RowDataPacket[]>(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC'
    );
    const list = rows as AstrologyService[];
    if (!list.some((s) => s.slug === 'astrology-education-classes')) {
      list.push(VEDIC_CLASSES_SERVICE);
    }
    return list;
  } catch (err) {
    console.error('Error in getActiveServices:', err);
    return [VEDIC_CLASSES_SERVICE];
  }
}

export async function getFeaturedServices(): Promise<AstrologyService[]> {
  try {
    const rows = await query<RowDataPacket[]>(
      'SELECT * FROM services WHERE is_active = 1 AND is_featured = 1 ORDER BY display_order ASC, id ASC'
    );
    const list = rows as AstrologyService[];
    if (!list.some((s) => s.slug === 'astrology-education-classes')) {
      list.push(VEDIC_CLASSES_SERVICE);
    }
    return list;
  } catch (err) {
    console.error('Error in getFeaturedServices:', err);
    return [VEDIC_CLASSES_SERVICE];
  }
}

export async function getAllServices(): Promise<AstrologyService[]> {
  try {
    const rows = await query<RowDataPacket[]>(
      'SELECT * FROM services ORDER BY display_order ASC, id ASC'
    );
    const list = rows as AstrologyService[];
    if (!list.some((s) => s.slug === 'astrology-education-classes')) {
      list.push(VEDIC_CLASSES_SERVICE);
    }
    return list;
  } catch (err) {
    console.error('Error in getAllServices:', err);
    return [VEDIC_CLASSES_SERVICE];
  }
}

export async function getServiceBySlug(slug: string): Promise<AstrologyService | null> {
  try {
    const rows = await query<RowDataPacket[]>(
      'SELECT * FROM services WHERE slug = ? LIMIT 1',
      [slug]
    );
    if (rows && rows.length > 0) return rows[0] as AstrologyService;
    if (slug === 'astrology-education-classes') return VEDIC_CLASSES_SERVICE;
    return null;
  } catch (err) {
    if (slug === 'astrology-education-classes') return VEDIC_CLASSES_SERVICE;
    return null;
  }
}

export async function createService(data: Omit<AstrologyService, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const res = await execute(
    `INSERT INTO services (slug, title, short_description, description, icon, image_url, price, currency, duration_minutes, consultation_method, display_order, is_active, is_featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.slug,
      data.title,
      data.short_description || null,
      data.description || null,
      data.icon || 'Sparkles',
      data.image_url || null,
      data.price || 0,
      data.currency || 'INR',
      data.duration_minutes || 45,
      data.consultation_method || 'Online Video / Voice Call',
      data.display_order || 0,
      data.is_active ? 1 : 0,
      data.is_featured ? 1 : 0,
    ]
  );
  return res.insertId;
}

export async function updateService(id: number, data: Partial<AstrologyService>): Promise<void> {
  await execute(
    `UPDATE services SET
      slug = COALESCE(?, slug),
      title = COALESCE(?, title),
      short_description = COALESCE(?, short_description),
      description = COALESCE(?, description),
      icon = COALESCE(?, icon),
      image_url = COALESCE(?, image_url),
      price = COALESCE(?, price),
      currency = COALESCE(?, currency),
      duration_minutes = COALESCE(?, duration_minutes),
      consultation_method = COALESCE(?, consultation_method),
      display_order = COALESCE(?, display_order),
      is_active = COALESCE(?, is_active),
      is_featured = COALESCE(?, is_featured)
     WHERE id = ?`,
    [
      data.slug,
      data.title,
      data.short_description,
      data.description,
      data.icon,
      data.image_url,
      data.price,
      data.currency,
      data.duration_minutes,
      data.consultation_method,
      data.display_order,
      data.is_active !== undefined ? (data.is_active ? 1 : 0) : null,
      data.is_featured !== undefined ? (data.is_featured ? 1 : 0) : null,
      id,
    ]
  );
}

export async function deleteService(id: number): Promise<void> {
  await execute('DELETE FROM services WHERE id = ?', [id]);
}

// ==========================================
// 5. PROBLEM CATEGORIES & QUESTIONS
// ==========================================
export async function getProblemCategoriesWithQuestions(): Promise<ProblemCategory[]> {
  const catRows = await query<RowDataPacket[]>(
    'SELECT * FROM problem_categories WHERE is_active = 1 ORDER BY display_order ASC, id ASC'
  );

  const questRows = await query<RowDataPacket[]>(
    `SELECT pq.*, s.title as service_title
     FROM problem_questions pq
     LEFT JOIN services s ON pq.service_id = s.id
     WHERE pq.is_active = 1
     ORDER BY pq.display_order ASC, pq.id ASC`
  );

  const categories: ProblemCategory[] = catRows.map((cat) => ({
    ...cat,
    questions: questRows.filter((q) => q.category_id === cat.id) as ProblemQuestion[],
  })) as ProblemCategory[];

  return categories;
}

export async function getAllProblemCategories(): Promise<ProblemCategory[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM problem_categories ORDER BY display_order ASC, id ASC'
  );
  return rows as ProblemCategory[];
}

export async function getAllProblemQuestions(): Promise<ProblemQuestion[]> {
  const rows = await query<RowDataPacket[]>(
    `SELECT pq.*, pc.name as category_name, s.title as service_title
     FROM problem_questions pq
     JOIN problem_categories pc ON pq.category_id = pc.id
     LEFT JOIN services s ON pq.service_id = s.id
     ORDER BY pc.display_order ASC, pq.display_order ASC, pq.id ASC`
  );
  return rows as ProblemQuestion[];
}

export async function createProblemCategory(data: Partial<ProblemCategory>): Promise<number> {
  const res = await execute(
    `INSERT INTO problem_categories (slug, name, description, icon, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.slug,
      data.name,
      data.description || null,
      data.icon || 'Compass',
      data.display_order || 0,
      data.is_active ? 1 : 0,
    ]
  );
  return res.insertId;
}

export async function updateProblemCategory(id: number, data: Partial<ProblemCategory>): Promise<void> {
  await execute(
    `UPDATE problem_categories SET
      slug = COALESCE(?, slug),
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      icon = COALESCE(?, icon),
      display_order = COALESCE(?, display_order),
      is_active = COALESCE(?, is_active)
     WHERE id = ?`,
    [
      data.slug,
      data.name,
      data.description,
      data.icon,
      data.display_order,
      data.is_active !== undefined ? (data.is_active ? 1 : 0) : null,
      id,
    ]
  );
}

export async function deleteProblemCategory(id: number): Promise<void> {
  await execute('DELETE FROM problem_categories WHERE id = ?', [id]);
}

export async function createProblemQuestion(data: Partial<ProblemQuestion>): Promise<number> {
  const res = await execute(
    `INSERT INTO problem_questions (category_id, service_id, question, description, inquiry_btn_label, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.category_id,
      data.service_id || null,
      data.question,
      data.description || null,
      data.inquiry_btn_label || 'Inquiry',
      data.display_order || 0,
      data.is_active ? 1 : 0,
    ]
  );
  return res.insertId;
}

export async function updateProblemQuestion(id: number, data: Partial<ProblemQuestion>): Promise<void> {
  await execute(
    `UPDATE problem_questions SET
      category_id = COALESCE(?, category_id),
      service_id = ?,
      question = COALESCE(?, question),
      description = COALESCE(?, description),
      inquiry_btn_label = COALESCE(?, inquiry_btn_label),
      display_order = COALESCE(?, display_order),
      is_active = COALESCE(?, is_active)
     WHERE id = ?`,
    [
      data.category_id,
      data.service_id || null,
      data.question,
      data.description,
      data.inquiry_btn_label,
      data.display_order,
      data.is_active !== undefined ? (data.is_active ? 1 : 0) : null,
      id,
    ]
  );
}

export async function deleteProblemQuestion(id: number): Promise<void> {
  await execute('DELETE FROM problem_questions WHERE id = ?', [id]);
}

// ==========================================
// 6. TESTIMONIALS
// ==========================================
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM testimonials WHERE is_published = 1 AND is_approved = 1 ORDER BY display_order ASC, id DESC'
  );
  return rows as Testimonial[];
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM testimonials WHERE is_published = 1 AND is_approved = 1 AND is_featured = 1 ORDER BY display_order ASC LIMIT 3'
  );
  return rows as Testimonial[];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM testimonials ORDER BY id DESC'
  );
  return rows as Testimonial[];
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<number> {
  const res = await execute(
    `INSERT INTO testimonials (client_name, location, service_name, rating, review_text, client_photo_url, video_url, is_featured, is_approved, is_published, display_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.client_name,
      data.location || null,
      data.service_name || null,
      data.rating || 5,
      data.review_text,
      data.client_photo_url || null,
      data.video_url || null,
      data.is_featured ? 1 : 0,
      data.is_approved ? 1 : 0,
      data.is_published ? 1 : 0,
      data.display_order || 0,
    ]
  );
  return res.insertId;
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>): Promise<void> {
  await execute(
    `UPDATE testimonials SET
      client_name = COALESCE(?, client_name),
      location = COALESCE(?, location),
      service_name = COALESCE(?, service_name),
      rating = COALESCE(?, rating),
      review_text = COALESCE(?, review_text),
      client_photo_url = COALESCE(?, client_photo_url),
      video_url = COALESCE(?, video_url),
      is_featured = COALESCE(?, is_featured),
      is_approved = COALESCE(?, is_approved),
      is_published = COALESCE(?, is_published),
      display_order = COALESCE(?, display_order)
     WHERE id = ?`,
    [
      data.client_name,
      data.location,
      data.service_name,
      data.rating,
      data.review_text,
      data.client_photo_url,
      data.video_url,
      data.is_featured !== undefined ? (data.is_featured ? 1 : 0) : null,
      data.is_approved !== undefined ? (data.is_approved ? 1 : 0) : null,
      data.is_published !== undefined ? (data.is_published ? 1 : 0) : null,
      data.display_order,
      id,
    ]
  );
}

export async function deleteTestimonial(id: number): Promise<void> {
  await execute('DELETE FROM testimonials WHERE id = ?', [id]);
}

// ==========================================
// 7. ENQUIRIES / BOOKINGS
// ==========================================
export async function createEnquiry(data: Partial<Enquiry>): Promise<number> {
  const res = await execute(
    `INSERT INTO enquiries (booking_ref, full_name, phone, email, dob, birth_time, birth_place, service_id, service_name, preferred_date, preferred_time_slot, selected_problem, message, status, source)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.booking_ref,
      data.full_name,
      data.phone,
      data.email || null,
      data.dob || null,
      data.birth_time || null,
      data.birth_place || null,
      data.service_id || null,
      data.service_name || null,
      data.preferred_date || null,
      data.preferred_time_slot || null,
      data.selected_problem || null,
      data.message || null,
      data.status || 'New',
      data.source || 'website_booking',
    ]
  );
  return res.insertId;
}

export async function getEnquiries(filters: {
  search?: string;
  status?: string;
  serviceId?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}): Promise<{ enquiries: Enquiry[]; total: number }> {
  let whereClauses = ['1=1'];
  const params: any[] = [];

  if (filters.search) {
    whereClauses.push('(full_name LIKE ? OR phone LIKE ? OR email LIKE ? OR booking_ref LIKE ?)');
    const term = `%${filters.search}%`;
    params.push(term, term, term, term);
  }

  if (filters.status && filters.status !== 'All') {
    whereClauses.push('status = ?');
    params.push(filters.status);
  }

  if (filters.serviceId) {
    whereClauses.push('service_id = ?');
    params.push(filters.serviceId);
  }

  if (filters.startDate) {
    whereClauses.push('created_at >= ?');
    params.push(`${filters.startDate} 00:00:00`);
  }

  if (filters.endDate) {
    whereClauses.push('created_at <= ?');
    params.push(`${filters.endDate} 23:59:59`);
  }

  const whereSql = whereClauses.join(' AND ');

  const countRows = await query<RowDataPacket[]>(
    `SELECT COUNT(*) as count FROM enquiries WHERE ${whereSql}`,
    params
  );
  const total = countRows[0].count;

  const limit = filters.limit || 20;
  const offset = filters.offset || 0;

  const rows = await query<RowDataPacket[]>(
    `SELECT * FROM enquiries WHERE ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return { enquiries: rows as Enquiry[], total };
}

export async function getEnquiryById(id: number): Promise<Enquiry | null> {
  const rows = await query<RowDataPacket[]>('SELECT * FROM enquiries WHERE id = ? LIMIT 1', [id]);
  if (!rows || rows.length === 0) return null;
  const enquiry = rows[0] as Enquiry;

  const notes = await query<RowDataPacket[]>(
    'SELECT * FROM enquiry_notes WHERE enquiry_id = ? ORDER BY created_at DESC',
    [id]
  );
  enquiry.notes = notes as EnquiryNote[];

  return enquiry;
}

export async function updateEnquiryStatus(id: number, status: string): Promise<void> {
  await execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
}

export async function addEnquiryNote(enquiryId: number, adminId: number | undefined, adminName: string | undefined, note: string): Promise<void> {
  await execute(
    'INSERT INTO enquiry_notes (enquiry_id, admin_id, admin_name, note) VALUES (?, ?, ?, ?)',
    [enquiryId, adminId || null, adminName || 'Admin', note]
  );
}

export async function deleteEnquiry(id: number): Promise<void> {
  await execute('DELETE FROM enquiries WHERE id = ?', [id]);
}

// ==========================================
// 8. DASHBOARD STATISTICS
// ==========================================
export async function getDashboardStats(): Promise<{
  totalEnquiries: number;
  newEnquiries: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  totalServices: number;
  activeServices: number;
  totalTestimonials: number;
  publishedTestimonials: number;
  monthlyTrends: { month: string; enquiries: number; confirmed: number }[];
  statusDistribution: { name: string; value: number }[];
  servicePopularity: { name: string; count: number }[];
  recentEnquiries: Enquiry[];
}> {
  // Counts
  const [enqCount] = await query<RowDataPacket[]>('SELECT COUNT(*) as c FROM enquiries');
  const [newCount] = await query<RowDataPacket[]>("SELECT COUNT(*) as c FROM enquiries WHERE status = 'New'");
  const [pendingCount] = await query<RowDataPacket[]>("SELECT COUNT(*) as c FROM enquiries WHERE status = 'Pending'");
  const [confirmedCount] = await query<RowDataPacket[]>("SELECT COUNT(*) as c FROM enquiries WHERE status = 'Confirmed'");
  const [completedCount] = await query<RowDataPacket[]>("SELECT COUNT(*) as c FROM enquiries WHERE status = 'Completed'");

  const [totServ] = await query<RowDataPacket[]>('SELECT COUNT(*) as c FROM services');
  const [actServ] = await query<RowDataPacket[]>('SELECT COUNT(*) as c FROM services WHERE is_active = 1');

  const [totTest] = await query<RowDataPacket[]>('SELECT COUNT(*) as c FROM testimonials');
  const [pubTest] = await query<RowDataPacket[]>('SELECT COUNT(*) as c FROM testimonials WHERE is_published = 1');

  // Status distribution
  const statusRows = await query<RowDataPacket[]>(
    'SELECT status as name, COUNT(*) as value FROM enquiries GROUP BY status'
  );

  // Service Popularity
  const serviceRows = await query<RowDataPacket[]>(
    `SELECT COALESCE(service_name, 'General Enquiry') as name, COUNT(*) as count
     FROM enquiries
     GROUP BY service_name
     ORDER BY count DESC
     LIMIT 5`
  );

  // Monthly trends (Last 6 months)
  const trendRows = await query<RowDataPacket[]>(
    `SELECT 
       DATE_FORMAT(created_at, '%b %Y') as month,
       DATE_FORMAT(created_at, '%Y-%m') as sort_key,
       COUNT(*) as enquiries,
       SUM(CASE WHEN status = 'Confirmed' OR status = 'Completed' THEN 1 ELSE 0 END) as confirmed
     FROM enquiries
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
     GROUP BY sort_key, month
     ORDER BY sort_key ASC`
  );

  // Recent 5 enquiries
  const recent = await query<RowDataPacket[]>(
    'SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5'
  );

  return {
    totalEnquiries: enqCount.c || 0,
    newEnquiries: newCount.c || 0,
    pendingBookings: pendingCount.c || 0,
    confirmedBookings: confirmedCount.c || 0,
    completedBookings: completedCount.c || 0,
    totalServices: totServ.c || 0,
    activeServices: actServ.c || 0,
    totalTestimonials: totTest.c || 0,
    publishedTestimonials: pubTest.c || 0,
    monthlyTrends: trendRows.map((r) => ({
      month: r.month,
      enquiries: Number(r.enquiries),
      confirmed: Number(r.confirmed),
    })),
    statusDistribution: statusRows.map((r) => ({
      name: r.name,
      value: Number(r.value),
    })),
    servicePopularity: serviceRows.map((r) => ({
      name: r.name,
      count: Number(r.count),
    })),
    recentEnquiries: recent as Enquiry[],
  };
}

// ==========================================
// 9. SEO METADATA
// ==========================================
export async function getSeoMetadata(route: string): Promise<SeoMetadata | null> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM seo_metadata WHERE page_route = ? LIMIT 1',
    [route]
  );
  if (!rows || rows.length === 0) return null;
  return rows[0] as SeoMetadata;
}

export async function getAllSeoMetadata(): Promise<SeoMetadata[]> {
  const rows = await query<RowDataPacket[]>('SELECT * FROM seo_metadata ORDER BY id ASC');
  return rows as SeoMetadata[];
}

export async function updateSeoMetadata(route: string, data: Partial<SeoMetadata>): Promise<void> {
  await execute(
    `UPDATE seo_metadata SET
      meta_title = COALESCE(?, meta_title),
      meta_description = COALESCE(?, meta_description),
      focus_keywords = COALESCE(?, focus_keywords),
      canonical_url = COALESCE(?, canonical_url),
      og_title = COALESCE(?, og_title),
      og_description = COALESCE(?, og_description),
      og_image_url = COALESCE(?, og_image_url),
      is_indexable = COALESCE(?, is_indexable)
     WHERE page_route = ?`,
    [
      data.meta_title,
      data.meta_description,
      data.focus_keywords,
      data.canonical_url,
      data.og_title,
      data.og_description,
      data.og_image_url,
      data.is_indexable !== undefined ? (data.is_indexable ? 1 : 0) : null,
      route,
    ]
  );
}

// ==========================================
// 10. SOCIAL LINKS
// ==========================================
export async function getSocialLinks(): Promise<SocialLink[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM social_links WHERE is_active = 1 ORDER BY display_order ASC'
  );
  return rows as SocialLink[];
}

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM social_links ORDER BY display_order ASC'
  );
  return rows as SocialLink[];
}

export async function updateSocialLink(id: number, url: string, isActive: boolean): Promise<void> {
  await execute(
    'UPDATE social_links SET url = ?, is_active = ? WHERE id = ?',
    [url, isActive ? 1 : 0, id]
  );
}

// ==========================================
// 11. MEDIA LIBRARY
// ==========================================
export async function getMediaLibrary(): Promise<MediaItem[]> {
  const rows = await query<RowDataPacket[]>('SELECT * FROM media_library ORDER BY created_at DESC');
  return rows as MediaItem[];
}

export async function addMediaItem(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<number> {
  const res = await execute(
    `INSERT INTO media_library (filename, original_name, file_path, file_size, mime_type, alt_text, category, uploaded_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      item.filename,
      item.original_name,
      item.file_path,
      item.file_size,
      item.mime_type,
      item.alt_text || null,
      item.category || 'general',
      item.uploaded_by || null,
    ]
  );
  return res.insertId;
}

export async function deleteMediaItem(id: number): Promise<void> {
  await execute('DELETE FROM media_library WHERE id = ?', [id]);
}

// ==========================================
// 12. ADMIN USERS & ROLES
// ==========================================
export async function getAllAdminUsers(): Promise<AdminUser[]> {
  const rows = await query<RowDataPacket[]>(
    `SELECT a.id, a.role_id, a.name, a.email, a.phone, a.avatar_url, a.is_active, a.last_login_at, a.created_at,
            r.name as role_name, r.display_name as role_display_name
     FROM admins a
     JOIN roles r ON a.role_id = r.id
     ORDER BY a.id ASC`
  );
  return rows as AdminUser[];
}

export async function getRoles(): Promise<any[]> {
  const rows = await query<RowDataPacket[]>('SELECT * FROM roles ORDER BY id ASC');
  return rows;
}

// ==========================================
// 13. ACTIVITY LOGS
// ==========================================
export async function logActivity(log: {
  adminId?: number;
  adminName?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
}): Promise<void> {
  try {
    await execute(
      `INSERT INTO activity_logs (admin_id, admin_name, action, entity, entity_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        log.adminId || null,
        log.adminName || 'System',
        log.action,
        log.entity,
        log.entityId || null,
        log.details || null,
        log.ipAddress || null,
      ]
    );
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}

export async function getRecentActivityLogs(limit = 15): Promise<ActivityLog[]> {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?',
    [limit]
  );
  return rows as ActivityLog[];
}
