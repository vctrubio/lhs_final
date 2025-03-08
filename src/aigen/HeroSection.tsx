import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Background Image - Luxury Madrid Property */}
      <div className="absolute inset-0">
        <div className={`h-full w-full bg-cover bg-center ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`} 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1540882071686-f75956b44854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"}}></div>
        <div className="absolute inset-0 bg-neutral-900/30"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-6 pt-24">
        <div className="max-w-2xl">
          <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{animationDelay: '300ms'}}>
            <h2 className="font-montserrat text-white text-sm md:text-base uppercase tracking-[0.2em] mb-4">Propiedades de Lujo Exclusivas</h2>
          </div>
          <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{animationDelay: '500ms'}}>
            <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
              Descubre Viviendas Excepcionales en Madrid
            </h1>
          </div>
          <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{animationDelay: '700ms'}}>
            <p className="font-montserrat text-white/90 text-sm md:text-base font-light max-w-xl mb-8">
              Selección exclusiva de las mejores propiedades en los barrios más prestigiosos de Madrid.
              Experimenta un lujo y servicio sin igual para expatriados y locales exigentes.
            </p>
          </div>
          <div className={`opacity-0 ${loaded ? 'animate-fade-in' : ''}`} style={{animationDelay: '900ms'}}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-madrid-accent text-white font-montserrat text-sm uppercase tracking-wider hover:bg-madrid-dark transition-colors duration-300">Explorar Propiedades</button>
              <button className="px-8 py-3 bg-transparent border border-white text-white font-montserrat text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-300">Contáctanos</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-float">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/90 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
