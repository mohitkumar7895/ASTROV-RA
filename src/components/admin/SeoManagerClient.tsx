'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Search, Save, Globe, Eye, Loader2, Sparkles } from 'lucide-react';
import { SeoMetadata } from '@/types';

interface Props {
  initialSeoList: SeoMetadata[];
}

export function SeoManagerClient({ initialSeoList }: Props) {
  const [seoList, setSeoList] = useState<SeoMetadata[]>(initialSeoList);
  const [selectedRoute, setSelectedRoute] = useState<string>(seoList[0]?.page_route || '/');
  const [isSaving, setIsSaving] = useState(false);

  const currentSeo = seoList.find((s) => s.page_route === selectedRoute) || seoList[0];

  const handleFieldChange = (field: keyof SeoMetadata, value: any) => {
    if (!currentSeo) return;
    const updated = seoList.map((item) =>
      item.page_route === selectedRoute ? { ...item, [field]: value } : item
    );
    setSeoList(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSeo) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSeo),
      });

      if (!res.ok) throw new Error('Failed to update SEO');
      toast.success(`SEO settings saved for ${currentSeo.page_name} (${currentSeo.page_route})`);
    } catch (err: any) {
      toast.error(err.message || 'Error saving SEO');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-astro-ivory">
          Search Engine Optimization (SEO) &amp; Open Graph
        </h2>
        <p className="text-astro-slate text-xs mt-0.5">
          Fine-tune meta tags, social sharing cards, and canonical links for each of the six public pages.
        </p>
      </div>

      {/* Page Route Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {seoList.map((item) => (
          <button
            key={item.page_route}
            onClick={() => setSelectedRoute(item.page_route)}
            className={`px-4 py-2 rounded-full text-xs font-accent font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              selectedRoute === item.page_route
                ? 'bg-gold-gradient text-astro-midnight shadow-goldGlow'
                : 'bg-astro-navy/80 text-astro-slate border border-astro-border hover:text-astro-ivory'
            }`}
          >
            <span>{item.page_name}</span>
            <span className="text-[10px] font-mono opacity-80">({item.page_route})</span>
          </button>
        ))}
      </div>

      {currentSeo && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Main Card */}
          <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-astro-border/40">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-astro-gold" />
                <h3 className="font-heading text-base font-bold text-astro-ivory">
                  Editing SEO: {currentSeo.page_name} ({currentSeo.page_route})
                </h3>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save SEO Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Meta Title (Browser Tab &amp; Google Result Title)
                </label>
                <input
                  type="text"
                  required
                  value={currentSeo.meta_title || ''}
                  onChange={(e) => handleFieldChange('meta_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={currentSeo.meta_description || ''}
                  onChange={(e) => handleFieldChange('meta_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Focus Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={currentSeo.focus_keywords || ''}
                  onChange={(e) => handleFieldChange('focus_keywords', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={currentSeo.canonical_url || ''}
                  onChange={(e) => handleFieldChange('canonical_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Open Graph (OG) Title
                </label>
                <input
                  type="text"
                  value={currentSeo.og_title || ''}
                  onChange={(e) => handleFieldChange('og_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Open Graph (OG) Image URL
                </label>
                <input
                  type="text"
                  value={currentSeo.og_image_url || ''}
                  onChange={(e) => handleFieldChange('og_image_url', e.target.value)}
                  placeholder="/images/cosmic-hero.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1">
                  Open Graph (OG) Description
                </label>
                <textarea
                  rows={2}
                  value={currentSeo.og_description || ''}
                  onChange={(e) => handleFieldChange('og_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-accent text-astro-ivory">
                  <input
                    type="checkbox"
                    checked={Boolean(currentSeo.is_indexable)}
                    onChange={(e) => handleFieldChange('is_indexable', e.target.checked ? 1 : 0)}
                    className="w-4 h-4 rounded text-astro-gold bg-astro-midnight border-astro-border"
                  />
                  <span>Allow Search Engines to Index this Page (Robots index, follow)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Search Result Live Preview Card */}
          <div className="rounded-3xl bg-astro-midnight/90 border border-astro-border p-6 shadow-sm">
            <span className="text-[10px] font-accent uppercase tracking-widest text-astro-gold block mb-3">
              Google SERP Search Preview:
            </span>
            <div className="space-y-1">
              <span className="text-xs text-emerald-400 font-mono">
                {currentSeo.canonical_url || `https://astrovera.com${currentSeo.page_route}`}
              </span>
              <h4 className="text-base text-blue-400 font-medium hover:underline cursor-pointer">
                {currentSeo.meta_title}
              </h4>
              <p className="text-xs text-astro-slate leading-relaxed font-body">
                {currentSeo.meta_description}
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
