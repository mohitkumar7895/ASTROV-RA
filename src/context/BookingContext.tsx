'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingContextType {
  selectedQuestion: string | null;
  selectedServiceId: number | null;
  selectedServiceName: string | null;
  setSelectedQuestion: (q: string | null) => void;
  setSelectedService: (id: number | null, name?: string | null) => void;
  openBookingForQuestion: (question: string, serviceId?: number | null, serviceName?: string | null) => void;
  openBookingForService: (serviceId: number, serviceName: string) => void;
  resetBookingSelection: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);
  const router = useRouter();

  const setSelectedService = (id: number | null, name?: string | null) => {
    setSelectedServiceId(id);
    setSelectedServiceName(name || null);
  };

  const openBookingForQuestion = (question: string, serviceId?: number | null, serviceName?: string | null) => {
    setSelectedQuestion(question);
    if (serviceId) setSelectedServiceId(serviceId);
    if (serviceName) setSelectedServiceName(serviceName);
    const formEl = document.getElementById('booking-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/contact#booking-form');
    }
  };

  const openBookingForService = (serviceId: number, serviceName: string) => {
    setSelectedServiceId(serviceId);
    setSelectedServiceName(serviceName);
    setSelectedQuestion(null);
    const formEl = document.getElementById('booking-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/contact#booking-form');
    }
  };

  const resetBookingSelection = () => {
    setSelectedQuestion(null);
    setSelectedServiceId(null);
    setSelectedServiceName(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedQuestion,
        selectedServiceId,
        selectedServiceName,
        setSelectedQuestion,
        setSelectedService,
        openBookingForQuestion,
        openBookingForService,
        resetBookingSelection,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
