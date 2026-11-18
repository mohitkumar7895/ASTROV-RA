'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { HeroSection as HeroType, AstrologerProfile } from '@/types';

interface HeroProps {
  hero: HeroType | null;
  profile: AstrologerProfile | null;
}

export function HeroSection({ hero, profile }: HeroProps) {
  const headline = hero?.headline || 'Discover Your Destiny. Understand Your Universe.';
  const hindiTagline =
    hero?.hindi_tagline ||
    'Apne grahon ki sthiti, jeevan ke lakshyon aur bhavishya ki sambhavnayon ko samajhne ke liye personalised astrological guidance prapt karein.';
  const description =
    hero?.description ||
    'Connect with renowned Vedic astrologer Puneet Dwivedi for profound, compassionate, and precise cosmic guidance tailored to your birth chart.';
  const badgeText = hero?.badge_text || 'LUXURY MEETS SPIRITUALITY';
  const astrologerName = profile?.name || 'Puneet Dwivedi';
  const portraitUrl = hero?.astrologer_image_url || '/images/puneet-dwivedi-meditation.jpg';

  return (
    <section className="relative min-h-0 lg:min-h-[80vh] flex items-center justify-center pt-1 sm:pt-4 pb-4 sm:pb-8 lg:pb-10 overflow-hidden">
      {/* High-Resolution Deep Space Cosmic Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={hero?.hero_image_url || '/images/cosmic-galaxy-universe.jpg'}
          alt="Cosmic Galaxy Universe Background"
          fill
          priority
          className="object-cover object-center opacity-20 mix-blend-screen scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/96 via-[#080D24]/90 to-[#080D24]" />
      </div>

      {/* Subtle cosmic aura behind hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-astro-gold/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-astro-navy/90 border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-astro-gold animate-pulse" />
              <span>{badgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-astro-ivory leading-[1.18] sm:leading-[1.15] tracking-tight">
              {headline.split('.').map((part, index) => (
                <span key={index} className="block">
                  {index === 1 ? (
                    <span className="bg-gold-gradient bg-clip-text text-transparent">
                      {part.trim()}
                    </span>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </h1>

            {/* Astrologer Byline */}
            <div className="mt-3 sm:mt-4 flex items-center justify-center lg:justify-start gap-2">
              <p className="font-heading text-base sm:text-xl font-semibold text-astro-gold tracking-wider">
                Vedic Guidance by {astrologerName}
              </p>
            </div>

            {/* Hindi / Hinglish Tagline */}
            <p className="mt-3 sm:mt-5 text-[#F5D98B] font-body text-xs sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0C1433] border border-astro-gold/40 rounded-xl font-medium shadow-sm">
              &ldquo;{hindiTagline}&rdquo;
            </p>

            {/* English Description */}
            <p className="mt-3 sm:mt-4 text-[#E2E8F0] text-xs sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-body font-normal sm:font-medium">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="/contact"
                prefetch={true}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:shadow-goldGlowLg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 text-astro-midnight" />
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                prefetch={true}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-ivory border border-astro-border hover:border-astro-gold hover:bg-astro-navy/60 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-astro-gold" />
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              <div>
                <p className="font-heading text-lg sm:text-2xl font-bold text-astro-gold">15+ Years</p>
                <p className="text-[10px] sm:text-[11px] text-astro-slate uppercase tracking-wider font-accent">Vedic Scholarship</p>
              </div>
              <div>
                <p className="font-heading text-lg sm:text-2xl font-bold text-astro-gold">12,000+</p>
                <p className="text-[10px] sm:text-[11px] text-astro-slate uppercase tracking-wider font-accent">Charts Analyzed</p>
              </div>
              <div>
                <p className="font-heading text-lg sm:text-2xl font-bold text-astro-gold">100%</p>
                <p className="text-[10px] sm:text-[11px] text-astro-slate uppercase tracking-wider font-accent">Confidentiality</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Astrologer Portrait & Sacred Geometry (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center w-full"
          >
            {/* Celestial rotating frame */}
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px] aspect-[4/5] rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-astro-gold/30 via-astro-border/20 to-astro-gold/10 border border-astro-border shadow-navyGlow group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-astro-navy/90 border border-astro-border/40">
                <Image
                  src={portraitUrl}
                  alt="Puneet Dwivedi - Master Vedic Astrologer"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-astro-midnight via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-astro-midnight/90 border border-astro-border/70 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading text-sm font-bold text-astro-gold">
                        {astrologerName}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-astro-slate font-accent">
                        Master Vedic Astrologer • Mumbai
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-astro-gold/50 flex items-center justify-center bg-astro-navy text-astro-gold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
