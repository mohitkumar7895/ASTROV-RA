export interface Role {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Permission {
  id: number;
  name: string;
  module: string;
  description?: string;
}

export interface AdminUser {
  id: number;
  role_id: number;
  role_name?: string;
  roleName?: string;
  role_display_name?: string;
  roleDisplayName?: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  avatarUrl?: string;
  is_active: number | boolean;
  isActive?: boolean;
  last_login_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WebsiteSetting {
  id: number;
  setting_key: string;
  setting_value: string;
  category: string;
  updated_at?: string;
}

export interface PageContent {
  id: number;
  page_slug: string;
  section_key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  meta_json?: string;
  updated_at?: string;
}

export interface HeroSection {
  id: number;
  page_slug: string;
  headline: string;
  subheadline?: string;
  hindi_tagline?: string;
  description?: string;
  badge_text?: string;
  primary_cta_label?: string;
  primary_cta_url?: string;
  primary_cta_enabled?: number | boolean;
  secondary_cta_label?: string;
  secondary_cta_url?: string;
  secondary_cta_enabled?: number | boolean;
  hero_image_url?: string;
  astrologer_image_url?: string;
  background_style?: string;
  updated_at?: string;
}

export interface AstrologerProfile {
  id: number;
  name: string;
  title: string;
  short_bio?: string;
  biography?: string;
  experience_years: number;
  consultations_count: number;
  qualifications: string[] | string;
  specialisations: string[] | string;
  personal_journey?: string;
  philosophy?: string;
  values?: string;
  ethics_pledge?: string;
  profile_image_url?: string;
  portrait_image_url?: string;
  contact_number: string;
  whatsapp_number: string;
  location: string;
  updated_at?: string;
}

export interface AstrologyService {
  id: number;
  slug: string;
  title: string;
  short_description?: string;
  description?: string;
  icon: string;
  image_url?: string;
  price: number;
  currency: string;
  duration_minutes: number;
  consultation_method: string;
  display_order: number;
  is_active: number | boolean;
  is_featured: number | boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProblemCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
  icon: string;
  display_order: number;
  is_active: number | boolean;
  questions?: ProblemQuestion[];
  created_at?: string;
  updated_at?: string;
}

export interface ProblemQuestion {
  id: number;
  category_id: number;
  category_name?: string;
  service_id?: number | null;
  service_title?: string;
  question: string;
  description?: string;
  inquiry_btn_label: string;
  display_order: number;
  is_active: number | boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  location?: string;
  service_name?: string;
  rating: number;
  review_text: string;
  client_photo_url?: string;
  video_url?: string;
  is_featured: number | boolean;
  is_approved: number | boolean;
  is_published: number | boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Enquiry {
  id: number;
  booking_ref: string;
  full_name: string;
  phone: string;
  email?: string | null;
  dob?: string | null;
  birth_time?: string | null;
  birth_place?: string | null;
  service_id?: number | null;
  service_name?: string | null;
  preferred_date?: string | null;
  preferred_time_slot?: string | null;
  selected_problem?: string | null;
  message?: string | null;
  status: EnquiryStatus;
  source: string;
  created_at: string;
  updated_at?: string;
  notes?: EnquiryNote[];
}

export interface EnquiryNote {
  id: number;
  enquiry_id: number;
  admin_id?: number;
  admin_name?: string;
  note: string;
  created_at: string;
}

export interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text?: string;
  category: string;
  uploaded_by?: number;
  created_at: string;
}

export interface SeoMetadata {
  id: number;
  page_route: string;
  page_name: string;
  meta_title: string;
  meta_description: string;
  focus_keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  is_indexable: number | boolean;
  structured_data_json?: string;
  updated_at?: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  display_name: string;
  url: string;
  icon: string;
  is_active: number | boolean;
  display_order: number;
  updated_at?: string;
}

export interface ActivityLog {
  id: number;
  admin_id?: number;
  admin_name?: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}
