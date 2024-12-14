'use client'

import {
    IconWhatsapp,
    IconMail,
    IconFindUs,
    IconInstagram,
    IconShare,
} from '@/utils/svgs';
import { useState } from 'react';

const contactInfo = {
    whatsapp: {
        number: '+34 616 746 971',
        url: (number) => `https://wa.me/${number.replace(/\s+/g, '')}`,
    },
    email: {
        address: 'lhsconcept@lhsconcept.com',
        url: (email) => `mailto:${email}`,
    },
    instagram: {
        handle: 'lhsconcept',
        url: (handle) => `https://www.instagram.com/${handle}`,
    },
    location: {
        googleMapsUrl: 'https://maps.app.goo.gl/x4h97NBSPtJitp3n7',
    },
}

const socialIcons = [
    { type: 'whatsapp', Icon: IconWhatsapp },
    { type: 'email', Icon: IconMail },
    { type: 'instagram', Icon: IconInstagram },
    { type: 'location', Icon: IconFindUs },
];



export default function Footer() {
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const handleInteractionStart = (type) => {
        setHoveredIcon(type);
    };
    const handleInteractionEnd = () => {
        setHoveredIcon(null);
    };

    const handleSocialClick = (type) => {
        switch (type) {
            case 'whatsapp':
                window.open(contactInfo.whatsapp.url(contactInfo.whatsapp.number), '_blank');
                break;
            case 'email':
                window.location.href = contactInfo.email.url(contactInfo.email.address);
                break;
            case 'instagram':
                window.open(contactInfo.instagram.url(contactInfo.instagram.handle), '_blank');
                break;
            case 'location':
                window.open(contactInfo.location.googleMapsUrl, '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <div className="footer">
            {socialIcons.map(({ type, Icon }) => (
                <div
                    key={type}
                    onClick={() => handleSocialClick(type)}
                    onMouseEnter={() => handleInteractionStart(type)}
                    onMouseLeave={() => handleInteractionEnd()}
                    onTouchStart={() => handleInteractionStart(type)}
                    onTouchEnd={() => handleInteractionEnd()}
                    role="button"
                    tabIndex={0}
                >
                    <Icon />
                </div>
            ))}
        </div>
    );
}
