import React from 'react';
import { Photo } from '#/backend/types';
import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';

export const PdfBig = ({ photosArray }: { photosArray: Photo[] }) => {

    const chunks = sortAndChunkPhotos(photosArray);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {chunks.map((chunk, idx) => (
                <div key={idx}>
                    <div>{`Chunk ${idx} (size: ${chunk.length})`}</div>
                    {chunk.map((photo, i) => {
                        const orientation = photo.portrait ? 'P' : 'L';
                        return <span key={i}>{orientation}</span>;
                    })}
                </div>
            ))}
        </div>
    );
}