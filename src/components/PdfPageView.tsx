import React from 'react';
import { Photo, PhotoGridLayout } from '#/backend/types';
import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';

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

function getSpans(grid: PhotoGridLayout, totalPhotos: number): { colSpan: number; rowSpan: number } {
    if (totalPhotos === 1) {
        return { colSpan: 6, rowSpan: 6 }; // Take full space if only one photo 
    }
    else if (totalPhotos === 2) {
        return { colSpan: 3, rowSpan: 3 }; // Take half space if only two photos
    }

    const spanMapping: Record<PhotoGridLayout, { colSpan: number; rowSpan: number }> = {
        [PhotoGridLayout.One]: { colSpan: 3, rowSpan: 3 },
        [PhotoGridLayout.TwoByOne]: { colSpan: 6, rowSpan: 2 },
        [PhotoGridLayout.OneByTwo]: { colSpan: 2, rowSpan: 6 },
        [PhotoGridLayout.TwoByThree]: { colSpan: 4, rowSpan: 3 },
        [PhotoGridLayout.ThreeByTwo]: { colSpan: 6, rowSpan: 3 },
    };

  return spanMapping[grid] || { colSpan: 3, rowSpan: 3 };
}

function RenderGridForChunk({ photos }: { photos: Photo[] }) {
  const predefinedPositions = [
    { id: 1, colSpan: 4, rowSpan: 3, gridColumn: "1 / span 4", gridRow: "1 / span 3" },
    { id: 2, colSpan: 4, rowSpan: 3, gridColumn: "1 / span 4", gridRow: "4 / span 3" },
    { id: 3, colSpan: 2, rowSpan: 6, gridColumn: "5 / span 2", gridRow: "1 / span 6" },
  ];


    //it is not m-w-a4, it is max avaiuable space from teh parent
  return (
    <div className="max-h-a4 max-w-a4 grid grid-cols-6 grid-rows-6">
      {photos.map((photo, index) => {
        const position = predefinedPositions[index] || getSpans(photo.grid, photos.length);
        return (
          <div
            key={index}
            style={{
                gridColumn: position.gridColumn || `span ${position.colSpan}`,
                gridRow: position.gridRow || `span ${position.rowSpan}`,
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

function RenderGridExample() {
  const photos = [
    { id: 1, colSpan: 4, rowSpan: 3, label: "4x3", gridColumn: "1 / span 4", gridRow: "1 / span 3" },
    { id: 2, colSpan: 4, rowSpan: 3, label: "4x3", gridColumn: "1 / span 4", gridRow: "4 / span 3" },
    { id: 3, colSpan: 2, rowSpan: 6, label: "2x6", gridColumn: "5 / span 2", gridRow: "1 / span 6" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
        gap: "8px",
        width: "100%",
        height: "100vh",
        border: "2px solid red",
      }}
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          style={{
            gridColumn: photo.gridColumn,
            gridRow: photo.gridRow,
            border: "2px solid green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f3f3",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {photo.label}
        </div>
      ))}
    </div>
  );
}

export const PdfBig = ({ photosArray }: { photosArray: Photo[] }) => {
  const chunks = sortAndChunkPhotos(photosArray);

  return (
    <>
      {chunks.map((c, i) => (
          <RenderGridForChunk key={i} photos={c} />
      ))}
    </>
  );
};
