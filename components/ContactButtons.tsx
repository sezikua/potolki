'use client';

import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { cn } from '@/lib/utils';

interface ContactButtonsProps {
  variant?: 'default' | 'floating' | 'sticky';
  className?: string;
}

export const ContactButtons: React.FC<ContactButtonsProps> = ({
  variant = 'default',
  className,
}) => {
  const handlePhoneClick = () => {
    window.location.href = `tel:${siteConfig.contact.phone}`;
  };

  const handleViberClick = () => {
    window.open(siteConfig.contact.social.viber, '_blank');
  };

  const handleTelegramClick = () => {
    window.open(siteConfig.contact.social.telegram, '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open(siteConfig.contact.social.whatsapp, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${siteConfig.contact.email}`;
  };

  if (variant === 'floating') {
    return (
      <div className={cn('fixed bottom-6 right-6 z-40 flex flex-col space-y-3', className)}>
        <button
          onClick={handlePhoneClick}
          className="p-4 bg-green-500 text-white rounded-full shadow-large hover:bg-green-600 transition-colors"
          aria-label="Телефон"
        >
          <Phone size={24} />
        </button>
        <button
          onClick={handleViberClick}
          className="p-4 bg-purple-500 text-white rounded-full shadow-large hover:bg-purple-600 transition-colors"
          aria-label="Viber"
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={handleTelegramClick}
          className="p-4 bg-blue-500 text-white rounded-full shadow-large hover:bg-blue-600 transition-colors"
          aria-label="Telegram"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  if (variant === 'sticky') {
    return (
      <div className={cn('fixed bottom-0 left-0 right-0 z-40 bg-white shadow-large border-t', className)}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={handlePhoneClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 font-medium"
          >
            <Phone size={20} />
            <span className="hidden sm:inline">Подзвонити</span>
          </button>
          <button
            onClick={handleViberClick}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Viber</span>
          </button>
          <button
            onClick={handleTelegramClick}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Telegram</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <button
        onClick={handlePhoneClick}
        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <Phone size={18} />
        <span>Подзвонити</span>
      </button>
      <button
        onClick={handleViberClick}
        className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        <MessageCircle size={18} />
        <span>Viber</span>
      </button>
      <button
        onClick={handleTelegramClick}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <MessageCircle size={18} />
        <span>Telegram</span>
      </button>
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </button>
    </div>
  );
};
