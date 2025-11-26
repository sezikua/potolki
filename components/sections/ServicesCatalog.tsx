'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '@/data/services';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Layers, Palette, Image as ImageIcon, Zap, Grid } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  sparkles: Sparkles,
  layers: Layers,
  palette: Palette,
  image: ImageIcon,
  zap: Zap,
  grid: Grid,
};

export const ServicesCatalog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Види натяжних стель
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Виберіть ідеальний варіант для вашого інтер'єру
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Grid;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/services/${service.slug}`}>
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
                        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.shortDescription}
                      </p>
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
