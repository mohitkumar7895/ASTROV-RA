import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { BookingProvider } from '@/context/BookingContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CosmicBackground } from '@/components/common/CosmicBackground';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { getWebsiteSettings } from '@/lib/queries';

export const revalidate = 0; // Dynamic server rendering for live CMS updates

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Record<string, string> = {};
  try {
    settings = await getWebsiteSettings();
  } catch (err) {
    console.error('Error fetching settings for website layout:', err);
  }

  return (
    <AppProvider initialSettings={settings}>
      <BookingProvider>
        <div className="relative min-h-screen flex flex-col bg-astro-midnight selection:bg-astro-gold selection:text-astro-midnight">
          <CosmicBackground />
          <Navbar />
          <main className="flex-1 relative z-10 pt-20 sm:pt-24 lg:pt-28">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </div>
      </BookingProvider>
    </AppProvider>
  );
}
