import React from 'react';
import { Calculator } from '@/components/sections/Calculator';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Калькулятор вартості натяжних стель',
  description: 'Онлайн калькулятор для розрахунку вартості натяжних стель. Отримайте орієнтовну ціну за хвилину.',
});

export default function CalculatorPage() {
  return (
    <div className="pt-8">
      <Calculator />
    </div>
  );
}
