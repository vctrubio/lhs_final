import React from "react";
import { PropertyBroucher } from "@/components/PropertyPageBrochure";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import {
    getPropertyData,
    generatePropertyMetadata,
    Props,
} from "@/utils/metadata";
import { Metadata } from "next";
import NotFound from "@/app/(main)/not-found";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.slug, true);
}

export default async function PdfView({ params }: Props) {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <NotFound />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <div className="flex flex-col items-center">
            <DownloadPdfButton title={pdf.title} />
            <CreatePdf pdf={pdf} brochure={brochure} />;
        </div>
    );
}
