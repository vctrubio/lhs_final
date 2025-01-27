import {FooterTagShare as FooterShareComponent} from "@/components/FooterTag";
import { IconPrice } from "@/utils/svgs";
import {
    Wind, Flame, Building2,
    Home, User, Package, Car,
    BedDouble, Bed, Bath,
    Toilet, Sun, Ruler,
    PaintRoller
} from "lucide-react";

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
    const availableCharacteristics = propertyCharacteristics ? [
        {
            icon: Bed,
            label: "Dormitorios",
            value: propertyCharacteristics.dormitorios,
            singularLabel: "Dormitorio"
        },
        {
            icon: BedDouble,
            label: "Dormitorios En Suite",
            value: propertyCharacteristics.dormitoriosSuite,
            singularLabel: "D En Suite"
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
        {
            icon: Ruler,
            label: "M²",
            value: propertyCharacteristics.metrosCuadradros,
            singularLabel: "M²"
        }
    ].filter(characteristic => characteristic.value > 0) : [];


    return (
<<<<<<< HEAD
        <div className="flex flex-wrap justify-center gap-4 ">
=======
        <div className="flex flex-wrap gap-4 justify-center">
>>>>>>> component-to-prf
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

function FooterSection({ slug, barrio}) {
    return (
        <div className="p-4">
            <div className="text-serif">
                LHS Concept | {barrio} • Mardid | 2025
            </div>
            <div className="font-bold">
                <a>www.lhsconcept.com/{slug}</a>
            </div>
        </div>
    )
}

export function PropertyBroucher({ property, flag=false }) {
    const Head = () => {
        return (
            <div className="[&_span]:text-dark">
                <h2>Precio</h2>
                <div className="text-3xl flex" style={{ letterSpacing: '1px' }}>
                    <IconPrice />
                    {property.precio.toLocaleString('es-ES')}
                </div>

                {(property.precioAntes > 0 || property.precioComunidad > 0) && (
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
                )}
            </div>
        );
    }

    return (
        <div className="mx-auto min-w-[380px] min-h-[560px] bg-greenish rounded-xl font-serif px-8 py-4">
            <div className="sticky divide-y divide-background [&>*]:py-4 [&_h2]:text-2xl [&_h2]:pb-1 [&_h3]:text-xl ">
                <Head />
                <CharacteristicsSection propertyCharacteristics={property.charRef} />
                <AmenitiesSection amenities={property.amentitiesRef} reformado={property.reformado} />
                {flag ? <FooterSection slug={property.url} barrio={property.barrioRef.name}/> : <FooterShareComponent />}
            </div>
        </div>
    );
}
