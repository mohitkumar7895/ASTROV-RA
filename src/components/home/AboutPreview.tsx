'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, BookOpen, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { AstrologerProfile } from '@/types';

export function AboutPreview({ profile }: { profile: AstrologerProfile | null }) {
  const name = profile?.name || 'Puneet Dwivedi';
  const bio =
    profile?.short_bio ||
    'With over 15 years of dedicated Vedic scholarship, Puneet Dwivedi empowers individuals, entrepreneurs, and families with truthful astrological counsel.';
  const qualifications = Array.isArray(profile?.qualifications)
    ? profile.qualifications
    : [
        'Jyotish Praveena (Vedic Astrology Board)',
        'Kundli & Prashna Shastra Specialist',
        'Vedic Muhurta & Vastu Consultant',
      ];

  return (
    <section className="py-4 sm:py-8 lg:py-10 relative overflow-hidden">
      {/* Cosmic Celestial Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-celestial-deepspace.jpg"
          alt="Celestial Deep Space Galaxy"
          fill
          className="object-cover object-center opacity-25 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080D24]/98 via-[#080D24]/92 to-[#080D24]/98" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Image with Luxury Frame (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] aspect-[4/5] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-astro-gold/30 via-astro-border/20 to-astro-gold/10 border border-astro-border shadow-2xl">
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-astro-midnight">
                <Image
                  src={profile?.portrait_image_url || '/images/puneet-dwivedi-portrait.jpg'}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-astro-midnight via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-astro-navy/90 border border-astro-gold/30 text-center">
                  <p className="font-heading text-[10px] sm:text-xs font-bold text-astro-gold uppercase tracking-wider">
                    Official Astrologer Profile
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-astro-slate font-accent">
                    Mumbai, Maharashtra • Non-Superstitious Guidance
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Core Values (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-astro-navy border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-3 sm:mb-4">
              <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-astro-gold" />
              <span>About Astrologer</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-astro-ivory leading-tight">
              Guided by Vedic Master <br />
              <span className="bg-gold-gradient bg-clip-text text-transparent">{name}</span>
            </h2>

            <p className="mt-3 sm:mt-5 text-[#E2E8F0] text-sm sm:text-base lg:text-lg leading-relaxed font-body font-normal sm:font-medium">
              {bio}
            </p>

            <p className="mt-2.5 sm:mt-4 text-[#CBD5E1] text-xs sm:text-sm leading-relaxed font-body">
              Puneet Dwivedi considers astrology not as passive fatalism, but as a cosmic
              compass. Based in Mumbai, he bridges ancient Sanskrit scriptures with the
              realities of modern corporate careers, inter-personal relations, and spiritual
              growth.
            </p>

            {/* Key Qualifications */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
              {qualifications.slice(0, 3).map((q, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-astro-ivory font-body">
                  <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Link
                href="/about"
                prefetch={true}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Read Full Biography &amp; Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-xs font-accent text-astro-slate">
                <Shield className="w-4 h-4 text-astro-gold" />
                <span>Zero Fear-Mongering • 100% Confidential</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
