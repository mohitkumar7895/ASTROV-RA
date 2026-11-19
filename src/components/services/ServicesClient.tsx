'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Compass,
  Briefcase,
  HeartHandshake,
  Calendar,
  Binary,
  UserCheck,
  MessageSquare,
  Flame,
  Sparkles,
  Clock,
  Video,
  ArrowRight,
  CheckCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { AstrologyService } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useBooking } from '@/context/BookingContext';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Briefcase,
  HeartHandshake,
  Calendar,
  Binary,
  UserCheck,
  MessageSquare,
  Flame,
  Sparkles,
};

const consultationSteps = [
  {
    step: '01',
    title: 'Submit Birth Details',
    desc: 'Share your accurate Date of Birth, Exact Birth Time, City of Birth, and your primary life dilemmas.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Mathematical Kundli Analysis',
    desc: 'Pandit Puneet Dwivedi personally casts your Lagna chart, Navamsha (D-9), D-10, and dasha cycles.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Private 1-on-1 Session',
    desc: 'Connect via private Google Meet video or confidential voice call for a deep, compassionate dialogue.',
    icon: Video,
  },
  {
    step: '04',
    title: 'Remedies & Auspicious Timing',
    desc: 'Receive tailored Vedic remedies, gemstone guidance, sacred mantras, and Muhurta for major life events.',
    icon: ShieldCheck,
  },
];

export function ServicesClient({ services = [] }: { services: AstrologyService[] }) {
  const { openBookingForService } = useBooking();

  return (
    <div className="py-4 sm:py-8 lg:py-12">
      {/* 4-Step Consultation Process */}
      <div className="mb-10 sm:mb-16 lg:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-astro-navy border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-2 sm:mb-3">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-astro-gold" />
            <span>Structured Process</span>
          </div>
          <h2 className="font-heading text-xl sm:text-3xl font-bold text-astro-ivory">
            Our 4-Step Consultation Process
          </h2>
          <p className="text-astro-slate text-xs sm:text-sm font-body mt-1 sm:mt-2">
            Every consultation is structured with scholarly rigor, personal attention, and absolute discretion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {consultationSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 flex flex-col justify-between hover:border-astro-gold/50 transition-all shadow-navyGlow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-astro-gold/40">
                      {step.step}
                    </span>
                    <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold">
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#CBD5E1] text-xs leading-relaxed font-body font-normal sm:font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Services Grid (Active Services only) */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-astro-navy border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-2 sm:mb-3">
            <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-astro-gold" />
            <span>Available Consultations</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-astro-ivory">
            Astrology Consultations &amp; Vidhan
          </h2>
          <p className="text-astro-slate text-xs sm:text-sm font-body mt-1 sm:mt-2">
            Select a specialized reading tailored to your specific life stage and personal questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl sm:rounded-3xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 lg:p-8 flex flex-col justify-between hover:border-astro-gold/60 hover:shadow-goldGlow transition-all duration-300 group"
              >
                <div>
                  {service.image_url ? (
                    <div className="relative w-full h-36 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-astro-border/50 group-hover:border-astro-gold/50 transition-colors">
                      <Image
                        src={service.image_url}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-astro-midnight via-transparent to-transparent opacity-80" />
                      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-astro-midnight/90 border border-astro-gold/50 flex items-center justify-center text-astro-gold backdrop-blur-md shadow-md">
                        <IconComponent className="w-4 sm:w-5 h-4 sm:h-5" />
                      </div>
                      {Boolean(service.is_featured) && (
                        <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-md">
                          {service.slug === 'astrology-education-classes' ? '⚡ Limited Seats' : 'Popular'}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold group-hover:scale-110 group-hover:border-astro-gold transition-all duration-300">
                        <IconComponent className="w-5 sm:w-7 h-5 sm:h-7" />
                      </div>
                      {Boolean(service.is_featured) && (
                        <span className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-sm">
                          Popular
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="font-heading text-base sm:text-xl font-bold text-white group-hover:text-astro-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 sm:mt-3 text-[#E2E8F0] text-xs sm:text-sm leading-relaxed font-body font-normal sm:font-medium">
                    {service.description || service.short_description}
                  </p>

                  {/* Metadata: Duration & Consultation Method */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-5 border-t border-astro-border/30 space-y-2 text-xs text-[#CBD5E1] font-accent font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0" />
                      <span>Duration: {service.duration_minutes} Minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-astro-gold shrink-0" />
                      <span className="truncate">{service.consultation_method}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="mt-4 sm:mt-8 pt-3 sm:pt-5 border-t border-astro-border/40 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-astro-slate block font-accent">
                      Honorarium
                    </span>
                    <span className="font-heading text-base sm:text-xl font-bold text-astro-gold">
                      {Number(service.price) > 0
                        ? formatCurrency(service.price, service.currency)
                        : 'Inquire for Fees'}
                    </span>
                  </div>

                  <button
                    onClick={() => openBookingForService(service.id, service.title)}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-sm hover:shadow-goldGlow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>{Number(service.price) > 0 ? 'Book Slot' : 'Enquire Fees'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
