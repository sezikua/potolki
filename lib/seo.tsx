import { Metadata } from 'next';
import { siteConfig } from '@/data/config';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noindex?: boolean;
}

export function generateSeoMetadata({
  title,
  description,
  image,
  path = '',
  noindex = false,
}: GenerateMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

// Alias for backward compatibility
export const generateMetadata = generateSeoMetadata;

export function generateJsonLd({
  type,
  data,
}: {
  type: 'Organization' | 'LocalBusiness' | 'Product' | 'Review' | 'BreadcrumbList';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  const baseJsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return baseJsonLd;
}
