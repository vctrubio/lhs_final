import React, { JSX } from "react";
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
      className={`flex flex-col mx-auto w-a4 h-a4 page-break ${className}`}
      style={{
        backgroundColor: "#e1d8c6",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </div>
  );
};

const PdfPageOne = ({ title, photos }: { title: string; photos: Photo }) => {
  return (
    <PDFPage>
      <div className="pt-9 flex flex-col" style={{ height: "100%" }}>
        <h1 className="flex text-5xl text-zinc-500 font-ricordi font-light text-center mx-auto mb-5 p-2">
          &quot;{title}&quot;
        </h1>
        <div className="flex-grow flex border border-backgroundBeigh rounded-xl overflow-hidden">
          <img
            src={photos.url}
            alt="Portada [IMG]"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
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
          <h2 className="flex items-center text-xl mt-1">
            <IconFindUs fill="#15423b" />
            <div className="pl-1 text-[#15423b]">{pdf.barrio}</div>
          </h2>
        </div>
        <div className="flex items-center justify-center overflow-hidden text-ellipsis text-2xl text-center p-2">
          {pdf.description}
        </div>
      </div>
      <div
        className="border-2 border-gold w-full h-full"
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
        className="border-2 border-gold w-full h-full"
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
      <div className="pt-8 flex flex-col h-full">
        <h1 className="text-5xl text-center my-4 px-2">Plano</h1>
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            padding: "0.5rem",
          }}
        >
          <img
            src={planoUrl}
            alt="Plano"
            style={{
              flexGrow: 1,
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </PDFPage>
  );
};

function RenderGridForChunk({ photos }: { photos: Photo[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        padding: "1rem 0",
        gap: "6px",
      }}
    >
      {photos.map((photo) => (
        <div
          key={photo.url}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={photo.url}
            alt="Foto [IMG]"
            style={{
              maxWidth: "100%", // Ensures image scales within container
              maxHeight: "100%", // Keeps it from overflowing
              objectFit: "contain",
              alignSelf: "center", // Fixes Firefox’s stretch behavior
              flexShrink: 0, // Prevents Chromium from shrinking images
            }}
          />
        </div>
      ))}
    </div>
  );
}

const PdfRoomPage = ({
  room,
  photos,
}: {
  room?: PropiedadHabitacion;
  photos?: Photo[];
}) => {
  const chunks = photos
    ? sortAndChunkPhotos(photos)
    : room
      ? sortAndChunkPhotos(room.photos)
      : null;
  const pages: JSX.Element[] = [];

  if (photos) {
    chunks?.forEach((photosArray, index) => {
      pages.push(
        <PDFPage key={`chunku-${index}`}>
          <RenderGridForChunk photos={photosArray} />
        </PDFPage>,
      );
    });
  } else if (room) {
    if (room.title || room.description) {
      pages.push(
        <PDFPage key={`room-info-${room.title}`}>
          {room.title && (
            <h1 className="text-4xl text-center pt-[1rem]">{room.title}</h1>
          )}
          {room.description && (
            <p className="text-center text-2xl mx-auto px-3">
              {room.description}
            </p>
          )}
          {chunks && chunks.length > 0 && (
            <RenderGridForChunk photos={chunks[0]} />
          )}
        </PDFPage>,
      );
    }

    if (chunks && chunks.length > 1) {
      chunks.slice(1).forEach((photosArray, index) => {
        pages.push(
          <PDFPage key={`chunk-${room?.title || 'photos'}-${index + 1}`}>
            <RenderGridForChunk photos={photosArray} />
          </PDFPage>,
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
  const pages = [
    <PdfPageOne
      key={pdf.title}
      title={pdf.quote}
      photos={pdf.photosCover[0]}
    />,
    <PdfPageTwo key="page-two" pdf={pdf} brochure={brochure} />,
  ];

  if (pdf.photoMain) {
    pages.push(...PdfRoomPage({ photos: pdf.photoMain }));
  }

  if (pdf.rooms) {
    pdf.rooms.forEach((room) => {
      pages.push(...PdfRoomPage({ room }));
    });
  }

  if (pdf.planoUrl && pdf.planoUrl.url) {
    pages.push(<PdfPlanoPage key="plano-page" planoUrl={pdf.planoUrl.url} />);
  }

  return <div id="pdf">{pages}</div>;
}
