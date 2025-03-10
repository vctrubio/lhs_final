import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProperties } from '#/backend/CRM/fetch';

const HelloWorlBackground = (properties) => {
  return (
    <div className='absolute border border-red-500'
      style={{ height: '100%', width: '100%', zIndex: 2 }}>
      hellman
    </div>
  )
}
const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [propertiesBanner, setPropertiesBanner] = useState(null);


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

  window.property = propertiesBanner;
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900/30">
      <HelloWorlBackground />

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
            <div className="font-montserrat text-white/90 text-sm md:text-base font-light max-w-xl mb-8">
              <p>
                -- Con más de 20 años de experiencia en el mercado inmobiliario de lujo, nuestra reputación está garantizada por la satisfacción de nuestros clientes.
              </p>
              <p>
                -- Nos especializamos en ayudar a nuestros clientes comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid.
              </p>
              <p>
                -- Con una experiencia inigualable en el mercado y una pasión por ofrecer un servicio excepcional, estamos dedicados a hacer que su experiencia inmobiliaria sea fluida y gratificante.
              </p>
            </div>
          </div>
          <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: '900ms' }}>
            <div className="flex flex-col sm:flex-row gap-4 font-montserrat">
              <Link href="/ventas"
                className='px-8 py-3 bg-madrid-accent text-white  text-sm uppercase tracking-wider hover:bg-madrid-dark transition-colors duration-300'>
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
    </section>
  );
};

export default HeroSection;
