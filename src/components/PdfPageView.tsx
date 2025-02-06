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
        <div className={`w-a4 h-a4 my-2 bg-background ${className}`}>
            {children}
        </div>
    );
};

/**todo change the object fill and layouts....  */
function showImage(photo: Photo, key?: number) {
    return (
        <img
            key={key}
            src={photo.url}
            alt=""
            className="w-full h-full object-fill rounded-xl"
        />
    );
}

function RenderGridForChunk({ photos, className = '' }: { photos: Photo[], className?: string }) {
    const predefinedPositions = [
        { id: 1, colSpan: 4, rowSpan: 3, gridColumn: "1 / span 4", gridRow: "1 / span 3" },
        { id: 2, colSpan: 4, rowSpan: 3, gridColumn: "1 / span 4", gridRow: "4 / span 3" },
        { id: 3, colSpan: 2, rowSpan: 6, gridColumn: "5 / span 2", gridRow: "1 / span 6" },
    ];
    return (
        <div className={`w-full h-full ${photos.length === 1 ? 'grid-cols-1 grid-rows-1' : 'grid grid-cols-6 grid-rows-6'} ${className}`}>
            {photos.map((photo, index) => {
                const position = predefinedPositions[index];
                return (
                    <div
                        key={index}
                        style={{
                            gridColumn: photos.length === 1 ? '1 / -1' : position.gridColumn,
                            gridRow: photos.length === 1 ? '1 / -1' : position.gridRow,
                            padding: "2px",
                        }}
                    >
                        {showImage(photo, index)}
                    </div>
                );
            })}
        </div>
    );
}


const PdfPageOne = ({ title, photos }: { title: string, photos: Photo[] }) => {
    return (
        <PDFPage>
            <div className='pt-8'>
                <h1 className="text-5xl text-zinc-500 font-ricordi font-light text-center my-4 px-2">
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


const TestFt = ({ photos }: { photos: Photo[] }) => {
    // Group photos into A4 pages based on their layout and dimensions
    const groupPhotosIntoPages = (photos: Photo[]): Photo[][] => {
        const pages: Photo[][] = [];
        let currentPage: Photo[] = [];
        let currentHeight = 0;

        photos.forEach((photo) => {
            // Calculate estimated height based on A4 page width (210mm - padding)
            const pageWidth = 210 - 30; // 15mm padding on both sides
            const aspectRatio = photo.width / photo.height;
            const estimatedHeight = pageWidth / aspectRatio;

            // Check if we need a new page (A4 height: 297mm - padding)
            if (currentHeight + estimatedHeight > 297 - 30) {
                pages.push(currentPage);
                currentPage = [];
                currentHeight = 0;
            }

            currentPage.push(photo);
            currentHeight += estimatedHeight;
        });

        if (currentPage.length > 0) pages.push(currentPage);
        return pages;
    };

    // Get grouped photos
    const photoPages = groupPhotosIntoPages(photos);

    return (
        <>
            {photoPages.map((pagePhotos, pageIndex) => (
                <div key={pageIndex} className="a4-page">
                    <div className={`layout-${pagePhotos[0].grid.toLowerCase()}`}>
                        {pagePhotos.map((photo, photoIndex) => (
                            <div key={`${photo.url}-${photoIndex}`} className="photo-container">
                                <img
                                    src={photo.url}
                                    alt={photo.url}
                                    style={{
                                        aspectRatio: `${photo.width}/${photo.height}`,
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

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
                        <RenderGridForChunk photos={chunks[0]} className="h-[70%]" />
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

export function CreatePdf({ pdf, brochure }: { pdf: PdfParent, brochure: React.ReactNode }) {
    const pages = [
        <PdfPageOne key={pdf.title} title={pdf.quote} photos={pdf.photosCover} />,
        <PdfPageTwo key="page-two" pdf={pdf} brochure={brochure} />
    ];

    if (pdf.photoMain) {
        pages.push(...PdfRoomPage({ photos: pdf.photoMain }));
    }

    if (pdf.rooms) {
        pdf.rooms.forEach((room, index) => {
            pages.push(...PdfRoomPage({ room }));
        });
    }

    pages.push(<PdfPlanoPage key="plano-page" planoUrl={pdf.planoUrl.url} />);

    return <div id='pdf'>{pages}</div>;
}

// function RenderGridExample() {
//   const photos = [
//     { id: 1, colSpan: 4, rowSpan: 3, label: "4x3", gridColumn: "1 / span 4", gridRow: "1 / span 3" },
//     { id: 2, colSpan: 4, rowSpan: 3, label: "4x3", gridColumn: "1 / span 4", gridRow: "4 / span 3" },
//     { id: 3, colSpan: 2, rowSpan: 6, label: "2x6", gridColumn: "5 / span 2", gridRow: "1 / span 6" },
//   ];

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(6, 1fr)",
//         gridTemplateRows: "repeat(6, 1fr)",
//         gap: "8px",
//         width: "100%",
//         height: "100vh",
//         border: "2px solid red",
//       }}
//     >
//       {photos.map((photo) => (
//         <div
//           key={photo.id}
//           style={{
//             gridColumn: photo.gridColumn,
//             gridRow: photo.gridRow,
//             border: "2px solid green",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#f3f3f3",
//             fontSize: "20px",
//             fontWeight: "bold",
//           }}
//         >
//           {photo.label}
//         </div>
//       ))}
//     </div>
//   );
// }
