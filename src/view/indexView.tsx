'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HeroSection from '@/aigen/HeroSection';
import TestimonialSection from "@/aigen/TestimonialSection";
import Footer from "@/aigen/Footer";
import ExpatSection from '@/aigen/ExpatSection';
import CTASection from '@/aigen/CTASection';
import { Building, Globe, Key, Users } from 'lucide-react';
import ServicesSection from '@/aigen/ServiceSection';
import DiscoverMadrid from '@/aigen/DiscoverMadrid';

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
      <DiscoverMadrid />
      {/* <TestimonialSection /> */}
      {/* <CTASection /> */}
      {/* <ExpatSection /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
