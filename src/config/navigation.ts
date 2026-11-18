export interface NavItem {
  title: string;
  shortTitle?: string;
  href: string;
  description?: string;
}

export const publicNavItems: NavItem[] = [
  { title: "Home", shortTitle: "Home", href: "/" },
  { title: "Problems We Help With", shortTitle: "Problems", href: "/problems" },
  { title: "About Astrologer", shortTitle: "About", href: "/about" },
  { title: "Astrology Services", shortTitle: "Services", href: "/services" },
  { title: "Testimonials", shortTitle: "Testimonials", href: "/testimonials" },
  { title: "Contact & Booking", shortTitle: "Contact", href: "/contact" },
];

export interface AdminNavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  permission?: string;
}

export const adminNavItems: AdminNavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { title: "Bookings & Enquiries", href: "/admin/bookings", icon: "CalendarCheck" },
  { title: "Website CMS", href: "/admin/content", icon: "FileText" },
  { title: "Astrology Services", href: "/admin/services", icon: "Sparkles" },
  { title: "Problems & Questions", href: "/admin/problems", icon: "HelpCircle" },
  { title: "Testimonials", href: "/admin/testimonials", icon: "Quote" },
  { title: "Media Library", href: "/admin/media", icon: "Image" },
  { title: "SEO Management", href: "/admin/seo", icon: "Search" },
  { title: "Website Settings", href: "/admin/settings", icon: "Settings" },
  { title: "Admin Users", href: "/admin/users", icon: "Users" },
];
