import React from "react";
import Link from "next/link";
import { fetchProperties } from "#/backend/CRM/fetch";
import { ContentController } from "#/backend/CRM/debugger";

export default async function Ventas() {
    const { properties } = await ContentController({ id: null });

    return (
        <div className="my-2">
            <div className="properties-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                    <Link 
                        key={property.url} 
                        href={`/ventas/${property.url}`}
                        className="property-item block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                        <p className="text-gray-700 mb-2">Price: {property.precio} €</p>
                        <p className="text-gray-500">Barrio: {property.barrioRef.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}