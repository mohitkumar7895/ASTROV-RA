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
  ArrowRight,
  Clock,
  Video,
  MessageCircle,
  Hand,
} from 'lucide-react';
import { AstrologyService } from '@/types';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useBooking } from '@/context/BookingContext';
import { getClassesWhatsAppUrl } from '@/lib/whatsapp';

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
  Hand,
};

export function FeaturedServices({ services = [] }: { services: AstrologyService[] }) {
  const { openBookingForService } = useBooking();

  return (
    <section className="py-4 sm:py-8 lg:py-10 relative overflow-hidden">
      {/* Cosmic Nebula Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/cosmic-celestial-deepspace.jpg"
          alt="Celestial Nebula Galaxy Background"
          fill
          className="object-cover object-center opacity-15 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-astro-midnight/95 via-transparent to-astro-midnight/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="SACRED OFFERINGS"
          title="Featured Astrology Services"
          subtitle="Precision Vedic consultations designed to illuminate your life path, career transitions, and relationship harmony."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-[#0C1433] border border-astro-border/70 p-4 sm:p-6 lg:p-8 flex flex-col justify-between hover:border-astro-gold/60 hover:shadow-goldGlow transition-all duration-300"
              >
                {/* Top Corner Shimmer */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-astro-gold/5 blur-2xl rounded-full group-hover:bg-astro-gold/15 transition-all" />

                <div>
                  {service.image_url ? (
                    <div className="relative w-full h-36 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-astro-border/50 group-hover:border-astro-gold/50 transition-colors">
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
                      {service.slug === 'astrology-education-classes' ? (
                        <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-md">
                          ⚡ Limited Seats
                        </span>
                      ) : Boolean(service.is_featured) && (
                        <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-md">
                          Popular
                        </span>
                      )}
                    </div>
                  ) : (
                    /* Service Icon */
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-astro-midnight border border-astro-border flex items-center justify-center text-astro-gold mb-4 sm:mb-6 group-hover:scale-110 group-hover:border-astro-gold transition-all duration-300">
                      <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                  )}

                  <h3 className="font-heading text-base sm:text-xl font-bold text-white group-hover:text-astro-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 sm:mt-3 text-[#E2E8F0] text-xs sm:text-sm leading-relaxed line-clamp-3 font-body font-normal sm:font-medium">
                    {service.short_description || service.description}
                  </p>

                  {/* Metadata: Duration & Method */}
                  <div className="mt-4 sm:mt-6 pt-2 sm:pt-3 space-y-1.5 sm:space-y-2 text-xs text-[#CBD5E1] font-accent font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-astro-gold shrink-0" />
                      <span>{service.duration_minutes} Minutes Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-astro-gold shrink-0" />
                      <span className="truncate">{service.consultation_method}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-astro-border/30 flex items-center gap-2">
                  {service.slug === 'astrology-education-classes' && (
                    <a
                      href={getClassesWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 sm:py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => openBookingForService(service.id, service.title)}
                    className="flex-1 px-4 py-2 sm:py-2.5 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-sm hover:shadow-goldGlow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{service.slug === 'astrology-education-classes' ? 'Enquire Now' : 'Book Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-14 text-center">
          <Link
            href="/services"
            prefetch={true}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-accent font-semibold text-xs tracking-widest uppercase text-astro-ivory border border-astro-border hover:border-astro-gold hover:bg-astro-navy transition-all"
          >
            <span>View All Astrology Services</span>
            <ArrowRight className="w-4 h-4 text-astro-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
