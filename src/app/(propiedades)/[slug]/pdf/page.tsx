'use client'
import React, { useEffect, useState } from 'react';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { Property, PropiedadHabitacion } from '#/backend/types';
import Image from 'next/image';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { IconFindUs } from '@/utils/svgs';

type PageParams = {
    slug: string;
}

type Props = {
    params: Promise<PageParams>;
}

type Photo = {
    url: string;
    width: number;
    height: number;
}

class PdfParent {
    title: string;
    quote: string;
    barrio: string;
    photos: Photo[];
    description: string;
    characteristics: string | undefined;
    rooms: PropiedadHabitacion[];
    planoUrl: Photo;

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

const PdfPageOne = ({ title, photos }: { title: string, photos: Photo[] }) => {
    return (
        <div className='pt-8'>
            <h1 className="text-5xl text-zinc-500 font-ricordi font-light text-center my-4 px-2">
                &quot;{title}&quot;
            </h1>
            <div className="relative w-full h-[960px]"> {/* Ensure the parent container has a defined height */}
                <Image src={photos[0].url} alt="Propiedad" layout="fill" objectFit="cover" />
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
                style={{ borderTopLeftRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', backgroundImage: `url(${pdf.photos[1].url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div
                className="border border-gold w-full h-full"
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderTopLeftRadius: '25px', backgroundImage: `url(${pdf.photos[2].url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
            <h1 className="text-4xl font- text-center pt-[1rem]">
                {room.title}
            </h1>
            <p className="text-center">
                {room.description}
            </p>
            <div className="grid grid-cols-2 gap-2">
                {room.photos.map((photo, index) => (
                    <div key={index} className="relative w-full h-64">
                        <Image src={photo.url} alt={`Room photo ${index + 1}`} layout="fill" objectFit="cover" />
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
    const photos = pdf.photos;

    const pdfPhotos = photos.slice(0,3);

    let leftOverPhotos;

    if (pdfPhotos.length >= 3 && photos.length > 3) {
        leftOverPhotos = photos.slice(3);
    }

    return (
        <div className="bg-background">
            <div className="[&>div]:mx-auto  [&>div]:w-a4 [&>div]:h-a4">
                <PdfPageOne title={pdf.quote} photos={pdf.photos} />
                <PdfPageTwo pdf={pdf} brochure={brochure} />
                {pdf.rooms && pdf.rooms.map((room, index) => (
                    <PdfRoomPage key={index} room={room} />
                ))}
                <PdfPlanoPage planoUrl={pdf.planoUrl.url}/>
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
    const brochure = <PropertyBroucher property={property} flag={true}/>;

    return (
        <div id='pdf' className='h-full'>
            <CreatePdf pdf={pdf} brochure={brochure} />
        </div>
    );
}
