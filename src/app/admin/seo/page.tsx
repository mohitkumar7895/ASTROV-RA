import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getAllSeoMetadata } from '@/lib/queries';
import { SeoManagerClient } from '@/components/admin/SeoManagerClient';

export const revalidate = 0;

export default async function AdminSeoPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const seoList = await getAllSeoMetadata().catch(() => []);

  return <SeoManagerClient initialSeoList={seoList} />;
}
