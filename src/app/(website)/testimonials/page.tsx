import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, Quote, CheckCircle2, Video, Calendar, Sparkles, MessageSquare } from 'lucide-react';
import { getPublishedTestimonials, getSeoMetadata } from '@/lib/queries';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getInitials } from '@/lib/utils';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/testimonials').catch(() => null);
  return {
    title: seo?.meta_title || 'Client Testimonials & Reviews | ASTROVÈRA',
    description:
      seo?.meta_description ||
      'Read real testimonials and reviews from clients across Mumbai and worldwide who experienced transformative insights with Puneet Dwivedi.',
  };
}

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials().catch(() => []);
  const whatsappUrl = getAstrologerWhatsApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
      <SectionHeader
        badge="REAL SEEKER VOICES"
        title="Client Testimonials &amp; Verified Reviews"
        subtitle="Genuine experiences from seekers whose lives, businesses, and relationships were illuminated through Puneet Dwivedi's Vedic guidance."
      />

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-10 lg:mt-12">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 lg:p-8 flex flex-col justify-between hover:border-astro-gold/50 shadow-navyGlow relative group transition-all"
          >
            <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 w-7 sm:w-9 h-7 sm:h-9 text-astro-gold/15 group-hover:text-astro-gold/30 transition-colors" />

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-2.5 sm:mb-4 text-amber-400">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#F1F5F9] text-xs sm:text-base leading-relaxed font-body mb-4 sm:mb-6 font-normal sm:font-medium">
                &ldquo;{item.review_text}&rdquo;
              </p>

              {/* Video Link if available */}
              {item.video_url && (
                <div className="mb-4 sm:mb-6">
                  <a
                    href={item.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-astro-midnight border border-astro-border text-xs text-astro-gold hover:border-astro-gold transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video Testimonial</span>
                  </a>
                </div>
              )}
            </div>

            {/* Author info */}
            <div className="pt-3 sm:pt-5 border-t border-astro-border/30 flex items-center gap-3 sm:gap-3.5">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-astro-midnight border border-astro-gold/50 flex items-center justify-center font-heading font-bold text-astro-gold text-xs sm:text-sm shadow-sm shrink-0">
                {getInitials(item.client_name)}
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <span>{item.client_name}</span>
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0" />
                </h3>
                <p className="text-[11px] sm:text-xs text-[#CBD5E1] font-accent font-medium">
                  {item.location} • <span className="text-astro-gold/80">{item.service_name || 'Vedic Reading'}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Notice & CTA */}
      <div className="mt-8 sm:mt-14 lg:mt-20 p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-astro-navy via-astro-midnight to-astro-navy border border-astro-border/70 text-center max-w-3xl mx-auto shadow-goldGlow">
        <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-astro-gold mx-auto mb-3 sm:mb-4 animate-pulse" />
        <h3 className="font-heading text-xl sm:text-3xl font-bold text-astro-ivory mb-2">
          Experience the ASTROVÈRA Difference
        </h3>
        <p className="text-astro-slate text-xs sm:text-sm font-body max-w-lg mx-auto mb-5 sm:mb-8">
          Join thousands who have found cosmic clarity and life direction.
          Book your private consultation with Puneet Dwivedi today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-accent font-semibold tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-astro-midnight" />
            <span>Schedule Consultation</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask a Question on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
