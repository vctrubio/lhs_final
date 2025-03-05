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
    <html lang="es">
      <body className="bg-backgroundBeigh">
        <Navbar />
          <TrainNav />
          {children}
      </body>
    </html>
  );
}
