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
  address: "Av. de la Reina Victoria 19, Local Posterior, Chamberí, 28003 Madrid",
  mapUrl: "https://g.co/kgs/A2p8AWG",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d379.53612442946314!2d-3.7072702!3d40.4467402!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42290264eea1c3%3A0x2a108f6765809918!2sLHS%20Concept!5e0!3m2!1sen!2ses!4v1742293630879!5m2!1sen!2ses",

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
