"use client";
import React, { useEffect, useRef } from "react";
import { Mail, X, Copy } from "lucide-react";
import { IconWhatsapp } from "@/utils/svgs";
import { contactData } from "@/utils/contactData";

export default function ShareModal({ isOpen, onClose, property, url }) {
    const modalRef = useRef(null);

    // Handle escape key press
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

    // Format price as euros
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(price);
    };

    // Create a formatted message with property details
    const createPropertyMessage = () => {
        const priceText = property.precio ? formatPrice(property.precio) : "";
        const sqmText = property.charRef?.metrosCuadradros ? `${property.charRef.metrosCuadradros}m²` : "";
        const locationText = property.barrioRef?.name ? `en ${property.barrioRef.name}` : "";
        const roomsText = property.charRef?.dormitorios ? `${property.charRef.dormitorios} hab` : "";

        return `Hola, he visto: ${property.title} ${locationText} - ${priceText} ${sqmText} ${roomsText} -- ${url}`;
    };

    // Copy URL to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${property.title} - ${url}`);
        alert("URL copiada al portapapeles");
        onClose();
    };

    if (!isOpen) return null;

    const propertyMessage = createPropertyMessage();

    const shareButtons = [
        {
            name: "WhatsApp",
            icon: IconWhatsapp,
            onClick: () => {
                window.open(`${contactData.whatsappUrl}?text=${encodeURIComponent(propertyMessage)}`);
                onClose();
            },
        },
        {
            name: "Email",
            icon: Mail,
            onClick: () => {
                window.open(`mailto:?subject=${encodeURIComponent(`Propiedad: ${property.title}`)}
                &body=${encodeURIComponent(propertyMessage)}`);
                onClose();
            },
        },
        {
            name: "Copiar URL",
            icon: Copy,
            onClick: copyToClipboard,
        },
    ];

    return (
        <div
            ref={modalRef}
            className="w-full mt-4 bg-beigh rounded-lg shadow-lg border border-beighDarkish overflow-hidden animate-slide-in-bottom"
        >
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-greenDark font-montserrat">Compartir</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-backgroundBeigh transition-colors duration-200"
                        aria-label="Cerrar"
                    >
                        <X size={18} className="text-greenDark" />
                    </button>
                </div>

                <div className="mb-4">
                    <div className="text-sm text-greenDark font-montserrat mb-1 px-2">
                        {property.title}
                    </div>
                    {property.precio && (
                        <div className="text-sm font-medium text-greenDark font-montserrat mb-1 px-2">
                            {formatPrice(property.precio)}
                            {property.charRef?.metrosCuadradros &&
                                <span> · {property.charRef.metrosCuadradros}m²</span>
                            }
                        </div>
                    )}
                    <div className="p-2 bg-backgroundBeigh rounded text-xs text-greenDark line-clamp-1 font-montserrat">{url}</div>
                </div>

                <div className="flex justify-center gap-6 my-2">
                    {shareButtons.map((button) => (
                        <button
                            key={button.name}
                            onClick={button.onClick}
                            className="flex items-center justify-center bg-backgroundBeigh rounded-full p-4 border border-gray-300 overflow-hidden hover:bg-greenish transition-colors duration-300 shadow-sm"
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
                    Gracias por compartir nuestra propiedad
                </p>
            </div>
        </div>
    );
}
