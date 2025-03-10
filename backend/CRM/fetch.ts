import { Property, Barrio, PropertyParams, PropertyBanner } from "../types";
import { Entry } from "contentful";
import { client } from "./setup";
import {
    parseBarrioFromContentful,
    parsePropertyFromContentful,
    parsePropertyBannerFromContentful,
} from "./parse";
import { getPropertiesParams } from "../nuqs_functions";


export async function fetchPropertiesBanner(): Promise<{
    properties: Property[] | null;
}> {
    const entries = await client.getEntries();
    console.log('entries = ', entries);

    return { properties: null };
}

export async function fetchProperties(): Promise<{
    properties: Property[];
    filteredBarrios: Barrio[];
    propertyParams: PropertyParams;
    propertiesBanner: PropertyBanner[] | null;
}> {
    console.log("calling fetchEntriesContentful: ");

    const entries = await client.getEntries();

    const barrios: Barrio[] = [];
    const properties: Property[] = [];
    const propertiesBanner: PropertyBanner[] = [];

    entries.items.map((entry: Entry<any>) => {
        if (entry.sys.contentType.sys.id === "barrio") {
            barrios.push(parseBarrioFromContentful({ entry }));
        }
        if (entry.sys.contentType.sys.id === "propiedad") {
            if (entry.fields.buyOrRent)
                //buy is true -- only parsing buy properties for now
                properties.push(parsePropertyFromContentful({ entry }));
        }
        if (entry.sys.contentType.sys.id === "homePageBanner") {
            // Parse banner entries into PropertyBanner objects
            const banners = parsePropertyBannerFromContentful({ entry });
            propertiesBanner.push(...banners);
        }
    });

    const propertyParams = getPropertiesParams(properties);

    const uniqueBarriosInProperties = [
        ...new Set(properties.map((property) => property?.barrioRef.name)),
    ];

    const filteredBarrios = barrios.filter((barrio) =>
        uniqueBarriosInProperties.includes(barrio.name),
    );

    
    properties.forEach((property) => {
        if (!property.photos_url || property.photos_url.length === 0) {
            console.log(`Property ID: ${property.title} has no photos.`);
        }
    });

    console.log('pBanner: ', propertiesBanner)
    return { properties, filteredBarrios, propertyParams, propertiesBanner };
}

export async function fetchPropertyByID(url: string): Promise<Property | null> {
    console.log("calling fetchbyID, url: ", url);

    try {
        const entries = await client.getEntries();
        const filteredEntry = entries.items.find((entry: Entry<any>) => {
            return (
                entry.sys.contentType.sys.id === "propiedad" && entry.fields.url === url
            );
        });

        if (!filteredEntry) {
            return null;
        }

        return parsePropertyFromContentful({ entry: filteredEntry });
    } catch (error) {
        console.error("Error fetching property by ID:", error);
        return null;
    }
}
