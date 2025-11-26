import React from 'react';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Портфоліо натяжних стель | Наші роботи',
  description:
    'Перегляньте наші реалізовані проєкти натяжних стель. Глянцеві, матові, фотодрук, парящі стелі у різних приміщеннях.',
});

export default function ProjectsPage() {
  return (
    <div className="pt-8">
      <ProjectGrid />
    </div>
  );
}
