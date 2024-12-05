import React, { Suspense } from 'react';
import { TakeOne } from './playground';
import { PropertyProvider } from '#/backend/propertyProviderContext';
import { fetchEntriesContentful } from '#/backend/apisConnections';
import { CardPropertySearchFilter } from '@/components/CardPropertySearchFilter';
import { unstable_cache } from 'next/cache';

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
async function PropertyCardSection() {
  // const properties = await getCachedProperties();
  const { properties } = await fetchEntriesContentful();

  return (
    <div className="flex flex-wrap">
      <CardPropertySearchFilter entries={properties} />
    </div>
  );
}

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyCardSection />
    </Suspense>
  );
}
