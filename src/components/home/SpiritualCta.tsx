'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, MessageCircle, Shield } from 'lucide-react';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';

export function SpiritualCta() {
  const whatsappUrl = getAstrologerWhatsApp();

  return (
    <section className="py-5 sm:py-8 lg:py-12 relative overflow-hidden bg-astro-midnight">
      {/* Background Cosmic AI Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cosmic-galaxy-universe.jpg"
          alt="Cosmic Planetary Alignments and Galaxy"
          fill
          className="object-cover object-center opacity-30 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24] via-[#080D24]/85 to-[#080D24]" />
      </div>

      {/* Background radial gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-astro-gold/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Sacred Mantra Header */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#0C1433] border border-astro-gold/40 text-astro-gold text-[10px] sm:text-xs font-accent tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-6 shadow-sm">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-astro-gold animate-pulse" />
          <span>ॐ नमः शिवाय • OM NAMAH SHIVAYA</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
          Step into Clarity. Align Your Actions with Celestial Law.
        </h2>

        <p className="mt-3 sm:mt-6 text-[#E2E8F0] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-body leading-relaxed font-normal sm:font-medium">
          Book your private Vedic consultation with Pandit Puneet Dwivedi. Discover the
          deeper karmic currents shaping your career, marriage, health, and family harmony.
        </p>

        {/* CTA Buttons */}
        <div className="mt-5 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            prefetch={true}
            className="w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:shadow-goldGlowLg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-astro-midnight" />
            <span>Book Your Consultation</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Quick Inquiry</span>
          </a>
        </div>

        {/* Ethical disclaimer footer note */}
        <div className="mt-6 sm:mt-10 pt-3 sm:pt-4 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-astro-slate/80 font-accent">
          <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0" />
          <span>Ethical Vedic Consultations • No False Guarantees • Complete Privacy</span>
        </div>
      </div>
    </section>
  );
}
