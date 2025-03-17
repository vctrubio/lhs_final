import type { Metadata } from "next";
import "../css/globals.css";
import Navbar from "@/components/Navbar";
import TrainNav from "@/components/TrainNav";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "LHS Concept",
  description: "Propiedades Selectas en Madrid",
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
