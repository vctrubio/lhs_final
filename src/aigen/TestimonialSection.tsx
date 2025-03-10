import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconPrice } from '@/utils/svgs';

const TestimonialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      "quote": "Gracias a LHS Concept, encontramos la casa de nuestros sueños en Salamanca. Su atención al detalle y servicio personalizado hicieron que todo el proceso fuera impecable.",
      "author": "Carlos y María Fernández",
      "position": "2.5M€ - Salamanca",
      "image": "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      "quote": "No podríamos estar más felices con nuestra nueva residencia en Bernabéu. El equipo de LHS nos guió en cada paso, asegurando una compra segura y sin estrés.",
      "author": "Roberto y Elena García",
      "position": "3.8M€ - Bernabéu",
      "image": "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      "quote": "Invertir en una propiedad en Sol fue una de las mejores decisiones que hemos tomado. Lourdes hizo que todo fuera simple y eficiente, con un servicio excepcional.",
      "author": "Daniel y Sofía Martínez",
      "position": "1.9M€ - Sol",
      "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      "quote": "Después de buscar durante meses, LHS nos encontró la propiedad perfecta para nuestra familia en Salamanca. Su conocimiento del mercado fue clave para nuestra decisión.",
      "author": "Javier y Laura Torres",
      "position": "2.7M€ - Salamanca",
      "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <section
      id="testimonials"
      className="py-24 px-6 relative overflow-hidden "
    >

      <div className="max-w-5xl mx-auto relative rounded-xl shadow-lg bg-white/90 p-8">
        <div className={`text-center opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="font-montserrat text-madrid-darker text-sm md:text-base uppercase tracking-[0.2em] m-4">Lo Que Dicen Nuestros Clientes</h2>
          <h3 className="font-cormorant text-4xl md:text-5xl text-black mb-6 tracking-wide">Testimonios</h3>
        </div>

        <div className="mt-16 relative overflow-hidden p-4">
          <div
            className="transition-all duration-1000 ease-in-out flex"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-8 py-12"
                style={{ maxWidth: '100%' }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-8 relative px-4 md:px-12">
                  <div className="text-7xl font-serif absolute -top-8 -left-2 text-madrid-dark opacity-20">"</div>
                  <p className="font-cormorant text-xl md:text-2xl lg:text-3xl italic text-neutral-800 relative z-10 my-6">
                    {testimonial.quote}
                  </p>
                  <div className="text-7xl font-serif absolute -bottom-14 -right-2 text-madrid-dark opacity-20">"</div>
                </div>
                <h4 className="font-montserrat text-lg font-semibold text-neutral-800">{testimonial.author}</h4>
                <p className="font-montserrat text-sm text-neutral-600 mt-1 flex items-center"><IconPrice/> {testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* not working .... */}

        {/* <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              aria-label={`View testimonial ${index + 1}`}
              className={`w-4 h-4 rounded-full mx-1 transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-madrid-dark ${currentTestimonial === index
          ? 'bg-neutral-800 scale-125'
          : 'bg-neutral-400 hover:bg-neutral-600'
          }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default TestimonialSection;
