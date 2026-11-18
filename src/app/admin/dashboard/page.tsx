import React from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Users,
  Sparkles,
  Quote,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { getDashboardStats } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';
import { redirect } from 'next/navigation';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { formatDate } from '@/lib/utils';
import { getClientWhatsAppLink } from '@/lib/whatsapp';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      sub: `${stats.newEnquiries} New enquiries`,
      icon: Users,
      color: 'text-astro-gold',
      border: 'border-astro-gold/40',
      bg: 'bg-astro-gold/10',
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      sub: 'Action required',
      icon: Clock,
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Confirmed Consultations',
      value: stats.confirmedBookings,
      sub: `${stats.completedBookings} Completed`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Active Services',
      value: `${stats.activeServices} / ${stats.totalServices}`,
      sub: 'Publicly bookable',
      icon: Sparkles,
      color: 'text-blue-400',
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Published Testimonials',
      value: `${stats.publishedTestimonials} / ${stats.totalTestimonials}`,
      sub: 'Verified client reviews',
      icon: Quote,
      color: 'text-purple-400',
      border: 'border-purple-500/40',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-astro-navy via-astro-midnight to-astro-navy border border-astro-gold/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-navyGlow">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-astro-midnight border border-astro-border text-astro-gold text-xs font-accent tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Dashboard</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-astro-ivory">
            Namaste, {currentAdmin.name}
          </h2>
          <p className="text-astro-slate text-xs sm:text-sm font-body mt-1">
            Real-time astrological enquiries, consultations, and content metrics for ASTROVÈRA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/content"
            className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-ivory border border-astro-border hover:border-astro-gold transition-all"
          >
            Edit Website CMS
          </Link>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl bg-astro-navy/70 border ${card.border} p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-accent uppercase tracking-wider text-astro-slate font-semibold">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-astro-ivory">
                  {card.value}
                </p>
                <p className="text-[11px] text-astro-slate/80 font-accent mt-1">
                  {card.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts with Recharts */}
      <DashboardCharts
        monthlyTrends={stats.monthlyTrends}
        statusDistribution={stats.statusDistribution}
        servicePopularity={stats.servicePopularity}
      />

      {/* Recent Enquiries Table */}
      <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-astro-border/40">
          <div>
            <h3 className="font-heading text-lg font-bold text-astro-ivory">
              Recent Consultation Requests
            </h3>
            <p className="text-astro-slate text-xs mt-0.5">
              Latest client submissions directly from the booking form
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-accent uppercase tracking-wider text-astro-gold hover:text-astro-goldLight flex items-center gap-1.5"
          >
            <span>View All ({stats.totalEnquiries})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead>
              <tr className="border-b border-astro-border/40 text-[11px] font-accent uppercase tracking-wider text-astro-slate">
                <th className="py-3 px-3">Booking ID</th>
                <th className="py-3 px-3">Seeker Name</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-astro-border/20 text-astro-ivory">
              {stats.recentEnquiries.length > 0 ? (
                stats.recentEnquiries.map((enq) => {
                  const whatsappUrl = getClientWhatsAppLink(
                    enq.phone,
                    enq.full_name,
                    enq.booking_ref,
                    enq.service_name || undefined
                  );

                  return (
                    <tr key={enq.id} className="hover:bg-astro-navy/50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-semibold text-astro-gold">
                        {enq.booking_ref}
                      </td>
                      <td className="py-3.5 px-3 font-medium">
                        {enq.full_name}
                      </td>
                      <td className="py-3.5 px-3 text-astro-slate">
                        <a href={`tel:${enq.phone}`} className="hover:text-astro-gold">
                          {enq.phone}
                        </a>
                      </td>
                      <td className="py-3.5 px-3">
                        {enq.service_name || 'General Consultation'}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-accent font-semibold uppercase tracking-wider ${
                            enq.status === 'New'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : enq.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : enq.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : enq.status === 'Completed'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/40'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-astro-slate">
                        {formatDate(enq.created_at)}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors"
                            title="WhatsApp Customer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            href={`/admin/bookings?search=${enq.booking_ref}`}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-accent uppercase tracking-wider text-astro-gold border border-astro-border hover:border-astro-gold transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-astro-slate">
                    No enquiries received yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
