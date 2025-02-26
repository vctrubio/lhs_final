import React from "react";
import { ContentController } from "#/backend/CRM/debugger";
import PropertyPage from "@/pages/propiedadView";

export type Props = {
    params: Promise<{ url: string }>;
};

export default async function PropertyDetails({ params }: Props) {
    const { url } = await params;
    const content = await ContentController({ id: url });

    if (!("selectedProperty" in content)) {
        throw new Error("Property not found");
    }

    const selectedProperty = content.selectedProperty;

    return <PropertyPage property={selectedProperty}/>
}