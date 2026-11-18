import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080D24',
};

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ASTROVÈRA | Luxury Vedic Astrology by Puneet Dwivedi',
  description:
    'Discover your destiny with ASTROVÈRA. Authentic Vedic astrology consultations, Kundli analysis, career direction, and spiritual remedies by Puneet Dwivedi in Mumbai.',
  keywords: [
    'Astrology',
    'Vedic Astrology Mumbai',
    'Puneet Dwivedi',
    'ASTROVÈRA',
    'Kundli Reading',
    'Career Astrology',
    'Puja Shanti Vidhan',
  ],
  authors: [{ name: 'Puneet Dwivedi' }],
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'ASTROVÈRA | Luxury Meets Spirituality',
    description:
      'Personalised astrological guidance to understand your grahas, destiny, and universe.',
    url: 'https://astrovera.com',
    siteName: 'ASTROVÈRA',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="bg-astro-midnight text-astro-ivory font-body antialiased selection:bg-astro-gold selection:text-astro-midnight min-h-screen flex flex-col">
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#0C1433',
              border: '1px solid rgba(214, 181, 109, 0.4)',
              color: '#F5F0E6',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8)',
            },
          }}
        />
      </body>
    </html>
  );
}
