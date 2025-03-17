'use client';
import Link from "next/link";
import Image from "next/image";
import Footer from "@/aigen/Footer";
import { HomeIcon, Search } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Error icon or image */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center">
              <Image src="/LHS_logo.jpeg" width={800} height={800} alt="LHS Concept" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            No encontramos lo que estas buscando
          </h2>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Return to home button */}
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-gold text-white text-xl rounded-md hover:bg-black transition-colors rounded-xl">
              <HomeIcon size={20} className="mr-2" />
              Volver a la página principal
            </Link>
            
            {/* Browse properties button */}
            <Link href="/ventas" className="inline-flex items-center px-6 py-3 bg-greenish text-white text-xl rounded-md hover:bg-greenDark transition-colors rounded-xl">
              <Search size={20} className="mr-2" />
              Buscar nuestras propiedades
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
