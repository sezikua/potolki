import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { ServicesCatalog } from '@/components/sections/ServicesCatalog';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { Testimonials } from '@/components/sections/Testimonials';
import { Calculator } from '@/components/sections/Calculator';
import { JsonLd } from '@/components/SEO/JsonLd';
import { generateJsonLd } from '@/lib/seo';
import { siteConfig } from '@/data/config';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Натяжні стелі в Києві | Преміум якість від Labell',
  description:
    'Натяжні стелі в Києві від Labell. Понад 16 років досвіду. Глянцеві, матові, фотодрук, парящі стелі. Швидка установка, гарантія 15 років. Доставка по всій Україні.',
});

export default function HomePage() {
  const organizationJsonLd = generateJsonLd({
    type: 'LocalBusiness',
    data: {
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        postalCode: siteConfig.contact.address.postalCode,
        addressCountry: siteConfig.contact.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '50.4501',
        longitude: '30.5234',
      },
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    },
  });

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <Benefits />
      <ServicesCatalog />
      <ProjectGrid />
      <Testimonials />
      <Calculator />
    </>
  );
}
