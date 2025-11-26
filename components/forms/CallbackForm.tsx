'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

const callbackFormSchema = z.object({
  name: z.string().min(2, 'Ім\'я повинно містити мінімум 2 символи'),
  phone: z.string().regex(/^\+?380\d{9}$/, 'Введіть коректний номер телефону'),
});

type CallbackFormData = z.infer<typeof callbackFormSchema>;

interface CallbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackForm: React.FC<CallbackFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackFormSchema),
  });

  const onFormSubmit = async (data: CallbackFormData) => {
    setIsSubmitting(true);
    try {
      await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting callback:', error);
      alert('Помилка відправки форми. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Замовити зворотний дзвінок" size="md">
      <div className="p-6">
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">Дякуємо!</p>
            <p className="text-gray-600">Ми зв'яжемося з вами найближчим часом.</p>
          </div>
        ) : (
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
              placeholder="+380505651511"
              type="tel"
            />

            <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
              Замовити дзвінок
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Ми передзвонимо вам протягом 15 хвилин
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};
