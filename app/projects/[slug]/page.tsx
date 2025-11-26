import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectGallery } from '@/components/ProjectGallery';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { JsonLd } from '@/components/SEO/JsonLd';
import { generateSeoMetadata } from '@/lib/seo';
import { MapPin, Clock, Palette, Wrench } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return generateSeoMetadata({
      title: 'Проєкт не знайдено',
      noindex: true,
    });
  }

  return generateSeoMetadata({
    title: `${project.title} | Портфоліо`,
    description: project.description,
    image: project.images.main,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const roomLabels: Record<string, string> = {
    'living-room': 'Вітальня',
    'bedroom': 'Спальня',
    'kitchen': 'Кухня',
    'bathroom': 'Ванна',
    'office': 'Офіс',
    'hallway': 'Коридор',
    'other': 'Інше',
  };

  const typeLabels: Record<string, string> = {
    glossy: 'Глянцеві',
    matte: 'Матові',
    satin: 'Сатинові',
    photoprint: 'Фотодрук',
    suspended: 'Парящі',
    combined: 'Комбіновані',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Портфоліо',
        item: '/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `/projects/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-500">
            Головна
          </Link>
          {' / '}
          <Link href="/projects" className="hover:text-primary-500">
            Портфоліо
          </Link>
          {' / '}
          <span className="text-gray-900">{project.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
              {typeLabels[project.type] || project.type}
            </span>
            <span className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              {roomLabels[project.room] || project.room}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">{project.description}</p>
        </div>

        {/* Gallery or Before/After */}
        {project.images.before && project.images.after ? (
          <div className="mb-12">
            <BeforeAfterSlider
              beforeImage={project.images.before}
              afterImage={project.images.after}
            />
          </div>
        ) : (
          <div className="mb-12">
            <ProjectGallery
              images={project.images.gallery}
              mainImage={project.images.main}
            />
          </div>
        )}

        {/* Specifications */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Характеристики</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <MapPin size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Площа</p>
                    <p className="font-semibold text-gray-900">
                      {project.specifications.area} м²
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Clock size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Час встановлення</p>
                    <p className="font-semibold text-gray-900">
                      {project.specifications.installationTime}
                    </p>
                  </div>
                </div>
                {project.specifications.color && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Palette size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Колір</p>
                      <p className="font-semibold text-gray-900">
                        {project.specifications.color}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Wrench size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Матеріали</p>
                    <ul className="mt-1">
                      {project.specifications.materials.map((material, index) => (
                        <li key={index} className="text-sm text-gray-900">
                          • {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Замовити такий проєкт</h2>
              <p className="text-gray-600 mb-6">
                Хочете реалізувати подібний проєкт? Залиште заявку, і наш менеджер зв'яжеться з
                вами.
              </p>
              <Link href="/contact">
                <Button className="w-full" size="lg">
                  Залишити заявку
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
    </>
  );
}
