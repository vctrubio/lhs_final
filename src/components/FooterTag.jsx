'use client'

import { Mail, Send, Download, Phone } from "lucide-react";

export function FooterTagShare({ property }) {

    const buttons = [
        {
            icon: Phone,
            label: "Llamar",
            onClick: () => window.open(`https://wa.me/34616746971?text=Hi, I am interested in this flat: ${property.url}`, '_blank'),
        },
        {
            icon: Mail,
            label: "Contactar",
            onClick: () => window.location.href = `mailto:lhsconcept@lhsconcept.com?subject=Interest in flat: ${property.url}`,
        },
        {
            icon: Download,
            label: "Ficha",
            onClick: () => window.open(`/${property.url}/pdf`, '_blank'),
        },
        {
            icon: Send,
            label: "Enviar",
            onClick: () => alert(`Send button clicked for flat: ${property.url}`),
        },
    ];

    return (
        <div className="flex justify-around p-2"        >
            {buttons.map(({ icon: Icon, label, onClick }) => (
                <button
                    key={label}
                    onClick={onClick}
                    className="flex items-center justify-center bg-background rounded-full w-14 h-14 mt-2" // mt-2 for brochure centering...
                >
                    <Icon className="w-6 h-6" />
                    {/* <span className="mt-2 text-sm font-medium">{label}</span> */}
                </button>
            ))}
        </div>
    );
}

