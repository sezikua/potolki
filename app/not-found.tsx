import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Сторінку не знайдено</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button size="lg">На головну</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg">
            Зв'язатися з нами
          </Button>
        </Link>
      </div>
    </div>
  );
}
