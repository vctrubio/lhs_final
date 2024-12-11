import { getMetersSquare } from "@/utils/utils"
import { getBedrooms } from "@/utils/utils"
import { getBathrooms } from "@/utils/utils"
import { Property } from "./types"
interface PropertyParamsProps {
    title: string,
    min: number,
    max: number
}

export interface PropertyParams {
    prices: PropertyParamsProps,
    bathrooms: PropertyParamsProps,
    bedrooms: PropertyParamsProps,
    metersSquare: PropertyParamsProps
}

export function getPropertiesParams(properties: Property[]): PropertyParams {
    const prices = properties.map(property => property.precio)
    const bathrooms = properties.map(property => getBathrooms(property))
    const bedrooms = properties.map(property => getBedrooms(property))
    const metersSquare = properties.map(property => getMetersSquare(property))

    const propertyParams: PropertyParams = {
        prices: {
            title: 'Precio',
            min: Math.min(...prices),
            max: Math.max(...prices)
        },
        bathrooms: {
            title: 'Banos',
            min: Math.min(...bathrooms),
            max: Math.max(...bathrooms)
        },
        bedrooms: {
            title: 'Dormitorios',
            min: Math.min(...bedrooms),
            max: Math.max(...bedrooms)
        },
        metersSquare: {
            title: 'Metros Cuadrados',
            min: Math.min(...metersSquare),
            max: Math.max(...metersSquare)
        }
    }

    return propertyParams
}