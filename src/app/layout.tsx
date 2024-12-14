import type { Metadata, Viewport } from "next";
import "../css/globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SideBar from "@/components/SideBar";
import { fetchEntriesContentful } from "#/backend/apisConnections";
import React, { Suspense } from "react";
import Icon from './icon'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: "LHS Concept",
  description: "Propiedades de Lujo en Madrid",
  icons: {
    icon: Icon(),
    apple: Icon(),
    shortcut: Icon(),
  },

  keywords: "luxury, lifestyle, Madrid, exclusive, homes, family-oriented, real estate, high-end living, propiedades de lujo en madrid, propiedades seelectas, LHS Concept, LHS Propiedades",

  openGraph: {
    title: "LHS Concept",
    description: "Propiedades de Lujo en Madrid",
    type: "website",
    url: "https://www.lhsconcept.com",
    images: [
      {
        url: "/logo-main.jpeg", // Ensure this path is correct
        width: 2546,
        height: 1500,
        type: "image/jpeg",
        alt: "Propiedades de Lujo en Madrid",
      },
    ],
    siteName: "LHSConcept.com",
    locale: 'es_ES',
    alternateLocale: ['en_US'],
  },

  twitter: {
    card: "summary_large_image", // summary, summary_large_image, app, player
    site: "@lhsconcept",
    title: "LHS Concept | Propiedades Selectas en Madrid",
    creator: "Lourdes Hernansanz",
    description: "Propiedades de Lujo en Madrid",
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

  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    yandex: 'your-yandex-verification-code', // If you use Yandex
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'LHS Concept',
  description: 'Propiedades de Lujo en Madrid',
  url: 'https://www.lhsconcept.com',
  logo: 'https://www.lhsconcept.com/logo-main.jpeg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressCountry: 'ES',
  },
  sameAs: [
    'https://www.facebook.com/lhsconcept',
    'https://www.instagram.com/lhsconcept',
    // Add your social media URLs
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log("--------------------RootLayout ~ children:----------------------------")
  const { properties, propertyParams, filteredBarrios } = await fetchEntriesContentful()
  console.log('Layout properties length:', properties?.length)

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <NuqsAdapter>
        <body className="h-full">
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar propertyParams={propertyParams} barrios={filteredBarrios} />
          </Suspense>
          <main className="mx-8">
            {children}
          </main>
        </body>
      </NuqsAdapter>
    </html>
  );
}

