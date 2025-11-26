import React from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactButtons } from '@/components/ContactButtons';
import { Card, CardContent } from '@/components/ui/Card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { formatPhoneNumber } from '@/lib/utils';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Контакти | Зв\'яжіться з нами',
  description: 'Контактна інформація Labell. Зв\'яжіться з нами для безкоштовного заміру та консультації.',
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Контакти</h1>
          <p className="text-xl text-gray-600">
            Зв'яжіться з нами для консультації або безкоштовного заміру
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Phone size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {formatPhoneNumber(siteConfig.contact.phone)}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Mail size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <MapPin size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Адреса</h3>
                      <p className="text-gray-600">
                        {siteConfig.contact.address.street}
                        <br />
                        {siteConfig.contact.address.city}, {siteConfig.contact.address.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Clock size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Режим роботи</h3>
                      <p className="text-gray-600">
                        Пн-Сб: 09:00 - 18:00
                        <br />
                        Нд: Вихідний
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Швидкий зв'язок</h3>
                <ContactButtons />
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Надіслати повідомлення</h2>
              <ContactForm showServiceSelect={true} showAreaInput={true} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
