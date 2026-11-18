'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-astro-midnight flex items-center justify-center px-4 relative overflow-hidden text-center">
      {/* Subtle cosmic aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-astro-gold/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-astro-navy border border-astro-gold/40 flex items-center justify-center text-astro-gold mx-auto mb-6 shadow-goldGlow">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '15s' }} />
        </div>

        <span className="text-xs font-accent text-astro-gold uppercase tracking-[0.25em] block mb-2">
          Cosmic Coordinates Unaligned • 404
        </span>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-astro-ivory mb-4">
          Celestial Path Not Found
        </h1>

        <p className="text-astro-slate text-sm font-body leading-relaxed mb-8">
          The stars indicate this cosmic pathway does not exist or has shifted alignment. Let us guide you back to clarity.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-astro-midnight" />
          <span>Return to ASTROVÈRA Sanctuary</span>
        </Link>
      </div>
    </div>
  );
}
