'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { services } from '@/data/services';
import { CeilingType } from '@/types';

const calculatorSchema = z.object({
  area: z.number().min(1, 'Площа повинна бути більше 0'),
  ceilingType: z.enum(['glossy', 'matte', 'satin', 'photoprint', 'suspended', 'combined']),
  roomType: z.enum([
    'living-room',
    'bedroom',
    'kitchen',
    'bathroom',
    'office',
    'hallway',
    'other',
  ]),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

const priceRanges: Record<CeilingType, { min: number; max: number }> = {
  glossy: { min: 300, max: 600 },
  matte: { min: 250, max: 500 },
  satin: { min: 280, max: 550 },
  photoprint: { min: 500, max: 1500 },
  suspended: { min: 600, max: 1200 },
  combined: { min: 400, max: 1000 },
};

export const Calculator: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      area: 20,
      ceilingType: 'glossy',
      roomType: 'living-room',
    },
  });

  const area = watch('area') || 20;
  const ceilingType = watch('ceilingType') as CeilingType;

  const calculatePrice = (_data: CalculatorFormData) => {
    // Ця функція використовується для обробки форми, але розрахунок відбувається в реальному часі
  };

  const ceilingTypeOptions = services.map((service) => ({
    value: service.id,
    label: service.title,
  }));

  const roomTypeOptions = [
    { value: 'living-room', label: 'Вітальня' },
    { value: 'bedroom', label: 'Спальня' },
    { value: 'kitchen', label: 'Кухня' },
    { value: 'bathroom', label: 'Ванна кімната' },
    { value: 'office', label: 'Офіс' },
    { value: 'hallway', label: 'Коридор' },
    { value: 'other', label: 'Інше' },
  ];

  const currentRange = ceilingType ? priceRanges[ceilingType] : null;
  const estimatedPriceMin = currentRange ? currentRange.min * area : 0;
  const estimatedPriceMax = currentRange ? currentRange.max * area : 0;

  return (
    <section
      ref={ref}
      id="calculator"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Розрахувати вартість
            </h2>
            <p className="text-lg text-gray-600">
              Отримайте орієнтовну вартість вашої стелі
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <form onSubmit={handleSubmit(calculatePrice)} className="space-y-6">
                <Input
                  label="Площа приміщення (м²) *"
                  type="number"
                  {...register('area', { valueAsNumber: true })}
                  error={errors.area?.message}
                  min="1"
                  step="0.1"
                />

                <Select
                  label="Тип стелі *"
                  options={ceilingTypeOptions}
                  {...register('ceilingType')}
                  error={errors.ceilingType?.message}
                />

                <Select
                  label="Тип приміщення *"
                  options={roomTypeOptions}
                  {...register('roomType')}
                  error={errors.roomType?.message}
                />

                <Button type="submit" className="w-full" size="lg">
                  Розрахувати
                </Button>
              </form>

              {/* Price Estimate */}
              {currentRange && area > 0 && (
                <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Орієнтовна вартість:</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {estimatedPriceMin.toLocaleString('uk-UA')} -{' '}
                    {estimatedPriceMax.toLocaleString('uk-UA')} ₴
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Точну вартість розрахує наш менеджер після заміру
                  </p>
                </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Отримати точний розрахунок
              </h3>
              <ContactForm
                showServiceSelect={false}
                showAreaInput={true}
                defaultService={ceilingType}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
