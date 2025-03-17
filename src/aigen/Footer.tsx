import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageSquare } from 'lucide-react';
import Link from 'next/link';
// Interfaces for column structures
interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface AboutColumnProps {
  title: string;
  description: string;
  socialLinks: SocialLink[];
}

interface LinkItem {
  text: string;
  url: string;
}

interface LinksColumnProps {
  title: string;
  links: LinkItem[];
}

interface ContactItem {
  icon: React.ReactNode;
  text: string;
  url: string;
  isExternal?: boolean;
}

interface ContactColumnProps {
  title: string;
  contactItems: ContactItem[];
}

// Data for columns
const aboutData: AboutColumnProps = {
  title: "Madrid Luxury Estates",
  description: "Con más de 20 años de experiencia en el mercado inmobiliario de lujo, nuestra reputación está garantizada por la satisfacción de nuestros clientes. Con una experiencia inigualable en el mercado y una pasión por ofrecer un servicio excepcional, estamos dedicados a hacer que su experiencia inmobiliaria sea fluida y gratificante.",
  socialLinks: [
    { icon: <Instagram size={20} />, url: "https://www.instagram.com/lhsconcept" },
    // { icon: <Facebook size={20} />, url: "#" },
    { icon: <MessageSquare size={20} />, url: "https://wa.me/+34616746971" }
  ]
};

const servicesData: LinksColumnProps = {
  title: "Nuestra Experiencia",
  links: [
    { text: "Búsqueda de Propiedades de Lujo", url: "#" },
    { text: "Asistencia en Reubicación para Expatriados", url: "#" },
    { text: "Administración de Propiedades", url: "#" },
    { text: "Asesoramiento de Inversión", url: "#" },
    { text: "Servicios de Diseño de Interiores", url: "https://aliciaagosti.com/" }
  ]
};

const areasData: LinksColumnProps = {
  title: "Zonas de Madrid",
  links: [
    { text: "Chamartin", url: "#" },
    { text: "Chamberí", url: "#" },
    { text: "Jerónimos", url: "#" },
    { text: "Justicia", url: "#" },
    { text: "Malasaña", url: "#" },
    { text: "Retiro", url: "#" },
    { text: "Salamanca", url: "#" },
  ]
};

const contactData: ContactColumnProps = {
  title: "Contáctanos",
  contactItems: [
    {
      icon: <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-madrid-light" />,
      text: "Av. de la Reina Victoria 9, Local Posterior, Chamberí, 28003 Madrid",
      url: "https://g.co/kgs/A2p8AWG",
      isExternal: true
    },
    {
      icon: <Phone size={18} className="mr-3 flex-shrink-0 text-madrid-light" />,
      text: "+34 616 74 69 71",
      url: "tel:+34616746971"
    },
    {
      icon: <Mail size={18} className="mr-3 flex-shrink-0 text-madrid-light" />,
      text: "lourdes.hernansanz@lhsconcept.com",
      url: "mailto:lourdes.hernansanz@lhsconcept.com"
    }
  ]
};

// Column components
const AboutColumn: React.FC<AboutColumnProps> = ({ title, description, socialLinks }) => (
  <div>
    <h3 className="font-cormorant text-2xl mb-6">{title}</h3>
    <p className="font-montserrat text-sm text-neutral-300 mb-6 leading-relaxed">
      {description}
    </p>
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => (
      <Link
        key={index}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-madrid-light transition-colors duration-300"
      >
        {link.icon}
      </Link>
      ))}
    </div>
  </div>
);

const LinksColumn: React.FC<LinksColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="font-cormorant text-2xl mb-6">{title}</h3>
    <ul className="font-montserrat text-sm space-y-3 text-neutral-300">
      {links.map((link, index) => (
        <li key={index} className="transition-all duration-300 hover:translate-x-1 hover:text-white">
          <Link href={link.url}>{link.text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactColumn: React.FC<ContactColumnProps> = ({ title, contactItems }) => (
  <div>
    <h3 className="font-cormorant text-2xl mb-6">{title}</h3>
    <ul className="font-montserrat text-sm space-y-4 text-neutral-300">
      {contactItems.map((item, index) => (
        <li key={index} className="flex items-start">
          {item.icon}
          <Link
            href={item.url}
            target={item.isExternal ? "_blank" : undefined}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
            className="text-neutral-300 hover:text-white transition-colors duration-300"
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <AboutColumn {...aboutData} />
          <LinksColumn {...servicesData} />
          <LinksColumn {...areasData} />
          <ContactColumn {...contactData} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
