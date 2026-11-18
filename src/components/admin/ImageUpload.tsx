'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  X,
  Check,
  FolderOpen,
  RefreshCw,
} from 'lucide-react';
import { MediaItem } from '@/types';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  category?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

export function ImageUpload({
  label,
  value,
  onChange,
  helperText = 'Upload JPG, PNG, WEBP or SVG up to 5MB',
  category = 'general',
  aspectRatio = 'video',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState<MediaItem[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size cannot exceed 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');

      const uploadedUrl = data.item.file_path;
      onChange(uploadedUrl);
      toast.success('Image uploaded successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleOpenLibrary = async () => {
    setIsModalOpen(true);
    setLoadingLibrary(true);
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (res.ok && data.items) {
        setLibraryItems(data.items);
      }
    } catch {
      toast.error('Failed to load media library');
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleSelectFromLibrary = (path: string) => {
    onChange(path);
    setIsModalOpen(false);
    toast.success('Image selected from library');
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square max-w-[200px]'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4] max-w-[220px]'
      : 'aspect-[16/9] max-w-[340px]';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-accent uppercase tracking-wider text-astro-slate font-semibold">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-rose-400 hover:text-rose-300 font-accent flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Remove Image</span>
          </button>
        )}
      </div>

      {/* Main Upload Box */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-[#080D24] border border-astro-border/70 hover:border-astro-gold/50 transition-colors">
        {/* Preview Thumbnail */}
        {value ? (
          <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden border border-astro-border/60 bg-astro-midnight shrink-0 shadow-md`}>
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
              sizes="340px"
            />
          </div>
        ) : (
          <div className={`relative w-full ${aspectClass} rounded-xl border-2 border-dashed border-astro-border/60 bg-astro-navy/30 flex flex-col items-center justify-center p-4 text-center shrink-0`}>
            <ImageIcon className="w-8 h-8 text-astro-gold/60 mb-2" />
            <span className="text-[11px] text-astro-slate">No Image Selected</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Upload from Computer */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
              id={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <label
              htmlFor={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="px-4 py-2 rounded-xl text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </>
              )}
            </label>

            {/* 2. Choose from Media Library */}
            <button
              type="button"
              onClick={handleOpenLibrary}
              className="px-3.5 py-2 rounded-xl text-xs font-accent font-medium tracking-wider uppercase text-astro-ivory border border-astro-border hover:border-astro-gold hover:bg-astro-navy transition-all flex items-center gap-1.5"
            >
              <FolderOpen className="w-3.5 h-3.5 text-astro-gold" />
              <span>Media Library</span>
            </button>
          </div>

          {/* Current URL / Path Input (Optional Manual Override) */}
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste image path (e.g. /images/... or /uploads/...)"
              className="w-full px-3 py-2 rounded-lg bg-[#060A1D] border border-astro-border/50 text-xs font-mono text-[#CBD5E1] focus:border-astro-gold focus:outline-none"
            />
          </div>

          <p className="text-[11px] text-astro-slate/80 font-body">
            {helperText}
          </p>
        </div>
      </div>

      {/* Modal: Select from Media Library */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-3xl bg-astro-navy border border-astro-border p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-astro-border/40">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-astro-gold" />
                <h3 className="font-heading text-lg font-bold text-astro-ivory">
                  Select from Media Library
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-astro-slate hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Library Grid */}
            <div className="flex-1 overflow-y-auto py-4">
              {loadingLibrary ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-astro-slate">
                  <Loader2 className="w-6 h-6 animate-spin text-astro-gold" />
                  <span className="text-xs">Loading media library...</span>
                </div>
              ) : libraryItems.length === 0 ? (
                <div className="py-12 text-center text-astro-slate text-xs">
                  No images found in library.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {libraryItems.map((item) => {
                    const isSelected = value === item.file_path;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectFromLibrary(item.file_path)}
                        className={`group relative aspect-square rounded-xl overflow-hidden border transition-all text-left ${
                          isSelected
                            ? 'border-astro-gold ring-2 ring-astro-gold shadow-goldGlow'
                            : 'border-astro-border/60 hover:border-astro-gold/50'
                        }`}
                      >
                        <Image
                          src={item.file_path}
                          alt={item.alt_text || item.original_name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="180px"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-astro-gold text-astro-midnight flex items-center justify-center shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/80 backdrop-blur-sm">
                          <p className="text-[10px] font-mono text-white truncate">
                            {item.original_name}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-astro-border/40 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-full text-xs font-accent text-astro-ivory border border-astro-border hover:bg-astro-midnight transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
