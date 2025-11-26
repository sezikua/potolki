import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, Users, Clock, Shield } from 'lucide-react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Про нас | Labell - Натяжні стелі в Києві',
  description: 'Labell - надійний партнер з натяжних стель понад 16 років. Якість, гарантія, професіоналізм.',
});

const stats = [
  { icon: Clock, value: '16+', label: 'Років на ринку' },
  { icon: Users, value: '5000+', label: 'Задоволених клієнтів' },
  { icon: Award, value: '15', label: 'Років гарантії' },
  { icon: Shield, value: '100%', label: 'Гарантія якості' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Про компанію Labell</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ми — команда професіоналів з багаторічним досвідом у галузі натяжних стель. Наша місія —
          створювати красиві та якісні рішення для вашого дому та офісу.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                <stat.icon className="w-8 h-8 text-primary-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша історія</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Компанія Labell працює на ринку натяжних стель понад 16 років. За цей час ми
              встановили тисячі стель у різних типах приміщень — від невеликих квартир до
              великих комерційних об'єктів.
            </p>
            <p>
              Ми працюємо виключно з якісними матеріалами від провідних виробників та надаємо
              гарантію 15 років на всі наші роботи. Наша команда складається з досвідчених
              майстрів, які постійно підвищують свою кваліфікацію.
            </p>
            <p>
              Ми цінуємо кожного клієнта та прагнемо надати найкращий сервіс. Наша репутація
              побудована на довірі, якості та чесності.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src="/images/about/team.jpg"
            alt="Команда Labell"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Наші цінності</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Якість</h3>
              <p className="text-gray-600">
                Використовуємо тільки сертифіковані матеріали та сучасне обладнання
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Надійність</h3>
              <p className="text-gray-600">
                Гарантія 15 років та сервісне обслуговування протягом усього терміну
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Професіоналізм</h3>
              <p className="text-gray-600">
                Досвідчена команда майстрів з багаторічним стажем роботи
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Готові почати ваш проєкт?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Зв'яжіться з нами для безкоштовної консультації та заміру
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
  );
}
