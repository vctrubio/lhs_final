'use client'
import { Mail, Send, Download } from "lucide-react";
import { IconWhatsapp, IconSend } from '@/utils/svgs';
import { generatePropertyMetadata } from '@/utils/metadata';
import ShareModal from './ShareModal';
import { useState } from 'react';

export function FooterTagShare({ property }) {
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const metadata = generatePropertyMetadata(property, property.url);

    const buttons = [
        {
            icon: IconWhatsapp,
            label: "Whatsapp",
            onClick: () => window.open(`https://wa.me/+34616746971?text=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`),
        },
        {
            icon: Mail,
            label: "Contactar",
            onClick: () => window.open(`mailto:lourdes.hernansanz@lhsconcept.com?subject=Interesado%20en%20${property.title}&body=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`),
        },
        {
            icon: Download,
            label: "Ficha",
            onClick: () => window.open(`/${property.url}/pdf`, '_blank'),
        },
        {
            icon: Send,
            label: "Enviar",
            onClick: () => setShareModalOpen(true),
        },
    ];

    return (
        <>
            <div className="flex justify-around gap-1 pt-2">
                {buttons.map(({ icon: Icon, label, onClick }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className="flex items-center justify-center bg-background rounded-full w-10 h-10 mt-2 sm:w-14 sm:h-14" // mt-2 for brochure centering...
                    >
                        <Icon className="w-6 h-6" />
                    </button>
                ))}
            </div>
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setShareModalOpen(false)}
                title={property.title}
                url={metadata.openGraph.url}
            />
        </>
    );
}

