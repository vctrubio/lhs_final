'use client'
import React, { useEffect, useState } from 'react';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { Property, PropiedadHabitacion } from '#/backend/types';
import Image from 'next/image';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';

import {
    IconFindUs,
} from '@/utils/svgs';

type PageParams = {
    slug: string;
}

type Props = {
    params: Promise<PageParams>;
}

class PdfParent {
    title: string;
    quote: string;
    barrio: string;
    photos: string[];
    description: string;
    characteristics: string | undefined;
    rooms: PropiedadHabitacion[];
    planoUrl: string;

    constructor(property: Property) {
        this.title = property.title;
        this.barrio = property.barrioRef.name;
        this.quote = property.quote;
        this.photos = property.photos_url;
        this.description = property.description;
        this.rooms = property.roomsRef;
        this.planoUrl = property.plano_url;
    }
}

const PdfPageOne = ({ title, photos }: { title: string, photos: string[] }) => {
    return (
        <div className='pt-8'>
            <h1 className="text-5xl text-zinc-500 font-ricordi font-light text-center my-4 px-2">
                "{title}"
            </h1>
            <div className="relative w-full h-[920px]"> {/* Ensure the parent container has a defined height */}
                <Image src={photos[0]} alt="Propiedad" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
}

const PdfPageTwo = ({ pdf, brochure }: { pdf: PdfParent, brochure: React.ReactNode }) => {
    return (
        <div className="relative grid grid-cols-2 grid-rows-2 gap-2 h-full">
            <div className="flex flex-col justify-around text-xl font-serif">
                <div className="ml-4">
                    <h1 className="font-bold text-2xl">
                        {pdf.title}
                    </h1>
                    <h2 className="flex items-center text-xl">
                        <IconFindUs fill="#15423b" />
                        <div className="pl-1">{pdf.barrio}</div>
                    </h2>
                </div>
                <div className="flex items-center justify-center overflow-hidden text-ellipsis text-center px-2">
                    {pdf.description}
                </div>
            </div>
            <div
                className="border border-gold w-full h-full"
                style={{ borderTopLeftRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', backgroundImage: `url(${pdf.photos[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div
                className="border border-gold w-full h-full"
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderTopLeftRadius: '25px', backgroundImage: `url(${pdf.photos[2]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div className="gold rounded-xl overflow-hidden">
                {brochure}
            </div>
        </div>
    );
}

const PdfRoomPage = ({ room }: { room: PropiedadHabitacion }) => {
    return (
        <div className=''>
            <h1 className="text-4xl font-serif text-center my-4">
                {room.title}
            </h1>
            <p className="text-center">
                {room.description}
            </p>
            <div className="grid grid-cols-2 gap-2">
                {room.photos.slice(0, 4).map((photo, index) => (
                    <div key={index} className="relative w-full h-64">
                        <Image src={photo.startsWith('//') ? `https:${photo}` : photo} alt={`Room photo ${index + 1}`} layout="fill" objectFit="cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const PdfPlanoPage = ({ planoUrl }: { planoUrl: string }) => {
    return (
        <div className='pt-8'>
            <h1 className="text-5xl text-center my-4 px-2">
                Plano
            </h1>
            <div className="relative w-full h-[920px] mb-4">
                <Image src={planoUrl} alt="Plano" layout="fill" objectFit="contain" />
            </div>
        </div>
    );
}

function CreatePdf({ pdf, brochure }: { pdf: PdfParent, brochure: React.ReactNode }) {
    return (
        <div className="bg-background">
            <div className="[&>div]:mx-auto  [&>div]:w-a4 [&>div]:h-a4">
                <PdfPageOne title={pdf.quote} photos={pdf.photos} />
                <PdfPageTwo pdf={pdf} brochure={brochure} />
                {pdf.rooms.map((room, index) => (
                    <PdfRoomPage key={index} room={room} />
                ))}
                <PdfPlanoPage planoUrl={pdf.planoUrl} photo={pdf.photos[0]} />
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
        <div className='bg-white  h-full'>
            <CreatePdf pdf={pdf} brochure={brochure} />
        </div>
    );
};
