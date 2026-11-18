import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getAllTestimonials } from '@/lib/queries';
import { TestimonialsManagerClient } from '@/components/admin/TestimonialsManagerClient';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const testimonials = await getAllTestimonials().catch(() => []);

  return <TestimonialsManagerClient initialTestimonials={testimonials} />;
}
