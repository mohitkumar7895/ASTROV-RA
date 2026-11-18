'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export function AdminHeader({ title = 'Dashboard' }: { title?: string }) {
  const { admin, toggleSidebar } = useAdmin();

  return (
    <header className="h-16 px-4 sm:px-8 border-b border-astro-border/40 bg-[#0A102A]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-astro-slate hover:text-astro-ivory hover:bg-astro-navy"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-lg sm:text-xl font-bold text-astro-ivory">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-accent uppercase tracking-wider text-astro-gold border border-astro-border hover:bg-astro-navy transition-all"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <div className="flex items-center gap-2 pl-3 border-l border-astro-border/40">
          <div className="w-7 h-7 rounded-full bg-astro-navy border border-astro-gold/50 flex items-center justify-center text-astro-gold text-xs font-bold font-heading">
            {admin?.name ? admin.name[0] : 'A'}
          </div>
          <span className="text-xs font-accent font-medium text-astro-ivory hidden md:inline">
            {admin?.name || 'Administrator'}
          </span>
        </div>
      </div>
    </header>
  );
}
