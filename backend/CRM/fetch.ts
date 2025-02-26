import { Property, Barrio, PropertyParams } from "../types";
import { Entry } from "contentful";
import { client } from "./setup";
import { parseBarrioFromContentful, parsePropertyFromContentful } from "./parse";
import { getPropertiesParams } from "./params";

export async function fetchProperties(): Promise<{
    properties: Property[];
    filteredBarrios: Barrio[];
    propertyParams: PropertyParams;
}> {
    console.log("calling fetchEntriesContentful: ");

    const entries = await client.getEntries();

    const barrios: Barrio[] = [];
    const properties: Property[] = [];

    entries.items.map((entry: Entry<any>) => {
        if (entry.sys.contentType.sys.id === "barrio") {
            barrios.push(parseBarrioFromContentful({ entry }));
        }
        if (entry.sys.contentType.sys.id === "propiedad") {
            if (entry.fields.buyOrRent)
                //buy is true -- only parsing buy properties for now
                properties.push(parsePropertyFromContentful({ entry }));
        }
    });

    const propertyParams = getPropertiesParams(properties);

    const uniqueBarriosInProperties = [
        ...new Set(properties.map((property) => property.barrioRef.name)),
    ];
    const filteredBarrios = barrios.filter((barrio) =>
        uniqueBarriosInProperties.includes(barrio.name),
    );

    return { properties, filteredBarrios, propertyParams };
}

