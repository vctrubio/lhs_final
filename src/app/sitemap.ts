import { MetadataRoute } from 'next'
import { fetchEntriesContentful } from '#/backend/apisConnections'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { properties } = await fetchEntriesContentful()
  
  const propertyUrls = properties?.map((property) => ({
    url: `https://www.lhsconcept.com/propiedades/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  })) ?? []
 
  return [
    {
      url: 'https://www.lhsconcept.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...propertyUrls,
  ]
} 