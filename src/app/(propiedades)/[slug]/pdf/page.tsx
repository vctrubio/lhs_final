'use client'
import React, { useEffect, useState } from 'react';
import { fetchPropertyByID } from '#/backend/apisConnections';
import { Property, PropiedadHabitacion } from '#/backend/types';
import Image from 'next/image';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { IconFindUs } from '@/utils/svgs';
import { PdfBig } from '@/components/PdfPageView';
import { Photo } from '#/backend/types';

class PdfParent {
    title: string;
    quote: string;
    barrio: string;
    photosCover: Photo[];
    photoMain: Photo[] | null;
    description: string;
    characteristics: string | undefined;
    rooms: PropiedadHabitacion[];
    planoUrl: Photo;

    constructor(property: Property) {
        this.title = property.title;
        this.barrio = property.barrioRef.name;
        this.quote = property.quote;
        this.description = property.description;
        this.rooms = property.roomsRef;
        this.planoUrl = property.plano_url;
        this.photosCover = property.photos_cover_url;
        this.photoMain = property.photos_main_url;
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
                style={{ borderTopLeftRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', backgroundImage: `url(${pdf.photosCover[1].url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div
                className="border border-gold w-full h-full"
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderTopLeftRadius: '25px', backgroundImage: `url(${pdf.photosCover[2].url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
            <div className="gold rounded-xl overflow-hidden">
                {brochure}
            </div>
        </div>
    );
}

const PdfRoomPage= ({ room, photos}: { room?: PropiedadHabitacion, photos?: Photo[]}) => {
    if (photos)
        return <PdfBig photosArray={photos}/>

    return (
        <div className='border py-1'>
            {room?.title && 
                <h1 className="text-4xl font- text-center pt-[1rem]">
                    {room.title}
                </h1>
            }
            {room?.description && 
                <p className="text-center max-w-2xl mx-auto">
                    {room.description}
                </p>
            }
            {room?.photos && 
                <div className="border">
                    <PdfBig photosArray={room.photos}/>
                </div>
            }
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
                <PdfPageOne title={pdf.quote} photos={pdf.photosCover} />
                <PdfPageTwo pdf={pdf} brochure={brochure} />
                {pdf.photoMain && <PdfRoomPage photos={pdf.photoMain}/>}
                {pdf.rooms && pdf.rooms.map((room, index) => (
                    <PdfRoomPage key={index} room={room}/>
                ))}
            </div>
        </div>
    );
}
// <PdfPlanoPage planoUrl={pdf.planoUrl.url}/> 

type PageParams = {slug: string}

export default function PdfView({ params }: { params : Promise<PageParams>;}) {
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
        <div id='pdf' className='h-full'>
            <CreatePdf pdf={pdf} brochure={brochure} />
        </div>
    );
}
