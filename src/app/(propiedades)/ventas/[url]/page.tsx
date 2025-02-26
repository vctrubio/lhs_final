import React from "react";
import { ContentController } from "#/backend/CRM/debugger";
import PropertyPage from "@/pages/propiedadView";

export default async function PropertyDetails({ params }: { params: { url: string } }) {
    const { url } = params;
    const content = await ContentController({ id: url });
    if (!("selectedProperty" in content)) {
        throw new Error("Property not found");
    }

    const selectedProperty = content.selectedProperty;

    return <PropertyPage property={selectedProperty}/>
}