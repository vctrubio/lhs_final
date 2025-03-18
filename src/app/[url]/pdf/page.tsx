import React from "react";
import { Metadata } from "next";
import { PropertyBroucher } from "@/components/PropertyBroucher";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import { fetchPropertyByID } from "#/backend/CRM/fetch";
import DownloadPdfButton from "@/components/DownloadFicha";
import Custom404 from "@/app/not-found";
import { getPropertyData, generatePropertyMetadata, Props } from "@/utils/metadata";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.slug, true);
}

export default async function PdfView({ params }: Props) {
    const { slug } = await params
    const propertyData = await fetchPropertyByID(slug);
    const property = propertyData;

    if (!property) {
        return <Custom404 />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (<div className="flex flex-col items-center gap-4">
        <DownloadPdfButton title={pdf.title} />
        <CreatePdf pdf={pdf} brochure={brochure} />
    </div>
    )
}
