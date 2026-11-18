import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getWebsiteSettings } from '@/lib/queries';
import { SettingsManagerClient } from '@/components/admin/SettingsManagerClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const settings = await getWebsiteSettings().catch(() => ({}));

  return <SettingsManagerClient initialSettings={settings} />;
}
