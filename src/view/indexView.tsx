
'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/aigen/HeroSection';
import TestimonialSection from "@/aigen/TestimonialSection";
import Footer from "@/aigen/Footer"; 
import { Building, Globe, Key, Users } from 'lucide-react';

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
    <div className="bg-madrid-background">
      <HeroSection />

      {/* Services Section */}
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

      {/* About Madrid Section */}
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

      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-neutral-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1579008781559-5c05f95b6d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Madrid Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Start Your Madrid Luxury Journey
          </h2>
          <p className="font-montserrat text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you're relocating to Madrid or seeking the perfect investment property,
            our team is ready to guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-luxury">Schedule a Consultation</button>
            <button className="btn-luxury-dark">View Properties</button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-madrid-accent text-white flex items-center justify-center shadow-md hover:bg-madrid-dark transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
