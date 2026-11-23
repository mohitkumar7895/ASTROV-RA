'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { bookingFormSchema, BookingFormData } from '@/lib/validations';
import { useBooking } from '@/context/BookingContext';
import { AstrologyService } from '@/types';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function BookingForm({
  services = [],
  defaultServiceId,
}: {
  services?: AstrologyService[];
  defaultServiceId?: number | null;
}) {
  const {
    selectedQuestion,
    selectedServiceId,
    selectedServiceName,
    resetBookingSelection,
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    bookingRef: string;
    fullName: string;
    serviceName?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      dob: '',
      birthTime: '',
      birthPlace: '',
      serviceId: defaultServiceId || selectedServiceId || undefined,
      serviceName: selectedServiceName || '',
      preferredDate: '',
      preferredTimeSlot: '11:00 AM - 12:00 PM',
      selectedProblem: selectedQuestion || '',
      message: '',
    },
  });

  // Sync with context if user navigated with pre-selected problem or service
  useEffect(() => {
    if (selectedQuestion) {
      setValue('selectedProblem', selectedQuestion);
    }
    if (selectedServiceId) {
      setValue('serviceId', selectedServiceId);
      const s = services.find((srv) => srv.id === selectedServiceId);
      if (s) setValue('serviceName', s.title);
    }
  }, [selectedQuestion, selectedServiceId, services, setValue]);

  const watchedPhone = watch('phone');
  const watchedName = watch('fullName');
  const watchedProblem = watch('selectedProblem');

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit booking request');
      }

      toast.success(
        `Consultation request submitted! Your Booking ID is: ${result.bookingRef}`,
        {
          duration: 8000,
        }
      );

      setSubmittedBooking({
        bookingRef: result.bookingRef,
        fullName: data.fullName,
        serviceName: data.serviceName,
      });

      reset();
      resetBookingSelection();
    } catch (err: any) {
      toast.error(err.message || 'Error sending booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const name = watchedName || 'A seeker';
    const problem = watchedProblem || 'Astrological Consultation';
    const text = `Namaste Pandit Puneet Dwivedi Ji, my name is ${name}. I wish to book an astrological consultation regarding: "${problem}". Please let me know your available slots.`;
    const url = buildWhatsAppLink('919630620240', text);
    window.open(url, '_blank');
  };

  if (submittedBooking) {
    return (
      <div className="bg-astro-navy/90 border border-astro-gold/50 rounded-2xl p-5 sm:p-10 text-center shadow-goldGlow">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-astro-gold/20 border border-astro-gold flex items-center justify-center mx-auto mb-5 text-astro-gold">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h3 className="font-heading text-xl sm:text-3xl font-bold text-astro-ivory mb-2">
          Consultation Request Confirmed
        </h3>
        <p className="text-astro-slate text-xs sm:text-sm max-w-md mx-auto mb-6">
          Thank you, <strong className="text-astro-gold">{submittedBooking.fullName}</strong>.
          Pandit Puneet Dwivedi's office will review your birth chart details and contact you
          within 2 hours to confirm your consultation schedule.
        </p>

        <div className="inline-block bg-astro-midnight px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-astro-border mb-8 max-w-full">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-astro-slate block mb-1 font-accent">
            Your Booking Reference ID
          </span>
          <span className="font-heading text-xl sm:text-2xl font-bold tracking-widest text-astro-gold break-all">
            {submittedBooking.bookingRef}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setSubmittedBooking(null)}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-ivory border border-astro-border hover:bg-astro-navy transition-all"
          >
            Submit Another Request
          </button>
          <button
            onClick={handleWhatsAppDirect}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-accent font-semibold tracking-wider uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-105 transition-all"
          >
            Message On WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="booking-form" className="relative bg-[#0C1433] border border-astro-border rounded-2xl p-3.5 sm:p-8 md:p-10 shadow-navyGlow">
      <div className="mb-4 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-astro-midnight border border-astro-border text-astro-gold text-[10px] sm:text-xs font-accent tracking-widest uppercase mb-2 sm:mb-3">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-astro-gold animate-pulse" />
          <span>Personal Consultation Form</span>
        </div>
        <h3 className="font-heading text-xl sm:text-3xl font-bold text-astro-ivory">
          Schedule Your Consultation
        </h3>
        <p className="text-[#CBD5E1] text-xs sm:text-sm mt-0.5 sm:mt-1 font-medium">
          Fill in your birth details accurately for precise astrological calculations.
        </p>
      </div>

      {selectedQuestion && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-astro-midnight border border-astro-gold/50 flex items-start gap-2.5 sm:gap-3">
          <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5 text-astro-gold shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-astro-gold font-accent block font-semibold">
              Selected Query for Puneet Dwivedi:
            </span>
            <span className="text-white text-xs sm:text-sm font-semibold">{selectedQuestion}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Full Name <span className="text-astro-gold">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="text"
                {...register('fullName')}
                placeholder="e.g. Aditya Verma"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm placeholder:text-slate-400 transition-colors"
              />
            </div>
            {errors.fullName && (
              <p className="text-rose-400 text-xs mt-1.5">{errors.fullName.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Mobile Number (WhatsApp) <span className="text-astro-gold">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="tel"
                {...register('phone')}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm placeholder:text-slate-400 transition-colors"
              />
            </div>
            {errors.phone && (
              <p className="text-rose-400 text-xs mt-1.5">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="email"
                {...register('email')}
                placeholder="aditya@example.com"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm placeholder:text-slate-400 transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-rose-400 text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>

          {/* Astrology Service */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Astrology Service
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold" />
              <select
                {...register('serviceId', {
                  onChange: (e) => {
                    const id = Number(e.target.value);
                    const s = services.find((item) => item.id === id);
                    if (s) setValue('serviceName', s.title);
                  },
                })}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm transition-colors"
              >
                <option value="" className="bg-[#0C1433] text-white">Select an Astrology Service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#0C1433] text-white">
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Kundli Precision Info: Date of Birth, Birth Time, Birth Place */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 pt-1 sm:pt-2">
          {/* DOB */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="date"
                {...register('dob')}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm transition-colors"
              />
            </div>
          </div>

          {/* Birth Time */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Exact Time of Birth
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="text"
                placeholder="e.g. 06:45 AM"
                {...register('birthTime')}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* Birth Place */}
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Place of Birth (City/State)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="text"
                placeholder="e.g. Mumbai, MH"
                {...register('birthPlace')}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm placeholder:text-slate-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Preferred Date & Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Preferred Consultation Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <input
                type="date"
                {...register('preferredDate')}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
              Preferred Time Slot
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-astro-gold/70" />
              <select
                {...register('preferredTimeSlot')}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm transition-colors"
              >
                <option value="11:00 AM - 12:00 PM" className="bg-[#0C1433] text-white">Morning: 11:00 AM – 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM" className="bg-[#0C1433] text-white">Afternoon: 02:00 PM – 03:00 PM</option>
                <option value="04:00 PM - 05:00 PM" className="bg-[#0C1433] text-white">Evening: 04:00 PM – 05:00 PM</option>
                <option value="06:30 PM - 07:30 PM" className="bg-[#0C1433] text-white">Night: 06:30 PM – 07:30 PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-accent uppercase tracking-wider text-[#E2E8F0] font-semibold mb-1.5 sm:mb-2">
            Your Questions or Specific Dilemma
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-astro-gold/70" />
            <textarea
              rows={2}
              {...register('message')}
              placeholder="Describe your primary life situation or questions you want Pandit Ji to examine..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#060A1D] border border-astro-border/70 focus:border-astro-gold focus:outline-none text-white font-medium text-sm placeholder:text-slate-400 transition-colors sm:rows-3"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:flex-1 py-3 sm:py-4 px-5 sm:px-6 rounded-xl font-accent font-semibold text-xs tracking-widest uppercase text-astro-midnight bg-gold-gradient shadow-goldGlow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-astro-midnight" />
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <span>Confirm &amp; Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="w-full sm:w-auto py-3 sm:py-4 px-5 sm:px-6 rounded-xl font-accent font-semibold text-xs tracking-wider uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
