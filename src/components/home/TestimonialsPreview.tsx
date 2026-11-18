'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Testimonial } from '@/types';
import { getInitials } from '@/lib/utils';

export function TestimonialsPreview({ testimonials = [] }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-4 sm:py-8 lg:py-10 relative overflow-hidden">
      {/* Cosmic Celestial Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-celestial-deepspace.jpg"
          alt="Celestial Deep Space Galaxy Background"
          fill
          className="object-cover object-center opacity-20 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/98 via-[#080D24]/92 to-[#080D24]/98" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="CLIENT EXPERIENCES"
          title="Words of Gratitude &amp; Transformation"
          subtitle="Genuine experiences from seekers who found clarity, solace, and strategic direction through consultations with Puneet Dwivedi."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 lg:p-8 flex flex-col justify-between hover:border-astro-gold/50 shadow-navyGlow relative group"
            >
              <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 text-astro-gold/20 group-hover:text-astro-gold/40 transition-colors" />

              <div>
                {/* 5 Star Ratings */}
                <div className="flex items-center gap-1 mb-2.5 sm:mb-4 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-amber-400" />
                  ))}
                </div>

                <p className="text-[#F1F5F9] text-xs sm:text-sm leading-relaxed font-body mb-4 sm:mb-6 font-normal sm:font-medium">
                  &ldquo;{item.review_text}&rdquo;
                </p>
              </div>

              <div className="pt-3 sm:pt-4 flex items-center gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-astro-midnight border border-astro-gold/60 flex items-center justify-center font-heading font-bold text-astro-gold text-xs sm:text-sm shadow-sm">
                  {getInitials(item.client_name)}
                </div>
                <div>
                  <h4 className="font-heading text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.client_name}</span>
                    <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-astro-gold shrink-0" />
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#CBD5E1] font-accent font-medium">
                    {item.location} • {item.service_name || 'Vedic Reading'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-12 text-center">
          <Link
            href="/testimonials"
            prefetch={true}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-ivory border border-astro-border hover:border-astro-gold hover:bg-astro-navy transition-all"
          >
            <span>Read More Verified Reviews</span>
            <ArrowRight className="w-4 h-4 text-astro-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
