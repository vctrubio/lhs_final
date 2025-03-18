import React from "react";
import type { Metadata } from 'next';
import PropertyPage from "@/view/propiedadView";
import { fetchPropertyByID } from "#/backend/CRM/fetch";
import { PdfParent, CreatePdf } from "@/components/PdfPageView";
import { PropertyBroucher } from "@/components/PropertyBroucher";
import Custom404 from "../not-found";
import { getPropertyData, generatePropertyMetadata, Props } from '@/utils/metadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.url);
}


export default async function PropertyDetails({ params }: Props) {
    const { url } = await params;
    const property = await fetchPropertyByID(url);

    if (!property)
        return <Custom404 />;

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
