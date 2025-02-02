import React, { Suspense } from 'react';
import { CardPropertySearchFilter } from '@/components/CardPropertySearchFilter';
import { fetchEntriesContentful } from '#/backend/apisConnections';
import SideBar from '@/components/SideBar';
import { LHSBond } from '@/components/lhsbond';

export default async function Home() {
  const { properties, propertyParams, filteredBarrios } = await fetchEntriesContentful()

  if (!properties || properties.length === 0) {
    return <div>No properties available.... TBD</div>;
  }

    // fallback tbd
    return (
        <>
            <Suspense fallback={<div></div>}>
                {/* <SideBar propertyParams={propertyParams} barrios={filteredBarrios} /> */}
                <div className='flex flex-col justify-center'>
                    <CardPropertySearchFilter entries={properties} />
                </div>
            </Suspense>
        </>
    );
}
