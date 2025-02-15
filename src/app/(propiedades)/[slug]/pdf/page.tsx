import React from 'react';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { PdfParent, CreatePdf } from '@/components/PdfPageView';
import { getPropertyData, generatePropertyMetadata, PageParams } from '@/utils/metadata';
import { Metadata } from 'next';
import NotFound from '@/app/not-found';

// 1) Make sure generateMetadata expects a normal params object
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
    const property = await getPropertyData(params);
    return generatePropertyMetadata(property, params.slug, true);
}

// 2) Same for the page component: No Promise, no `await params`.
export default async function PdfView({ params }: { params: PageParams }) {
    const property = await getPropertyData(params);

    if (!property) {
        return <NotFound />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
}
