import React from 'react';
import {
  getHeroSection,
  getAstrologerProfile,
  getFeaturedServices,
  getFeaturedTestimonials,
  getProblemCategoriesWithQuestions,
} from '@/lib/queries';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ProblemsPreview } from '@/components/home/ProblemsPreview';
import { TestimonialsPreview } from '@/components/home/TestimonialsPreview';
import { SpiritualCta } from '@/components/home/SpiritualCta';

export const revalidate = 0; // Live CMS dynamic rendering

export default async function HomePage() {
  const [hero, profile, services, testimonials, categories] = await Promise.all([
    getHeroSection('home').catch(() => null),
    getAstrologerProfile().catch(() => null),
    getFeaturedServices().catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getProblemCategoriesWithQuestions().catch(() => []),
  ]);

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <HeroSection hero={hero} profile={profile} />

      {/* 2. About Preview */}
      <AboutPreview profile={profile} />

      {/* 3. Featured Services */}
      <FeaturedServices services={services} />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Problems We Help With Preview */}
      <ProblemsPreview categories={categories} />

      {/* 6. Three Genuine Testimonials */}
      <TestimonialsPreview testimonials={testimonials} />

      {/* 7. Spiritual Section & Final Consultation CTA */}
      <SpiritualCta />
    </div>
  );
}
