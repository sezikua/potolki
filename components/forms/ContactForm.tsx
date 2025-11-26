'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { services } from '@/data/services';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Ім\'я повинно містити мінімум 2 символи'),
  phone: z.string().regex(/^\+?380\d{9}$/, 'Введіть коректний номер телефону'),
  email: z.string().email('Введіть коректний email').optional().or(z.literal('')),
  message: z.string().optional(),
  service: z.string().optional(),
  area: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  defaultService?: string;
  showServiceSelect?: boolean;
  showAreaInput?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  defaultService,
  showServiceSelect = false,
  showAreaInput = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: defaultService,
    },
  });

  const onFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission - you can integrate with your API/CRM here
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Помилка відправки форми. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: '', label: 'Оберіть послугу' },
    ...services.map((service) => ({
      value: service.slug,
      label: service.title,
    })),
  ];

  if (submitSuccess) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
        <p className="text-green-800 font-medium">Дякуємо! Ми зв'яжемося з вами найближчим часом.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        label="Ім'я *"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Введіть ваше ім'я"
      />

      <Input
        label="Телефон *"
        {...register('phone')}
        error={errors.phone?.message}
        placeholder="+380501234567"
        type="tel"
      />

      <Input
        label="Email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="your@email.com"
        type="email"
      />

      {showServiceSelect && (
        <Select
          label="Послуга"
          options={serviceOptions}
          {...register('service')}
          error={errors.service?.message}
        />
      )}

      {showAreaInput && (
        <Input
          label="Площа (м²)"
          {...register('area')}
          error={errors.area?.message}
          placeholder="20"
          type="number"
          min="1"
        />
      )}

      <Textarea
        label="Повідомлення"
        {...register('message')}
        error={errors.message?.message}
        placeholder="Додаткова інформація..."
        rows={4}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
        Надіслати заявку
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Натискаючи кнопку, ви погоджуєтесь з{' '}
        <a href="/privacy" className="text-primary-500 hover:underline">
          політикою конфіденційності
        </a>
      </p>
    </form>
  );
};
