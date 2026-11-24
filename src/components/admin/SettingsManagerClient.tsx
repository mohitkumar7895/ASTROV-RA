'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Settings,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Save,
  Loader2,
  Share2,
  AlertTriangle,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

interface Props {
  initialSettings: Record<string, string>;
}

export function SettingsManagerClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      toast.success('Website settings updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Global Website &amp; Contact Settings
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Update phone numbers, WhatsApp, Mumbai office address, social handles, and site toggles.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save All Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Business & Contact Information */}
        <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-astro-border/40">
            <Phone className="w-5 h-5 text-astro-gold" />
            <h3 className="font-heading text-base font-bold text-astro-ivory">
              Official Contact Details
            </h3>
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
              Direct Phone Number *
            </label>
            <input
              type="text"
              required
              value={settings.contact_phone || ''}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
              WhatsApp Number *
            </label>
            <input
              type="text"
              required
              value={settings.whatsapp_number || ''}
              onChange={(e) => handleChange('whatsapp_number', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
              Official Email Address *
            </label>
            <input
              type="email"
              required
              value={settings.contact_email || ''}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
              Sanctuary Physical Address *
            </label>
            <textarea
              rows={2}
              required
              value={settings.business_address || ''}
              onChange={(e) => handleChange('business_address', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
              Google Maps Location URL
            </label>
            <input
              type="url"
              value={settings.google_maps_url || ''}
              onChange={(e) => handleChange('google_maps_url', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
              Consultation Operating Hours
            </label>
            <input
              type="text"
              value={settings.business_hours || ''}
              onChange={(e) => handleChange('business_hours', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Global Brand & Feature Toggles */}
        <div className="space-y-8">
          <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-astro-border/40">
              <Sparkles className="w-5 h-5 text-astro-gold" />
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                Brand Identity &amp; Features
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settings.brand_name || 'ASTROVÈRA'}
                  onChange={(e) => handleChange('brand_name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Astrologer Name
                </label>
                <input
                  type="text"
                  value={settings.astrologer_name || 'Puneet Dwivedi'}
                  onChange={(e) => handleChange('astrologer_name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                Announcement Bar Banner Text
              </label>
              <input
                type="text"
                value={settings.announcement_bar_text || ''}
                onChange={(e) => handleChange('announcement_bar_text', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-accent text-astro-ivory">
                <input
                  type="checkbox"
                  checked={settings.announcement_bar_enabled !== 'false'}
                  onChange={(e) => handleChange('announcement_bar_enabled', e.target.checked ? 'true' : 'false')}
                  className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                />
                <span>Enable Top Announcement Bar</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-accent text-astro-ivory">
                <input
                  type="checkbox"
                  checked={settings.whatsapp_floating_enabled !== 'false'}
                  onChange={(e) => handleChange('whatsapp_floating_enabled', e.target.checked ? 'true' : 'false')}
                  className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                />
                <span>Enable Floating WhatsApp Action Button</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-accent text-rose-300">
                <input
                  type="checkbox"
                  checked={settings.maintenance_mode === 'true'}
                  onChange={(e) => handleChange('maintenance_mode', e.target.checked ? 'true' : 'false')}
                  className="w-4 h-4 rounded text-rose-500 bg-astro-midnight border-astro-border"
                />
                <span>Maintenance Mode (Temporarily disable bookings)</span>
              </label>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-astro-border/40">
              <Share2 className="w-5 h-5 text-astro-gold" />
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                Social Profile URLs
              </h3>
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={settings.instagram_url || siteConfig.links.instagram}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.facebook_url || siteConfig.links.facebook}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.youtube_url || siteConfig.links.youtube}
                onChange={(e) => handleChange('youtube_url', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
