'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';

interface ProjectCardProps {
  project: Project;
  index?: number;
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

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <Card hover className="h-full">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={project.images.main}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {project.featured && (
              <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Популярне
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-medium text-primary-500">
                {typeLabels[project.type] || project.type}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-500 flex items-center">
                <MapPin size={12} className="mr-1" />
                {roomLabels[project.room] || project.room}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {project.specifications.installationTime}
              </span>
              <span>{project.specifications.area} м²</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
