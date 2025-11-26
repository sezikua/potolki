'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false, onClick }) => {
  const Component = onClick ? motion.div : motion.div;
  const motionProps = onClick
    ? {
        whileHover: hover ? { y: -4, scale: 1.02 } : {},
        whileTap: { scale: 0.98 },
        onClick,
      }
    : hover
    ? { whileHover: { y: -4, scale: 1.02 } }
    : {};

  return (
    <Component
      {...motionProps}
      className={cn(
        'bg-white rounded-2xl shadow-soft overflow-hidden',
        hover && 'transition-shadow duration-300 hover:shadow-medium',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4 border-b border-gray-100', className)}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn('px-6 py-4', className)}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}>{children}</div>
);
