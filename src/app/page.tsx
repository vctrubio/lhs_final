import React from 'react';
import { TakeOne } from './playground';
import { PropertyProvider, } from '#/backend/propertyProviderContext';
import { fetchEntriesContentful } from '#/backend/apisConnections';
import { CardPropertySearchFilter } from '@/components/CardPropertySearchFilter';

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
      <CardPropertySearchFilter entries={properties} />
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
