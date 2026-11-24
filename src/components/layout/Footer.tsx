'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Lock,
} from 'lucide-react';
import { publicNavItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { useApp } from '@/context/AppContext';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';

export function Footer() {
  const { settings } = useApp();
  const phone = settings.contact_phone || '+91 96306 20240';
  const email = settings.contact_email || 'contact@astrovera.com';
  const address =
    settings.business_address ||
    'Mira Road East, Shanti Garden, Near Cluster 3, Mumbai, Maharashtra – 401107.';
  const hours =
    settings.business_hours || 'Monday – Sunday: 10:00 AM – 08:30 PM (IST)';
  const copyright =
    settings.footer_copyright ||
    '© 2026 ASTROVÈRA. All Rights Reserved. Crafted for Conscious Souls.';
  const whatsappUrl = getAstrologerWhatsApp();
  const instagramUrl = settings.instagram_url || siteConfig.links.instagram;
  const facebookUrl = settings.facebook_url || siteConfig.links.facebook;
  const youtubeUrl = settings.youtube_url || siteConfig.links.youtube;

  return (
    <footer className="relative bg-[#050817] text-astro-ivory pt-8 pb-6 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-12 overflow-hidden z-10">
      {/* Cosmic Galaxy Footer Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-celestial-deepspace.jpg"
          alt="Cosmic Galaxy Universe Background"
          fill
          className="object-cover object-bottom opacity-15 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050817] via-[#050817]/92 to-[#050817]/98" />
      </div>

      {/* Decorative cosmic glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-astro-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sacred Mantra Banner */}
        <div className="text-center py-3.5 sm:py-5 mb-6 sm:mb-10 lg:mb-12 bg-astro-navy/30 rounded-2xl backdrop-blur-sm px-4">
          <p className="font-heading text-sm sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.3em] text-astro-gold font-bold break-words">
            ॐ नमः शिवाय • OM NAMAH SHIVAYA • ॐ नमः शिवाय
          </p>
          <p className="text-[10px] sm:text-xs font-accent text-astro-slate uppercase tracking-widest mt-1">
            Invocation of Universal Harmony, Wisdom &amp; Inner Peace
          </p>
        </div>

        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-14">
          {/* Col 1: Brand & Astrologer */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-astro-gold flex items-center justify-center bg-astro-navy text-astro-gold font-heading font-bold text-base">
                AV
              </div>
              <span className="font-heading text-2xl font-bold tracking-widest text-astro-ivory">
                ASTROVÈRA
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-astro-gold font-accent mb-3">
              Luxury Meets Spirituality
            </p>
            <p className="text-astro-slate text-sm leading-relaxed mb-4">
              Guided by Master Vedic Astrologer{' '}
              <strong className="text-astro-ivory font-semibold">Puneet Dwivedi</strong>.
              We provide authentic Jyotish consultations, Janam Kundli analysis, and
              practical remedials for career, marriage, and life transformations.
            </p>
            <div className="flex items-center gap-2 text-xs text-astro-gold font-accent">
              <ShieldCheck className="w-4 h-4 text-astro-gold" />
              <span>100% Confidential &amp; Ethical Counsel</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (6 Public Pages) */}
          <div>
            <h3 className="font-heading text-base font-bold text-astro-gold tracking-wider uppercase mb-5 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Quick Navigation
            </h3>
            <ul className="space-y-2.5">
              {publicNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-astro-slate hover:text-astro-gold transition-colors text-sm font-body flex items-center gap-2"
                  >
                    <span className="text-astro-gold/50 text-xs">✦</span>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-astro-border/40">
                <Link
                  href="/#vedic-education"
                  className="text-astro-gold hover:text-astro-goldLight transition-colors text-xs font-accent font-bold flex items-center gap-1.5"
                >
                  <span className="text-amber-400">⚡</span>
                  <span>Vedic Classes &amp; Scriptures (Gurukul)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h3 className="font-heading text-base font-bold text-astro-gold tracking-wider uppercase mb-5">
              Consultation Hub
            </h3>
            <ul className="space-y-3.5 text-sm text-astro-slate">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-astro-gold shrink-0 mt-1" />
                <span className="leading-snug">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-astro-gold shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="hover:text-astro-gold transition-colors text-astro-ivory font-medium"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  WhatsApp: {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-astro-gold shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-astro-gold transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Spiritual Assurance & Social */}
          <div>
            <h3 className="font-heading text-base font-bold text-astro-gold tracking-wider uppercase mb-5">
              Consultation Protocols
            </h3>
            <p className="text-xs text-astro-slate leading-relaxed mb-4">
              All sessions are conducted with utmost discretion. You can choose
              between confidential Google Meet / Zoom Video, direct Voice Call, or
              in-person appointments at our Mumbai sanctuary.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-astro-border bg-astro-navy flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-astro-border bg-astro-navy flex items-center justify-center text-astro-gold hover:bg-astro-gold hover:text-astro-midnight transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-astro-border bg-astro-navy flex items-center justify-center text-astro-gold hover:bg-astro-gold hover:text-astro-midnight transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-astro-border bg-astro-navy flex items-center justify-center text-astro-gold hover:bg-astro-gold hover:text-astro-midnight transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <Link
              href="/contact"
              className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient hover:shadow-goldGlow transition-all"
            >
              Book Puneet Dwivedi
            </Link>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="p-4 rounded-xl bg-astro-navy/40 border border-astro-border/30 text-[11px] text-astro-slate/80 leading-relaxed mb-8">
          <strong className="text-astro-gold font-semibold uppercase tracking-wider block mb-1">
            Ethical Guidance Disclaimer:
          </strong>
          Astrology is an interpretive Vedic science offering cosmic insight, karmic
          self-awareness, and holistic guidance. ASTROVÈRA and Pandit Puneet Dwivedi do
          not make guaranteed predictions or claims regarding medical conditions, legal
          rulings, financial returns, or irreversible relationship outcomes. All remedial
          measures, pujas, and gem recommendations are traditional spiritual practices
          subject to client free will.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-astro-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-astro-slate">
          <div>{copyright}</div>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="text-astro-slate/60 hover:text-astro-gold flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
