import { getMetersSquare } from "@/utils/utils"
import { getBedrooms } from "@/utils/utils"
import { getBathrooms } from "@/utils/utils"
import { Property } from "./types"
import { formatPrice } from "@/utils/utils"
import { IconPrice } from "@/utils/svgs"
import {
    Bed,
    Bath,
    Ruler,
} from "lucide-react";

interface PropertyParamsProps {
    title: string,
    min: number,
    max: number,
    icon: JSX.Element
}

export interface PropertyParams {
    prices: PropertyParamsProps,
    bathrooms: PropertyParamsProps,
    bedrooms: PropertyParamsProps,
    metersSquare: PropertyParamsProps
}

export function getPropertiesParams(properties: Property[]): PropertyParams {
    const prices = properties.map(property => formatPrice(property.precio))
    const bathrooms = properties.map(property => getBathrooms(property))
    const bedrooms = properties.map(property => getBedrooms(property))
    const metersSquare = properties.map(property => getMetersSquare(property))

    const propertyParams: PropertyParams = {
        prices: {
            title: 'Precio',
            min: Math.min(...prices),
            max: Math.max(...prices),
            icon: <IconPrice />
        },
        bathrooms: {
            title: 'Baños',
            min: Math.min(...bathrooms),
            max: Math.max(...bathrooms),
            icon: <Bath />
        },
        bedrooms: {
            title: 'Dormitorios',
            min: Math.min(...bedrooms),
            max: Math.max(...bedrooms),
            icon: <Bed />
        },
        metersSquare: {
            title: 'M²',
            min: Math.min(...metersSquare),
            max: Math.max(...metersSquare),
            icon: <Ruler />
        }
    }

    return propertyParams
}