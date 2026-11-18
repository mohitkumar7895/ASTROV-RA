import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getAllServices } from '@/lib/queries';
import { ServicesManagerClient } from '@/components/admin/ServicesManagerClient';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const services = await getAllServices().catch(() => []);

  return <ServicesManagerClient initialServices={services} />;
}
