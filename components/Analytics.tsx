'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

interface AnalyticsProps {
  gaId?: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  gaId = process.env.NEXT_PUBLIC_GA_ID,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check cookie consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted' || !gaId) return;

    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaId, {
      page_path: pathname,
    });
  }, [gaId]);

  useEffect(() => {
    // Track page views
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted' || !window.gtag || !gaId) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    window.gtag('config', gaId, {
      page_path: url,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  if (!gaId) return null;

  return null;
};

// Helper function to track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  const consent = localStorage.getItem('cookie-consent');
  if (consent !== 'accepted' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
