import React from "react";
import { PropertyBroucher } from "@/components/PropertyBroucher";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import { fetchPropertyByID } from "#/backend/CRM/fetch";
import  DownloadPdfButton from "@/components/DownloadFicha";
import Custom404 from "@/app/not-found";

export default async function PdfView({
    params,
}: {
    params: Promise<{ url: string }>;
}) {
    const url = (await params).url;
    const propertyData = await fetchPropertyByID(url);
    const property = propertyData;

    if (!property) {
        return<Custom404 />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (<div className="flex flex-col items-center gap-4">
        <DownloadPdfButton title={pdf.title}/>
        <CreatePdf pdf={pdf} brochure={brochure} />
    </div>
    )
}
