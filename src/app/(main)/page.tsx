import React, { Suspense } from "react";
import { CardPropertySearchFilter } from "@/components/CardPropertySearchFilter";
import { fetchEntriesContentful } from "#/backend/apisConnections";
import SideBar from "@/components/SideBar";

export default async function Home() {
  const { properties, propertyParams, filteredBarrios } =
    await fetchEntriesContentful();

  if (!properties || properties.length === 0) {
    return <div>No properties available.... TBD</div>;
  }

  const sortedEntries = properties.sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  // fallback tbd
  return (
    <>
      <Suspense fallback={<div></div>}>
        <SideBar propertyParams={propertyParams} barrios={filteredBarrios} />
        <div className="flex flex-col justify-center bg-color-red">
          <CardPropertySearchFilter entries={sortedEntries} />
        </div>
      </Suspense>
    </>
  );
}
