import React from "react";
import { ContentController } from "#/backend/CRM/debugger";
import PropertyPage from "@/view/propiedadView";
import { fetchPropertyByID } from "#/backend/CRM/fetch";

export type Props = {
    params: Promise<{ url: string }>;
};

export default async function PropertyDetails({ params }: Props) {
    const { url } = await params;
    const property = await fetchPropertyByID(url);

    // const content = await ContentController({ id: url });

    // if (!("selectedProperty" in content)) {
    //     throw new Error("Property not found");
    // }

    // const selectedProperty = content.selectedProperty;

    if (!property) 
        return ;

    return <PropertyPage property={property}/>
}
