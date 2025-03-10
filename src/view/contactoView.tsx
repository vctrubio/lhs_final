'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import { contactData } from '../utils/contactData';
import Link from 'next/link';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  url: string;
  external?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, url, external = false }) => (
  <Link
    href={url}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="bg-greenish backdrop-blur-sm p-6 rounded-2xl shadow-lg flex items-center space-x-4 transition-all hover:scale-[1.02] hover:bg-white/40 animate-fade-in"
  >
    <div className="bg-backgroundBeigh p-3 rounded-full">
      {icon}
    </div>
    <div className='flex flex-col flex-wrap'>
      <div className="text-black">{title}</div>
      <div className="text-gray-600 flex-wrap overflow-hidden text-ellipsis">{content}</div>
    </div>
  </Link>
);

const Contacto = () => {

  const contactCards: ContactCardProps[] = [
    {
      icon: <Phone className="w-6 h-6 text-gray-700" />,
      title: "Llámanos",
      content: contactData.phoneNumber,
      url: contactData.phoneUrl
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-gray-700" />,
      title: "WhatsApp",
      content: "Habla directament con nosotros",
      url: contactData.whatsappUrl,
      external: true
    },
    {
      icon: <Mail className="w-6 h-6 text-gray-700" />,
      title: "Email",
      content: contactData.email,
      url: contactData.emailUrl
    },
    {
      icon: <MapPin className="w-6 h-6 text-gray-700" />,
      title: "Dirección",
      content: contactData.address,
      url: contactData.mapUrl,
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#e1d8c6] transition-all">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-montserrat mt-6 font-bold text-gray-600 text-4xl sm:text-5xl">
            Estamos aquí para ayudarte
          </h1>
        </div>

        {/* Información de contacto */}
        <div className="space-y-6">
          {/* Mapa */}
          <div className="backdrop-blur-sm p-8 rounded-2xl shadow-lg h-[300px] w-full relative overflow-hidden transition-transform hover:scale-[1.02] animate-fade-in">
            <iframe
              src={contactData.mapEmbedUrl}
              className="absolute inset-0 w-full h-full rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="100%"
            ></iframe>
          </div>

          {/* Contacto directo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactCards.map((card, index) => (
              <ContactCard
                key={index}
                icon={card.icon}
                title={card.title}
                content={card.content}
                url={card.url}
                external={card.external}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;