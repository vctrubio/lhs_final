import "../css/globals.css";
import type { Metadata, Viewport } from "next";
import { Eczar } from 'next/font/google';
import React from "react";
import { Analytics } from "@vercel/analytics/react"

const eczar = Eczar({
    subsets: ['latin'], // Load only necessary subsets
    variable: '--font-eczar', // Define a CSS variable for Tailwind
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
}

export const metadata: Metadata = {
    title: "LHS Concept | Propiedades Selectas en Madrid",
    description: "Expertos en propiedades de lujo en Madrid. Compra y vende inmuebles exclusivos con asesoramiento personalizado.",
    keywords: "Inmuebles de lujo, Inmobiliaria Madrid, Propiedades exclusivas, Venta de apartamentos, Alquiler de pisos Madrid, LHS Concept, LHS Madrid",
    icons: {
        icon: "/icon.svg",
        shortcut: "/icon.svg",
        apple: "/icon.svg",
    },
    openGraph: {
        title: "LHS Concept | Propiedades de Lujo en Madrid",
        description: "Compra y vende inmuebles exclusivos en Madrid con asesoramiento premium.",
        type: "website",
        url: "https://www.lhsconcept.com",
        images: [
            {
                url: "https://www.lhsconcept.com/logo-main.jpeg",
                width: 1200,
                height: 630,
                type: "image/jpeg",
                alt: "LHS Concept Madrid, propiedades selectas.",
            },
        ],
        siteName: "LHS Concept",
        locale: "es_ES",
        alternateLocale: ["en_US"],
    },
    twitter: {
        card: "summary_large_image",
        site: "@lhsconcept",
        title: "LHS Concept | Propiedades Exclusivas en Madrid",
        description: "Compra y vende inmuebles de lujo en Madrid con expertos en propiedades exclusivas.",
        images: ["https://www.lhsconcept.com/logo-main.jpeg"],
    },
    robots: { index: true, follow: true },
    metadataBase: new URL("https://www.lhsconcept.com"),
    alternates: {
        canonical: "/",
        languages: {
            "es-ES": "/es",
            "en-US": "/en",
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "LHS Concept",
    description: "Propiedades Selectas en Madrid",
    url: "https://www.lhsconcept.com",
    logo: "https://www.lhsconcept.com/logo-main.jpeg",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Calle de Velázquez, 10",
        addressLocality: "Madrid",
        addressCountry: "ES",
        postalCode: "28001",
    },
    contactPoint: {
        "@type": "ContactPoint",
        name: "Lourdes Hernansanz",
        telephone: "+34 616 74 69 71",
        contactType: "customer service",
        areaServed: "ES",
        availableLanguage: ["Spanish", "English"],
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: "40.4466572",
        longitude: "-3.7097223",
    },
    sameAs: [
        "https://www.instagram.com/lhsconcept",
        "https://www.linkedin.com/company/lhsconcept",
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const viewportContent = Object.entries(viewport)
        .map(([key, value]) => `${key}=${value}`)
        .join(", ");

    return (
        <html lang="es" className={eczar.variable}>
            <head>
                <meta name="viewport" content={viewportContent} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            {children}
            <Analytics />
        </html>
    );
}

