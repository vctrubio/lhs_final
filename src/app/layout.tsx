import type { Metadata } from "next";
import "../css/globals.css";
import Navbar from "@/components/Navbar";
import TrainNav from "@/components/TrainNav";

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
            
            @media (hover: hover) {
              button:hover {
                background-color: rgba(0,0,0,0.05);
              }
            }
            
            .dark button:hover {
              background-color: rgba(255,255,255,0.1);
            }
          `}
        </style>
      </head>
      <body className="bg-backgroundBeigh transition-colors duration-300">
        <Navbar />
        {/* <TrainNav /> */}
        {children}
      </body>
    </html>
  );
}
