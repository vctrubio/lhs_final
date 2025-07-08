import { Property, Barrio, PropertyParams } from "../types";
import { fetchProperties, fetchPropertyByID } from "./fetch";

let cache: {
    properties: Property[];
    filteredBarrios: Barrio[];
    propertyParams: PropertyParams;
} | null = null;

function printCache() {
    console.log("Cache content lengths:", {
        properties: cache?.properties.length,
        filteredBarrios: cache?.filteredBarrios.length,
        propertyParams: cache?.propertyParams ? Object.keys(cache.propertyParams).length : 0
    });
    
    if (cache?.properties.length) {
        console.log("Property names:", cache.properties.map(p => p.name || p.url || 'unnamed'));
    }
}

export async function ContentController({ id }: { id?: string }): Promise<
    | {
          properties: Property[];
          filteredBarrios: Barrio[];
          propertyParams: PropertyParams;
          selectedProperty: Property;
      }
    | {
          properties: Property[];
          filteredBarrios: Barrio[];
          propertyParams: PropertyParams;
      }
> {
    console.log('id is :', id);
    console.log('------- looop content controller -------');

    if (id && !cache) {
        console.log('No cache and id provided: fetching property by ID and full cache in parallel...');
        const [property, fullCache] = await Promise.all([
            fetchPropertyByID(id),
            fetchProperties()
        ]);
        if (fullCache) {
            if (property && !fullCache.properties.find(p => p.url === id)) {
                fullCache.properties.push(property);
            }
            cache = fullCache;
        }
        printCache();
    }

    if (!cache) {
        console.log('No cache: fetching full properties from API...');
        cache = await fetchProperties();
        printCache();
    } else {
        console.log('Using cached properties...');
        printCache();
    }

    if (id) {
        let selectedProperty = cache.properties.find(property => property.url === id);
        if (!selectedProperty) {
            console.log('Property not found in cache, fetching by ID...');
            selectedProperty = (await fetchPropertyByID(id)) ?? undefined; // Changed to convert null to undefined.
            if (selectedProperty) {
                console.log('Property found by ID, adding to cache:');
                cache.properties.push(selectedProperty);
            } else {
                console.log('Property not found by ID');
            }
        }
        return { ...cache, selectedProperty };
    }

    return { ...cache };
}