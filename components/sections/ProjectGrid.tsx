'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/Button';
import { CeilingType } from '@/types';

const typeFilters: { value: CeilingType | 'all'; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'glossy', label: 'Глянцеві' },
  { value: 'matte', label: 'Матові' },
  { value: 'satin', label: 'Сатинові' },
  { value: 'photoprint', label: 'Фотодрук' },
  { value: 'suspended', label: 'Парящі' },
  { value: 'combined', label: 'Комбіновані' },
];

export const ProjectGrid: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedType, setSelectedType] = useState<CeilingType | 'all'>('all');
  const filteredProjects =
    selectedType === 'all'
      ? projects
      : projects.filter((project) => project.type === selectedType);

  return (
    <section ref={ref} id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наші роботи</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Подивіться на приклади наших реалізованих проєктів
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedType(filter.value as CeilingType | 'all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedType === filter.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Проєкти не знайдено</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/projects">
            <Button size="lg">Переглянути всі роботи</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};