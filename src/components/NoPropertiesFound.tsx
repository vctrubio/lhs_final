import React from "react";
import { Property } from "#/backend/types";
import { formatPrice, getBathrooms, getBedrooms, getMetersSquare } from "@/utils/utils";
import Link from "next/link";
import { PropertyCard } from './cards/PropertyCard';
import { Bath, Bed, ChevronsRight, DollarSign, Home, MapPin, Ruler } from "lucide-react";

interface FilterCounts {
  title: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  meters: number;
  barrios: number;
}

interface NoPropertiesFoundProps {
  allProperties: Property[];
  params: {
    title: string | null;
    prices: { min: string | null; max: string | null };
    bedrooms: { min: string | null; max: string | null };
    bathrooms: { min: string | null; max: string | null };
    m2: { min: string | null; max: string | null };
    barrios: string | null;
    sort: string | null;
  };
}

const NoPropertiesFound: React.FC<NoPropertiesFoundProps> = ({ allProperties, params }) => {
  // Count how many properties match each individual filter
  const countMatchingProperties = (): FilterCounts => {
    const counts: FilterCounts = {
      title: 0,
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      meters: 0,
      barrios: 0
    };

    allProperties.forEach(property => {
      // Title match - updated to match the ventasView logic
      if (params.title) {
        const searchTerms = params.title.toLowerCase().split(' ');
        const propertyTitle = property.title.toLowerCase();
        const barrioName = property.barrioRef?.name?.toLowerCase() || '';
        
        const allTermsMatch = searchTerms.every(term => 
          propertyTitle.includes(term) || barrioName.includes(term)
        );
        
        if (allTermsMatch) {
          counts.title++;
        }
      }

      // Price range match
      const propertyPrice = formatPrice(property.precio);
      const minPrice = params.prices.min ? parseFloat(params.prices.min) : 0;
      const maxPrice = params.prices.max ? parseFloat(params.prices.max) : Infinity;
      if (propertyPrice >= minPrice && propertyPrice <= maxPrice) {
        counts.price++;
      }

      // Bedrooms match
      const bedrooms = getBedrooms(property);
      const minBeds = params.bedrooms.min ? parseInt(params.bedrooms.min) : 0;
      const maxBeds = params.bedrooms.max ? parseInt(params.bedrooms.max) : Infinity;
      if (bedrooms >= minBeds && bedrooms <= maxBeds) {
        counts.bedrooms++;
      }

      // Bathrooms match
      const bathrooms = getBathrooms(property);
      const minBaths = params.bathrooms.min ? parseInt(params.bathrooms.min) : 0;
      const maxBaths = params.bathrooms.max ? parseInt(params.bathrooms.max) : Infinity;
      if (bathrooms >= minBaths && bathrooms <= maxBaths) {
        counts.bathrooms++;
      }

      // Square meters match
      const meters = getMetersSquare(property);
      const minMeters = params.m2.min ? parseInt(params.m2.min) : 0;
      const maxMeters = params.m2.max ? parseInt(params.m2.max) : Infinity;
      if (meters >= minMeters && meters <= maxMeters) {
        counts.meters++;
      }

      // Neighborhoods match
      if (params.barrios) {
        const selectedBarrios = params.barrios.split(',');
        if (property.barrioRef?.name && selectedBarrios.includes(property.barrioRef.name)) {
          counts.barrios++;
        }
      }
    });

    return counts;
  };

  const counts = countMatchingProperties();

  // Get recommendations - properties that match at least some of the search criteria
  const getRecommendations = (): { properties: Property[], description: string } => {
    let recommendations = [...allProperties];
    let description = "Propiedades que podrían interesarte";
    
    // Keep track of which filters were applied and which ones we're relaxing
    const appliedFilters: string[] = [];
    const relaxedFilters: string[] = [];
    
    // Start with a copy of all properties
    let filteredProperties = [...allProperties];
    
    // Apply selected filters that have most results (to keep some good matches)
    if (params.title && counts.title > 0) {
      const searchTerms = params.title.toLowerCase().split(' ');
      filteredProperties = filteredProperties.filter(property => {
        const propertyTitle = property.title.toLowerCase();
        const barrioName = property.barrioRef?.name?.toLowerCase() || '';
        return searchTerms.some(term => propertyTitle.includes(term) || barrioName.includes(term));
      });
      appliedFilters.push(`"${params.title}"`);
    }
    
    // Apply bedrooms filter if specified and has sufficient results
    if ((params.bedrooms.min || params.bedrooms.max) && counts.bedrooms >= 3) {
      const minBeds = params.bedrooms.min ? parseInt(params.bedrooms.min) : 0;
      const maxBeds = params.bedrooms.max ? parseInt(params.bedrooms.max) : Infinity;
      filteredProperties = filteredProperties.filter(property => {
        const beds = getBedrooms(property);
        return beds >= minBeds && beds <= maxBeds;
      });
      
      if (params.bedrooms.min && params.bedrooms.max) {
        appliedFilters.push(`${params.bedrooms.min}-${params.bedrooms.max} dormitorios`);
      } else if (params.bedrooms.min) {
        appliedFilters.push(`${params.bedrooms.min}+ dormitorios`);
      } else if (params.bedrooms.max) {
        appliedFilters.push(`hasta ${params.bedrooms.max} dormitorios`);
      }
    } else if (params.bedrooms.min || params.bedrooms.max) {
      relaxedFilters.push("dormitorios");
    }
    
    // Apply price filter if specified and has sufficient results
    if ((params.prices.min || params.prices.max) && counts.price >= 3) {
      filteredProperties = filteredProperties.filter(property => {
        const propertyPrice = formatPrice(property.precio);
        const minPrice = params.prices.min ? parseFloat(params.prices.min) : 0;
        const maxPrice = params.prices.max ? parseFloat(params.prices.max) : Infinity;
        return propertyPrice >= minPrice && propertyPrice <= maxPrice;
      });
      
      if (params.prices.min && params.prices.max) {
        appliedFilters.push(`precio entre ${params.prices.min} y ${params.prices.max}`);
      } else if (params.prices.min) {
        appliedFilters.push(`precio mínimo ${params.prices.min}`);
      } else if (params.prices.max) {
        appliedFilters.push(`precio máximo ${params.prices.max}`);
      }
    } else if (params.prices.min || params.prices.max) {
      relaxedFilters.push("precio");
    }
    
    // Apply barrios filter if it has good results
    if (params.barrios && counts.barrios >= 3) {
      const selectedBarrios = params.barrios.split(',');
      filteredProperties = filteredProperties.filter(property => 
        selectedBarrios.includes(property.barrioRef.name)
      );
      appliedFilters.push(`en ${params.barrios}`);
    } else if (params.barrios) {
      relaxedFilters.push("barrio");
    }
    
    // If we don't have enough properties after applying filters, reset and try a different approach
    if (filteredProperties.length < 3) {
      filteredProperties = [...allProperties];
      
      // Prioritize by most specific and important criteria
      if (params.bedrooms.min) {
        const minBeds = parseInt(params.bedrooms.min);
        filteredProperties = filteredProperties.filter(p => getBedrooms(p) >= minBeds - 1);
      }
      
      if (params.bathrooms.min) {
        const minBaths = parseInt(params.bathrooms.min);
        filteredProperties = filteredProperties.filter(p => getBathrooms(p) >= minBaths - 1);
      }
    }
    
    // Create a meaningful description based on what we kept and what we relaxed
    if (appliedFilters.length > 0) {
      description = `Propiedades similares ${appliedFilters.join(", ")}`;
      
      if (relaxedFilters.length > 0) {
        description += ` con criterios más flexibles en ${relaxedFilters.join(", ")}`;
      }
    } else if (relaxedFilters.length > 0) {
      description = `Propiedades con criterios similares pero sin restricciones en ${relaxedFilters.join(", ")}`;
    }
    
    // Sort by overall similarity to the original search
    filteredProperties.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // Calculate similarity scores based on how close properties match original criteria
      if (params.bedrooms.min) {
        const targetBeds = parseInt(params.bedrooms.min);
        const bedsA = getBedrooms(a);
        const bedsB = getBedrooms(b);
        scoreA += Math.max(0, 5 - Math.abs(bedsA - targetBeds));
        scoreB += Math.max(0, 5 - Math.abs(bedsB - targetBeds));
      }
      
      if (params.bathrooms.min) {
        const targetBaths = parseInt(params.bathrooms.min);
        const bathsA = getBathrooms(a);
        const bathsB = getBathrooms(b);
        scoreA += Math.max(0, 5 - Math.abs(bathsA - targetBaths));
        scoreB += Math.max(0, 5 - Math.abs(bathsB - targetBaths));
      }
      
      if (params.prices.min && params.prices.max) {
        const minPrice = parseFloat(params.prices.min);
        const maxPrice = parseFloat(params.prices.max);
        const midPrice = (minPrice + maxPrice) / 2;
        const priceA = formatPrice(a.precio);
        const priceB = formatPrice(b.precio);
        
        scoreA += Math.max(0, 10 - Math.abs(priceA - midPrice) / midPrice * 10);
        scoreB += Math.max(0, 10 - Math.abs(priceB - midPrice) / midPrice * 10);
      }
      
      return scoreB - scoreA;
    });
    
    return {
      properties: filteredProperties.slice(0, 3), 
      description
    };
  };

  const { properties: recommendations, description: recommendationsTitle } = getRecommendations();

  return (
    <div className="w-full p-4 md:p-8 bg-slate-50 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron propiedades</h2>
        <p className="text-gray-600">Ninguna propiedad coincide con todos los criterios seleccionados:</p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
        {params.title && (
          <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
              <Home className="text-gray-600" size={18} />
            </div>
            <span className="flex-1 font-medium text-gray-700 mx-3">Búsqueda por "{params.title}":</span>
            <span className="text-rose-500 font-semibold">{counts.title} propiedades</span>
          </div>
        )}

        {(params.prices.min || params.prices.max) && (
          <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
              <DollarSign className="text-gray-600" size={18} />
            </div>
            <span className="flex-1 font-medium text-gray-700 mx-3">
              Precio {params.prices.min ? `desde ${params.prices.min}` : ''} 
              {params.prices.min && params.prices.max ? ' hasta ' : ''}
              {params.prices.max ? `${params.prices.max}` : ''}:
            </span>
            <span className="text-rose-500 font-semibold">{counts.price} propiedades</span>
          </div>
        )}

        {(params.bedrooms.min || params.bedrooms.max) && (
          <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
              <Bed className="text-gray-600" size={18} />
            </div>
            <span className="flex-1 font-medium text-gray-700 mx-3">
              Dormitorios {params.bedrooms.min ? `desde ${params.bedrooms.min}` : ''} 
              {params.bedrooms.min && params.bedrooms.max ? ' hasta ' : ''}
              {params.bedrooms.max ? `${params.bedrooms.max}` : ''}:
            </span>
            <span className="text-rose-500 font-semibold">{counts.bedrooms} propiedades</span>
          </div>
        )}

        {(params.bathrooms.min || params.bathrooms.max) && (
          <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
              <Bath className="text-gray-600" size={18} />
            </div>
            <span className="flex-1 font-medium text-gray-700 mx-3">
              Baños {params.bathrooms.min ? `desde ${params.bathrooms.min}` : ''} 
              {params.bathrooms.min && params.bathrooms.max ? ' hasta ' : ''}
              {params.bathrooms.max ? `${params.bathrooms.max}` : ''}:
            </span>
            <span className="text-rose-500 font-semibold">{counts.bathrooms} propiedades</span>
          </div>
        )}

        {(params.m2.min || params.m2.max) && (
          <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
              <Ruler className="text-gray-600" size={18} />
            </div>
            <span className="flex-1 font-medium text-gray-700 mx-3">
              Metros cuadrados {params.m2.min ? `desde ${params.m2.min}` : ''} 
              {params.m2.min && params.m2.max ? ' hasta ' : ''}
              {params.m2.max ? `${params.m2.max}` : ''}:
            </span>
            <span className="text-rose-500 font-semibold">{counts.meters} propiedades</span>
          </div>
        )}

        {params.barrios && (
          <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
              <MapPin className="text-gray-600" size={18} />
            </div>
            <span className="flex-1 font-medium text-gray-700 mx-3">Barrios: {params.barrios}:</span>
            <span className="text-rose-500 font-semibold">{counts.barrios} propiedades</span>
          </div>
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{recommendationsTitle}</h3>
          <div className="flex flex-wrap gap-4 pb-4">
            {recommendations.map((property) => (
              <PropertyCard key={property.title} property={property} cssStateHover={true} />
            ))}
          </div>
        </div>
      )}

      <div className="text-center p-6 bg-blue-50 rounded-lg text-gold">
        <h3 className="text-xl font-semibold mb-2">¿No encuentras lo que buscas?</h3>
        <p className="mb-4">Nuestro equipo puede ayudarte a encontrar la propiedad perfecta para ti.</p>
        <Link href="/contacto" className="inline-block px-6 py-3 bg-greenish hover:bg-greenDark text-white font-medium rounded-md transition-colors">
          Contactar a un agente
        </Link>
      </div>
    </div>
  );
};

export default NoPropertiesFound;
