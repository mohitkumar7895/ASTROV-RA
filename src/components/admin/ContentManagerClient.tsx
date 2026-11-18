'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Sparkles,
  Save,
  Loader2,
  FileText,
  User,
  Layout,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { HeroSection, AstrologerProfile, PageContent } from '@/types';

interface ContentProps {
  initialHero: HeroSection | null;
  initialProfile: AstrologerProfile | null;
  initialPagesContent: PageContent[];
}

export function ContentManagerClient({
  initialHero,
  initialProfile,
  initialPagesContent,
}: ContentProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'profile' | 'sections'>('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Hero state
  const [hero, setHero] = useState<Partial<HeroSection>>(initialHero || {});

  // Profile state
  const [profile, setProfile] = useState<Partial<AstrologerProfile>>({
    ...initialProfile,
    qualifications: Array.isArray(initialProfile?.qualifications)
      ? initialProfile.qualifications.join('\n')
      : String(initialProfile?.qualifications || ''),
    specialisations: Array.isArray(initialProfile?.specialisations)
      ? initialProfile.specialisations.join('\n')
      : String(initialProfile?.specialisations || ''),
  });

  // Page sections state
  const [sections, setSections] = useState<PageContent[]>(initialPagesContent);

  // Save Hero
  const handleSaveHero = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/content/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageSlug: 'home', ...hero }),
      });
      if (!res.ok) throw new Error('Failed to update hero section');
      toast.success('Hero section saved successfully');
    } catch (err: any) {
      toast.error(err.message || 'Error saving hero section');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Astrologer Profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const qualsArray = typeof profile.qualifications === 'string'
        ? profile.qualifications.split('\n').map((s) => s.trim()).filter(Boolean)
        : profile.qualifications;

      const specsArray = typeof profile.specialisations === 'string'
        ? profile.specialisations.split('\n').map((s) => s.trim()).filter(Boolean)
        : profile.specialisations;

      const res = await fetch('/api/content/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          qualifications: qualsArray,
          specialisations: specsArray,
        }),
      });

      if (!res.ok) throw new Error('Failed to update astrologer profile');
      toast.success('Astrologer profile & qualifications saved');
    } catch (err: any) {
      toast.error(err.message || 'Error saving profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Page Section
  const handleSaveSection = async (section: PageContent) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });
      if (!res.ok) throw new Error('Failed to save section');
      toast.success(`Section "${section.section_key}" saved`);
    } catch (err: any) {
      toast.error(err.message || 'Error saving section');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-astro-border/40 pb-4">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase transition-all ${
            activeTab === 'hero'
              ? 'bg-gold-gradient text-astro-midnight shadow-goldGlow'
              : 'bg-astro-navy/80 text-astro-slate border border-astro-border hover:text-astro-ivory'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Homepage Hero Section</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase transition-all ${
            activeTab === 'profile'
              ? 'bg-gold-gradient text-astro-midnight shadow-goldGlow'
              : 'bg-astro-navy/80 text-astro-slate border border-astro-border hover:text-astro-ivory'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Astrologer Profile &amp; Bio</span>
        </button>

        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase transition-all ${
            activeTab === 'sections'
              ? 'bg-gold-gradient text-astro-midnight shadow-goldGlow'
              : 'bg-astro-navy/80 text-astro-slate border border-astro-border hover:text-astro-ivory'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Page Content &amp; Philosophy</span>
        </button>
      </div>

      {/* TAB 1: HERO SECTION */}
      {activeTab === 'hero' && (
        <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-10 shadow-navyGlow space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-astro-border/40">
            <div>
              <h3 className="font-heading text-lg font-bold text-astro-ivory">
                Hero Section Management
              </h3>
              <p className="text-astro-slate text-xs mt-0.5">
                Update the primary headline, Hindi tagline, portraits, and CTA links.
              </p>
            </div>
            <button
              onClick={handleSaveHero}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Hero Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Main Headline
              </label>
              <input
                type="text"
                value={hero.headline || ''}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Subheadline
              </label>
              <input
                type="text"
                value={hero.subheadline || ''}
                onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Badge Text
              </label>
              <input
                type="text"
                value={hero.badge_text || ''}
                onChange={(e) => setHero({ ...hero, badge_text: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Hindi / Hinglish Tagline
              </label>
              <textarea
                rows={2}
                value={hero.hindi_tagline || ''}
                onChange={(e) => setHero({ ...hero, hindi_tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                English Description
              </label>
              <textarea
                rows={3}
                value={hero.description || ''}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            {/* CTAs */}
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Primary CTA Label
              </label>
              <input
                type="text"
                value={hero.primary_cta_label || ''}
                onChange={(e) => setHero({ ...hero, primary_cta_label: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Primary CTA URL
              </label>
              <input
                type="text"
                value={hero.primary_cta_url || ''}
                onChange={(e) => setHero({ ...hero, primary_cta_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Secondary CTA Label
              </label>
              <input
                type="text"
                value={hero.secondary_cta_label || ''}
                onChange={(e) => setHero({ ...hero, secondary_cta_label: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Secondary CTA URL
              </label>
              <input
                type="text"
                value={hero.secondary_cta_url || ''}
                onChange={(e) => setHero({ ...hero, secondary_cta_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Astrologer Portrait Image URL (or path in /images/ or /uploads/)
              </label>
              <input
                type="text"
                value={hero.astrologer_image_url || ''}
                onChange={(e) => setHero({ ...hero, astrologer_image_url: e.target.value })}
                placeholder="/images/astrologer-portrait.jpg"
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ASTROLOGER PROFILE */}
      {activeTab === 'profile' && (
        <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-10 shadow-navyGlow space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-astro-border/40">
            <div>
              <h3 className="font-heading text-lg font-bold text-astro-ivory">
                Astrologer Profile &amp; Qualifications
              </h3>
              <p className="text-astro-slate text-xs mt-0.5">
                All credentials, experience counts, and biographies are dynamically stored in MySQL.
              </p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Astrologer Full Name
              </label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Professional Title
              </label>
              <input
                type="text"
                value={profile.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={profile.experience_years || 15}
                onChange={(e) => setProfile({ ...profile, experience_years: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Total Consultations Count
              </label>
              <input
                type="number"
                value={profile.consultations_count || 12000}
                onChange={(e) => setProfile({ ...profile, consultations_count: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Short Bio (Hero &amp; Home preview)
              </label>
              <textarea
                rows={2}
                value={profile.short_bio || ''}
                onChange={(e) => setProfile({ ...profile, short_bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Full Professional Biography (/about page)
              </label>
              <textarea
                rows={5}
                value={profile.biography || ''}
                onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Qualifications (One per line)
              </label>
              <textarea
                rows={4}
                value={String(profile.qualifications || '')}
                onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Specialisations (One per line)
              </label>
              <textarea
                rows={4}
                value={String(profile.specialisations || '')}
                onChange={(e) => setProfile({ ...profile, specialisations: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Personal Journey
              </label>
              <textarea
                rows={3}
                value={profile.personal_journey || ''}
                onChange={(e) => setProfile({ ...profile, personal_journey: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Astrological Philosophy
              </label>
              <textarea
                rows={3}
                value={profile.philosophy || ''}
                onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Professional Values
              </label>
              <textarea
                rows={3}
                value={profile.values || ''}
                onChange={(e) => setProfile({ ...profile, values: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-2">
                Ethics Pledge &amp; Confidentiality
              </label>
              <textarea
                rows={3}
                value={profile.ethics_pledge || ''}
                onChange={(e) => setProfile({ ...profile, ethics_pledge: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAGE CONTENT SECTIONS */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div
              key={sec.id || idx}
              className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 sm:p-8 shadow-navyGlow space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-astro-border/40">
                <div>
                  <span className="text-[10px] font-accent uppercase tracking-widest text-astro-gold px-2.5 py-0.5 rounded-full bg-astro-midnight border border-astro-border">
                    Page: {sec.page_slug} / Section: {sec.section_key}
                  </span>
                </div>
                <button
                  onClick={() => handleSaveSection(sec)}
                  disabled={isSaving}
                  className="px-4 py-1.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={sec.title || ''}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].title = e.target.value;
                      setSections(updated);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={sec.subtitle || ''}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].subtitle = e.target.value;
                      setSections(updated);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate mb-1.5">
                    Section Content (Rich Text / Markdown)
                  </label>
                  <textarea
                    rows={4}
                    value={sec.content || ''}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].content = e.target.value;
                      setSections(updated);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-astro-midnight border border-astro-border focus:border-astro-gold text-astro-ivory text-sm focus:outline-none font-body"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
