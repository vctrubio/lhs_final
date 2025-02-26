import React from "react";
import { ContentController } from "#/backend/CRM/debugger";

export default async function PropertyDetails({ params }: { params: Promise<{ url: string }> | { url: string } }) {
    const resolvedParams = await params;
    const { url } = resolvedParams;

    const content = await ContentController({ id: url });
    if (!("selectedProperty" in content)) {
        throw new Error("Property not found");
    }

    const selectedProperty = content.selectedProperty;

    return (
        <div>
            <h1>Property Details</h1>
            <p>You are at the right space: {selectedProperty.title}</p>
        </div>
    );
}