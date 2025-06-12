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
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="text-black font-medium">{title}</div>
      <div className="text-gray-600">
        {title === 'Email' ? (
          <span className="break-all">{content}</span>
        ) : (
          content
        )}
      </div>
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
            Conecta con nosotros
          </h1>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Organizamos Eventos</h2>
            <p className="text-gray-600 text-lg mb-6 max-w-3xl mx-auto">
              Descubre las mejores propiedades en nuestros eventos exclusivos. 
              Ofrecemos presentaciones de inmuebles, seminarios de inversión y encuentros con desarrolladores.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="bg-greenish/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-800">Open Houses</h3>
                <p className="text-gray-600 text-sm">Visitas guiadas exclusivas</p>
              </div>
              <div className="p-4">
                <div className="bg-greenish/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="font-semibold text-gray-800">Seminarios</h3>
                <p className="text-gray-600 text-sm">Inversión inmobiliaria</p>
              </div>
              <div className="p-4">
                <div className="bg-greenish/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-800">Networking</h3>
                <p className="text-gray-600 text-sm">Conecta con expertos</p>
              </div>
            </div>
          </div>
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