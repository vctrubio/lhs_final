import React from 'react';
import { Photo } from '#/backend/types';
import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';

const PdfGrid = ({ photosArray }: { photosArray: Photo[] }) => {

    /*
    grid divided into 12 columns
    consist of photos that are portrait or landscape, up to 4 photos per page, maximise render view.

    L (Landscape Photo)
    P (Portrait Photo)

    1 PHOTOS = 1 SOLUTION => 
    2 PHOTOS = if P and L, ? divide it. 
        - 2 L = 2 row 1 cell 
        - 2 P = 2 cell 1 row 
    3 PHOTOS = if PPL or PPL | PPP or LLL 
        -- Grid divided into 3 oolumns and 3 rows. math is done respectively to cover the full area. 
    4 PHOTOS = LLLL or PPPP | LLPP or PPLL | ≠NOT≠ LLLP or PPPL
        -- Grid divede into 2 rows 2 columns, witdh and height depend on L or P
    */

}


export const PdfBig = ({ photosArray }: { photosArray: Photo[] }) => {

    const chunks = sortAndChunkPhotos(photosArray);

    function mapChunks(chunks){
        return (
            chunks.map((chunk, idx) => (
                <div key={idx}>
                    <div>{`Chunk ${idx} (size: ${chunk.length})`}</div>
                    {chunk.map((photo, i) => {
                        const orientation = photo.portrait ? 'P' : 'L';
                        return <span key={i}>{orientation}</span>;
                    })}
                </div>
            ))
        )
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {mapChunks(chunks)}
        </div>
    );
}
