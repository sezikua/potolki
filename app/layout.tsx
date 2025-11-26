import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactButtons } from '@/components/ContactButtons';
import { CookieConsent } from '@/components/CookieConsent';
import { Analytics } from '@/components/Analytics';
import { siteConfig } from '@/data/config';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'натяжні стелі',
    'натяжні стелі Київ',
    'натяжні стелі Україна',
    'глянцеві стелі',
    'матові стелі',
    'фотодрук стелі',
    'парящі стелі',
    'Labell',
    'натяжні стелі ціна',
    'встановлення натяжних стель',
  ],
  authors: [{ name: 'Labell' }],
  creator: 'Labell',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification here
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.variable}>
      <body>
        <Analytics />
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <ContactButtons variant="floating" />
        <CookieConsent />
      </body>
    </html>
  );
}