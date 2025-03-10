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
        title: "Property Curation",
        description: "We carefully select the finest properties in Madrid's most prestigious neighborhoods, ensuring they meet our exacting standards."
      },
      {
        icon: <Globe size={32} className="text-madrid-accent" />,
        title: "Expat Services",
        description: "Specialized assistance for international clients, including language support, cultural orientation, and bureaucratic guidance."
      },
      {
        icon: <Key size={32} className="text-madrid-accent" />,
        title: "Personalized Search",
        description: "Our team will conduct a detailed assessment of your needs and preferences to find your perfect Madrid home."
      },
      {
        icon: <Users size={32} className="text-madrid-accent" />,
        title: "Concierge Support",
        description: "From legal assistance to interior design services, we provide comprehensive support throughout your property journey."
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
                className={`flex flex-col gap-4 bg-[#F5F3ED] p-8 rounded-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
                style={{ animationDelay: `${100 * (index + 1)}ms` }}
              >
                <div className="bg-white p-4 border rounded-lx shadow-sm flex items-center justify-center"
                  style={{ width: '64px', height: '64px' }}
                >
                  {service.icon}
                </div>
                <h4 className="font-cormorant text-2xl">{service.title}</h4>
                <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
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