'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Quote,
  Plus,
  Pencil,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Video,
  Save,
  X,
  Loader2,
} from 'lucide-react';
import { Testimonial } from '@/types';

interface Props {
  initialTestimonials: Testimonial[];
}

export function TestimonialsManagerClient({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const openCreateModal = () => {
    setEditingItem({
      client_name: '',
      location: 'Mumbai, Maharashtra',
      service_name: 'Birth Chart Analysis',
      rating: 5,
      review_text: '',
      video_url: '',
      is_featured: 0,
      is_approved: 1,
      is_published: 1,
      display_order: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.client_name || !editingItem?.review_text) {
      toast.error('Client name and review text are required');
      return;
    }

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingItem.id);
      const url = isEdit ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save testimonial');

      toast.success(isEdit ? 'Testimonial updated' : 'Testimonial added');
      setIsModalOpen(false);

      // Refresh list
      const listRes = await fetch('/api/testimonials?all=true');
      const listData = await listRes.json();
      setTestimonials(listData.testimonials || []);
    } catch (err: any) {
      toast.error(err.message || 'Error saving testimonial');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete review from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');

      toast.success('Testimonial deleted');
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Error deleting review');
    }
  };

  const handleTogglePublish = async (item: Testimonial) => {
    const updated = item.is_published ? 0 : 1;
    try {
      const res = await fetch(`/api/testimonials/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: updated }),
      });
      if (!res.ok) throw new Error('Toggle failed');

      setTestimonials(
        testimonials.map((t) => (t.id === item.id ? { ...t, is_published: updated } : t))
      );
      toast.success(`Testimonial ${updated ? 'published' : 'unpublished'}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to toggle status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Client Testimonials Management
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Approve, publish, and feature genuine reviews from seekers. Only approved reviews appear publicly.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-astro-midnight" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Table */}
      <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-4 sm:p-6 shadow-navyGlow overflow-x-auto">
        <table className="w-full text-left text-xs font-body min-w-[700px]">
          <thead>
            <tr className="border-b border-astro-border/40 text-[11px] font-accent uppercase tracking-wider text-astro-slate">
              <th className="py-3 px-3">Client</th>
              <th className="py-3 px-3">Location &amp; Service</th>
              <th className="py-3 px-3">Rating</th>
              <th className="py-3 px-3">Review Preview</th>
              <th className="py-3 px-3">Home Featured</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-astro-border/20 text-astro-ivory">
            {testimonials.map((item) => (
              <tr key={item.id} className="hover:bg-astro-navy/40 transition-colors">
                <td className="py-3.5 px-3 font-medium">
                  {item.client_name}
                </td>
                <td className="py-3.5 px-3 text-astro-slate">
                  <div>{item.location || 'Mumbai'}</div>
                  <div className="text-[10px] text-astro-gold/80">{item.service_name}</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-3 max-w-xs truncate text-astro-slate/90">
                  &ldquo;{item.review_text}&rdquo;
                </td>
                <td className="py-3.5 px-3">
                  {Boolean(item.is_featured) ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-accent bg-astro-gold/20 text-astro-gold border border-astro-gold/30">
                      Featured
                    </span>
                  ) : (
                    <span className="text-astro-slate text-[11px]">No</span>
                  )}
                </td>
                <td className="py-3.5 px-3">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-accent uppercase tracking-wider font-semibold transition-colors ${
                      item.is_published
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/40'
                    }`}
                  >
                    {item.is_published ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{item.is_published ? 'Published' : 'Draft'}</span>
                  </button>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-astro-slate hover:text-astro-gold hover:bg-astro-navy transition-colors"
                      title="Edit Review"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.client_name)}
                      className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-astro-navy border border-astro-border p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-astro-border/40">
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                {editingItem?.id ? 'Edit Testimonial' : 'Add Client Testimonial'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-astro-slate hover:text-astro-ivory p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem?.client_name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                    Location (e.g. Andheri, Mumbai)
                  </label>
                  <input
                    type="text"
                    value={editingItem?.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                    Consultation Service
                  </label>
                  <input
                    type="text"
                    value={editingItem?.service_name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, service_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={editingItem?.rating || 5}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Testimonial Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem?.review_text || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, review_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Video Testimonial URL (Optional YouTube / Vimeo)
                </label>
                <input
                  type="url"
                  value={editingItem?.video_url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, video_url: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-accent text-astro-ivory">
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem?.is_published)}
                    onChange={(e) => setEditingItem({ ...editingItem, is_published: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                  />
                  <span>Publish Publicly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-accent text-astro-ivory">
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem?.is_featured)}
                    onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-astro-border/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-accent uppercase text-astro-slate"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow flex items-center gap-1.5"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
