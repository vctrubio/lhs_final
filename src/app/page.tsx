import React, { Suspense } from 'react';
import { TakeOne } from './playground';
import { PropertyProvider } from '#/backend/propertyProviderContext';
import { fetchEntriesContentful } from '#/backend/apisConnections';
import { CardPropertySearchFilter } from '@/components/CardPropertySearchFilter';
import { unstable_cache } from 'next/cache';
import { Property } from '#/backend/types';
import { PropertyFilterProvider } from '#/backend/propertyFilterContext';
// Cache the fetchEntriesContentful function
const getCachedProperties = unstable_cache(
  async () => {
    const { properties } = await fetchEntriesContentful();
    return properties;
  },
  ['properties-cache'], // cache key
  {
    revalidate: 3600, // revalidate every hour
    tags: ['properties']
  }
);

const PropertyProviderWrapper = () => (
  <div>
    <PropertyProvider>
      <TakeOne />
    </PropertyProvider>
  </div>
);

// Make this an async component instead of an export
export async function PropertyCardSection({ properties }: { properties: Property[] }) {
  // const properties = await getCachedProperties();
  return (
    <div className="flex flex-wrap">
      <CardPropertySearchFilter entries={properties} />
    </div>
  );
}

export default async function Home({ properties }: { properties: Property[] }) {
  if (!properties || properties.length === 0) {
    return <div>No properties available....EERRROR..... TBD</div>;
  }

  return (
    <Suspense fallback={<div></div>}>
      <PropertyCardSection properties={properties} />
    </Suspense>
  );
}

//do suspense fallback