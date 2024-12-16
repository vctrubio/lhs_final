import { useEffect, useState } from "react";
import SideCardProperty from "./SideCardProperty";
import { MapPin } from "lucide-react";
import { IconStar } from "@/utils/svgs";
import { fetchEntriesContentful, fetchPropertyByID } from "../../backend/apisConnections";
import { Property, Barrio } from "../../backend/types";
import { usePathname } from 'next/navigation';

export default function SideBarProperty() {
    const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
    const [barrio, setBarrio] = useState<Barrio | null>(null);
    const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const pathname = usePathname();
    const propertyUrl = pathname.split('/').pop(); // Get the last segment of the URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!propertyUrl) {
                    throw new Error('Property URL is required');
                }

                // Fetch current property
                const property = await fetchPropertyByID(propertyUrl);
                if (!property) {
                    throw new Error('Property not found');
                }
                setCurrentProperty(property);

                // Fetch all properties to get related ones
                const { properties } = await fetchEntriesContentful();
                
                // Filter properties from same barrio, excluding current property
                const sameBarrioProperties = properties
                    .filter(p => p.barrioRef.name === property.barrioRef.name && p.url !== property.url)
                    .slice(0, 4); // Get top 4
                
                setRelatedProperties(sameBarrioProperties);
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

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <IconStar 
                key={index} 
                fill={index < rating ? "var(--color-green-dark)" : "#e5e7eb"}
            />
        ));
    };

    if (isLoading) {
        return (
            <div className="p-4 text-center">
                Loading property information...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500 text-center">
                {error}
            </div>
        );
    }

    if (!barrio || !currentProperty) {
        return (
            <div className="p-4 text-center">
                No property information available
            </div>
        );
    }

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

            {/* Properties */}
            <div className="space-y-4">
                <div className="space-y-3">
                    {relatedProperties.map((property) => (
                        <SideCardProperty key={property.url} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
} 