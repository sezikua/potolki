import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { Check } from 'lucide-react';
import { generateSeoMetadata } from '@/lib/seo';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return generateSeoMetadata({
      title: 'Послуга не знайдена',
      noindex: true,
    });
  }

  return generateSeoMetadata({
    title: `${service.title} | Послуги`,
    description: service.description,
    image: service.images[0],
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary-500">
          Головна
        </Link>
        {' / '}
        <Link href="/services" className="hover:text-primary-500">
          Послуги
        </Link>
        {' / '}
        <span className="text-gray-900">{service.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Images */}
        <div className="space-y-4">
          {service.images.map((image, index) => (
            <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={image}
                alt={`${service.title} - фото ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{service.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{service.description}</p>

          {service.priceRange && (
            <div className="mb-8 p-6 bg-primary-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Вартість від</p>
              <p className="text-3xl font-bold text-primary-600">
                {service.priceRange.min} ₴/м²
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Точна вартість розраховується після заміру
              </p>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Переваги</h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check size={20} className="text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Замовити {service.title}</h2>
            <p className="text-gray-600 mb-6">
              Залиште заявку, і наш менеджер зв'яжеться з вами для уточнення деталей та призначення
              безкоштовного заміру.
            </p>
            <ContactForm defaultService={service.slug} showServiceSelect={false} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Потрібна консультація?</h2>
            <p className="text-gray-600 mb-6">
              Наші фахівці готові відповісти на всі ваші питання та допомогти з вибором.
            </p>
            <Link href="/contact">
              <Button className="w-full" size="lg">
                Зв'язатися з нами
              </Button>
            </Link>
            <Link href="/calculator">
              <Button variant="outline" className="w-full mt-3" size="lg">
                Розрахувати вартість
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
