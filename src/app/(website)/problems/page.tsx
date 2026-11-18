import React from 'react';
import type { Metadata } from 'next';
import { getProblemCategoriesWithQuestions, getSeoMetadata } from '@/lib/queries';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProblemsClient } from '@/components/problems/ProblemsClient';

export const revalidate = 0; // Live dynamic database rendering

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/problems').catch(() => null);
  return {
    title: seo?.meta_title || 'Problems We Help With | Career, Love Life & Life Solutions – ASTROVÈRA',
    description:
      seo?.meta_description ||
      'Seeking answers for career direction, marriage timing, or life challenges? Explore Vedic astrological solutions tailored by Puneet Dwivedi.',
    openGraph: {
      title: seo?.og_title || 'Problems We Help With | ASTROVÈRA',
      description: seo?.og_description || 'Direct astrological answers to your most pressing questions.',
    },
  };
}

export default async function ProblemsPage() {
  const categories = await getProblemCategoriesWithQuestions().catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
      <SectionHeader
        badge="VEDIC PROBLEM SOLVING"
        title="Problems We Help You Navigate"
        subtitle="Cosmic blueprints hold answers to your deepest uncertainties. Explore the most frequent life dilemmas addressed by Pandit Puneet Dwivedi."
      />

      <ProblemsClient categories={categories} />
    </div>
  );
}
