'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-4 sm:mb-6 lg:mb-8 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-astro-navy/80 border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-2 sm:mb-3 shadow-sm ${centered ? 'mx-auto' : ''}`}>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-astro-gold animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 sm:mt-3 text-[#E2E8F0] text-xs sm:text-base leading-relaxed font-body font-normal sm:font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
