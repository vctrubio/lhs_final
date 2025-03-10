import React, { useState, useEffect } from 'react';
import { Home, Plane, Calendar, CheckCircle } from 'lucide-react';

const ExpatSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
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

  const expatBenefits = [
    {
      id: 0,
      title: "Asistencia Personal",
      description: "Ofrecemos un servicio completamente personalizado para expatriados, desde la búsqueda de propiedades hasta la gestión de trámites legales y administrativos.",
      icon: <Home className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 1,
      title: "Reubicación Sin Estrés",
      description: "Hacemos que tu mudanza a Madrid sea fácil y sin complicaciones. Te ayudamos con todos los aspectos de tu reubicación, desde encontrar colegios hasta abrir cuentas bancarias.",
      icon: <Plane className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      title: "Inversión Inteligente",
      description: "Madrid ofrece excelentes oportunidades de inversión inmobiliaria. Te asesoramos sobre las mejores zonas con potencial de revalorización y rentabilidad.",
      icon: <Calendar className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    }
  ];

  return (
    <section id="expat-section" className="py-24 px-6 bg-gradient-to-b from-white to-madrid-light overflow-hidden relative">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239F8D6B' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image and tabs */}
          <div className={`relative rounded-sm overflow-hidden shadow-xl opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '200ms'}}>
            {/* Large image that changes based on selected tab */}
            {expatBenefits.map((benefit, index) => (
              <div 
                key={benefit.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-madrid-darker/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="font-cormorant text-3xl text-white mb-2">{benefit.title}</h4>
                  <p className="font-montserrat text-white/90 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
            
            {/* Tab buttons at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-4">
              {expatBenefits.map((benefit) => (
                <button 
                  key={benefit.id}
                  onClick={() => setActiveTab(benefit.id)}
                  className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${activeTab === benefit.id ? 'bg-white scale-125' : 'bg-white/50'}`}
                  aria-label={benefit.title}
                />
              ))}
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className={`opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '400ms'}}>
            <h3 className="font-cormorant text-3xl md:text-4xl text-madrid-darker mb-6">
              Descubre Por Qué Los Expatriados Eligen Madrid
            </h3>
            
            <ul className="space-y-6">
              <li className={`flex opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '600ms'}}>
                <CheckCircle className="w-6 h-6 text-madrid-accent flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h4 className="font-montserrat font-medium text-lg mb-2">Calidad de vida excepcional</h4>
                  <p className="font-montserrat text-neutral-600 leading-relaxed">
                    Madrid combina el encanto histórico español con una infraestructura moderna, excelente sistema de salud y una vida cultural vibrante.
                  </p>
                </div>
              </li>
              
              <li className={`flex opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '800ms'}}>
                <CheckCircle className="w-6 h-6 text-madrid-accent flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h4 className="font-montserrat font-medium text-lg mb-2">Incentivos fiscales para nuevos residentes</h4>
                  <p className="font-montserrat text-neutral-600 leading-relaxed">
                    España ofrece ventajas fiscales atractivas para nuevos residentes a través de la "Ley Beckham", que puede reducir significativamente tu carga fiscal.
                  </p>
                </div>
              </li>
              
              <li className={`flex opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '1000ms'}}>
                <CheckCircle className="w-6 h-6 text-madrid-accent flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h4 className="font-montserrat font-medium text-lg mb-2">Comunidad internacional próspera</h4>
                  <p className="font-montserrat text-neutral-600 leading-relaxed">
                    Madrid cuenta con una creciente comunidad de expatriados y excelentes escuelas internacionales, facilitando una transición suave para toda la familia.
                  </p>
                </div>
              </li>
            </ul>
            
            <div className={`mt-10 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '1200ms'}}>
              <button className="px-8 py-4 bg-madrid-accent text-white font-montserrat text-sm uppercase tracking-wider hover:bg-madrid-dark transition-colors duration-300 flex items-center group">
                Consulta Gratuita Para Expatriados
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpatSection;
