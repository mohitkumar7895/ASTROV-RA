import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getAllServices } from '@/lib/queries';
import { BookingsManagerClient } from '@/components/admin/BookingsManagerClient';

export const revalidate = 0;

export default async function AdminBookingsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const services = await getAllServices().catch(() => []);

  return <BookingsManagerClient services={services} />;
}
