-- ==============================================================================
-- ASTROVÈRA DATABASE SEED DATA
-- ==============================================================================

USE `astro`;

-- 1. ROLES
INSERT INTO `roles` (`id`, `name`, `display_name`, `description`) VALUES
(1, 'super_admin', 'Super Administrator', 'Complete access to all system settings, CMS, bookings, and user administration'),
(2, 'content_manager', 'Content Manager', 'Manage website CMS, services, problems, testimonials, and media'),
(3, 'booking_manager', 'Booking Manager', 'View and manage customer enquiries, notes, and consultation schedules')
ON DUPLICATE KEY UPDATE `display_name` = VALUES(`display_name`);

-- 2. PERMISSIONS
INSERT INTO `permissions` (`id`, `name`, `module`, `description`) VALUES
(1, 'manage_all', 'system', 'Full unrestricted administrative privileges'),
(2, 'manage_content', 'content', 'Edit page content, hero sections, and copy'),
(3, 'manage_services', 'services', 'Create, edit, toggle and delete astrology services'),
(4, 'manage_problems', 'problems', 'Manage problem categories and client questions'),
(5, 'manage_testimonials', 'testimonials', 'Approve, feature and edit client testimonials'),
(6, 'manage_bookings', 'bookings', 'Process, update and manage consultation bookings'),
(7, 'manage_media', 'media', 'Upload and organize media assets in the library'),
(8, 'manage_seo', 'seo', 'Configure meta tags, OG tags and SEO settings'),
(9, 'manage_settings', 'settings', 'Update site identity, contact numbers and social links'),
(10, 'manage_users', 'users', 'Create and modify administrative user accounts')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 3. ROLE PERMISSIONS
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(2, 2), (2, 3), (2, 4), (2, 5), (2, 7), (2, 8),
(3, 6);

