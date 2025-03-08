import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <h3 className="font-cormorant text-2xl mb-6">Madrid Luxury Estates</h3>
            <p className="font-montserrat text-sm text-neutral-300 mb-6 leading-relaxed">
              Especialistas en propiedades de lujo para clientes exigentes. Ayudamos a expatriados y locales 
              a encontrar hogares excepcionales en los barrios más prestigiosos de Madrid.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-madrid-light transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-madrid-light transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-madrid-light transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div>
            <h3 className="font-cormorant text-2xl mb-6">Nuestra Experiencia</h3>
            <ul className="font-montserrat text-sm space-y-3 text-neutral-300">
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Búsqueda de Propiedades de Lujo</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Asistencia en Reubicación para Expatriados</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Administración de Propiedades</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Asesoramiento de Inversión</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Asesoría Legal</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Servicios de Diseño de Interiores</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Areas */}
          <div>
            <h3 className="font-cormorant text-2xl mb-6">Zonas de Madrid</h3>
            <ul className="font-montserrat text-sm space-y-3 text-neutral-300">
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Salamanca</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Chamberí</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Retiro</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Jerónimos</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">La Moraleja</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">
                <a href="#">Arturo Soria</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="font-cormorant text-2xl mb-6">Contáctanos</h3>
            <ul className="font-montserrat text-sm space-y-4 text-neutral-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-madrid-light" />
                <span>Calle de Serrano 21, 28001 Madrid, España</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0 text-madrid-light" />
                <span>+34 91 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0 text-madrid-light" />
                <span>info@madridluxuryestates.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-montserrat text-xs text-neutral-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Madrid Luxury Estates. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="font-montserrat text-xs text-neutral-500 hover:text-white transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="font-montserrat text-xs text-neutral-500 hover:text-white transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="#" className="font-montserrat text-xs text-neutral-500 hover:text-white transition-colors duration-300">
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
