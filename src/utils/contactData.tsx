import { Phone, Mail, MapPin } from 'lucide-react';
import React from 'react';

export interface ContactItem {
  icon: React.ReactNode;
  text: string;
  url: string;
  isExternal?: boolean;
}

export const contactData = {
  phoneNumber: "+34 616 74 69 71",
  phoneUrl: "tel:+34616746971",
  whatsappUrl: "https://wa.me/+34616746971",
  email: "lourdes.hernansanz@lhsconcept.com",
  emailUrl: "mailto:lourdes.hernansanz@lhsconcept.com",
  address: "Av. de la Reina Victoria 9, Local Posterior, Chamberí, 28003 Madrid",
  mapUrl: "https://g.co/kgs/A2p8AWG",
  // This embeds the correct location on Google Maps
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0952362459374!2d-3.7080376!3d40.4475808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422914832760d7%3A0x923acb8d5898f84f!2sAv.%20de%20la%20Reina%20Victoria%2C%209%2C%2028003%20Madrid%2C%20Spain!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus",
  
  getContactItems(): ContactItem[] {
    return [
      {
        icon: <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-madrid-light" />,
        text: this.address,
        url: this.mapUrl,
        isExternal: true
      },
      {
        icon: <Phone size={18} className="mr-3 flex-shrink-0 text-madrid-light" />,
        text: this.phoneNumber,
        url: this.phoneUrl
      },
      {
        icon: <Mail size={18} className="mr-3 flex-shrink-0 text-madrid-light" />,
        text: this.email,
        url: this.emailUrl
      }
    ];
  }
};
