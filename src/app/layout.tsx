import type { Metadata } from "next";
import "../css/globals.css";
import Navbar from "@/components/Navbar";

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
        <main className="flex flex-col p-4 justify-start" style={{ height: "calc(100vh - 8rem)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
