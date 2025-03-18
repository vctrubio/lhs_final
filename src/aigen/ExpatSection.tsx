import React, { useState, useEffect } from 'react';
import { Home, Plane, Calendar, CheckCircle, FileDownIcon } from 'lucide-react';
import Image from 'next/image';

const ExpatSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('expat-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const benefitsList = [
    {
      title: "Calidad de vida excepcional",
      description: "Madrid combina el encanto histórico español con una infraestructura moderna, excelente sistema de salud y una vida cultural vibrante."
    },
    {
      title: "Incentivos fiscales para nuevos residentes",
      description: "España ofrece ventajas fiscales atractivas para nuevos residentes a través de la 'Ley Beckham', que puede reducir significativamente tu carga fiscal."
    },
    {
      title: "Comunidad internacional próspera",
      description: "Madrid cuenta con una creciente comunidad de expatriados y excelentes escuelas internacionales, facilitando una transición suave para toda la familia."
    }
  ];

  return (
    <section id="expat-section" className="py-24 px-6 bg-gradient-to-b from-white to-madrid-light overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="font-montserrat text-madrid-darker text-sm md:text-base uppercase tracking-[0.2em] mb-3">Tu Nueva Vida En España</h2>
          <h3 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-madrid-darker mb-6">
            ¿Aún No Estás Viviendo En Madrid?
          </h3>
          <p className="font-montserrat text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Buscas una propiedad única que combine la rica cultura española con todas las comodidades modernas.
            Nuestro equipo especializado está aquí para hacer tu sueño realidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div className={`relative opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '200ms' }}>
            <div className="relative w-full h-[640px]">
              <Image
                src="/madCoverPage/g.jpg"
                alt="Madrid landscape"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className={`opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '400ms' }}>
            <h3 className="font-cormorant text-3xl md:text-4xl text-madrid-darker mb-6">
              Descubre Por Que Los Expatriados Eligen Madrid
            </h3>

            <ul className="space-y-6">
              {benefitsList.map((benefit, index) => {
                const delay = `${600 + (index * 200)}ms`;

                return (
                  <li key={index} className={`flex opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: delay }}>
                    <CheckCircle className="w-6 h-6 text-madrid-accent flex-shrink-0 mr-4 mt-1" />
                    <div>
                      <h4 className="font-montserrat font-medium text-lg mb-2">{benefit.title}</h4>
                      <p className="font-montserrat text-neutral-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={`mt-10 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '1200ms' }}>
                {/* <button className="px-6 py-3 bg-neutral-800/90 hover:bg-neutral-800 text-white border border-madrid-accent/20 hover:border-madrid-accent/40 rounded-none transition-all duration-300 font-montserrat uppercase tracking-wider font-light flex items-center">
                <FileDownIcon className='mr-2 text-madrid-accent' size={20}/> Nuestra Guia
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpatSection;
