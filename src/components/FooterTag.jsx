"use client";
import React, { useState } from "react";
import { Mail, Send, Download } from "lucide-react";
import { IconWhatsapp } from "@/utils/svgs";
import { generatePropertyMetadata } from "@/utils/metadata";
import ShareModal from "./ShareModal";

export function FooterTagShare({ property }) {
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const metadata = generatePropertyMetadata(property, property.url);

    const handleDownloadPdf = async () => {
        setLoading(true);
        try {
            console.log("Downloading PDF for slug:", property.url);

            const response = await fetch(`/api/generate-pdf?slug=${property.url}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error("PDF API Error:", errorText);
                throw new Error("Failed to generate PDF");
            }

            console.log("PDF Download Success");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${property.url}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
        setLoading(false);
    };

    const buttons = [
        {
            icon: IconWhatsapp,
            label: "Whatsapp",
            onClick: () =>
                window.open(
                    `https://wa.me/+34616746971?text=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`,
                ),
        },
        {
            icon: Mail,
            label: "Contactar",
            onClick: () =>
                window.open(
                    `mailto:lourdes.hernansanz@lhsconcept.com?subject=Interesado%20en%20${property.title}&body=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`,
                ),
        },
        {
            icon: Download,
            label: "Ficha",
            onClick: handleDownloadPdf,
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
                        className="flex items-center justify-center bg-background rounded-full w-10 h-10 mt-2 sm:w-14 sm:h-14"
                        disabled={label === "Ficha" && loading} // Disable while downloading
                    >
                        <Icon className="w-6 h-6" />
                    </button>
                ))}
            </div>
            {loading && (
                <p className="text-center text-sm text-gray-500">
                    Descargando Ficha...
                </p>
            )}
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setShareModalOpen(false)}
                title={property.title}
                url={metadata.openGraph.url}
            />
        </>
    );
}
