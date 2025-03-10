'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/aigen/HeroSection';
import TestimonialSection from "@/aigen/TestimonialSection";
import Footer from "@/aigen/Footer";
import ExpatSection from '@/aigen/ExpatSection';
import CTASection from '@/aigen/CTASection';
import { Building, Globe, Key, Users } from 'lucide-react';
import ServicesSection from '@/aigen/ServiceSection';

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
      <ServicesSection isVisible={isVisible} />
      {/* <TestimonialSection /> */}
      {/* <More /> */}
      {/* <CTASection /> */}
      {/* <ExpatSection /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
