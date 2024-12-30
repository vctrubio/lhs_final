import { useEffect, useState } from "react";
import SideCardProperty from "./SideCardProperty";
import { MapPin, RotateCcw } from "lucide-react";
import { IconStar } from "@/utils/svgs";
import { fetchEntriesContentful, fetchPropertyByID } from "../../backend/apisConnections";
import { Property, Barrio } from "../../backend/types";
import { usePathname } from 'next/navigation';
import SideBarNav from './SideBarNav';

type SortKey = 'dormitorios' | 'banos' | 'metrosCuadradros';

export default function SideBarProperty() {
    const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
    const [barrio, setBarrio] = useState<Barrio | null>(null);
    const [allRelatedProperties, setAllRelatedProperties] = useState<Property[]>([]);
    const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
    const [activeSort, setActiveSort] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [photoRotationTrigger, setPhotoRotationTrigger] = useState(0);

    const pathname = usePathname();
    const propertyUrl = pathname.split('/').pop();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!propertyUrl) {
                    throw new Error('Property URL is required');
                }

                const property = await fetchPropertyByID(propertyUrl);
                if (!property) {
                    throw new Error('Property not found');
                }
                setCurrentProperty(property);

                const { properties } = await fetchEntriesContentful();

                const sameBarrioProperties = properties
                    .filter(p => p.barrioRef.name === property.barrioRef.name && p.url !== property.url);

                setAllRelatedProperties(sameBarrioProperties);
                setDisplayedProperties(sameBarrioProperties.slice(0, 4));
                setBarrio(property.barrioRef);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching property data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [propertyUrl]);

    const handleRotate = () => {
        setDisplayedProperties(prev => {
            const nextIndex = 4 % allRelatedProperties.length;
            return [
                ...allRelatedProperties.slice(nextIndex),
                ...allRelatedProperties.slice(0, nextIndex)
            ].slice(0, 4);
        });
        setPhotoRotationTrigger(prev => prev + 1);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <IconStar
                key={index}
                fill={index < rating ? "var(--color-green-dark)" : "#e5e7eb"}
            />
        ));
    };

    if (isLoading || !barrio || !currentProperty) return <div></div>;

    return (
        <div className="p-4 space-y-6 mt-2">
            {/* Barrio Info */}
            <div className="space-y-3 border-[var(--color-green-dark)]/20 pb-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <h2 className="text-black font-serif text-2xl font-semibold">
                            {barrio.name}
                        </h2>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        {renderStars(barrio.rating)}
                    </div>
                </div>
                <p className="text-[var(--color-green-dark)]/80 text-sm leading-relaxed">
                    {barrio.description}
                </p>
            </div>

            {/* Sort Navigation */}
            <SideBarNav
                onSort={(key: SortKey) => {
                    if (activeSort === key) {
                        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                    } else {
                        setActiveSort(key);
                        setSortDirection('asc');
                    }

                    const sortedProperties = [...allRelatedProperties].sort((a, b) => {
                        const valueA = a.charRef[key];
                        const valueB = b.charRef[key];
                        const multiplier = (activeSort === key && sortDirection === 'asc') ? -1 : 1;
                        return (valueA - valueB) * multiplier;
                    });

                    setDisplayedProperties(sortedProperties);
                }}
                onRotate={handleRotate}
                activeSort={activeSort}
                sortDirection={sortDirection}
                properties={displayedProperties}
            />

            {/* Properties */}
            <div className="space-y-4">
                <div className="space-y-3">
                    {displayedProperties.map((property) => (
                        <SideCardProperty
                            key={property.url}
                            property={property}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 