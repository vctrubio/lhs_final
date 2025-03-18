import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-neutral-800 text-white relative overflow-hidden">
      {/* <div className="absolute inset-0 opacity-10">
        <div className="relative w-full h-full">
          <Image
            src="/madCoverPage/g.jpg"
            alt="Madrid Skyline"
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div> */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Comienza Tu Viaje
        </h2>
        <p className="font-montserrat text-white/80 max-w-2xl text-lg mx-auto mb-10 leading-relaxed px-8 sm:px-2">
          Ya sea que te mudes a Madrid o busques la propiedad de inversión perfecta,
          nuestro equipo está listo para guiarte en cada paso del proceso.
        </p>
        <div className="flex flex-col sm:flex-row px-8 sm:px-2 justify-center gap-4">
          <Link href="/contacto"
            className='bg-gold text-black py-3 px-6 rounded-md text-lg font-semibold hover:bg-white transition-colors duration-300'>Consulta una Visita</Link>
          <Link href="/ventas" className="bg-greenish text-black py-3 px-6 rounded-md hover:bg-white text-lg font-semibold hover:bg-gold-dark transition-colors duration-300">Ver Propiedades</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
