import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/session';
import { getHeroSection, getAstrologerProfile } from '@/lib/queries';
import { query } from '@/lib/db';
import { ContentManagerClient } from '@/components/admin/ContentManagerClient';
import { PageContent } from '@/types';
import { RowDataPacket } from 'mysql2';

export const revalidate = 0;

export default async function AdminContentPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [hero, profile, pageRows] = await Promise.all([
    getHeroSection('home').catch(() => null),
    getAstrologerProfile().catch(() => null),
    query<RowDataPacket[]>('SELECT * FROM pages_content ORDER BY page_slug, section_key').catch(() => []),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-astro-ivory">
          Website Content Management (CMS)
        </h2>
        <p className="text-astro-slate text-xs mt-1">
          Customize all public texts, hero copy, Puneet Dwivedi's profile, and philosophy directly.
        </p>
      </div>

      <ContentManagerClient
        initialHero={hero}
        initialProfile={profile}
        initialPagesContent={pageRows as PageContent[]}
      />
    </div>
  );
}
