'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getAstrologerWhatsApp } from '@/lib/whatsapp';

export function WhatsAppButton() {
  const { settings } = useApp();
  const isEnabled = settings.whatsapp_floating_enabled !== 'false';
  const whatsappUrl = getAstrologerWhatsApp();
  const phone = settings.contact_phone || '+91 96306 20240';

  if (!isEnabled) return null;

  return (
    <aside aria-label="Floating direct contact actions" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
      {/* 1. Direct Phone Call Button (Circular / Goal) */}
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        aria-label={`Call Pandit Puneet Dwivedi at ${phone}`}
        title={`Call ${phone}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0C1433] hover:bg-astro-navy border-2 border-astro-gold text-astro-gold hover:text-white shadow-goldGlow hover:shadow-goldGlowLg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        <Phone className="w-5 h-5 text-astro-gold group-hover:scale-110 transition-transform" />
        {/* Tooltip on hover (desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#0C1433] border border-astro-gold/50 text-xs font-accent font-semibold text-astro-gold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          Call: {phone}
        </span>
      </a>

      {/* 2. Floating WhatsApp Button (Circular / Goal) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation with Puneet Dwivedi"
        title="Chat on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        {/* Tooltip on hover (desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#0C1433] border border-emerald-500/50 text-xs font-accent font-semibold text-emerald-400 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
