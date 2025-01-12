import { IconPrice } from "@/utils/svgs";
import {
    Share2, Wind, Flame, Building2,
    Home, User, Package, Car, Phone,
    Download
} from "lucide-react";

function AmenitiesSection({ amenities, reformado }) {
    const reformadoStatus = {
        icon: Home,
        label: reformado ? 'Reformado' : 'Para reformar',
    };

    const availableAmenities = amenities ? [
        { icon: Home, label: 'Amueblado', value: amenities.furnished },
        { icon: Wind, label: 'AC', value: amenities.ac },
        { icon: Flame, label: 'Calefacción', value: amenities.heating },
        { icon: Building2, label: 'Terraza', value: amenities.rooftop },
        { icon: User, label: 'Portero', value: amenities.portero },
        { icon: Package, label: 'Trastero', value: amenities.trastero },
        { icon: Building2, label: 'Ascensor', value: amenities.elevator },
        { icon: Car, label: 'Parking', value: amenities.parking },
    ].filter(amenity => amenity.value) : [];

    return (
        <div className="border-t border-[#E1D8C6] pt-2">
            <h3 className="font-serif text-xl text-black my-2">
                Características
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <reformadoStatus.icon className={`w-5 h-5 ${reformado ? 'text-black' : 'text-gray-400'}`} />
                    <span className="text-black">{reformadoStatus.label}</span>
                </div>

                {availableAmenities.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-back" />
                        <span className="text-black">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export function PropertyBroucher({ property, setIsShareModalOpen }) {
    const buttonBaseStyle = "w-full py-4 rounded-lg transition-colors duration-800 hover:bg-[#E1D8C6] flex items-center justify-center gap-2";
    const primaryButtonStyle = `${buttonBaseStyle} bg-background`;
    const secondaryButtonStyle = `${buttonBaseStyle} bg-background`;

    return (
        <div className="lg:col-span-1 min-w-[400px] max-w-[600px] mx-auto">
            <div className="sticky top-8 bg-[#91AC8F] rounded-xl p-6">
                <div className="mb-4">
                    <span className="text-2xl text-black">Precio</span>
                    <div className="text-4xl font-serif text-black flex" style={{ letterSpacing: '1px' }}>
                        <IconPrice stroke="black" />{property.precio.toLocaleString('es-ES')}
                    </div>

                    <div className="space-y-2 pt-3">
                        {property.precioIbi > 0 && (
                            <div className="flex items-center justify-between text-sm text-dark">
                                <span className="">+ IBI</span>
                                <span className="font-medium">€{property.precioIbi.toLocaleString('es-ES')}/año</span>
                            </div>
                        )}
                        {property.precioComunidad > 0 && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="">+ Gastos de Comunidad</span>
                                <span className="font-medium">€{property.precioComunidad.toLocaleString('es-ES')}/mes</span>
                            </div>
                        )}
                    </div>
                </div>

                <AmenitiesSection amenities={property.amentitiesRef} reformado={property.reformado} />

                <div className="my-6 space-y-3">
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={() => {
                                const propertyUrl = `https://www.lhsconcept.com/propiedades/${property.url}`;
                                const message = `Hola, estoy interesado en esta propiedad: ${property.title}\n${propertyUrl}`;
                                const whatsappUrl = `https://wa.me/34616746971?text=${encodeURIComponent(message)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                            className={primaryButtonStyle}
                        >
                            <Phone className="w-5 h-5" />
                            <span>Contactar</span>
                        </button>

                        <button
                            onClick={() => setIsShareModalOpen(true)}
                            className={primaryButtonStyle}
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Compartir</span>
                        </button>
                    </div>
                    <button
                        className={secondaryButtonStyle}
                        onClick={() => window.open(property.plano_url, '_blank')}
                    >
                        <Download className="w-5 h-5" />
                        <span>Descargar Plano</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
