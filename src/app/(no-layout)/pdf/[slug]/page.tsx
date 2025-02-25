import React from "react";
import { PropertyBroucher } from "@/components/PropertyPageBrochure";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import NotFound from "@/app/(main)/not-found";
import { fetchPropertyByID } from "#/backend/apisConnections";

type PageParams = {
    slug: string;
};
export default async function PdfView({ params }: { params: PageParams }) {
    const { slug } = params;
    const propertyData = await fetchPropertyByID(slug);
    const property = propertyData;

    if (!property) {
        return <NotFound />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return <CreatePdf pdf={pdf} brochure={brochure} />;
}
