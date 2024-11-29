import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

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
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
