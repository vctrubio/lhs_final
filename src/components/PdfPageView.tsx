import React from 'react';
import { Photo, Property, PropiedadHabitacion } from '#/backend/types';
import Image from 'next/image';
import { IconFindUs } from '@/utils/svgs';
import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';

interface PDFPageProps {
    children: React.ReactNode;
    className?: string;
}

export class PdfParent {
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

export const PDFPage = ({ children, className = '' }: PDFPageProps) => {
    return (
        <div className={`flex flex-col mx-auto w-a4 h-a4 bg-background ${className} overflow-hidden`}>
            {children}
        </div>
    );
};

const PdfPageOne = ({ title, photos }: { title: string, photos: Photo[] }) => {
    return (
        <PDFPage>
            <div className='pt-8'>
                <h1 className="text-5xl text-zinc-500 font-ricordi font-light text-center py-4 px-2">
                    &quot;{title}&quot;
                </h1>
                <div className="relative w-full h-[964px]">
                    <Image src={photos[0].url} alt="Propiedad" layout="fill" objectFit="cover" />
                </div>
            </div>
        </PDFPage>
    );
};

const PdfPageTwo = ({ pdf, brochure }: { pdf: PdfParent, brochure: React.ReactNode }) => {
    return (
        <PDFPage className="relative grid grid-cols-2 grid-rows-2 gap-2 h-full">
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
        </PDFPage>
    );
};

const PdfPlanoPage = ({ planoUrl }: { planoUrl: string }) => {
    return (
        <PDFPage>
            <div className='pt-8'>
                <h1 className="text-5xl text-center my-4 px-2">
                    Plano
                </h1>
                <div className="relative w-full h-[920px] mb-4">
                    <Image src={planoUrl} alt="Plano" layout="fill" objectFit="contain" />
                </div>
            </div>
        </PDFPage>
    );
};

function RenderGridForChunk({ photos }: { photos: Photo[] }) {
    return (
        <div className="flex flex-col gap-2 overflow-hidden">
            {photos.map((photo) => (
                <img key={photo.url} src={photo.url} alt={'Propiedad'} className="w-full h-full object-contain p-2" />
            ))}
        </div>
    );
}

const PdfRoomPage = ({ room, photos }: { room?: PropiedadHabitacion, photos?: Photo[] }) => {
    const chunks = photos ? sortAndChunkPhotos(photos) : (room ? sortAndChunkPhotos(room.photos) : null);
    const pages = [];

    if (photos) {
        chunks?.forEach((photosArray, index) => {
            pages.push(
                <PDFPage key={`chunku-${index}`}>
                    <RenderGridForChunk photos={photosArray} />
                </PDFPage>
            );
        });
    } else if (room) {
        if (room.title || room.description) {
            pages.push(
                <PDFPage key="room-info">
                    {room.title &&
                        <h1 className="text-4xl font- text-center pt-[1rem]">
                            {room.title}
                        </h1>
                    }
                    {room.description &&
                        <p className="text-center max-w-2xl mx-auto">
                            {room.description}
                        </p>
                    }
                    {chunks && chunks.length > 0 &&
                        <RenderGridForChunk photos={chunks[0]} />
                    }
                </PDFPage>
            );
        }

        if (chunks && chunks.length > 1) {
            chunks.slice(1).forEach((photosArray, index) => {
                pages.push(
                    <PDFPage key={`chunk-${index + 1}`}>
                        <RenderGridForChunk photos={photosArray} />
                    </PDFPage>
                );
            });
        }
    }

    return pages;
};


export function CreatePdf({ pdf, brochure }: { pdf: PdfParent, brochure: React.ReactNode }) {
    const pages = [
        <PdfPageOne key={pdf.title} title={pdf.quote} photos={pdf.photosCover} />,
        <PdfPageTwo key="page-two" pdf={pdf} brochure={brochure} />
    ];

    if (pdf.photoMain) {
        pages.push(...PdfRoomPage({ photos: pdf.photoMain }));
    }

    if (pdf.rooms) {
        pdf.rooms.forEach((room) => {
            pages.push(...PdfRoomPage({ room }));
        });
    }

    pages.push(<PdfPlanoPage key="plano-page" planoUrl={pdf.planoUrl.url} />);

    return <div id='pdf'>{pages}</div>;
}

