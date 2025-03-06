import React from "react";
import { fetchProperties } from "#/backend/CRM/fetch";
import { ContentController } from "#/backend/CRM/debugger";
import SearchBar from "@/components/SearchBar";
import Ventas from "@/view/ventasView";
import { Suspense } from "react";

export default async function VentasPage() {
    const { properties, filteredBarrios, propertyParams } = await ContentController({ id: undefined });

    return (
        <Suspense fallback={<div></div>}>
            <div className="mx-auto">
                <SearchBar propertyParams={propertyParams} barrios={filteredBarrios} />
                <Ventas entries={properties} />
            </div>
        </Suspense>
    );
}
