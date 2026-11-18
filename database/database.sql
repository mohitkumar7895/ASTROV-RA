-- ==============================================================================
-- ASTROVÈRA DATABASE SCHEMA
-- Database: astro
-- Engine: InnoDB, Charset: utf8mb4, Collation: utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `astro` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `astro`;

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `display_name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ROLE_PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rp_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_role_permission` (`role_id`, `permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ADMINS TABLE
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `avatar_url` VARCHAR(255) NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_admins_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ADMIN_SESSIONS TABLE
CREATE TABLE IF NOT EXISTS `admin_sessions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT NOT NULL,
  `token` VARCHAR(255) NOT NULL UNIQUE,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_sessions_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  INDEX `idx_sessions_token` (`token`),
  INDEX `idx_sessions_expires` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. WEBSITE_SETTINGS TABLE
CREATE TABLE IF NOT EXISTS `website_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` LONGTEXT NULL,
  `category` VARCHAR(50) DEFAULT 'general',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_settings_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. PAGES_CONTENT TABLE
CREATE TABLE IF NOT EXISTS `pages_content` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_slug` VARCHAR(50) NOT NULL,
  `section_key` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NULL,
  `subtitle` VARCHAR(255) NULL,
  `content` LONGTEXT NULL,
  `meta_json` LONGTEXT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idx_page_section` (`page_slug`, `section_key`),
  INDEX `idx_page_slug` (`page_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. HERO_SECTIONS TABLE
CREATE TABLE IF NOT EXISTS `hero_sections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_slug` VARCHAR(50) NOT NULL UNIQUE,
  `headline` VARCHAR(255) NOT NULL,
  `subheadline` TEXT NULL,
  `hindi_tagline` TEXT NULL,
  `description` LONGTEXT NULL,
  `badge_text` VARCHAR(100) NULL,
  `primary_cta_label` VARCHAR(50) DEFAULT 'Book Consultation',
  `primary_cta_url` VARCHAR(255) DEFAULT '/contact',
  `primary_cta_enabled` TINYINT(1) DEFAULT 1,
  `secondary_cta_label` VARCHAR(50) DEFAULT 'Explore Services',
  `secondary_cta_url` VARCHAR(255) DEFAULT '/services',
  `secondary_cta_enabled` TINYINT(1) DEFAULT 1,
  `hero_image_url` VARCHAR(255) NULL,
  `astrologer_image_url` VARCHAR(255) NULL,
  `background_style` VARCHAR(50) DEFAULT 'cosmic_stars',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. ASTROLOGER_PROFILE TABLE
CREATE TABLE IF NOT EXISTS `astrologer_profile` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL DEFAULT 'Puneet Dwivedi',
  `title` VARCHAR(150) DEFAULT 'Vedic Astrologer & Cosmic Counselor',
  `short_bio` TEXT NULL,
  `biography` LONGTEXT NULL,
  `experience_years` INT DEFAULT 15,
  `consultations_count` INT DEFAULT 12000,
  `qualifications` LONGTEXT NULL,
  `specialisations` LONGTEXT NULL,
  `personal_journey` LONGTEXT NULL,
  `philosophy` LONGTEXT NULL,
  `values` LONGTEXT NULL,
  `ethics_pledge` LONGTEXT NULL,
  `profile_image_url` VARCHAR(255) NULL,
  `portrait_image_url` VARCHAR(255) NULL,
  `contact_number` VARCHAR(30) DEFAULT '+91 96306 20240',
  `whatsapp_number` VARCHAR(30) DEFAULT '+91 96306 20240',
  `location` VARCHAR(255) DEFAULT 'Mira Road East, Shanti Garden, Near Cluster 3, Mumbai, Maharashtra – 401107',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. SERVICES TABLE
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `short_description` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  `icon` VARCHAR(50) DEFAULT 'Sparkles',
  `image_url` VARCHAR(255) NULL,
  `price` DECIMAL(10,2) DEFAULT 0.00,
  `currency` VARCHAR(10) DEFAULT 'INR',
  `duration_minutes` INT DEFAULT 45,
  `consultation_method` VARCHAR(100) DEFAULT 'Online Video / Voice / Chat',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `is_featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_services_active` (`is_active`),
  INDEX `idx_services_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. PROBLEM_CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `problem_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(50) DEFAULT 'Compass',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_categories_active` (`is_active`),
  INDEX `idx_categories_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. PROBLEM_QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS `problem_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `service_id` INT NULL,
  `question` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `inquiry_btn_label` VARCHAR(50) DEFAULT 'Enquire Now',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_pq_category` FOREIGN KEY (`category_id`) REFERENCES `problem_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pq_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  INDEX `idx_questions_category` (`category_id`),
  INDEX `idx_questions_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(150) NOT NULL,
  `location` VARCHAR(100) NULL,
  `service_name` VARCHAR(150) NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `review_text` LONGTEXT NOT NULL,
  `client_photo_url` VARCHAR(255) NULL,
  `video_url` VARCHAR(255) NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_approved` TINYINT(1) DEFAULT 1,
  `is_published` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_test_published` (`is_published`, `is_approved`),
  INDEX `idx_test_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_ref` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(150) NULL,
  `dob` DATE NULL,
  `birth_time` VARCHAR(20) NULL,
  `birth_place` VARCHAR(100) NULL,
  `service_id` INT NULL,
  `service_name` VARCHAR(150) NULL,
  `preferred_date` DATE NULL,
  `preferred_time_slot` VARCHAR(50) NULL,
  `selected_problem` VARCHAR(255) NULL,
  `message` LONGTEXT NULL,
  `status` ENUM('New', 'Contacted', 'Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'New',
  `source` VARCHAR(50) DEFAULT 'website_booking',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_enquiries_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  INDEX `idx_enquiries_status` (`status`),
  INDEX `idx_enquiries_phone` (`phone`),
  INDEX `idx_enquiries_date` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. ENQUIRY_NOTES TABLE
CREATE TABLE IF NOT EXISTS `enquiry_notes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `enquiry_id` INT NOT NULL,
  `admin_id` INT NULL,
  `admin_name` VARCHAR(100) NULL,
  `note` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_notes_enquiry` FOREIGN KEY (`enquiry_id`) REFERENCES `enquiries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_notes_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  INDEX `idx_notes_enquiry` (`enquiry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. MEDIA_LIBRARY TABLE
CREATE TABLE IF NOT EXISTS `media_library` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_size` INT NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `alt_text` VARCHAR(255) NULL,
  `category` VARCHAR(50) DEFAULT 'general',
  `uploaded_by` INT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_media_admin` FOREIGN KEY (`uploaded_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. SEO_METADATA TABLE
CREATE TABLE IF NOT EXISTS `seo_metadata` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_route` VARCHAR(50) NOT NULL UNIQUE,
  `page_name` VARCHAR(100) NOT NULL,
  `meta_title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT NOT NULL,
  `focus_keywords` VARCHAR(255) NULL,
  `canonical_url` VARCHAR(255) NULL,
  `og_title` VARCHAR(255) NULL,
  `og_description` TEXT NULL,
  `og_image_url` VARCHAR(255) NULL,
  `is_indexable` TINYINT(1) DEFAULT 1,
  `structured_data_json` LONGTEXT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_seo_route` (`page_route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. SOCIAL_LINKS TABLE
CREATE TABLE IF NOT EXISTS `social_links` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `platform` VARCHAR(50) NOT NULL UNIQUE,
  `display_name` VARCHAR(100) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. ACTIVITY_LOGS TABLE
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT NULL,
  `admin_name` VARCHAR(100) NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity` VARCHAR(100) NOT NULL,
  `entity_id` VARCHAR(50) NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_logs_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  INDEX `idx_logs_date` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
