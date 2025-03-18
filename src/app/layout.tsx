import type { Metadata } from "next";
import "../css/globals.css";
import Navbar from "@/components/Navbar";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "LHS Concept | Propiedades Selectas en Madrid",
  description:
    "Expertos en propiedades de lujo en Madrid. Compra y vende inmuebles exclusivos con asesoramiento personalizado.",
  keywords:
    "Inmuebles de lujo, Inmobiliaria Madrid, Propiedades exclusivas, Venta de apartamentos, Alquiler de pisos Madrid, LHS Concept, LHS Madrid",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "LHS Concept | Propiedades de Lujo en Madrid",
    description:
      "Compra y vende inmuebles exclusivos en Madrid con asesoramiento personalizado.",
    type: "website",
    url: "https://www.lhsconcept.com",
    images: [
      {
        url: "https://www.lhsconcept.com/LHS_logo.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "LHS Concept, Propiedades Selectas en Madrid.",
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
    description:
      "Compra y vende inmuebles de lujo en Madrid con expertos en propiedades exclusivas.",
    images: ["https://www.lhsconcept.com/LHS_logo.jpeg"],
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
  logo: "https://www.lhsconcept.com/LHS_logo.jpeg",
  address: {
    "@type": "PostalAddress",
    address: "Av. de la Reina Victoria 19, Local Posterior, Chamberí, 28003 Madrid",
    streetAddress: "Av. de la Reina Victoria 19, Local Posterior",
    addressLocality: "Madrid",
    addressCountry: "ES",
    postalCode: "28003",
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      </head>
      <body className="bg-backgroundBeigh transition-colors duration-300">
        <Navbar />
        <div className="px-4 pb-8 pt-4">
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </div>
      </body>
      <Analytics />
    </html>
  );
}
