'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { formatPhoneNumber } from '@/lib/utils';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { href: '/services/glossy-ceilings', label: 'Глянцеві стелі' },
      { href: '/services/matte-ceilings', label: 'Матові стелі' },
      { href: '/services/photoprint-ceilings', label: 'Фотодрук' },
      { href: '/services/suspended-ceilings', label: 'Парящі стелі' },
    ],
    company: [
      { href: '/about', label: 'Про нас' },
      { href: '/projects', label: 'Портфоліо' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Контакти' },
    ],
    legal: [
      { href: '/guarantee', label: 'Гарантія' },
      { href: '/privacy', label: 'Політика конфіденційності' },
      { href: '/terms', label: 'Умови використання' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: siteConfig.contact.social.facebook, label: 'Facebook' },
    { icon: Instagram, href: siteConfig.contact.social.instagram, label: 'Instagram' },
    { icon: Youtube, href: siteConfig.contact.social.youtube, label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Labell</h3>
            <p className="text-sm mb-4">Натяжні стелі в Києві та Україні. Понад 16 років досвіду.</p>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-2 hover:text-primary-400 transition-colors"
              >
                <Phone size={16} />
                <span>{formatPhoneNumber(siteConfig.contact.phone)}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center space-x-2 hover:text-primary-400 transition-colors"
              >
                <Mail size={16} />
                <span>{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5" />
                <span>
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.city}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Послуги</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Компанія</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Інформація</h4>
            <ul className="space-y-2 text-sm mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              {socialLinks.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ) : null
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            © {currentYear} Labell. Всі права захищені. | Натяжні стелі в Києві та Україні
          </p>
        </div>
      </div>
    </footer>
  );
};
