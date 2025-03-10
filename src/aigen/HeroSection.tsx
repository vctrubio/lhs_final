'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProperties } from '#/backend/CRM/fetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { PropertyBanner } from '#/backend/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BackgroundSlider = ({ propertiesBanner }) => {
  if (!propertiesBanner || propertiesBanner.length === 0) {
    return (
      <div className='absolute bg-backgroundBeigh'
        style={{ height: '100%', width: '100%', zIndex: -1 }}>
      </div>
    );
  }

  return (
    <div className='absolute inset-0 bg-backgroundBeigh'
      style={{ height: '100%', width: '100%', zIndex: -1 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      >
        {propertiesBanner.map((banner: PropertyBanner, index: number) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer"
          >
            <div className="relative"
              style={{ height: '100%', width: '100%' }}>
              <Image
                src={banner.photo_url.url}
                alt={banner.url}
                fill
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                priority
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
      .swiper-pagination-bullet-active {
        background: #B8860B;
      }
      `}</style>
    </div>
  );
};

const HelloWorldComponent = ({ loaded }) => {
  return (
    <div className="h-full flex flex-col justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: '300ms' }}>
          <h2 className="font-montserrat text-white text-sm md:text-base uppercase tracking-[0.2em] mb-4">Propiedades de <span className='text-backgroundBeigh'>Lujo</span> Exclusivas</h2>
        </div>
        <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: '500ms' }}>
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
            Descubre Viviendas Excepcionales en Madrid
          </h1>
        </div>
        <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: '700ms' }}>
          <div className="font-montserrat text-white font-light max-w-xl mb-8 bg-black bg-opacity-60 p-4 rounded">
            Con más de 20 años de experiencia en el mercado inmobiliario de lujo, nuestra reputación está garantizada por la satisfacción de nuestros clientes.
          </div>
        </div>
        <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: '900ms' }}>
          <div className="flex flex-col sm:flex-row gap-4 font-montserrat">
            <Link href="/ventas"
              className='px-8 py-3 bg-madrid-accent text-white text-sm uppercase tracking-wider hover:bg-madrid-dark transition-colors duration-300'>
              Explorar Propiedades
            </Link>
            <Link href="/contacto"
              className="px-8 py-3 bg-transparent border border-white text-white text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-300">
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [propertiesBanner, setPropertiesBanner] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchProperties().then((data) => {
      if (data && data.propertiesBanner) {
        setPropertiesBanner(data.propertiesBanner);
      }
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <BackgroundSlider propertiesBanner={propertiesBanner} />
      <HelloWorldComponent loaded={loaded} />
    </section>
  );
};

export default HeroSection;
