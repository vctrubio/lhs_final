import type { Metadata } from "next";
import "../css/globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SideBar from "@/components/SideBar";
import { fetchEntriesContentful } from "#/backend/apisConnections";
import React, { Suspense } from "react";
import PropertyCardSection from "@/app/page";
export const metadata: Metadata = {
  title: "LHS Concept",
  description: "Propiedades de Lujo en Madrid",
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { properties, propertyParams } = await fetchEntriesContentful()

  return (
    <html lang="en">
      <NuqsAdapter>
        <body>
          <SideBar propertyParams={propertyParams} />
          <main>
            <Suspense fallback={<div></div>}>
              <PropertyCardSection properties={properties} />
            </Suspense>
          </main>
        </body>
      </NuqsAdapter>
    </html>
  );
}

