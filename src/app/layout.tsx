import "../css/globals.css";
import type { Metadata, Viewport } from "next";
import { Eczar } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import React from "react";
import NavBar from "@/components/NavBar";
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
  title: "LHS Concept",
  description: "Con mas de 20 años de experiencia en el mercado inmobiliario de lujo, nos especializamos en ayudar a nuestros clientes comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid.",
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },

  keywords: "Inmuebles de lujo, Inmobiliaria Madrid, Apartamentos en venta, Propiedades exclusivas Madrid, Aquilar piso madrid, propiedades seelectas, LHS Concept, LHS Madrid",

  openGraph: {
    title: "LHS Concept",
    description: "Con mas de 20 años de experiencia en el mercado inmobiliario de lujo, nos especializamos en ayudar a nuestros clientes comprar y vender propiedades de lujo en las ubicaciones más exclusivas de Madrid.",
    type: "website",
    url: "https://www.lhsconcept.com",
    images: [
      {
        url: "/logo-main.jpeg", // Ensure this path is correct
        width: 2546,
        height: 1500,
        type: "image/jpeg",
        alt: "LHS Concept Madrid, propiedades selectas.",
      },
    ],
    siteName: "LHSConcept.com",
    locale: 'es_ES',
    alternateLocale: ['en_US'],
  },

  twitter: {
    card: "summary_large_image", // summary, summary_large_image, app, player
    site: "@lhsconcept",
    title: "LHS Concept Madrid",
    creator: "Lourdes Hernansanz",
    description: "Con mas de 20 años de experiencia en el mercado inmobiliario de lujo, nos especializamos en ayudar a nuestros clientes comprar y vender propiedades",
    images: ["/logo-main.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL('https://www.lhsconcept.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en',
    },
  },

  // verification: {
  //   google: 'your-google-verification-code', // Add your Google Search Console verification code
  // },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'LHS Concept',
  description: 'Propiedades Selectas en Madrid',
  url: 'https://www.lhsconcept.com',
  logo: 'https://www.lhsconcept.com/logo-main.jpeg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressCountry: 'ES',
  },
  sameAs: [
    'https://www.instagram.com/lhsconcept',
    // Add your social media URLs
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" className={eczar.variable}>
      <head>
        {/* <meta name="viewport" content="width=device-width"  /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <NuqsAdapter>
        <body className="flex flex-col">
          <NavBar />
          <main className="pb-8 mt-16 mx-auto">
            {children}
          </main>
        </body>
      </NuqsAdapter>
      <Analytics />
    </html>
  );
}

