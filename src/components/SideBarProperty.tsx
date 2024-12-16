'use client'

import SideCardProperty from "./SideCardProperty";
import { MapPin } from "lucide-react";

// Temporary mock data - we'll replace this with real data later
const MOCK_BARRIO = {
    name: "Palermo Soho",
    description: "Uno de los barrios más vibrantes y eclécticos de Buenos Aires, conocido por sus boutiques de moda, cafés de especialidad, y vida nocturna animada.",
    properties: [
        {
            id: 1,
            title: "Loft Moderno en Soho",
            price: 2.65,
            image: "/images/property1.jpg",
            features: {
                meters: 85,
                dormitorios: 2,
                banos: 1
            }
        },
        {
            id: 2,
            title: "Ático con Terraza",
            price: 4.42,
            image: "/images/property2.jpg",
            features: {
                meters: 120,
                dormitorios: 3,
                banos: 2
            }
        },
        {
            id: 3,
            title: "Apartamento Boutique",
            price: 2.14,
            image: "/images/property3.jpg",
            features: {
                meters: 75,
                dormitorios: 2,
                banos: 1
            }
        },
        {
            id: 4,
            title: "PH Reciclado",
            price: 5,
            image: "/images/property4.jpg",
            features: {
                meters: 95,
                dormitorios: 3,
                banos: 2
            }
        }
    ]
};

export default function SideBarProperty() {
    return (
        <div className="p-4 space-y-6 mt-2">
            {/* Barrio Info */}
            <div className="space-y-3 border-[var(--color-green-dark)]/20 pb-4">
                <div className="flex justify-center items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-[var(--color-green-dark)] font-serif text-2xl font-semibold">
                        {MOCK_BARRIO.name}
                    </h2>
                </div>
                <p className="text-[var(--color-green-dark)]/80 text-sm leading-relaxed">
                    {MOCK_BARRIO.description}
                </p>
            </div>

            {/* Properties */}
            <div className="space-y-4">

                <div className="space-y-3">
                    {MOCK_BARRIO.properties.map((property) => (
                        <SideCardProperty key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
} 