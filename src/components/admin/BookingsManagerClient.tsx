'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Eye,
  Trash2,
  Clock,
  User,
  Calendar,
  Sparkles,
  Send,
  Loader2,
  X,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { Enquiry, AstrologyService, EnquiryStatus, EnquiryNote } from '@/types';
import { formatDate, formatDateTime } from '@/lib/utils';
import { getClientWhatsAppLink } from '@/lib/whatsapp';

interface Props {
  services: AstrologyService[];
}

const ALL_STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

export function BookingsManagerClient({ services }: Props) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Selected Booking Drawer/Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (serviceFilter) params.append('serviceId', serviceFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      params.append('page', String(page));
      params.append('limit', '15');

      const res = await fetch(`/api/bookings?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      toast.error('Failed to load enquiries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, statusFilter, serviceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchEnquiries();
  };

  const handleStatusChange = async (enquiryId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${enquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Status update failed');

      setEnquiries(
        enquiries.map((e) => (e.id === enquiryId ? { ...e, status: newStatus as EnquiryStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as EnquiryStatus });
      }
      toast.success(`Booking status changed to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || 'Status change failed');
    }
  };

  const openDetails = async (id: number) => {
    try {
      const res = await fetch(`/api/bookings/${id}`);
      const data = await res.json();
      if (res.ok && data.enquiry) {
        setSelectedEnquiry(data.enquiry);
        setIsDetailOpen(true);
      }
    } catch (err) {
      toast.error('Failed to load enquiry details');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNote.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await fetch(`/api/bookings/${selectedEnquiry.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote.trim() }),
      });
      if (!res.ok) throw new Error('Failed to add note');

      toast.success('Note added');
      setNewNote('');
      // Reload enquiry details
      await openDetails(selectedEnquiry.id);
    } catch (err: any) {
      toast.error(err.message || 'Error adding note');
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleDelete = async (id: number, ref: string) => {
    if (!confirm(`Delete enquiry ${ref}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete enquiry');

      toast.success('Enquiry deleted');
      setEnquiries(enquiries.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) {
        setIsDetailOpen(false);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Consultation Bookings &amp; Enquiries
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Total of {total} client consultation enquiries recorded in MySQL.
          </p>
        </div>

        <a
          href="/api/bookings/export"
          className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-ivory border border-astro-border hover:border-astro-gold hover:bg-astro-navy transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-astro-gold" />
          <span>Export Enquiries (CSV)</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-astro-navy/60 border border-astro-border space-y-3">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Term (4 cols) */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-slate" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, email, or Booking ID..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-xs focus:outline-none"
            />
          </div>

          {/* Status Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-xs focus:outline-none"
            >
              <option value="All">All Statuses</option>
              {ALL_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Service Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-xs focus:outline-none"
            >
              <option value="">All Services</option>
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Search Button (2 cols) */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-2 rounded-xl text-xs font-accent font-semibold uppercase tracking-wider text-astro-midnight bg-gold-gradient shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bookings Data Table */}
      <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-4 sm:p-6 shadow-navyGlow overflow-x-auto">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-astro-slate gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-astro-gold" />
            <span className="text-xs">Loading enquiries...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs font-body min-w-[760px]">
            <thead>
              <tr className="border-b border-astro-border/40 text-[11px] font-accent uppercase tracking-wider text-astro-slate">
                <th className="py-3 px-3">Booking ID</th>
                <th className="py-3 px-3">Seeker Name</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Pref. Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-astro-border/20 text-astro-ivory">
              {enquiries.length > 0 ? (
                enquiries.map((enq) => {
                  const whatsappUrl = getClientWhatsAppLink(
                    enq.phone,
                    enq.full_name,
                    enq.booking_ref,
                    enq.service_name || undefined
                  );

                  return (
                    <tr key={enq.id} className="hover:bg-astro-navy/40 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-semibold text-astro-gold">
                        {enq.booking_ref}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-medium text-astro-ivory">{enq.full_name}</div>
                        {enq.dob && (
                          <div className="text-[10px] text-astro-slate">DOB: {formatDate(enq.dob)}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-astro-ivory">
                          <a href={`tel:${enq.phone}`} className="hover:text-astro-gold">
                            {enq.phone}
                          </a>
                        </div>
                        {enq.email && (
                          <div className="text-[10px] text-astro-slate truncate max-w-[140px]">
                            {enq.email}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 max-w-[160px] truncate">
                        {enq.service_name || 'General Guidance'}
                      </td>
                      <td className="py-3.5 px-3 text-astro-slate whitespace-nowrap">
                        {enq.preferred_date ? formatDate(enq.preferred_date) : 'Flexible'}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-accent font-semibold uppercase tracking-wider bg-astro-midnight border focus:outline-none ${
                            enq.status === 'New'
                              ? 'text-blue-300 border-blue-500/40'
                              : enq.status === 'Confirmed'
                              ? 'text-emerald-300 border-emerald-500/40'
                              : enq.status === 'Pending'
                              ? 'text-amber-300 border-amber-500/40'
                              : enq.status === 'Completed'
                              ? 'text-purple-300 border-purple-500/40'
                              : 'text-zinc-400 border-zinc-500/40'
                          }`}
                        >
                          {ALL_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-3 text-astro-slate whitespace-nowrap">
                        {formatDate(enq.created_at)}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openDetails(enq.id)}
                            className="p-1.5 rounded-lg text-astro-slate hover:text-astro-gold hover:bg-astro-navy transition-colors"
                            title="View Full Booking Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <a
                            href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                            className="p-1.5 rounded-lg text-astro-gold hover:bg-astro-navy transition-colors"
                            title="Call Seeker"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(enq.id, enq.booking_ref)}
                            className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-astro-slate">
                    No enquiries match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pt-6 border-t border-astro-border/30 flex items-center justify-between text-xs font-accent">
            <span className="text-astro-slate">
              Showing page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-astro-border text-astro-ivory disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-astro-border text-astro-ivory disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL BOOKING DETAILS MODAL */}
      {isDetailOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0A102A] border border-astro-border p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-astro-border/40">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-astro-gold block font-semibold">
                  BOOKING REFERENCE: {selectedEnquiry.booking_ref}
                </span>
                <h3 className="font-heading text-xl font-bold text-astro-ivory mt-0.5">
                  {selectedEnquiry.full_name}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-astro-slate hover:text-astro-ivory p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-astro-midnight border border-astro-border/60">
              <div className="flex items-center gap-3">
                <span className="text-xs text-astro-slate font-accent uppercase">Current Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  className="px-3 py-1 rounded-lg text-xs font-accent font-semibold uppercase bg-astro-navy border border-astro-border text-astro-gold focus:outline-none"
                >
                  {ALL_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={getClientWhatsAppLink(selectedEnquiry.phone, selectedEnquiry.full_name, selectedEnquiry.booking_ref, selectedEnquiry.service_name || undefined)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full text-xs font-accent text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1.5 hover:bg-emerald-900/40"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${selectedEnquiry.phone.replace(/\s+/g, '')}`}
                  className="px-4 py-1.5 rounded-full text-xs font-accent text-astro-midnight bg-gold-gradient font-semibold uppercase flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-astro-midnight" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Phone Number
                </span>
                <span className="text-astro-ivory font-mono text-sm font-semibold">{selectedEnquiry.phone}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Email Address
                </span>
                <span className="text-astro-ivory text-sm">{selectedEnquiry.email || 'Not provided'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Date of Birth
                </span>
                <span className="text-astro-ivory text-sm">
                  {selectedEnquiry.dob ? formatDate(selectedEnquiry.dob) : 'Not provided'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Time &amp; Place of Birth
                </span>
                <span className="text-astro-ivory text-sm">
                  {selectedEnquiry.birth_time || 'Time unknown'} • {selectedEnquiry.birth_place || 'Place unknown'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Requested Service
                </span>
                <span className="text-astro-gold font-semibold text-sm">
                  {selectedEnquiry.service_name || 'General Consultation'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Preferred Date &amp; Slot
                </span>
                <span className="text-astro-ivory text-sm">
                  {selectedEnquiry.preferred_date ? formatDate(selectedEnquiry.preferred_date) : 'Flexible'} (
                  {selectedEnquiry.preferred_time_slot || 'Morning'})
                </span>
              </div>
            </div>

            {selectedEnquiry.selected_problem && (
              <div className="p-4 rounded-xl bg-astro-midnight border border-astro-gold/40">
                <span className="text-astro-gold uppercase tracking-wider block mb-1 font-accent text-[10px] font-semibold">
                  Pre-selected Inquiry Question:
                </span>
                <p className="text-astro-ivory text-sm font-medium">{selectedEnquiry.selected_problem}</p>
              </div>
            )}

            {selectedEnquiry.message && (
              <div className="p-4 rounded-xl bg-astro-midnight border border-astro-border/40">
                <span className="text-astro-slate uppercase tracking-wider block mb-1 font-accent text-[10px]">
                  Client Dilemma / Message:
                </span>
                <p className="text-astro-ivory text-xs sm:text-sm font-body leading-relaxed">{selectedEnquiry.message}</p>
              </div>
            )}

            {/* Internal Notes Section */}
            <div className="space-y-3 pt-3 border-t border-astro-border/40">
              <h4 className="font-heading text-sm font-bold text-astro-gold">
                Internal Astrologer Notes
              </h4>

              {/* Existing Notes */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {(selectedEnquiry.notes || []).length > 0 ? (
                  selectedEnquiry.notes?.map((n: EnquiryNote) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-astro-midnight text-xs border border-astro-border/30">
                      <p className="text-astro-ivory font-body">{n.note}</p>
                      <span className="text-[10px] text-astro-slate mt-1 block">
                        By {n.admin_name} on {formatDateTime(n.created_at)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-astro-slate italic">No internal notes added yet.</p>
                )}
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add private note (e.g. D-10 chart prepared, client requested Friday call)..."
                  className="flex-1 px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isAddingNote || !newNote.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-accent font-semibold uppercase bg-gold-gradient text-astro-midnight flex items-center gap-1 disabled:opacity-50"
                >
                  {isAddingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Save Note</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
