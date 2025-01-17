'use client'
import Link from "next/link";
import { useState } from "react";

export function Logo() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lhs-logo relative border">
            <Link href="/" title="LHS Concept" id='lhs'>
                LHS
            </Link>
     
            {/* <div className="lhs-nav rounded">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    propiedades
                </button>
                {isOpen && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link href="/propiedades" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Propiedades</Link>
                        <Link href="/eventos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Eventos</Link>
                        <Link href="/servicios" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Servicios</Link>
                    </div>
                )}
            </div> */}
        </div>
    )
}

export default function NavBar() {
    return (
        <Logo />
    )
}


