import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Compass,
  HeartHandshake,
  Calendar,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { getAstrologerProfile, getSeoMetadata } from '@/lib/queries';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/about').catch(() => null);
  return {
    title: seo?.meta_title || 'About Puneet Dwivedi | Master Vedic Astrologer – ASTROVÈRA',
    description:
      seo?.meta_description ||
      'Learn about Puneet Dwivedi, a seasoned Vedic astrologer with 15+ years experience and 12,000+ consultations based in Mumbai. Ethical, confidential, and grounded.',
  };
}

export default async function AboutPage() {
  const profile = await getAstrologerProfile().catch(() => null);

  const name = profile?.name || 'Puneet Dwivedi';
  const title = profile?.title || 'Master Vedic Astrologer & Life Strategist';
  const biography =
    profile?.biography ||
    'Puneet Dwivedi is a revered practitioner of classical Parashari Jyotish, Jaimini Sutras, and planetary energization. Over 15+ years of intense practice in Mumbai, he has decoded more than 12,000 birth charts, steering clients through intricate life crossroads with calmness, empathy, and mathematical precision.\n\nHe considers astrology not as fatalism, but as cosmic weather forecasting—giving you the foresight to dress for the rain or harness favorable winds for peak accomplishments.';
  const personalJourney =
    profile?.personal_journey ||
    'Drawn to cosmic sciences from early youth, Puneet Dwivedi studied sacred scriptures under revered traditional masters in Varanasi and Haridwar before establishing his practice in Mumbai. His journey bridges ancient Vedic shlokas with practical, actionable counsel for 21st-century complexities.';
  const philosophy =
    profile?.philosophy ||
    'Planets do not dictate your fate; they indicate the karmic terrain you chose to navigate. Through awareness, conscious action, and sacred alignment, every astrological challenge can be converted into spiritual and worldly triumph.';
  const values =
    profile?.values ||
    'Truth, empathy, punctuality, and scientific integrity form the pillars of ASTROVÈRA. Every reading is personalized, deep, and grounded in authentic classical texts.';
  const ethicsPledge =
    profile?.ethics_pledge ||
    'Strict client confidentiality guaranteed. Zero exploitation through fear-inducing predictions. Clear, ethical guidance without superstitious claims or false promises.';

  const qualifications: string[] = Array.isArray(profile?.qualifications)
    ? profile.qualifications
    : [
        'Jyotish Praveena (Vedic Astrology Board)',
        'Advanced Kundli & Prashna Shastra Specialist',
        'Vedic Muhurta & Vastu Consultant',
        'Bachelor of Sciences',
      ];

  const specialisations: string[] = Array.isArray(profile?.specialisations)
    ? profile.specialisations
    : [
        'Vedic Birth Chart Analysis',
        'Career Crossroads & Executive Direction',
        'Matchmaking & Marriage Harmony',
        'Child Education & Stream Selection',
        'Graha Shanti, Puja & Spiritual Vidhan',
      ];

  const whatsappUrl = getAstrologerWhatsApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
      <SectionHeader
        badge="VEDIC SCHOLARSHIP"
        title="About Pandit Puneet Dwivedi"
        subtitle="Vedic Astrologer, Counselor & Life Strategist bringing sacred cosmic wisdom into modern life decision-making."
      />

      {/* Hero Bio Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mt-4 sm:mt-8">
        {/* Large Professional Portrait (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-28">
          <div className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] aspect-[4/5] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-astro-gold/30 via-astro-border/30 to-astro-gold/10 border border-astro-border shadow-2xl">
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-astro-midnight">
              <Image
                src={profile?.portrait_image_url || '/images/astrologer-about.jpg'}
                alt={name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-astro-midnight via-transparent to-transparent opacity-75" />

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-xl bg-astro-navy/90 border border-astro-gold/40 text-center backdrop-blur-md">
                <p className="font-heading text-sm sm:text-base font-bold text-astro-gold">
                  {name}
                </p>
                <p className="text-[11px] sm:text-xs text-astro-slate font-accent mt-0.5">
                  {title}
                </p>
                <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-astro-border/40 flex items-center justify-around text-[11px] sm:text-xs text-astro-ivory font-accent">
                  <span>{profile?.experience_years || 15}+ Yrs Exp</span>
                  <span>•</span>
                  <span>{profile?.consultations_count || 12000}+ Readings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Biography, Journey, Qualifications (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-8 lg:space-y-10">
          {/* Biography */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-8 lg:p-10 shadow-navyGlow">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-astro-gold flex items-center gap-2 mb-3 sm:mb-4">
              <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold" />
              <span>Professional Biography</span>
            </h2>
            <div className="text-[#E2E8F0] text-xs sm:text-base leading-relaxed space-y-3 sm:space-y-4 font-body whitespace-pre-line font-normal sm:font-medium">
              {biography}
            </div>
          </div>

          {/* Qualifications & Specialisations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {/* Qualifications */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6">
              <h3 className="font-heading text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-astro-border/40">
                <Award className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold" />
                <span>Qualifications</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {qualifications.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#E2E8F0] font-body font-normal sm:font-medium">
                    <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialisations */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6">
              <h3 className="font-heading text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-astro-border/40">
                <Compass className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold" />
                <span>Specialisations</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {specialisations.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#E2E8F0] font-body font-normal sm:font-medium">
                    <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Personal Journey with Sacred Havan Yagya Photo */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-8 lg:p-10 shadow-navyGlow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
              <div className="md:col-span-7">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-astro-gold mb-2.5 sm:mb-4">
                  Personal Journey &amp; Sacred Roots
                </h3>
                <p className="text-[#E2E8F0] text-xs sm:text-base leading-relaxed font-body font-normal sm:font-medium">
                  {personalJourney}
                </p>
              </div>
              <div className="md:col-span-5 relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-astro-border/60 shadow-lg">
                <Image
                  src="/images/puneet-dwivedi-havan.jpg"
                  alt="Pandit Puneet Dwivedi performing sacred Vedic Havan ritual"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-astro-midnight/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-center p-1.5 rounded-lg bg-astro-midnight/80 border border-astro-gold/30">
                  <span className="text-[10px] font-accent text-astro-gold font-semibold uppercase tracking-wider">
                    Vedic Havan &amp; Yagya Vidhan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Astrology Philosophy */}
          <div className="rounded-2xl sm:rounded-3xl bg-astro-midnight/90 border border-astro-gold/40 p-4 sm:p-8 lg:p-10 shadow-goldGlow">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-astro-goldLight mb-2.5 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold" />
              <span>Astrology Philosophy</span>
            </h3>
            <p className="text-astro-ivory text-sm sm:text-lg italic leading-relaxed font-body border-l-2 border-astro-gold pl-3 sm:pl-4 py-1">
              &ldquo;{philosophy}&rdquo;
            </p>
          </div>

          {/* Professional Values & Confidentiality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            <div className="rounded-xl sm:rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6">
              <h4 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-2 sm:mb-3">
                <HeartHandshake className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold" />
                <span>Professional Values</span>
              </h4>
              <p className="text-[#E2E8F0] text-xs sm:text-sm leading-relaxed font-body font-normal sm:font-medium">
                {values}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6">
              <h4 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-2 sm:mb-3">
                <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold" />
                <span>Ethical Guidance &amp; Confidentiality</span>
              </h4>
              <p className="text-[#E2E8F0] text-xs sm:text-sm leading-relaxed font-body font-normal sm:font-medium">
                {ethicsPledge}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-astro-navy via-astro-midnight to-astro-navy border border-astro-border flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-astro-ivory">
                Ready to Consult with Puneet Dwivedi?
              </h4>
              <p className="text-astro-slate text-xs mt-1">
                Video consultations, audio appointments, and in-person sessions in Mumbai.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all text-center"
              >
                Book Session
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3.5 rounded-full text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors shrink-0"
                title="WhatsApp Consultation"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
