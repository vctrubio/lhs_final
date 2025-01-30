import React from 'react';
import { Photo } from '#/backend/types';
import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';

/*
    grid divided into 12 columns and 12 rows
    consist of photos that are portrait or landscape, up to 4 photos per page, maximise render view.

    L (Landscape Photo)
    P (Portrait Photo)

    1 PHOTOS = 1 SOLUTION => 
    2 PHOTOS = if P and L, ? divide it. 
        - 2 L = 2 row 1 cell 
        - 2 P = 2 cell 1 row 
    3 PHOTOS = if PPL or PPL | PPP or LLL 
        -- Grid divided into 3 columns and 3 rows. math is done respectively to cover the full area. 
*/

interface PdfGridProps {
    photosArray: Photo[];
}

export const PdfGrid: React.FC<PdfGridProps> = ({ photosArray }) => {

    // For rendering an individual photo
    function showImage(photo: Photo, key?: number) {
        return (
            <img
                key={key}
                src={photo.url}
                alt=""
                className="w-full max-w-a4 max-h-a4 border h-full object-cover rounded-xl"
            />
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full max-w-a4 max-h-a4 border h-full">
                {photosArray.map((photo, idx) => (
                    <div key={idx}>{showImage(photo, idx)}</div>
                ))}
            </div>
        </>
    )

    // 1 Photo
    function renderOnePhoto() {
        return (
            <div className="w-full max-w-a4 max-h-a4 border h-full">
                {showImage(photosArray[0], 0)}
            </div>
        );
    }

    // 2 Photos
    // should consist of 2 LL or 2 PP but not 1 L with 1 P
    function renderTwoPhotos() {
    }

    // 3 Photos
    function renderThreePhotos() {
        //  - PPP => each photo occupies one column across all 3 rows
        //  - LLL => each photo occupies one row across all 3 columns
        //  - LLP => 2 colums, first column 2 (2 rows of 2 landscape) span of 8, second column 1 portrait
        //  - PPL => 2 rows, first row 2 landscape , second row 1 portrait  
    }


};


export const PdfBig = ({ photosArray }: { photosArray: Photo[] }) => {

    const chunks = sortAndChunkPhotos(photosArray);
    // export function sortAndChunkPhotos(photos: Photo[]): Photo[][] {

    function mapChunks(chunks){
        return (
            chunks.map((chunk, idx) => (
                <div key={idx}>
                    <div>{`Chunk ${idx} (size: ${chunk.length})`}</div>
                    {chunk.map((photo, i) => {
                        return <span key={i}>{JSON.stringify(photo.grid, null, 2)}</span>;
                    })}
                </div>
            ))
        )
    }


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {mapChunks(chunks)}
        </div>
    )

    return (
        <>
            {chunks.map((c, i) => (<PdfGrid key={i} photosArray={c}/>))}
        </>
    )
}
