'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  Clock,
  Video,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  X,
} from 'lucide-react';
import { AstrologyService } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface Props {
  initialServices: AstrologyService[];
}

export function ServicesManagerClient({ initialServices }: Props) {
  const [services, setServices] = useState<AstrologyService[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<AstrologyService> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const openCreateModal = () => {
    setEditingService({
      slug: '',
      title: '',
      short_description: '',
      description: '',
      icon: 'Sparkles',
      price: 2500,
      currency: 'INR',
      duration_minutes: 45,
      consultation_method: 'Online Video / Voice Call',
      display_order: services.length + 1,
      is_active: 1,
      is_featured: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: AstrologyService) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.slug) {
      toast.error('Title and slug are required');
      return;
    }

    setIsSaving(true);
    try {
      const isEdit = Boolean(editingService.id);
      const url = isEdit ? `/api/services/${editingService.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');

      toast.success(isEdit ? 'Service updated' : 'Service created');
      setIsModalOpen(false);

      // Refresh list
      const listRes = await fetch('/api/services?all=true');
      const listData = await listRes.json();
      setServices(listData.services || []);
    } catch (err: any) {
      toast.error(err.message || 'Error saving service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');

      toast.success('Service deleted');
      setServices(services.filter((s) => s.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Error deleting service');
    }
  };

  const handleToggleActive = async (service: AstrologyService) => {
    const updatedStatus = service.is_active ? 0 : 1;
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: updatedStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');

      setServices(
        services.map((s) => (s.id === service.id ? { ...s, is_active: updatedStatus } : s))
      );
      toast.success(`Service ${updatedStatus ? 'activated' : 'deactivated'}`);
    } catch (err: any) {
      toast.error(err.message || 'Status toggle failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Astrology Services Management
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Configure pricing, consultation methods, active status, and homepage features.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-astro-midnight" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-4 sm:p-6 shadow-navyGlow overflow-x-auto">
        <table className="w-full text-left text-xs font-body min-w-[720px]">
          <thead>
            <tr className="border-b border-astro-border/40 text-[11px] font-accent uppercase tracking-wider text-astro-slate">
              <th className="py-3 px-3">Order</th>
              <th className="py-3 px-3">Service Title</th>
              <th className="py-3 px-3">Price</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-3">Method</th>
              <th className="py-3 px-3">Featured</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-astro-border/20 text-astro-ivory">
            {services.map((srv) => (
              <tr key={srv.id} className="hover:bg-astro-navy/40 transition-colors">
                <td className="py-3.5 px-3 font-mono text-astro-slate">
                  {srv.display_order}
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-heading font-semibold text-astro-ivory">
                    {srv.title}
                  </div>
                  <div className="text-[10px] text-astro-slate font-mono">
                    /{srv.slug}
                  </div>
                </td>
                <td className="py-3.5 px-3 font-semibold text-astro-gold">
                  {formatCurrency(srv.price, srv.currency)}
                </td>
                <td className="py-3.5 px-3 text-astro-slate">
                  {srv.duration_minutes} Mins
                </td>
                <td className="py-3.5 px-3 text-astro-slate truncate max-w-[150px]">
                  {srv.consultation_method}
                </td>
                <td className="py-3.5 px-3">
                  {Boolean(srv.is_featured) ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-accent bg-astro-gold/20 text-astro-gold border border-astro-gold/30">
                      Featured
                    </span>
                  ) : (
                    <span className="text-astro-slate text-[11px]">Regular</span>
                  )}
                </td>
                <td className="py-3.5 px-3">
                  <button
                    onClick={() => handleToggleActive(srv)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-accent uppercase tracking-wider font-semibold transition-colors ${
                      srv.is_active
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {srv.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{srv.is_active ? 'Active' : 'Disabled'}</span>
                  </button>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="p-1.5 rounded-lg text-astro-slate hover:text-astro-gold hover:bg-astro-navy transition-colors"
                      title="Edit Service"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id, srv.title)}
                      className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                      title="Delete Service"
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

      {/* Create / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-astro-navy border border-astro-border p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-astro-border/40">
              <h3 className="font-heading text-lg font-bold text-astro-ivory">
                {editingService?.id ? 'Edit Astrology Service' : 'Add New Astrology Service'}
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
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService?.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingService({ ...editingService, title, slug: editingService?.slug || slug });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService?.slug || ''}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Honorarium / Price (INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingService?.price || 0}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={editingService?.duration_minutes || 45}
                    onChange={(e) => setEditingService({ ...editingService, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Consultation Method
                  </label>
                  <input
                    type="text"
                    value={editingService?.consultation_method || 'Online Video / Voice Call'}
                    onChange={(e) => setEditingService({ ...editingService, consultation_method: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Icon Name (Lucide)
                  </label>
                  <select
                    value={editingService?.icon || 'Sparkles'}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  >
                    <option value="Compass">Compass (Chart)</option>
                    <option value="Briefcase">Briefcase (Career)</option>
                    <option value="HeartHandshake">HeartHandshake (Marriage)</option>
                    <option value="Calendar">Calendar (Horoscope)</option>
                    <option value="Binary">Binary (Numerology)</option>
                    <option value="UserCheck">UserCheck (Personal 1-on-1)</option>
                    <option value="MessageSquare">MessageSquare (Chat)</option>
                    <option value="Flame">Flame (Puja Vidhan)</option>
                    <option value="Sparkles">Sparkles (General)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                  Short Summary
                </label>
                <input
                  type="text"
                  value={editingService?.short_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingService?.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              {/* Service Image Upload & Media Library Selector */}
              <div>
                <ImageUpload
                  label="Service Cover Image"
                  value={editingService?.image_url || ''}
                  onChange={(url) => setEditingService({ ...editingService, image_url: url })}
                  helperText="Upload a new image from your device or choose from the Media Library"
                  category="services"
                  aspectRatio="video"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-accent text-astro-ivory">
                  <input
                    type="checkbox"
                    checked={Boolean(editingService?.is_active)}
                    onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                  />
                  <span>Publicly Active</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-accent text-astro-ivory">
                  <input
                    type="checkbox"
                    checked={Boolean(editingService?.is_featured)}
                    onChange={(e) => setEditingService({ ...editingService, is_featured: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-astro-border/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-accent uppercase tracking-wider text-astro-slate hover:text-astro-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
