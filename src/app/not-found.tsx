import Link from 'next/link';
import { Home, Phone } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-serif text-[#14213D] mb-4">
                    Bienvenido a LHS
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    ¿En qué podemos ayudarte?
                </p>

                <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 p-4 rounded-lg border border-[#14213D] hover:bg-[#14213D] hover:text-white transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        <span>Propiedades</span>
                    </Link>

                    <Link 
                        href="tel:+34616746971"
                        className="flex items-center justify-center gap-2 p-4 rounded-lg border border-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        <span>Contacto</span>
                    </Link>
                </div>
            </div>
        </div>
    );
} 