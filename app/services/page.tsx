import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/data/services';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { generateMetadata } from '@/lib/seo';
import { Sparkles, Layers, Palette, Image as ImageIcon, Zap, Grid } from 'lucide-react';

export const metadata = generateMetadata({
  title: 'Послуги | Види натяжних стель',
  description: 'Повний перелік послуг Labell: глянцеві, матові, сатинові стелі, фотодрук, парящі та комбіновані стелі.',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  sparkles: Sparkles,
  layers: Layers,
  palette: Palette,
  image: ImageIcon,
  zap: Zap,
  grid: Grid,
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Наші послуги</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Виберіть ідеальний тип натяжної стелі для вашого інтер'єру
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Grid;
          return (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <Card hover className="h-full">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={service.images[0] || '/images/services/placeholder.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Icon size={20} className="text-primary-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                  {service.priceRange && (
                    <p className="text-sm text-gray-500 mb-4">
                      від {service.priceRange.min} ₴/м²
                    </p>
                  )}
                  <Button variant="outline" className="w-full" size="sm">
                    Детальніше
                  </Button>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
