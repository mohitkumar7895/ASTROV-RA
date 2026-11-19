import React from 'react';
import type { Metadata } from 'next';
import { getActiveServices, getSeoMetadata } from '@/lib/queries';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ServicesClient } from '@/components/services/ServicesClient';
import { VedicEducationSection } from '@/components/home/VedicEducationSection';

export const revalidate = 0; // Dynamic server rendering

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/services').catch(() => null);
  return {
    title: seo?.meta_title || 'Astrology Services & Consultations | ASTROVÈRA',
    description:
      seo?.meta_description ||
      'Explore premium astrology services: Birth Chart Analysis, Career Astrology, Marriage Kundli Milan, Puja & Shanti Vidhan with Puneet Dwivedi.',
    openGraph: {
      title: seo?.og_title || 'Astrology Services | ASTROVÈRA',
      description: seo?.og_description || 'Clear, actionable Vedic consultations designed for meaningful transformation.',
    },
  };
}

export default async function ServicesPage() {
  const services = await getActiveServices().catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
      <SectionHeader
        badge="VEDIC ASTROLOGY OFFERINGS"
        title="Astrology Consultations &amp; Vidhan"
        subtitle="Every service is conducted personally by Puneet Dwivedi with meticulous mathematical precision and complete confidentiality."
      />

      {/* Featured Highlight: Vedic Astrology Education & Sacred Scriptures Masterclasses */}
      <div className="mt-6 sm:mt-10 mb-8 sm:mb-14 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-astro-gold/50 shadow-goldGlow">
        <VedicEducationSection />
      </div>

      <ServicesClient services={services} />
    </div>
  );
}
