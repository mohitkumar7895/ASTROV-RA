'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { MediaItem } from '@/types';

interface Props {
  initialItems: MediaItem[];
}

export function MediaManagerClient({ initialItems }: Props) {
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.filename.toLowerCase().includes(search.toLowerCase()) ||
      item.original_name.toLowerCase().includes(search.toLowerCase()) ||
      (item.alt_text && item.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size cannot exceed 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'general');

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      toast.success('Image uploaded to Media Library');
      setItems([data.item, ...items]);
    } catch (err: any) {
      toast.error(err.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.file_path);
    setCopiedId(item.id);
    toast.success('Image URL copied to clipboard: ' + item.file_path);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete image "${name}"?`)) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete image');

      toast.success('Image deleted');
      setItems(items.filter((i) => i.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Error deleting media');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-astro-ivory">
            Central Media Library
          </h2>
          <p className="text-astro-slate text-xs mt-0.5">
            Upload, preview, and reuse images for astrologer portraits, hero backgrounds, and services.
          </p>
        </div>

        {/* Upload Trigger */}
        <label className="px-5 py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto">
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-astro-midnight" />
              <span>Uploading File...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 text-astro-midnight" />
              <span>Upload Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-astro-navy/60 border border-astro-border flex items-center gap-3">
        <Search className="w-4 h-4 text-astro-slate shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media by filename or alt text..."
          className="w-full bg-transparent text-xs text-astro-ivory focus:outline-none placeholder:text-astro-slate/50"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-astro-navy/70 border border-astro-border overflow-hidden flex flex-col justify-between hover:border-astro-gold/50 transition-all shadow-sm"
          >
            {/* Image Preview Box */}
            <div className="relative aspect-square bg-astro-midnight flex items-center justify-center overflow-hidden">
              <Image
                src={item.file_path}
                alt={item.alt_text || item.original_name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>

            {/* Metadata & Actions */}
            <div className="p-3 bg-[#0A102A]">
              <p className="text-[11px] font-medium text-astro-ivory truncate font-mono">
                {item.original_name}
              </p>
              <p className="text-[10px] text-astro-slate mt-0.5">
                {(item.file_size / 1024).toFixed(0)} KB
              </p>

              <div className="mt-2.5 pt-2 border-t border-astro-border/30 flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className="p-1.5 rounded-lg text-astro-slate hover:text-astro-gold hover:bg-astro-navy transition-colors flex items-center gap-1 text-[10px]"
                  title="Copy Image URL"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={item.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-astro-slate hover:text-astro-ivory"
                    title="Open Full Image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id, item.original_name)}
                    className="p-1.5 rounded-lg text-astro-slate hover:text-rose-400"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-16 text-center rounded-3xl bg-astro-navy/40 border border-astro-border/60">
          <ImageIcon className="w-10 h-10 text-astro-gold/40 mx-auto mb-3" />
          <h3 className="font-heading text-base font-bold text-astro-ivory">
            No Images in Media Library
          </h3>
          <p className="text-astro-slate text-xs mt-1 max-w-sm mx-auto">
            Upload images here to use across your hero sections, services, and profile pages.
          </p>
        </div>
      )}
    </div>
  );
}
