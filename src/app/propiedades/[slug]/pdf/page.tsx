'use client'
import React, { useEffect, useState } from 'react';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { Property } from '#/backend/types';
import Image from 'next/image';

type PageParams = {
    slug: string;
}

type Props = {
    params: PageParams;
}

class PdfParent {
    title: string;
    photos: string[];
    description: string;
    characteristics: string | undefined; //json / react compnent / {children: React.ReactNode}

    constructor(property: Property) {
        this.title = property.title;
        this.photos = property.cover_url;
        this.description = property.description;
    }
}

const PdfPageOne = ({ title, photos }: { title: string, photos: string[] }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">
                {title}
            </h1>
            <div>
                <img src={photos[0]} alt="Propiedad" />
            </div>
        </div>
    );
}

const PdfPageTwo = ({ description, photos, characteristics }: { description: string, photos: string[], characteristics: string | undefined }) => {
    return (
        <div className="grid grid-cols-2 gap-2 bg-gray-100">
            <div className="border border-gray-300 p-4 overflow-hidden text-ellipsis">
                {/* {description} */}
            </div>
            <div className="border border-gray-300 p-4">
                {/* <img src={photos[2]} alt="Propiedad" /> */}
                <Image src={photos[2]} alt="Propiedad" />
            </div>
            <div className="border border-gray-300 p-4">
                {/* <img src={photos[3]} alt="Propiedad" /> */}
                photos[3]
            </div>
            <div className="border border-gray-300 p-4">
                {/* {characteristics} */}
                characteristics
            </div>
        </div>
    );
}


function CreatePdf(pdf: PdfParent) {

    return (
        <div className="bg-gray-100 p-4">
            <div className="[&>div]:bg-white [&>div]:mx-auto [&>div]:shadow-md [&>div]:border [&>div]:border-gray-300 [&>div]:w-a4 [&>div]:h-a4 [&>div]:p-10">
                <PdfPageOne title={pdf.title} photos={pdf.photos} />
                <PdfPageTwo description={pdf.description} photos={pdf.photos} characteristics={pdf.characteristics} />
            </div>
        </div>
    );
}

export default function PdfView({ params }: Props) {
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        async function fetchData() {
            const fetchedProperty = await fetchPropertyByID(params.slug);
            setProperty(fetchedProperty);
        }
        fetchData();
    }, [params.slug]);

    if (!property) {
        return <div>Property not found</div>;
    }

    const pdf = new PdfParent(property);

    return (
        <CreatePdf {...pdf} />
    );
};