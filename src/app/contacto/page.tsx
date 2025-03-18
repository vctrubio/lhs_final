import React from "react";
import type { Metadata } from 'next';
import Contacto from "@/view/contactoView";

export const metadata: Metadata = {
    title: "Contacto | LHS Concept | Propiedades en Madrid",
    description: "Contacta con nosotros para encontrar tu propiedad ideal en Madrid. Asesoramiento inmobiliario personalizado con expertos del sector.",
    keywords: "Contacto inmobiliaria, LHS Concept Madrid, Asesoramiento inmobiliario, Agentes inmobiliarios Madrid",
    openGraph: {
        title: "Contacto | LHS Concept | Propiedades en Madrid",
        description: "Contacta con los expertos en propiedades selectas de Madrid. Asesoramiento personalizado para compra, venta y alquiler de inmuebles.",
        type: "website",
        url: "https://www.lhsconcept.com/contacto",
        images: [
            {
                url: "https://www.lhsconcept.com/LHS_logo.jpeg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "LHS Concept, Contacto.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contacto | LHS Concept | Propiedades en Madrid",
        description: "Contacta con los expertos en propiedades selectas de Madrid. Asesoramiento personalizado.",
        images: ["https://www.lhsconcept.com/LHS_logo.jpeg"],
    },
    alternates: {
        canonical: "/contacto",
    },
};

export default function ContactPage() {
    return (
        <Contacto />
    );
}
