import React from "react";
import { PropertyBroucher } from "@/components/PropertyPageBrochure";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import NotFound from "@/app/(main)/not-found";
import { fetchPropertyByID } from "#/backend/apisConnections";

export default async function PdfView({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const propertyData = await fetchPropertyByID(slug);
    const property = propertyData;

    if (!property) {
        return <NotFound />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return <CreatePdf pdf={pdf} brochure={brochure} />;
}
