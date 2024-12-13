import React, { Suspense } from 'react';
import { CardPropertySearchFilter } from '@/components/CardPropertySearchFilter';
import { Property } from '#/backend/types';

export default function Home({ properties }: { properties: Property[] | undefined }) {
  console.log("🚀 ~ Home ~ properties:", properties?.length);

  if (!properties || properties.length === 0) {
    return <div>No properties available....EERRROR..... TBD</div>;
  }

  return (
    <Suspense fallback={<div>TBD...</div>}>
      <div className="flex flex-wrap">
        <CardPropertySearchFilter entries={properties} />
      </div>
    </Suspense>
  );
}