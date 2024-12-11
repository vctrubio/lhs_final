import { Property } from "./types"

export function getPropertiesParams(properties: Property[]): any {
    const prices = properties.map(property => property.precio)
    const bathrooms = properties.map(property => property.charRef?.banos)
    const bedrooms = properties.map(property => property.charRef?.dormitorios)
    const metersSquare = properties.map(property => property.charRef?.metrosCuadradros)
 
    console.log('calling getPropertiesParams... listing price, bathrooms, bedrooms, metersSquare')
    
    const rtnPrice = {
        min: Math.min(...prices),
        max: Math.max(...prices)
    }
    
    const rtnBathrooms = {
        min: Math.min(...bathrooms),
        max: Math.max(...bathrooms)
    }
    
    const rtnBedrooms = {
        min: Math.min(...bedrooms),
        max: Math.max(...bedrooms)
    }
    
    const rtnMetersSquare = {
        min: Math.min(...metersSquare),
        max: Math.max(...metersSquare)
    }

    console.log('prices: ', rtnPrice)
    console.log('bathrooms: ', rtnBathrooms)
    console.log('bedrooms: ', rtnBedrooms)
    console.log('metersSquare: ', rtnMetersSquare)

    return {
       prices: rtnPrice,
       bathrooms: rtnBathrooms,
       bedrooms: rtnBedrooms,
       metersSquare: rtnMetersSquare
    }
 
 }