import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getMediaLibrary } from '@/lib/queries';
import { MediaManagerClient } from '@/components/admin/MediaManagerClient';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const items = await getMediaLibrary().catch(() => []);

  return <MediaManagerClient initialItems={items} />;
}
