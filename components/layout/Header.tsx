'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/data/config';
import { formatPhoneNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Головна' },
    { href: '/services', label: 'Послуги' },
    { href: '/projects', label: 'Портфоліо' },
    { href: '/calculator', label: 'Калькулятор' },
    { href: '/about', label: 'Про нас' },
    { href: '/contact', label: 'Контакти' },
  ];

  const handlePhoneClick = () => {
    window.location.href = `tel:${siteConfig.contact.phone}`;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-medium py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-500">Labell</span>
            <span className="hidden sm:inline text-sm text-gray-600">Натяжні стелі</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handlePhoneClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              <Phone size={18} />
              <span>{formatPhoneNumber(siteConfig.contact.phone)}</span>
            </button>
            <Button
              onClick={() => {
                const calculator = document.getElementById('calculator');
                if (calculator) {
                  calculator.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/calculator';
                }
              }}
              size="sm"
            >
              Розрахувати вартість
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary-500"
            aria-label="Меню"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4 border-t border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-500 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 font-medium w-full"
                >
                  <Phone size={18} />
                  <span>{formatPhoneNumber(siteConfig.contact.phone)}</span>
                </button>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/calculator';
                  }}
                  className="w-full"
                  size="sm"
                >
                  Розрахувати вартість
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
