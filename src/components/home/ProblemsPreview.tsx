'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProblemCategory } from '@/types';
import { useBooking } from '@/context/BookingContext';

export function ProblemsPreview({ categories = [] }: { categories: ProblemCategory[] }) {
  const { openBookingForQuestion } = useBooking();

  return (
    <section className="py-4 sm:py-8 lg:py-10 relative overflow-hidden">
      {/* Cosmic Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-galaxy-universe.jpg"
          alt="Cosmic Universe Background"
          fill
          className="object-cover object-center opacity-15 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/98 via-[#080D24]/92 to-[#080D24]/98" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="TARGETED LIFE GUIDANCE"
          title="Problems We Help You Navigate"
          subtitle="Real questions from real lives. Explore Vedic astrological answers for career transitions, relationships, and major personal crossroads."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.slice(0, 3).map((category, catIdx) => {
            const icon =
              category.slug === 'career' ? (
                <Briefcase className="w-5 h-5 text-astro-gold" />
              ) : category.slug === 'love-life' ? (
                <Heart className="w-5 h-5 text-rose-400" />
              ) : (
                <Sparkles className="w-5 h-5 text-astro-gold" />
              );

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 lg:p-7 flex flex-col justify-between hover:border-astro-gold/50 transition-all shadow-navyGlow"
              >
                <div>
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-1 sm:pb-2">
                    <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-astro-gold tracking-wider">
                        {category.name}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] text-[#CBD5E1] font-accent">
                        Common Astrological Dilemmas
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-4">
                    {(category.questions || []).slice(0, 3).map((q) => (
                      <li
                        key={q.id}
                        className="p-2.5 sm:p-3.5 rounded-xl bg-[#080D24] border border-astro-border/50 hover:border-astro-gold/50 transition-all flex flex-col justify-between group"
                      >
                        <div className="flex items-start gap-2 sm:gap-2.5">
                          <HelpCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm font-medium text-white font-body leading-snug">
                            {q.question}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-3 flex justify-end">
                          <button
                            onClick={() => openBookingForQuestion(q.question, q.service_id, q.service_title)}
                            className="text-[10px] sm:text-[11px] font-accent uppercase tracking-wider text-astro-gold hover:text-astro-goldLight font-semibold flex items-center gap-1 group-hover:underline"
                          >
                            <span>Inquiry</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 sm:mt-6 pt-2 text-center">
                  <Link
                    href="/problems"
                    prefetch={true}
                    className="text-xs font-accent text-astro-slate hover:text-astro-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>View all questions in {category.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-12 text-center">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all"
          >
            <span>Explore All 3 Categories &amp; Questions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
