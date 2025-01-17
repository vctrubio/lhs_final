'use client'
import React, { useEffect, useState } from 'react';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { Property } from '#/backend/types';
import Image from 'next/image';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';

type PageParams = {
    slug: string;
}

type Props = {
    params: Promise<PageParams>;
}

class PdfParent {
    title: string;
    photos: string[];
    description: string;
    characteristics: string | undefined; //json / react compnent / {children: React.ReactNode}

    constructor(property: Property) {
        this.title = property.title;
        this.photos = property.photos_url;
        this.description = property.description;
    }
}

const PdfPageOne = ({ title, photos }: { title: string, photos: string[] }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">
                {title}
            </h1>
            <div className="relative w-full h-64"> {/* Ensure the parent container has a defined height */}
                <Image src={photos[0]} alt="Propiedad" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
}

const PdfPageTwo = ({ description, photos, brochure }: { description: string, photos: string[], brochure: React.ReactNode }) => {
    console.log('photos: ', photos);
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
            <div className="border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden text-ellipsis text-center text-xl">
                {description}
            </div>
            <div
                className="border border-gray-300 rounded-xl relative w-full h-full"
                style={{ backgroundImage: `url(${photos[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div
                className="border border-gray-300 rounded-xl relative w-full h-full"
                style={{ backgroundImage: `url(${photos[2]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div className="border border-gray-300 rounded-xl overflow-hidden">
                {brochure}
            </div>
        </div>
    );
}

function CreatePdf({ pdf, brochure }: { pdf: PdfParent, brochure: React.ReactNode }) {
    return (
        <div className="bg-background">
            <div className="[&>div]:mx-auto  [&>div]:w-a4 [&>div]:h-a4">
                <PdfPageOne title={pdf.title} photos={pdf.photos} />
                <PdfPageTwo description={pdf.description} photos={pdf.photos} brochure={brochure} />
            </div>
        </div>
    );
}

export default function PdfView({ params }: Props) {
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
    const brochure = <PropertyBroucher property={property} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
};