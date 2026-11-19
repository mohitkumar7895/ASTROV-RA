'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Compass,
  GraduationCap,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Laptop,
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { getClassesWhatsAppUrl } from '@/lib/whatsapp';
import { useBooking } from '@/context/BookingContext';

export function VedicEducationSection() {
  const { openBookingForService } = useBooking();
  const whatsappUrl = getClassesWhatsAppUrl();

  const handleApplyNow = () => {
    openBookingForService(9, 'Vedic Astrology & Scripture Masterclasses');
  };

  return (
    <section id="vedic-education" className="py-6 sm:py-10 lg:py-14 relative overflow-hidden bg-[#070B1E]">
      {/* Subtle Cosmic Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-celestial-deepspace.jpg"
          alt="Cosmic Background"
          fill
          className="object-cover object-center opacity-10 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24] via-transparent to-[#080D24]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badges & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-astro-navy border border-astro-gold/60 text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-3 shadow-goldGlow">
            <GraduationCap className="w-3.5 h-3.5 text-astro-gold" />
            <span>ONLINE PROFESSIONAL GURUKUL • LEARN FROM THE MASTER</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Learn Vedic Astrology &amp; Sacred Hindu Scriptures
          </h2>

          <p className="mt-2.5 sm:mt-3.5 text-[#E2E8F0] text-xs sm:text-base leading-relaxed font-body font-normal sm:font-medium">
            Pandit Puneet Dwivedi personally mentors seekers and students worldwide through
            structured, professional online masterclasses in authentic Jyotish Shastra and eternal Hindu scriptures.
          </p>

          {/* Urgent Batch Alert Banner */}
          <div className="mt-4 sm:mt-5 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-astro-gold/20 to-amber-500/20 border border-astro-gold/60 text-astro-goldLight text-xs sm:text-sm font-accent font-semibold shadow-goldGlow animate-pulse">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span>⚡ HURRY UP! LIMITED SEATS AVAILABLE PER BATCH</span>
            <span className="text-astro-ivory/60 hidden sm:inline">•</span>
            <span className="text-white">100% Professional Online Live Classes</span>
          </div>
        </div>

        {/* 3 Core Pillars of Learning */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Card 1: Vedic Astrology Education */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border-2 border-astro-gold/40 hover:border-astro-gold/80 p-5 sm:p-7 flex flex-col justify-between shadow-navyGlow hover:shadow-goldGlow transition-all duration-300 group relative">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-astro-border/40">
                <div className="w-11 h-11 rounded-2xl bg-[#080D24] border border-astro-gold/60 flex items-center justify-center text-astro-gold shadow-sm group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-astro-gold" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-accent font-bold uppercase tracking-wider text-astro-gold px-2.5 py-1 rounded-full bg-astro-midnight border border-astro-border">
                  Jyotish Curriculum
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-astro-gold transition-colors">
                1. Vedic Astrology Education
              </h3>

              <p className="text-xs sm:text-sm text-[#CBD5E1] font-body leading-relaxed mb-4">
                Master the fundamental mechanics of classical Parashari Jyotish from mathematical fundamentals to advanced predictive synthesis:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#E2E8F0] font-body">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Kundli Reading:</strong> Step-by-step casting and decoding of Janam Kundli charts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Navagrahas (Nine Planets):</strong> Strengths, states (Avasthas), and cosmic influences.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>12 Rashis:</strong> Deep traits, elements, and lordships of all twelve signs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>27 Nakshatras:</strong> Sacred lunar mansions, padas, and subtle behavioral impacts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>12 Bhavas (Houses):</strong> Domains of wealth, career, relations, health, and moksha.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-astro-border/40 text-[11px] text-astro-gold font-accent font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Structured Pedagogy</span>
            </div>
          </div>

          {/* Card 2: Knowledge of Hindu Scriptures & Puranas */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border-2 border-astro-gold/40 hover:border-astro-gold/80 p-5 sm:p-7 flex flex-col justify-between shadow-navyGlow hover:shadow-goldGlow transition-all duration-300 group relative">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-astro-border/40">
                <div className="w-11 h-11 rounded-2xl bg-[#080D24] border border-astro-gold/60 flex items-center justify-center text-astro-gold shadow-sm group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5 text-astro-gold" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-accent font-bold uppercase tracking-wider text-astro-gold px-2.5 py-1 rounded-full bg-astro-midnight border border-astro-border">
                  Sanatan Heritage
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-astro-gold transition-colors">
                2. Hindu Scriptures &amp; Puranas
              </h3>

              <p className="text-xs sm:text-sm text-[#CBD5E1] font-body leading-relaxed mb-4">
                Immerse yourself in authentic spiritual wisdom directly from revered Sanatan scriptures, expounded with scholarly clarity:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#E2E8F0] font-body">
                <li className="flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Shrimad Bhagavata Purana:</strong> Divine Leelas, universal creation, and supreme surrender.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Shiva Purana:</strong> The eternal cosmic consciousness, Mahadev principles, and inner mastery.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Vishnu Purana:</strong> Cosmic cycles, preservation, avatars, and dharmic equilibrium.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Hindu Dharma &amp; Traditions:</strong> Scientific roots of rituals, sanskaras, and daily spiritual life.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Ancient Indian Philosophy:</strong> The timeless truths of the Upanishads and Darshanas.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-astro-border/40 text-[11px] text-astro-gold font-accent font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Shastric Discourses</span>
            </div>
          </div>

          {/* Card 3: Bhagavad Gita Teachings */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border-2 border-astro-gold/40 hover:border-astro-gold/80 p-5 sm:p-7 flex flex-col justify-between shadow-navyGlow hover:shadow-goldGlow transition-all duration-300 group relative">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-astro-border/40">
                <div className="w-11 h-11 rounded-2xl bg-[#080D24] border border-astro-gold/60 flex items-center justify-center text-astro-gold shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-astro-gold" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-accent font-bold uppercase tracking-wider text-astro-gold px-2.5 py-1 rounded-full bg-astro-midnight border border-astro-border">
                  Gita Darshan
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-astro-gold transition-colors">
                3. Bhagavad Gita Teachings
              </h3>

              <p className="text-xs sm:text-sm text-[#CBD5E1] font-body leading-relaxed mb-4">
                Discover actionable spiritual intelligence to conquer anxiety, resolve ethical crossroads, and live with clarity:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#E2E8F0] font-body">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Karma Yoga:</strong> Selfless right action without being paralyzed by outcomes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Bhakti Yoga:</strong> Awakening supreme devotion, pure heart connection, and peace.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Jnana Yoga:</strong> The highest discernment between the transient body and immortal soul.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Dharma &amp; Moral Duties:</strong> Navigating complex familial and professional dilemmas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-astro-gold shrink-0 mt-0.5" />
                  <span><strong>Self-Realisation:</strong> Living rooted in inner calm and continuous spiritual evolution.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-astro-border/40 text-[11px] text-astro-gold font-accent font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Timeless Life Leadership</span>
            </div>
          </div>
        </div>

        {/* Student Admission & Fee Inquiry Highlight Box */}
        <div className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0C1433] via-astro-navy to-[#0C1433] border-2 border-astro-gold/60 p-5 sm:p-8 lg:p-10 shadow-goldGlow flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-astro-midnight border border-astro-gold text-astro-gold text-[10px] sm:text-xs font-accent tracking-wider uppercase font-semibold">
              <Clock className="w-3.5 h-3.5 text-astro-gold animate-spin" style={{ animationDuration: '8s' }} />
              <span>Upcoming Online Batch Enrolment Open</span>
            </div>
            <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-white">
              Ready to Learn Directly from Pandit Puneet Dwivedi?
            </h3>
            <p className="text-xs sm:text-sm text-[#E2E8F0] font-body leading-relaxed">
              Classes are conducted <strong>live online in a professional, interactive format</strong> with comprehensive course notes.
              Seats are strictly limited to maintain individual attention. <strong>Inquire for fees and batch schedule.</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] text-[#CBD5E1] font-accent">
              <span className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-astro-gold" /> Live Google Meet / Zoom
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-astro-gold" /> Flexible Weekend &amp; Evening Slots
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-astro-gold" /> Personal Q&amp;A Sessions
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            {/* WhatsApp Inquiry Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-accent font-bold tracking-widest uppercase text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enquire About Classes (WhatsApp)</span>
            </a>

            {/* Booking Form Admission Button */}
            <button
              onClick={handleApplyNow}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-accent font-bold tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
            >
              <Calendar className="w-4 h-4 text-astro-midnight" />
              <span>Inquire For Fees &amp; Seats</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