-- 4. DEFAULT ADMIN USER
-- Password hash corresponds to 'Admin@Astro2026!'
INSERT INTO `admins` (`id`, `role_id`, `name`, `email`, `password_hash`, `phone`, `is_active`) VALUES
(1, 1, 'Puneet Dwivedi', 'admin@astrovera.com', '$2a$10$II2pyojPDs0r2MN0Fufhyu8ONjummYce41A42HQggBXeyazZ9i2/m', '+91 96306 20240', 1)
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`), `name` = VALUES(`name`);

-- 5. WEBSITE SETTINGS
INSERT INTO `website_settings` (`setting_key`, `setting_value`, `category`) VALUES
('brand_name', 'ASTROVÈRA', 'general'),
('brand_tagline', 'Luxury Meets Spirituality', 'general'),
('astrologer_name', 'Puneet Dwivedi', 'general'),
('contact_phone', '+91 96306 20240', 'contact'),
('whatsapp_number', '+91 96306 20240', 'contact'),
('contact_email', 'contact@astrovera.com', 'contact'),
('business_address', 'Mira Road East, Shanti Garden, Near Cluster 3, Mumbai, Maharashtra – 401107.', 'contact'),
('google_maps_url', 'https://maps.google.com/?q=Mira+Road+East+Shanti+Garden+Cluster+3+Mumbai+401107', 'contact'),
('business_hours', 'Monday – Sunday: 10:00 AM – 08:30 PM (IST)', 'contact'),
('whatsapp_floating_enabled', 'true', 'features'),
('announcement_bar_enabled', 'true', 'features'),
('announcement_bar_text', '✨ Vedic Astrological Guidance & Kundli Analysis with Puneet Dwivedi | Book Your Consultation', 'features'),
('maintenance_mode', 'false', 'features'),
('google_analytics_id', '', 'analytics'),
('footer_copyright', '© 2026 ASTROVÈRA. All Rights Reserved. Crafted for Conscious Souls.', 'footer'),
('footer_description', 'ASTROVÈRA blends ancient Vedic wisdom with modern life strategy. Guided by Pandit Puneet Dwivedi, we illuminate paths through career transitions, relationship harmony, and inner purpose.', 'footer')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- 6. HERO SECTIONS
INSERT INTO `hero_sections` (`page_slug`, `headline`, `subheadline`, `hindi_tagline`, `description`, `badge_text`, `primary_cta_label`, `primary_cta_url`, `secondary_cta_label`, `secondary_cta_url`, `background_style`) VALUES
('home', 
 'Discover Your Destiny. Understand Your Universe.', 
 'Ancient Vedic Astrology Refined for Modern Clarity & Life Mastery',
 'Apne grahon ki sthiti, jeevan ke lakshyon aur bhavishya ki sambhavnayon ko samajhne ke liye personalised astrological guidance prapt karein.',
 'Step into celestial clarity. Guided by Puneet Dwivedi, ASTROVÈRA delivers profound Jyotish analysis, planetary remedials, and conscious roadmaps for your personal, romantic, and professional horizons.',
 'LUXURY MEETS SPIRITUALITY',
 'Book Consultation', '/contact',
 'Explore Services', '/services',
 'cosmic_stars')
ON DUPLICATE KEY UPDATE `headline` = VALUES(`headline`), `description` = VALUES(`description`);

-- 7. ASTROLOGER PROFILE
INSERT INTO `astrologer_profile` (
  `id`, `name`, `title`, `short_bio`, `biography`, 
  `experience_years`, `consultations_count`, `qualifications`, `specialisations`, 
  `personal_journey`, `philosophy`, `values`, `ethics_pledge`, 
  `contact_number`, `whatsapp_number`, `location`
) VALUES (
  1,
  'Puneet Dwivedi',
  'Master Vedic Astrologer & Life Strategist',
  'With over 15 years of dedicated Vedic scholarship, Puneet Dwivedi empowers individuals, entrepreneurs, and families with truthful astrological counsel.',
  'Puneet Dwivedi is a revered practitioner of classical Parashari Jyotish, Jaimini Sutras, and planetary energization. Over 15+ years of intense practice in Mumbai, he has decoded more than 12,000 birth charts, steering clients through intricate life crossroads with calmness, empathy, and mathematical precision.\n\nHe considers astrology not as fatalism, but as cosmic weather forecasting—giving you the foresight to dress for the rain or harness favorable winds for peak accomplishments.',
  15,
  12000,
  '["Jyotish Praveena (Vedic Astrology Board)", "Advanced Kundli & Prashna Shastra Specialist", "Vedic Muhurta & Vastu Consultant", "Bachelor of Sciences"]',
  '["Vedic Birth Chart Analysis", "Career Crossroads & Executive Direction", "Matchmaking & Marriage Harmony", "Child Education & Stream Selection", "Graha Shanti, Puja & Spiritual Vidhan"]',
  'Drawn to cosmic sciences from early youth, Puneet Dwivedi studied sacred scriptures under revered traditional masters in Varanasi and Haridwar before establishing his practice in Mumbai. His journey bridges ancient Vedic shlokas with practical, actionable counsel for 21st-century complexities.',
  'Planets do not dictate your fate; they indicate the karmic terrain you chose to navigate. Through awareness, conscious action, and sacred alignment, every astrological challenge can be converted into spiritual and worldly triumph.',
  'Truth, empathy, punctuality, and scientific integrity form the pillars of ASTROVÈRA. Every reading is personalized, deep, and grounded in authentic classical texts.',
  'Strict client confidentiality guaranteed. Zero exploitation through fear-inducing predictions. Clear, ethical guidance without superstitious claims or false promises.',
  '+91 96306 20240',
  '+91 96306 20240',
  'Mira Road East, Shanti Garden, Near Cluster 3, Mumbai, Maharashtra – 401107'
) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 8. SERVICES
INSERT INTO `services` (`id`, `slug`, `title`, `short_description`, `description`, `icon`, `price`, `currency`, `duration_minutes`, `consultation_method`, `display_order`, `is_active`, `is_featured`) VALUES
(1, 'birth-chart-analysis', 'Birth Chart Analysis', 'Deep dive into your Lagna chart, planetary strengths, dasha cycles, and core life path.', 'A complete 360-degree evaluation of your Janam Kundli. Discover your primary planetary influences, dasha patterns, auspicious yogas, and remedial gems or mantras tailored to your astrological blueprint.', 'Compass', 2500.00, 'INR', 45, 'Online Video / Voice Call', 1, 1, 1),
(2, 'career-astrology', 'Career & Business Astrology', 'Direction for job transitions, venture launches, promotions, and wealth timing.', 'Pinpoint your most lucrative vocations, auspicious investment windows, partnership compatibility, and leadership periods through the 10th house, D-10 Dashamsha chart, and current transits.', 'Briefcase', 3100.00, 'INR', 45, 'Online Video / Voice Call', 2, 1, 1),
(3, 'marriage-relationship', 'Marriage & Relationship Astrology', 'Kundli Milan, marital harmony analysis, timing of marriage, and dispute resolution.', 'Comprehensive Gun Milan and Bhava Kundli synastry. Understand Manglik dosha nuances, emotional synastry, auspicious wedding Muhurta, and remedy root causes of relationship friction.', 'HeartHandshake', 2800.00, 'INR', 45, 'Online Video / Voice Call', 3, 1, 1),
(4, 'horoscope-analysis', 'Annual Horoscope Analysis (Varshaphala)', 'Year-ahead forecast detailing monthly trends, opportunities, and caution periods.', 'A comprehensive solar return and Tajika Varshaphala reading for the upcoming 12 months. Plan major financial moves, travels, health routines, and family milestones with clarity.', 'Calendar', 2100.00, 'INR', 40, 'Online Video / Voice Call', 4, 1, 0),
(5, 'numerology-reading', 'Numerology & Name Correction', 'Harness vibrational numerology for personal brand, newborn naming, and business logos.', 'Align your birth number, life path number, and name frequency with planetary vibrations to unlock magnetic attraction, professional growth, and personal harmony.', 'Binary', 1800.00, 'INR', 30, 'Voice Call / Written Report', 5, 1, 0),
(6, 'personal-consultation', 'Personal Astrology Consultation (1-on-1)', 'Direct private session with Puneet Dwivedi for pressing life questions and spiritual insight.', 'An intimate, unrestricted private dialogue addressing up to 4 major life questions. Includes live Prashna Kundli horary analysis for real-time clarity on urgent matters.', 'UserCheck', 3500.00, 'INR', 60, '1-on-1 Video Session / In-Person', 6, 1, 1),
(7, 'chat-consultation', 'Express Chat Consultation', 'Quick astrological queries answered directly via WhatsApp or private chat.', 'Ideal for immediate answers to specific single-question dilemmas regarding timing, decision-making, or remedies. Subject to schedule confirmation by the astrologer.', 'MessageSquare', 1200.00, 'INR', 20, 'Direct WhatsApp Chat', 7, 1, 0),
(8, 'puja-shanti-vidhan', 'Puja & Shanti Vidhan (Graha Dosh Nivaran)', 'Vedic rituals, Navagraha Shanti, and Hawan ceremonies performed with authentic Vedic protocols.', 'Customized Vedic rituals and spiritual remedies recommended upon detailed Kundli assessment. Performed with devotion and sacred Vedic mantras to neutralize afflictions and restore peace.', 'Flame', 5100.00, 'INR', 90, 'Temple Ritual / Live Video Stream', 8, 1, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `price` = VALUES(`price`);

-- 9. PROBLEM CATEGORIES
INSERT INTO `problem_categories` (`id`, `slug`, `name`, `description`, `icon`, `display_order`, `is_active`) VALUES
(1, 'career', 'CAREER', 'Direction for educational streams, competitive exams, business potential, and promotions.', 'Briefcase', 1, 1),
(2, 'love-life', 'LOVE LIFE', 'Clarity on marriage timing, fidelity, emotional harmony, and childbearing obstacles.', 'Heart', 2, 1),
(3, 'life-problems', 'LIFE PROBLEMS', 'Cosmic insight into financial stagnation, karmic lessons, professional growth, and family pride.', 'Sparkles', 3, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 10. PROBLEM QUESTIONS
INSERT INTO `problem_questions` (`id`, `category_id`, `service_id`, `question`, `description`, `inquiry_btn_label`, `display_order`, `is_active`) VALUES
-- Career Category Questions
(1, 1, 2, 'Which stream should your children choose after 10th and 12th?', 'Determine your child\'s innate cognitive strengths, Mercury-Jupiter planetary alignments, and optimal fields (Science, Commerce, Arts or Tech).', 'Inquiry', 1, 1),
(2, 1, 2, 'Am I capable of starting a business?', 'Analyze the 3rd, 7th, and 10th houses for entrepreneurial courage, merchant instincts, and favorable dasha periods for capital risk.', 'Inquiry', 2, 1),
(3, 1, 2, 'Will I get a job?', 'Identify the exact dasha and transit periods triggering job openings, placement breakthroughs, and corporate recognition.', 'Inquiry', 3, 1),
(4, 1, 2, 'Can your son pass JEE and NEET?', 'Evaluate concentration houses (5th house of intellect, Rahu/Mars discipline) to formulate the ideal preparation timeline and mental focus remedies.', 'Inquiry', 4, 1),

-- Love Life Category Questions
(5, 2, 3, 'When will I get married?', 'Unravel the 7th house lord, Venus/Jupiter transits, and Navamsha chart (D-9) to reveal accurate matrimonial windows and prospective partner profile.', 'Inquiry', 1, 1),
(6, 2, 3, 'Is my girlfriend cheating on me?', 'Assess relational trust, Rahu-Venus influences, and 12th house hidden dynamics through ethical astrological insight and Prashna Kundli.', 'Inquiry', 2, 1),
(7, 2, 3, 'Is my wife unhappy with me?', 'Examine Moon-Venus synastry, communication houses, and planetary friction points to restore tenderness, warmth, and marital peace.', 'Inquiry', 3, 1),
(8, 2, 3, 'Why am I not able to have a child?', 'Deep assessment of the 5th house (Santan Bhava), Jupiter\'s grace, Saptamsha (D-7) chart, and traditional remedial remedies for conception blessings.', 'Inquiry', 4, 1),

-- Life Problems Category Questions
(9, 3, 1, 'Why am I poor?', 'Examine the 2nd (wealth) and 11th (gains) houses alongside 12th house expenditure patterns, uncovering ancestral karma and debt remedies.', 'Inquiry', 1, 1),
(10, 3, 1, 'Will I get rich this year or lose someone important?', 'Careful evaluation of current Sade Sati, Maraka periods, and Dhan Yogas to prepare for life shifts with spiritual resilience and caution.', 'Inquiry', 2, 1),
(11, 3, 2, 'Will my boss increase my salary?', 'Analyze the 6th house of service and Sun/Saturn relationship in your current dasha for appraisal and increment timing.', 'Inquiry', 3, 1),
(12, 3, 1, 'Will my parents be proud of me?', 'Inspect the 9th house of father/fortune and 4th house of mother/emotional foundation to align your ambitions with family fulfillment.', 'Inquiry', 4, 1)
ON DUPLICATE KEY UPDATE `question` = VALUES(`question`);

-- 11. TESTIMONIALS
INSERT INTO `testimonials` (`id`, `client_name`, `location`, `service_name`, `rating`, `review_text`, `is_featured`, `is_approved`, `is_published`, `display_order`) VALUES
(1, 'Rajeshwari Sharma', 'Andheri, Mumbai', 'Birth Chart Analysis', 5, 'Puneet Ji\'s reading was mind-bogglingly precise. He accurately pointed out the exact year I faced career turmoil and gave me peaceful remedies that transformed my mental peace. I recommend him with complete trust.', 1, 1, 1, 1),
(2, 'Vikramaditya Singhania', 'Bandra West, Mumbai', 'Career & Business Astrology', 5, 'Before taking a major business partnership decision, I consulted Puneet Dwivedi. His planetary breakdown saved me from a major financial trap. Authentic, ethical, and deeply knowledgeable.', 1, 1, 1, 2),
(3, 'Dr. Ananya Mukherjee', 'Pune, Maharashtra', 'Marriage & Relationship Astrology', 5, 'The Kundli analysis for our daughter’s marriage brought clarity where other astrologers had created fear. Puneet Ji explained the cosmic reasons calmly without asking for exorbitant rituals. Genuine Vedic scholar.', 1, 1, 1, 3),
(4, 'Siddharth Mehta', 'Thane, Mumbai', 'Express Chat Consultation', 5, 'Got prompt answers when I was severely anxious about a critical corporate appraisal. His guidance helped me handle the discussion diplomatically. Truly thankful.', 0, 1, 1, 4),
(5, 'Sunita Deshmukh', 'Borivali, Mumbai', 'Puja & Shanti Vidhan', 5, 'We organized a Navagraha Shanti Puja at our home with Puneet Ji\'s guidance. The positive atmosphere and peace our family felt afterwards is indescribable.', 0, 1, 1, 5)
ON DUPLICATE KEY UPDATE `client_name` = VALUES(`client_name`);

-- 12. SAMPLE ENQUIRIES FOR ADMIN DASHBOARD METRICS
INSERT INTO `enquiries` (`id`, `booking_ref`, `full_name`, `phone`, `email`, `dob`, `birth_time`, `birth_place`, `service_id`, `service_name`, `preferred_date`, `preferred_time_slot`, `selected_problem`, `message`, `status`, `created_at`) VALUES
(1, 'AST-2601-8841', 'Aditya Verma', '+91 98201 11223', 'aditya.verma@example.com', '1992-04-14', '08:30 AM', 'Mumbai', 2, 'Career & Business Astrology', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '11:00 AM - 12:00 PM', 'Am I capable of starting a business?', 'Planning to leave my IT corporate job to start an ecommerce brand.', 'New', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 'AST-2601-8842', 'Priyanka Kapoor', '+91 97110 44556', 'priyanka.k@example.com', '1995-11-20', '02:15 PM', 'Delhi', 3, 'Marriage & Relationship Astrology', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '03:00 PM - 04:00 PM', 'When will I get married?', 'Looking for guidance regarding marriage delay and prospective match compatibility.', 'Contacted', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, 'AST-2601-8843', 'Naveen Joshi', '+91 98920 77889', 'naveen.j@example.com', '1988-07-08', '06:45 PM', 'Ahmedabad', 1, 'Birth Chart Analysis', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '05:00 PM - 06:00 PM', 'Why am I poor?', 'Experiencing heavy losses and debts for the last 3 years.', 'Confirmed', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(4, 'AST-2601-8844', 'Meera Rao', '+91 99302 33445', 'meera.rao@example.com', '2005-09-12', '10:00 AM', 'Bengaluru', 2, 'Career & Business Astrology', DATE_ADD(CURDATE(), INTERVAL 4 DAY), '02:00 PM - 03:00 PM', 'Can your son pass JEE and NEET?', 'Guidance for competitive exam focus and stream selection.', 'Pending', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(5, 'AST-2601-8845', 'Kunal Merchant', '+91 98210 99001', 'kunal.m@example.com', '1984-03-25', '11:20 AM', 'Mumbai', 6, 'Personal Astrology Consultation (1-on-1)', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '04:00 PM - 05:00 PM', NULL, 'Discussion regarding ancestral property and family harmony.', 'Completed', DATE_SUB(NOW(), INTERVAL 5 DAY))
ON DUPLICATE KEY UPDATE `booking_ref` = VALUES(`booking_ref`);

-- 13. ENQUIRY NOTES
INSERT INTO `enquiry_notes` (`enquiry_id`, `admin_id`, `admin_name`, `note`, `created_at`) VALUES
(1, 1, 'Puneet Dwivedi', 'Client has Ketu in 10th house and Jupiter transit over 2nd house. Prepare D-10 chart analysis before the call.', NOW()),
(2, 1, 'Puneet Dwivedi', 'Sent introductory WhatsApp message with available consultation slots for Wednesday.', NOW());

-- 14. SOCIAL LINKS
INSERT INTO `social_links` (`id`, `platform`, `display_name`, `url`, `icon`, `is_active`, `display_order`) VALUES
(1, 'whatsapp', 'WhatsApp', 'https://wa.me/919630620240', 'MessageCircle', 1, 1),
(2, 'instagram', 'Instagram', 'https://instagram.com/astrovera.official', 'Instagram', 1, 2),
(3, 'facebook', 'Facebook', 'https://facebook.com/astrovera.official', 'Facebook', 1, 3),
(4, 'youtube', 'YouTube', 'https://youtube.com/@astrovera', 'Youtube', 1, 4)
ON DUPLICATE KEY UPDATE `url` = VALUES(`url`);

-- 15. SEO METADATA FOR ALL SIX PUBLIC PAGES
INSERT INTO `seo_metadata` (`page_route`, `page_name`, `meta_title`, `meta_description`, `focus_keywords`, `canonical_url`, `og_title`, `og_description`, `is_indexable`) VALUES
('/', 'Home', 'ASTROVÈRA | Luxury Vedic Astrology & Life Guidance by Puneet Dwivedi', 'Discover your destiny with ASTROVÈRA. Authentic Vedic astrology consultations, Kundli readings, and life strategy by renowned Mumbai astrologer Puneet Dwivedi.', 'Vedic astrology, Kundli reading Mumbai, Puneet Dwivedi, luxury astrology, horoscope', 'https://astrovera.com', 'ASTROVÈRA | Discover Your Destiny', 'Personalised astrological guidance to understand your grahas, destiny, and universe.', 1),
('/problems', 'Problems We Help With', 'Problems We Help With | Career, Love Life & Life Solutions – ASTROVÈRA', 'Seeking answers for career direction, marriage timing, or life challenges? Explore Vedic astrological solutions tailored by Puneet Dwivedi.', 'career astrology, marriage prediction, JEE NEET guidance, financial astrology', 'https://astrovera.com/problems', 'Problems We Help With | ASTROVÈRA', 'Direct astrological answers to your most pressing career, love life, and personal challenges.', 1),
('/about', 'About Astrologer', 'About Puneet Dwivedi | Master Vedic Astrologer & Counselor – ASTROVÈRA', 'Learn about Puneet Dwivedi, a seasoned Vedic astrologer with 15+ years experience and 12,000+ consultations based in Mumbai. Ethical, confidential, and grounded.', 'Puneet Dwivedi astrologer, Vedic scholar Mumbai, Jyotish expert', 'https://astrovera.com/about', 'About Puneet Dwivedi | ASTROVÈRA', 'Bridging classical Vedic wisdom with conscious modern life counseling.', 1),
('/services', 'Astrology Services', 'Astrology Services & Consultations | Kundli, Career, Marriage – ASTROVÈRA', 'Explore premium astrology services: Birth Chart Analysis, Career Astrology, Marriage Kundli Milan, Puja & Shanti Vidhan with Puneet Dwivedi.', 'astrology services, Kundli Milan, Puja Shanti Vidhan, career horoscope', 'https://astrovera.com/services', 'Astrology Services | ASTROVÈRA', 'Clear, actionable Vedic consultations designed for meaningful transformation.', 1),
('/testimonials', 'Testimonials', 'Client Testimonials & Reviews | Genuine Experiences – ASTROVÈRA', 'Read real testimonials and reviews from clients across Mumbai and worldwide who experienced transformative insights with Puneet Dwivedi.', 'ASTROVÈRA reviews, astrologer testimonials, client feedback', 'https://astrovera.com/testimonials', 'Client Testimonials | ASTROVÈRA', 'Verified client journeys and genuine ratings from people whose lives were illuminated.', 1),
('/contact', 'Contact & Booking', 'Book Astrology Consultation | Contact Puneet Dwivedi – ASTROVÈRA', 'Book your private Vedic astrology consultation with Puneet Dwivedi at ASTROVÈRA. Office in Mira Road East, Mumbai. Online video and phone consultations.', 'book astrologer Mumbai, Puneet Dwivedi contact, astrology appointment', 'https://astrovera.com/contact', 'Contact & Booking | ASTROVÈRA', 'Reserve your personalized Vedic astrology session today.', 1)
ON DUPLICATE KEY UPDATE `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`);

-- 16. PAGES CONTENT (CMS)
INSERT INTO `pages_content` (`page_slug`, `section_key`, `title`, `subtitle`, `content`) VALUES
('home', 'why_choose_us', 'Why Choose ASTROVÈRA', 'The Convergence of Sacred Science and Modern Clarity', 'At ASTROVÈRA, astrology is not an instrument of superstition; it is a sacred mathematical science decoded for your empowerment. We honor your personal agency and provide actionable guidance without exploiting fear.'),
('home', 'spiritual_cta', 'OM NAMAH SHIVAYA', 'Invoke Cosmic Balance & Spiritual Alignment', 'Align your karmic vibrations with celestial harmony. Experience authentic Vedic remedies, customized Puja, and transformative planetary Shanti Vidhan.'),
('about', 'philosophy', 'Our Astrological Philosophy', 'Karmic Maps, Not Inevitable Destinies', 'We believe your Janam Kundli is not a prison sentence of fate—it is an intricate nautical chart. It shows the prevailing winds, rocky shallows, and high tides of life.'),
('about', 'ethics', 'Our Ethical Commitment', 'Uncompromised Integrity & Confidentiality', 'We maintain absolute client privacy, transparent consultation pricing, zero superstitious fear-mongering, and truthful Vedic guidance.')
ON DUPLICATE KEY UPDATE `content` = VALUES(`content`);
