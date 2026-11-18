'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Heart,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Calendar,
  Flame,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Info,
} from 'lucide-react';
import { ProblemCategory, ProblemQuestion } from '@/types';
import { useBooking } from '@/context/BookingContext';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function ProblemsClient({ categories = [] }: { categories: ProblemCategory[] }) {
  const { openBookingForQuestion } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories =
    selectedCategory === 'all'
      ? categories
      : categories.filter((cat) => cat.slug === selectedCategory);

  const handleWhatsAppEnquiry = (question: string) => {
    const text = `Namaste Pandit Puneet Dwivedi Ji, I need astrological guidance regarding this question: "${question}". How can we proceed with a reading?`;
    const url = buildWhatsAppLink('919630620240', text);
    window.open(url, '_blank');
  };

  return (
    <div className="py-4 sm:py-10 lg:py-16">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 lg:mb-14">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase transition-all ${selectedCategory === 'all'
            ? 'bg-gold-gradient text-astro-midnight shadow-goldGlow'
            : 'bg-astro-navy/80 text-astro-slate border border-astro-border hover:text-astro-ivory'
            }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${selectedCategory === cat.slug
              ? 'bg-gold-gradient text-astro-midnight shadow-goldGlow'
              : 'bg-astro-navy/80 text-astro-slate border border-astro-border hover:text-astro-ivory'
              }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Category Sections */}
      <div className="space-y-6 sm:space-y-10 lg:space-y-16">
        <AnimatePresence>
          {filteredCategories.map((category) => {
            const isCareer = category.slug === 'career';
            const isLove = category.slug === 'love-life';

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border border-astro-border/70 p-3.5 sm:p-6 md:p-10 shadow-navyGlow"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 mb-4 sm:mb-8 border-b border-astro-border/40">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold shrink-0">
                      {isCareer ? (
                        <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-astro-gold" />
                      ) : isLove ? (
                        <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-rose-400" />
                      ) : (
                        <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-astro-gold" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-white">
                        {category.name}
                      </h2>
                      <p className="text-[#E2E8F0] text-xs sm:text-sm font-body font-normal sm:font-medium mt-0.5">
                        {category.description || 'Targeted Vedic guidance and remedies for this sphere'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs font-accent uppercase tracking-widest text-astro-gold/90 px-2.5 sm:px-3 py-1 rounded-full bg-astro-midnight border border-astro-border/60 self-start sm:self-auto">
                    {category.questions?.length || 0} Key Questions
                  </span>
                </div>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                  {(category.questions || []).map((q: ProblemQuestion) => (
                    <div
                      key={q.id}
                      className="rounded-xl sm:rounded-2xl bg-[#080D24] border border-astro-border/60 p-3.5 sm:p-6 flex flex-col justify-between hover:border-astro-gold/60 hover:shadow-goldGlow transition-all group"
                    >
                      <div>
                        <div className="flex items-start gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                          <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold shrink-0 mt-0.5" />
                          <h3 className="font-heading text-sm sm:text-lg font-bold text-white group-hover:text-astro-gold transition-colors">
                            {q.question}
                          </h3>
                        </div>

                        {q.description && (
                          <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed font-body pl-0 sm:pl-8 mb-3 sm:mb-5">
                            {q.description}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons: Inquiry & WhatsApp */}
                      <div className="pt-3 sm:pt-4 border-t border-astro-border/40 flex items-center justify-between gap-3 pl-0 sm:pl-8">
                        {/* Auto-select inquiry button */}
                        <button
                          onClick={() => openBookingForQuestion(q.question, q.service_id, q.service_title)}
                          className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5 text-astro-midnight" />
                          <span>{q.inquiry_btn_label || 'Inquiry'}</span>
                        </button>

                        {/* WhatsApp enquiry */}
                        <button
                          onClick={() => handleWhatsAppEnquiry(q.question)}
                          className="p-1.5 sm:p-2 rounded-full text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors"
                          title="Ask via WhatsApp"
                          aria-label={`Ask via WhatsApp regarding: ${q.question}`}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Special Information Banner: Chat, Puja & Shanti Vidhan with Pandit Puneet Dwivedi Havan Image */}
      <div className="mt-8 sm:mt-12 lg:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-astro-navy via-astro-midnight to-astro-navy border border-astro-gold/40 p-4 sm:p-8 lg:p-12 shadow-navyGlow relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/puneet-dwivedi-havan.jpg"
            alt="Pandit Puneet Dwivedi Performing Sacred Vedic Havan &amp; Puja Vidhan"
            fill
            className="object-cover object-right opacity-30 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-astro-midnight via-astro-midnight/90 to-astro-midnight/40" />
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-astro-midnight border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-3 sm:mb-4">
            <Flame className="w-3.5 h-3.5 text-astro-gold" />
            <span>Spiritual Remedies &amp; Remedial Vidhan</span>
          </div>

          <h3 className="font-heading text-xl sm:text-3xl font-bold text-astro-ivory mb-2 sm:mb-4">
            Express Chat, Puja &amp; Shanti Vidhan Services
          </h3>

          <p className="text-astro-slate text-xs sm:text-base leading-relaxed font-body mb-4 sm:mb-6">
            In addition to full video consultations, Pandit Puneet Dwivedi offers
            urgent <strong className="text-astro-ivory">Express Chat Consultations</strong> for
            immediate single-question clarity, as well as authentic{' '}
            <strong className="text-astro-ivory">Puja &amp; Shanti Vidhan</strong> (Navagraha Shanti,
            Rahu-Ketu dosh nivaran, and Kaal Sarp remedials).
          </p>

          <div className="flex items-center gap-2 text-xs font-accent text-astro-gold mb-4 sm:mb-6 bg-astro-midnight/60 p-2.5 sm:p-3 rounded-xl border border-astro-border/40 inline-flex">
            <Info className="w-4 h-4 shrink-0" />
            <span>Note: All specialized Puja rituals are subject to prior schedule confirmation by the astrologer.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all"
            >
              Enquire About Puja Vidhan
            </Link>
            <Link
              href="/services"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-ivory border border-astro-border hover:border-astro-gold transition-all"
            >
              View Service Details
            </Link>
          </div>
        </div>
      </div>

      {/* OM NAMAH SHIVAYA & Non-Guarantee Ethical Declaration */}
      <div className="mt-8 sm:mt-12 lg:mt-16 text-center py-6 sm:py-10 lg:py-12 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-astro-midnight border border-astro-border/40">
        <p className="font-heading text-xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-astro-gold mb-1.5 sm:mb-2">
          ॐ नमः शिवाय • OM NAMAH SHIVAYA
        </p>
        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-astro-slate font-accent mb-4 sm:mb-6">
          Vedic Consciousness • Self-Knowledge • Karmic Alignment
        </p>

        <div className="max-w-2xl mx-auto p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-astro-navy/40 border border-astro-border/30 text-xs text-astro-slate leading-relaxed flex items-start gap-2.5 sm:gap-3 text-left">
          <ShieldAlert className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold shrink-0 mt-0.5" />
          <span>
            <strong>Ethical Practice Notice:</strong> In adherence to authentic Vedic tradition and legal ethics,
            we do not make guaranteed predictions or claims regarding medical cures, guaranteed wealth,
            lottery wins, or mandatory relationship reunions. Our guidance is designed for clarity, strategy,
            and inner alignment.
          </span>
        </div>
      </div>
    </div>
  );
}
