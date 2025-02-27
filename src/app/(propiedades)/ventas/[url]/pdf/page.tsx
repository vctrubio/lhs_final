import React from "react";
import { PropertyBroucher } from "@/components/PropertyBroucher";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import { fetchPropertyByID } from "#/backend/CRM/fetch";

export default async function PdfView({
    params,
}: {
    params: Promise<{ url: string }>;
}) {
    const url = (await params).url;
    const propertyData = await fetchPropertyByID(url);
    const property = propertyData;

    if (!property) {
        return; 
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return <CreatePdf pdf={pdf} brochure={brochure} />;
}
