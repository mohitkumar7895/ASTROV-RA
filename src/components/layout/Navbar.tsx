'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Phone, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import { publicNavItems } from '@/config/navigation';
import { useApp } from '@/context/AppContext';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';

export function Navbar() {
  const pathname = usePathname();
  const { settings, announcementDismissed, dismissAnnouncement } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const showAnnouncement =
    settings.announcement_bar_enabled !== 'false' && !announcementDismissed;

  const phone = settings.contact_phone || '+91 96306 20240';
  const whatsappUrl = getAstrologerWhatsApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-astro-midnight via-[#131F46] to-astro-midnight border-b border-astro-border/50 py-1.5 sm:py-2 px-3 sm:px-4 text-[11px] sm:text-xs font-accent text-astro-goldLight flex items-center justify-between shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-center flex-1 px-1">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-astro-gold shrink-0 animate-pulse" />
            <span className="truncate max-w-[85vw] sm:max-w-none">
              {settings.announcement_bar_text ||
                '✨ Personalised Vedic Astrological Consultations with Puneet Dwivedi | Reserve Your Session'}
            </span>
          </div>
          <button
            onClick={dismissAnnouncement}
            className="text-astro-slate hover:text-astro-gold transition-colors p-1 shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080D24]/95 backdrop-blur-xl border-b border-astro-border/30 py-3 shadow-navyGlow'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full border border-astro-gold/70 flex items-center justify-center bg-astro-navy/90 group-hover:border-astro-gold group-hover:shadow-goldGlow transition-all duration-300">
              <span className="font-heading font-bold text-astro-gold text-base tracking-wider">AV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.18em] text-astro-ivory group-hover:text-astro-goldLight transition-colors">
                ASTROVÈRA
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-astro-gold font-accent -mt-0.5">
                Vedic Astrology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links Pill (EXACTLY 6 PUBLIC PAGES) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-astro-navy/60 border border-astro-border/40 backdrop-blur-md shadow-sm">
            {publicNavItems.map((item) => {
              const isActive = pathname === item.href;
              const label = item.shortTitle || item.title;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-accent tracking-wider uppercase transition-all duration-200 relative ${
                    isActive
                      ? 'bg-astro-midnight text-astro-gold font-bold border border-astro-gold/40 shadow-sm'
                      : 'text-[#E2E8F0] font-medium hover:text-white hover:bg-astro-navy/60'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Book Consultation Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5 text-astro-midnight" />
              <span>Book Consultation</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-astro-ivory hover:text-astro-gold hover:bg-astro-navy/60 transition-colors border border-astro-border/40 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-astro-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/75 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-50 lg:hidden bg-[#0A102A]/98 border-b border-astro-border/70 backdrop-blur-2xl px-5 pt-3 pb-8 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-2">
                {publicNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-accent py-3 px-4 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'text-astro-gold bg-astro-navy border-l-4 border-astro-gold font-bold shadow-sm'
                          : 'text-astro-ivory hover:text-astro-gold hover:bg-astro-navy/50'
                      }`}
                    >
                      <span>{item.title}</span>
                      {isActive ? (
                        <Sparkles className="w-4 h-4 text-astro-gold" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-astro-slate/60" />
                      )}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-astro-border/40 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 rounded-full text-xs font-accent font-bold tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow flex items-center justify-center gap-2"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-accent font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-accent font-medium text-astro-gold bg-astro-midnight border border-astro-border hover:bg-astro-navy"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
