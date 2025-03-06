import type { Metadata } from "next";
import "../css/globals.css";
import Navbar from "@/components/Navbar";
import TrainNav from "@/components/TrainNav";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

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
        <style>
            {`
            button, input, select, textarea {
              background-color: transparent;
              -webkit-appearance: none;
              appearance: none;
            }
            
            ::selection {
              background-color: none;
              color: #B8860B;
            }
            `}
        </style>
      </head>
      <body className="bg-backgroundBeigh transition-colors duration-300">
        <Navbar />
        <div className="px-4 pb-8 pt-4">
          <NuqsAdapter>
          {children}
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
}
