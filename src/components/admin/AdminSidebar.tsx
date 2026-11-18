'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Sparkles,
  HelpCircle,
  Quote,
  Image as ImageIcon,
  Search,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  Shield,
  X,
} from 'lucide-react';
import { adminNavItems } from '@/config/navigation';
import { useAdmin } from '@/context/AdminContext';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Sparkles,
  HelpCircle,
  Quote,
  Image: ImageIcon,
  Search,
  Settings,
  Users,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout, isSidebarOpen, setIsSidebarOpen } = useAdmin();

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A102A] border-r border-astro-border/50 flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Top Brand Logo */}
          <div className="h-16 px-6 border-b border-astro-border/40 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-astro-gold flex items-center justify-center bg-astro-navy text-astro-gold font-heading font-bold text-sm">
                AV
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-wider text-astro-ivory">
                  ASTROVÈRA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-astro-gold font-accent">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-astro-slate hover:text-astro-ivory p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {adminNavItems.map((item) => {
              const Icon = iconMap[item.icon] || Sparkles;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-accent tracking-wide transition-all ${
                    isActive
                      ? 'bg-astro-navy border border-astro-gold/60 text-astro-gold font-semibold shadow-sm'
                      : 'text-astro-slate hover:text-astro-ivory hover:bg-astro-navy/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-astro-gold' : 'text-astro-slate'}`} />
                  <span className="flex-1">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="p-4 border-t border-astro-border/40 bg-[#080D24]/80">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-astro-navy border border-astro-border flex items-center justify-center text-astro-gold text-xs font-bold font-heading">
                {admin?.name ? admin.name[0] : 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-heading font-bold text-astro-ivory truncate">
                  {admin?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-astro-gold uppercase tracking-wider font-accent">
                  {admin?.roleName || 'Super Admin'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full py-2 px-3 rounded-lg text-[11px] font-accent uppercase tracking-wider text-astro-slate hover:text-astro-gold border border-astro-border/40 hover:border-astro-border flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    </>
  );
}
