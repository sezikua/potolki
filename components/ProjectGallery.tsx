'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectGalleryProps {
  images: string[];
  mainImage: string;
  className?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  mainImage,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const allImages = [mainImage, ...images];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;
    if (direction === 'prev') {
      setSelectedIndex(selectedIndex === 0 ? allImages.length - 1 : selectedIndex - 1);
    } else {
      setSelectedIndex(selectedIndex === allImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      <div className={cn('grid grid-cols-1 md:grid-cols-4 gap-4', className)}>
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group">
          <Image
            src={mainImage}
            alt="Main project image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onClick={() => openLightbox(0)}
          />
        </div>

        {/* Thumbnail Images */}
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => openLightbox(index + 1)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Закрити"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Попереднє"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Наступне"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-7xl max-h-full"
            >
              <Image
                src={allImages[selectedIndex]}
                alt={`Gallery image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
