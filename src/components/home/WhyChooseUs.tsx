'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Compass,
  Cpu,
  HeartHandshake,
  Sparkles,
  Lock,
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const reasons = [
  {
    icon: Compass,
    title: 'Authentic Classical Lineage',
    desc: 'Rooted firmly in Parashari Hora Shastra and Jaimini Sutras, avoiding superficial sun-sign generalities.',
  },
  {
    icon: Cpu,
    title: 'Mathematical Precision',
    desc: 'In-depth analysis of Bhavas, planetary shadbala strengths, dasha transitions, and divisional charts (D-9, D-10).',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Fear-Mongering',
    desc: 'We never exploit vulnerabilities with fabricated curses or expensive fear-driven rituals. You receive honest, empowering clarity.',
  },
  {
    icon: Lock,
    title: 'Strict Confidentiality',
    desc: 'All consultations, birth details, and personal dilemmas are treated with medical-grade discretion and utmost privacy.',
  },
  {
    icon: Sparkles,
    title: 'Actionable Remedials',
    desc: 'Practical remedies including sacred Vedic mantras, gemstone guidance, karma alignment, and auspicious timing (Muhurta).',
  },
  {
    icon: HeartHandshake,
    title: 'Direct Personal Counsel',
    desc: 'Every chart is decoded personally by Master Astrologer Puneet Dwivedi—ensuring deep attention and bespoke wisdom.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-4 sm:py-8 lg:py-10 relative overflow-hidden">
      {/* Cosmic Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-galaxy-universe.jpg"
          alt="Cosmic Universe Galaxy"
          fill
          className="object-cover object-center opacity-20 mix-blend-screen scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/98 via-[#080D24]/92 to-[#080D24]/98" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="THE ASTROVÈRA DIFFERENCE"
          title="Why Conscious Seekers Choose Us"
          subtitle="We unite the spiritual depth of ancient Vedic wisdom with the discernment and clarity expected by modern professionals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#0C1433] border border-astro-border/70 hover:border-astro-gold/50 transition-all duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold mb-3 sm:mb-5 group-hover:scale-110 group-hover:border-astro-gold transition-all">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-astro-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#E2E8F0] text-xs sm:text-sm leading-relaxed font-body font-normal sm:font-medium">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
