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

export function RenderGridForChunk({ photos }: { photos: Photo[] }) {
  const predefinedPositions = [
    { id: 1, colSpan: 4, rowSpan: 3, gridColumn: "1 / span 4", gridRow: "1 / span 3" },
    { id: 2, colSpan: 4, rowSpan: 3, gridColumn: "1 / span 4", gridRow: "4 / span 3" },
    { id: 3, colSpan: 2, rowSpan: 6, gridColumn: "5 / span 2", gridRow: "1 / span 6" },
  ];

  return (
    <div className="w-full h-full border border-red-500 grid grid-cols-6 grid-rows-6">
      {photos.map((photo, index) => {
        const position = predefinedPositions[index];
        return (
          <div
            key={index}
            style={{
                gridColumn: position.gridColumn,
                gridRow: position.gridRow,
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
