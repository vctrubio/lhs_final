'use client'
import React, { useEffect, useState } from 'react';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { Property } from '#/backend/types';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { PdfParent, CreatePdf } from '@/components/PdfPageView';

type PageParams = { slug: string }
export default function PdfView({ params }: { params: Promise<PageParams>; }) {
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        async function fetchData() {
            const resolvedParams = await params;
            const fetchedProperty = await fetchPropertyByID(resolvedParams.slug);
            setProperty(fetchedProperty);
        }
        fetchData();
    }, [params]);

    if (!property) {
        return <div>Property not found</div>;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
}
