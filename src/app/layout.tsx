import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: "LHS Concept",
  description: "Propiedades de lujo en Madrid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex flex-col p-2"
      >
        <NavBar />
        <main className='py-4'>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </main>
        <Footer />
      </body>
    </html>
  );
}
