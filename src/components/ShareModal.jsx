"use client";
import React, { useEffect, useRef } from "react";
import { Mail, X, Copy } from "lucide-react";
import { IconWhatsapp } from "@/utils/svgs";

export default function ShareModal({ isOpen, onClose, property, url }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const createPropertyMessage = (includeLineBreaks = true) => {
        const priceText = property.precio ? formatPrice(property.precio) : "";
        const sqmText = property.charRef?.metrosCuadradros ? `${property.charRef.metrosCuadradros}m²` : "";
        const locationText = property.barrioRef?.name ? `📍 ${property.barrioRef.name}` : "";

        const lineBreak = includeLineBreaks ? '\n' : ' ';

        const titleLine = property.title;
        const detailsLine = [locationText, priceText, sqmText].filter(Boolean).join(' - ');

        return `Hola, mira lo que he visto en LHS Concept Madrid:${lineBreak}${titleLine}${lineBreak}${detailsLine}${lineBreak}${url}`;
    };

    const copyToClipboard = () => {
        const formattedText = createPropertyMessage(true);
        navigator.clipboard.writeText(formattedText);
        onClose();
    };

    if (!isOpen) return null;

    const propertyMessage = createPropertyMessage(true);

    const shareButtons = [
        {
            name: "WhatsApp",
            icon: IconWhatsapp,
            onClick: () => {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(propertyMessage)}`);
                onClose();
            },
        },
        {
            name: "Email",
            icon: Mail,
            onClick: () => {
                const emailBody = propertyMessage.replace(/\n/g, '%0D%0A');
                window.open(`mailto:?subject=${encodeURIComponent(`Propiedad: ${property.title}`)}&body=${emailBody}`);
                onClose();
            },
        },
        {
            name: "Copiar URL",
            icon: Copy,
            onClick: copyToClipboard,
        },
    ];

    const formattedDisplayText = () => {
        const priceText = property.precio ? formatPrice(property.precio) : "";
        const sqmText = property.charRef?.metrosCuadradros ? `${property.charRef.metrosCuadradros}m²` : "";
        const roomsText = property.charRef?.dormitorios ? `${property.charRef.dormitorios} hab` : "";
        const detailsText = [priceText, sqmText, roomsText].filter(Boolean).join(' · ');

        return (
            <div className="px-2">
                <div className="mb-1 text-sm font-montserrat font-medium">
                    {property.title}
                </div>
                <div className="mb-1 text-sm text-madrid-darker font-montserrat">
                    📍 {property.barrioRef?.name || ""}
                </div>
                {detailsText && (
                    <div className="mb-2 text-sm font-medium font-montserrat">
                        {detailsText}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            ref={modalRef}
            className="w-full mt-4 bg-beigh rounded-lg shadow-lg border border-beighDarkish overflow-hidden animate-slide-in-bottom"
        >
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold font-montserrat">Compartir</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-backgroundBeigh transition-colors duration-200"
                        aria-label="Cerrar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-4">
                    {formattedDisplayText()}
                    <div className="p-2 bg-backgroundBeigh rounded text-xs text-greenDark line-clamp-1 font-montserrat">{url}</div>
                </div>

                <div className="flex justify-center gap-6 my-2">
                    {shareButtons.map((button) => (
                        <button
                            key={button.name}
                            onClick={button.onClick}
                            className="flex items-center justify-center bg-backgroundBeigh rounded-full p-4 border border-gold overflow-hidden hover:bg-greenish transition-colors duration-300 shadow-sm"
                            style={{ width: "55px", height: "55px" }}
                            title={button.name}
                            aria-label={button.name}
                        >
                            <div className={button.name !== "WhatsApp" ? "transform scale-105" : ""}>
                                <button.icon size={22} strokeWidth={1.75} className="text-greenDark" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-backgroundBeigh px-4 py-2 border-t border-beighDarkish">
                <p className="text-xs text-center text-greenDark font-montserrat">
                    Gracias por compartir nuestra propiedad en <span className="font-bold">LHS Concept</span>
                </p>
            </div>
        </div>
    );
}
