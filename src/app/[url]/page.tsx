import React from "react";
import PropertyPage from "@/view/propiedadView";
import { fetchPropertyByID } from "#/backend/CRM/fetch";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import { PropertyBroucher } from "@/components/PropertyBroucher";

export type Props = {
    params: Promise<{ url: string }>;
};

export default async function PropertyDetails({ params }: Props) {
    const { url } = await params;
    const property = await fetchPropertyByID(url);

    if (!property)
        return;

    // Create PDF content but completely hide it
    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <>
            <PropertyPage property={property} />
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    left: '-99999px',
                    top: '-99999px',
                    visibility: 'hidden',
                    opacity: '0',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}
            >
                <CreatePdf pdf={pdf} brochure={brochure} />
            </div>
        </>
    );
}
