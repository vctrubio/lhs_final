'use client'
import React, { useEffect, useState } from 'react';
import HeroSection from '@/aigen/HeroSection';
import TestimonialSection from "@/aigen/TestimonialSection";
import Footer from "@/aigen/Footer";
import ExpatSection from '@/aigen/ExpatSection';
import CTASection from '@/aigen/CTASection';
import { Building, Globe, Key, Users } from 'lucide-react'

const ServicesSection = ({ isVisible }) => {
  const services = [
    {
      icon: <Building size={32} className="text-madrid-accent" />,
      title: "Asistencia Unica",
      description: "Ofrecemos un servicio completamente personalizado para expatriados, desde la búsqueda de propiedades hasta la gestión de trámites legales y administrativos.",
    },
    {
      icon: <Key size={32} className="text-madrid-accent" />,
      title: "Inversión Inteligente",
      description: "Madrid ofrece excelentes oportunidades de inversión inmobiliaria. Te asesoramos sobre las mejores zonas con potencial de revalorización y rentabilidad.",
    },
    {
      icon: <Globe size={32} className="text-madrid-accent" />,
      title: "Reubicación Sin Estrés",
      description: "Hacemos que tu mudanza a Madrid sea fácil y sin complicaciones. Te ayudamos con todos los aspectos de tu reubicación, desde encontrar colegios hasta abrir cuentas bancarias.",
    },
    {
      icon: <Users size={32} className="text-madrid-accent" />,
      title: "Búsqueda Personalizada",
      description: "Nuestro equipo realizará una evaluación detallada de tus necesidades y preferencias para encontrar tu hogar perfecto en Madrid."
    }
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="font-montserrat text-4xl text-madrid-accent">¿Como Podemos Ayudarte?</h2>
          <h3 className="font-cormorant text-4xl font-semibold text-neutral-700 mt-4">Nuestro Servicio</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 bg-[#F5F3ED] p-5 rounded-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${100 * (index + 1)}ms` }}
            >
              <div className="bg-white border rounded-lx shadow-sm flex items-center justify-center"
                style={{ width: '64px', height: '64px' }}
              >
                {service.icon}
              </div>
              <h4 className="font-cormorant text-2xl">{service.title}</h4>
              <p className="font-montserrat text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;