'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/aigen/HeroSection';
import TestimonialSection from "@/aigen/TestimonialSection";
import Footer from "@/aigen/Footer";
import ExpatSection from '@/aigen/ExpatSection';
import CTASection from '@/aigen/CTASection';
import { Building, Globe, Key, Users } from 'lucide-react';

const ServicesSection = ({ isVisible }) => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="section-subtitle">How We Help</h2>
          <h3 className="section-title">Our Services</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {/* Service 1 */}
          <div className={`glass-card p-8 rounded-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-white rounded-sm shadow-sm flex items-center justify-center mb-6">
              <Building size={32} className="text-madrid-accent" />
            </div>
            <h4 className="font-cormorant text-2xl font-normal mb-4">Property Curation</h4>
            <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
              We carefully select the finest properties in Madrid's most prestigious neighborhoods, ensuring they meet our exacting standards.
            </p>
          </div>

          {/* Service 2 */}
          <div className={`glass-card p-8 rounded-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-white rounded-sm shadow-sm flex items-center justify-center mb-6">
              <Globe size={32} className="text-madrid-accent" />
            </div>
            <h4 className="font-cormorant text-2xl font-normal mb-4">Expat Services</h4>
            <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
              Specialized assistance for international clients, including language support, cultural orientation, and bureaucratic guidance.
            </p>
          </div>

          {/* Service 3 */}
          <div className={`glass-card p-8 rounded-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 bg-white rounded-sm shadow-sm flex items-center justify-center mb-6">
              <Key size={32} className="text-madrid-accent" />
            </div>
            <h4 className="font-cormorant text-2xl font-normal mb-4">Personalized Search</h4>
            <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
              Our team will conduct a detailed assessment of your needs and preferences to find your perfect Madrid home.
            </p>
          </div>

          {/* Service 4 */}
          <div className={`glass-card p-8 rounded-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '400ms' }}>
            <div className="w-16 h-16 bg-white rounded-sm shadow-sm flex items-center justify-center mb-6">
              <Users size={32} className="text-madrid-accent" />
            </div>
            <h4 className="font-cormorant text-2xl font-normal mb-4">Concierge Support</h4>
            <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
              From legal assistance to interior design services, we provide comprehensive support throughout your property journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


const More = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-subtitle">Discover Madrid</h2>
            <h3 className="section-title mb-8">Experience the Essence of Spanish Luxury</h3>
            <p className="font-montserrat text-neutral-600 mb-6 leading-relaxed">
              Madrid combines rich history with modern sophistication. As Spain's vibrant capital,
              it offers an unparalleled quality of life with world-class cultural institutions,
              exquisite cuisine, and beautiful architecture.
            </p>
            <p className="font-montserrat text-neutral-600 mb-8 leading-relaxed">
              From the elegant boulevards of Salamanca to the artistic energy of Malasaña,
              each neighborhood has its unique character and charm. Our expertise helps you
              navigate these distinct areas to find the perfect property that matches your lifestyle.
            </p>
            <button className="btn-luxury-dark">Explore Neighborhoods</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-sm shadow-md h-64">
                <img
                  src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Madrid Royal Palace"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-sm shadow-md h-40">
                <img
                  src="https://images.unsplash.com/photo-1570698473651-b2de99bae12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Madrid Street"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-sm shadow-md h-40">
                <img
                  src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Plaza Mayor"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-sm shadow-md h-64">
                <img
                  src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Madrid Cuisine"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div>
      <HeroSection />
      {/* <ServicesSection isVisible={isVisible} />
      <TestimonialSection />
      <More />
      <CTASection />
      <ExpatSection />
      <Footer /> */}
    </div>
  );
};

export default Index;
