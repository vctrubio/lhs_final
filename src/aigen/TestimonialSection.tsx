import React, { useState, useEffect } from 'react';

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
      quote: "Madrid Luxury Estates encontró la casa perfecta para nosotros en Salamanca. Su comprensión de las necesidades de expatriados hizo nuestra transición fluida y agradable.",
      author: "James y Sarah Thompson",
      position: "Expatriados Británicos",
      image: "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Después de meses buscando por nuestra cuenta, contactamos con Madrid Luxury Estates. En pocas semanas, encontraron nuestro apartamento soñado en el corazón de Madrid.",
      author: "Lena y Marcus Schmidt",
      position: "Ejecutivos Alemanes",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Su experiencia en propiedades de alta gama y conocimiento de los barrios de Madrid es incomparable. Realmente entienden el significado del servicio de lujo.",
      author: "Alexandre Dupont",
      position: "Empresario Francés",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-24 px-6 relative overflow-hidden"
      style={{backgroundColor: '#cdc2a6'}}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative">
        <div className={`text-center opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="font-montserrat text-madrid-darker text-sm md:text-base uppercase tracking-[0.2em] mb-3">Lo Que Dicen Nuestros Clientes</h2>
          <h3 className="font-cormorant text-4xl md:text-5xl text-madrid-darker mb-6">Testimonios</h3>
        </div>
        
        <div className="mt-16 relative overflow-hidden">
          <div 
            className="transition-all duration-1000 ease-in-out flex"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 flex flex-col items-center text-center px-6"
              >
                <div className="mb-8 w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-6 relative">
                  <div className="text-6xl font-serif absolute -top-10 -left-2 text-madrid-dark opacity-20">"</div>
                  <p className="font-cormorant text-2xl md:text-3xl italic text-neutral-800 relative z-10">
                    {testimonial.quote}
                  </p>
                  <div className="text-6xl font-serif absolute -bottom-16 -right-2 text-madrid-dark opacity-20">"</div>
                </div>
                <h4 className="font-montserrat text-lg font-medium text-neutral-800">{testimonial.author}</h4>
                <p className="font-montserrat text-sm text-neutral-600">{testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                currentTestimonial === index ? 'bg-neutral-800 scale-125' : 'bg-neutral-500/50'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
