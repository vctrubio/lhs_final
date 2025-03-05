import React from "react";
import { fetchProperties } from "#/backend/CRM/fetch";
import { ContentController } from "#/backend/CRM/debugger";
import Ventas from "@/pages/ventasView";

const PropertySideCard = ({ property }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
            <p className="text-gray-700 mb-2">Price: {property.precio} €</p>
            <p className="text-gray-500">Barrio: {property.barrioRef.name}</p>
        </div>
    );
};

export default async function VentasPage() {
    const { properties } = await ContentController({ id: undefined });

    return (
        <div className="container mx-auto">
            <Ventas entries={properties} />
        </div>
    );
}
