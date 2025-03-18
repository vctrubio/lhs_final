import React from "react";
import { Photo, Property, PropiedadHabitacion } from "#/backend/types";
import { IconFindUs } from "@/utils/svgs";
import { sortAndChunkPhotos } from "@/components/PdfPageAlgorithims";

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

export const PDFPage = ({ children, className = "" }: PDFPageProps) => {
    return (
        <div
            className={`flex flex-col mx-auto w-a4 h-a4 bg-background page-break ${className}`}
        >
            {children}
        </div>
    );
};

const PdfPageOne = ({ title, photos }: { title: string; photos: Photo[] }) => {
    return (
        <PDFPage>
            <div className="pt-9">
                <h1 className="text-5xl text-zinc-500 font-ricordi font-light text-center my-4 px-2">
                    &quot;{title}&quot;
                </h1>
                {/* Plain <img> instead of <Image /> */}
                <div className="w-full h-[1220px] overflow-hidden relative">
                    <img
                        src={photos[0].url}
                        alt="Propiedad"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </PDFPage>
    );
};

const PdfPageTwo = ({
    pdf,
    brochure,
}: {
    pdf: PdfParent;
    brochure: React.ReactNode;
}) => {
    return (
        <PDFPage className="relative grid grid-cols-2 grid-rows-2 gap-2">
            <div className="flex flex-col justify-around text-xl font-serif">
                <div className="ml-4">
                    <h1 className="font-bold text-2xl">{pdf.title}</h1>
                    <h2 className="flex items-center text-xl">
                        <IconFindUs fill="#15423b" />
                        <div className="pl-1">{pdf.barrio}</div>
                    </h2>
                </div>
                <div className="flex items-center justify-center overflow-hidden text-ellipsis text-2xl text-center px-2">
                    {pdf.description}
                </div>
            </div>
            <div
                className="border border-gold w-full h-full"
                style={{
                    borderTopLeftRadius: "25px",
                    borderBottomRightRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    backgroundImage: `url(${pdf.photosCover[1].url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div
                className="border border-gold w-full h-full"
                style={{
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
                    borderTopLeftRadius: "25px",
                    backgroundImage: `url(${pdf.photosCover[2].url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="gold rounded-xl overflow-hidden">{brochure}</div>
        </PDFPage>
    );
};

const PdfPlanoPage = ({ planoUrl }: { planoUrl: string }) => {
    return (
        <PDFPage>
            <div className="pt-8">
                <h1 className="text-5xl text-center my-4 px-2">Plano</h1>
                {/* Plain <img> instead of <Image /> */}
                <div className="w-full h-[920px] overflow-hidden relative">
                    <img
                        src={planoUrl}
                        alt="Plano"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </PDFPage>
    );
};

function RenderGridForChunk({ photos }: { photos: Photo[] }) {
    return (
        <div className="flex flex-col h-full gap-2 overflow-hidden">
            {photos.map((photo) => (
                <img
                    key={photo.url}
                    src={photo.url}
                    alt="Propiedad"
                    className="w-full h-full object-contain p-2"
                />
            ))}
        </div>
    );
}

// Update PdfRoomPage to accept an optional keyPrefix for unique keys
const PdfRoomPage = (
    { room, photos }: { room?: PropiedadHabitacion; photos?: Photo[] },
    keyPrefix: string = ""
) => {
    const chunks = photos
        ? sortAndChunkPhotos(photos)
        : room
            ? sortAndChunkPhotos(room.photos)
            : null;
    const pages: React.ReactElement[] = [];

    if (photos) {
        chunks?.forEach((photosArray, index) => {
            pages.push(
                <PDFPage key={`${keyPrefix}-chunku-${index}`}>
                    <RenderGridForChunk photos={photosArray} />
                </PDFPage>
            );
        });
    } else if (room) {
        if (room.title || room.description) {
            pages.push(
                <PDFPage key={`${keyPrefix}-info`}>
                    {room.title && (
                        <h1 className="text-4xl text-center pt-[1rem]">{room.title}</h1>
                    )}
                    {room.description && (
                        <p className="text-center text-2xl mx-auto">{room.description}</p>
                    )}
                    {chunks && chunks.length > 0 && (
                        <RenderGridForChunk photos={chunks[0]} />
                    )}
                </PDFPage>
            );
        }

        if (chunks && chunks.length > 1) {
            chunks.slice(1).forEach((photosArray, index) => {
                pages.push(
                    <PDFPage key={`${keyPrefix}-chunk-${index + 1}`}>
                        <RenderGridForChunk photos={photosArray} />
                    </PDFPage>
                );
            });
        }
    }

    return pages;
};

export function CreatePdf({
    pdf,
    brochure,
}: {
    pdf: PdfParent;
    brochure: React.ReactNode;
}) {
    const pages: React.ReactElement[] = [
        <PdfPageOne key={pdf.title} title={pdf.quote} photos={pdf.photosCover} />,
        <PdfPageTwo key="page-two" pdf={pdf} brochure={brochure} />,
    ];

    if (pdf.photoMain) {
        pages.push(...PdfRoomPage({ photos: pdf.photoMain }, "photoMain"));
    }

    if (pdf.rooms) {
        pdf.rooms.forEach((room, index) => {
            pages.push(...PdfRoomPage({ room }, `room-${index}`));
        });
    }

    if (pdf.planoUrl && pdf.planoUrl.url) {
        pages.push(<PdfPlanoPage key="plano-page" planoUrl={pdf.planoUrl.url} />);
    }

    return <div id="pdf">{pages}</div>;
}
