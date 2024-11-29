import React from 'react';
import { TakeOne } from './playground';
import { PropertyProvider, } from '#/backend/propertyProviderContext';
import CardProperty from '@/components/CardProperty';
import { fetchEntriesContentful } from '#/backend/apisConnections';

export const PropertyProviderWrapper = () => (
  <div>
    <PropertyProvider>
      <TakeOne />
    </PropertyProvider>
  </div>
)


export const PropertyCardIteration = async () => {
  const { properties } = await fetchEntriesContentful();

  return (
    <div className="flex flex-wrap">
      {properties.map((property) => (
        <CardProperty key={property.url} propiedad={property} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <PropertyCardIteration />
    </div>
  )
}
