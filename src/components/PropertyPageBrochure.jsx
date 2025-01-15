import { IconPrice } from "@/utils/svgs";
import {
    Share2, Wind, Flame, Building2,
    Home, User, Package, Car, Phone,
    Download, BedDouble, Bed, Bath,
    Toilet, Sun, Fence, Ruler,
    PaintRoller
} from "lucide-react";

function ShareButton({ property, setIsShareModalOpen }) {
    const buttonBaseStyle = "w-full py-4 rounded-lg transition-colors duration-800 hover:bg-[#E1D8C6] flex items-center justify-center gap-2";
    const primaryButtonStyle = `${buttonBaseStyle} bg-background`;
    const secondaryButtonStyle = `${buttonBaseStyle} bg-background`;

    return (<div className="my-6 space-y-3">
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
    );
}

function AmenitiesSection({ amenities, reformado }) {
    const availableAmenities = amenities ? [
        { icon: PaintRoller, label: reformado ? 'Reformado' : 'Para reformar', value: reformado },
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
        <div className="grid grid-cols-2 gap-4 px-8 [&>*]:flex [&>*]:items-center [&>*]:gap-2">
            {availableAmenities.map(({ icon: Icon, label }) => (
                <div key={label}>
                    <Icon className="w-5 h-5 text-black" />
                    <span className="text-black">{label}</span>
                </div>
            ))}
        </div>
    );
}

function CharacteristicsSection({ propertyCharacteristics }) {
    console.log('do u see, ', propertyCharacteristics);
    const availableCharacteristics = propertyCharacteristics ? [
        {
            icon: BedDouble,
            label: "Dormitorios En Suite",
            value: propertyCharacteristics.dormitoriosSuite,
            singularLabel: "Dormitorio En Suite"
        },
        {
            icon: Bed,
            label: "Dormitorios",
            value: propertyCharacteristics.dormitorios,
            singularLabel: "Dormitorio"
        },
        {
            icon: Bath,
            label: "Baños",
            value: propertyCharacteristics.banos,
            singularLabel: "Baño"
        },
        {
            icon: Toilet,
            label: "Aseos",
            value: propertyCharacteristics.aseo,
            singularLabel: "Aseo"
        },
        {
            icon: Sun,
            label: "Balcones",
            value: propertyCharacteristics.balcones,
            singularLabel: "Balcón"
        },
        // {
        //     icon: Fence,
        //     label: "Terrazas",
        //     value: propertyCharacteristics.patio,
        //     singularLabel: "Terraza",
        //     isTerraza: true
        // },
        {
            icon: Ruler,
            label: "M²",
            value: propertyCharacteristics.metrosCuadradros,
            singularLabel: "M²"
        }
    ].filter(characteristic => characteristic.value > 0) : [];


    return (
        <div className="flex flex-wrap gap-4 ">
            {availableCharacteristics.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                    <Icon className="w-7 h-7" />
                    <div className="text-sm">{label}</div>
                    <div className="font-bold">{value}</div>
                </div>
            ))}
        </div>
    )
}

export function PropertyBroucher({ property }) {
    const Head = () => {
        return (
            <div className="[&_span]:text-dark">
                <h2>Precio</h2>
                <div className="text-4xl flex" style={{ letterSpacing: '1px' }}>
                    <IconPrice stroke="black" />
                    {property.precio.toLocaleString('es-ES')}
                </div>

                <div className="space-y-2 pt-3">
                    {property.precioIbi > 0 && (
                        <div className="flex items-center justify-between">
                            <span>+ IBI</span>
                            <span >€{property.precioIbi.toLocaleString('es-ES')}/año</span>
                        </div>
                    )}
                    {property.precioComunidad > 0 && (
                        <div className="flex items-center justify-between">
                            <span >+ Gastos de Comunidad</span>
                            <span>€{property.precioComunidad.toLocaleString('es-ES')}/mes</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto min-w-[400px] bg-[#91AC8F] rounded-xl font-serif px-8 py-4">
            <div className="sticky divide-y divide-[#E1D8C6] [&>*]:py-4 [&_h2]:text-2xl [&_h3]:text-xl ">
                <Head />
                <CharacteristicsSection propertyCharacteristics={property.charRef} />
                <AmenitiesSection amenities={property.amentitiesRef} reformado={property.reformado} />
                {/* <ShareButton property={property} setIsShareModalOpen={setIsShareModalOpen} /> */}
            </div>
        </div>
    );
}
