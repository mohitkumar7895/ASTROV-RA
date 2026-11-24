import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Navigation,
} from 'lucide-react';
import {
  getWebsiteSettings,
  getActiveServices,
  getSocialLinks,
  getSeoMetadata,
} from '@/lib/queries';
import { SectionHeader } from '@/components/common/SectionHeader';
import { BookingForm } from '@/components/forms/BookingForm';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/contact').catch(() => null);
  return {
    title: seo?.meta_title || 'Book Astrology Consultation | Contact Puneet Dwivedi – ASTROVÈRA',
    description:
      seo?.meta_description ||
      'Book your private Vedic astrology consultation with Puneet Dwivedi at ASTROVÈRA. Office in Mira Road East, Mumbai. Online video and phone consultations.',
  };
}

export default async function ContactPage() {
  const [settings, services, socialLinks] = await Promise.all([
    getWebsiteSettings().catch(() => ({} as Record<string, string>)),
    getActiveServices().catch(() => []),
    getSocialLinks().catch(() => []),
  ]);

  const phone = settings.contact_phone || '+91 96306 20240';
  const email = settings.contact_email || 'contact@astrovera.com';
  const address =
    settings.business_address ||
    'Mira Road East, Shanti Garden, Near Cluster 3, Mumbai, Maharashtra – 401107.';
  const hours =
    settings.business_hours || 'Monday – Sunday: 10:00 AM – 08:30 PM (IST)';
  const mapsUrl =
    settings.google_maps_url ||
    'https://maps.google.com/?q=Mira+Road+East+Shanti+Garden+Cluster+3+Mumbai+401107';

  const whatsappUrl = getAstrologerWhatsApp();
  const instagramUrl = settings.instagram_url || siteConfig.links.instagram;
  const facebookUrl = settings.facebook_url || siteConfig.links.facebook;
  const youtubeUrl = settings.youtube_url || siteConfig.links.youtube;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
      <SectionHeader
        badge="SANCTUARY &amp; APPOINTMENTS"
        title="Connect with Pandit Puneet Dwivedi"
        subtitle="Reserve your confidential consultation session or connect directly via phone, WhatsApp, or at our Mumbai consultation sanctuary."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mt-4 sm:mt-8">
        {/* Contact Details & Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 lg:p-8 shadow-navyGlow">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-astro-gold mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-astro-border/40">
              Consultation Information
            </h3>

            <div className="space-y-4 sm:space-y-6 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-astro-slate block font-accent">
                    Direct Phone Line
                  </span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="font-heading text-base font-bold text-astro-ivory hover:text-astro-gold transition-colors"
                  >
                    {phone}
                  </a>
                  <p className="text-[11px] text-astro-slate mt-0.5">Calls accepted 10 AM to 8:30 PM</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-astro-midnight border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-astro-slate block font-accent">
                    Instant WhatsApp
                  </span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-base font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {phone}
                  </a>
                  <p className="text-[11px] text-astro-slate mt-0.5">Direct chat with astrologer's desk</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-astro-slate block font-accent">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-body text-sm font-medium text-astro-ivory hover:text-astro-gold transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-astro-slate block font-accent">
                    Mumbai Office Sanctuary
                  </span>
                  <p className="font-body text-sm text-astro-ivory leading-relaxed">
                    {address}
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-astro-gold font-accent mt-2 hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-astro-slate block font-accent">
                    Consultation Hours
                  </span>
                  <p className="font-body text-sm text-astro-ivory">
                    {hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-astro-border/40">
              <span className="text-xs uppercase tracking-wider text-astro-slate block font-accent mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-astro-border bg-astro-midnight flex items-center justify-center text-emerald-400 hover:scale-105 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-astro-border bg-astro-midnight flex items-center justify-center text-astro-gold hover:scale-105 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-astro-border bg-astro-midnight flex items-center justify-center text-astro-gold hover:scale-105 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-astro-border bg-astro-midnight flex items-center justify-center text-astro-gold hover:scale-105 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Card */}
          <div className="p-6 rounded-2xl bg-[#0C1433] border border-astro-gold/40 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-astro-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading text-sm font-bold text-white">
                100% Confidentiality Guarantee
              </h4>
              <p className="text-xs text-[#E2E8F0] leading-relaxed font-body mt-1 font-normal sm:font-medium">
                Your birth details, contact number, questions, and session recordings remain
                strictly confidential and are never shared or sold under any circumstances.
              </p>
            </div>
          </div>

          {/* Mumbai Sanctuary Card with Luxury Photograph */}
          <div className="rounded-3xl bg-[#0C1433] border border-astro-border/70 overflow-hidden group">
            <div className="p-4 bg-astro-midnight flex items-center justify-between border-b border-astro-border">
              <span className="text-xs font-accent text-astro-gold uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Mira Road East, Mumbai
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-astro-slate hover:text-astro-ivory underline"
              >
                Open in Maps
              </a>
            </div>
            <div className="relative w-full h-56 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
              <Image
                src="/images/sanctuary-mumbai.jpg"
                alt="ASTROVÈRA Consultation Sanctuary Mumbai"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-astro-midnight via-astro-midnight/70 to-astro-midnight/40" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-astro-midnight/90 border border-astro-gold/60 flex items-center justify-center text-astro-gold mb-2 shadow-lg backdrop-blur-md">
                  <MapPin className="w-5 h-5 text-astro-gold animate-bounce" />
                </div>
                <p className="font-heading text-base font-bold text-astro-ivory drop-shadow-md">
                  ASTROVÈRA Consultation Sanctuary
                </p>
                <p className="text-xs text-astro-ivory/80 max-w-xs mt-1 drop-shadow-sm">
                  Shanti Garden, Near Cluster 3, Mira Road East, Mumbai 401107
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-4 py-1.5 rounded-full text-xs font-accent text-astro-midnight bg-gold-gradient font-semibold uppercase tracking-wider shadow-goldGlow hover:scale-105 transition-all"
                >
                  View Live Map &amp; Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form (7 cols) */}
        <div className="lg:col-span-7">
          <BookingForm services={services} />
        </div>
      </div>
    </div>
  );
}
