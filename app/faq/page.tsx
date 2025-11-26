import React from 'react';
import Link from 'next/link';
import { faqs } from '@/data/faq';
import { FAQAccordion } from '@/components/FAQ/FAQAccordion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Часті питання (FAQ) | Labell',
  description: 'Відповіді на найпоширеніші питання про натяжні стелі, встановлення, гарантію та ціни.',
});

export default function FAQPage() {

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Часті питання
          </h1>
          <p className="text-xl text-gray-600">
            Відповіді на найпоширеніші питання про натяжні стелі
          </p>
        </div>

        <div className="mb-8">
          <FAQAccordion faqs={faqs} />
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Не знайшли відповіді?
            </h2>
            <p className="text-gray-600 mb-6">
              Зв'яжіться з нами, і ми відповімо на всі ваші питання
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Зв'язатися з нами</Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" size="lg">
                  Розрахувати вартість
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
