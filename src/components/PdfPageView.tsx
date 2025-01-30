import React from 'react';
import { Photo } from '#/backend/types';
import { sortAndChunkPhotos } from '@/components/PdfPageAlgorithims';

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

/**
 * Layout rules:
 *
 * 1 PHOTO => single layout
 *
 * 2 PHOTOS =>
 *   - 2L => 2 rows, 1 col
 *   - 2P => 1 row, 2 cols
 *   - L + P => 1 row, 2 cols
 *
 * 3 PHOTOS => (explicit combos)
 *   - PPP => grid(3x3), each photo occupies one column across all 3 rows
 *   - LLL => grid(3x3), each photo occupies all 3 columns in one distinct row
 *   - PPL or LPP => grid(3x3), treat them like PPP (each photo occupies one column across all 3 rows)
 *   - otherwise => fallback
 *
 * 4 PHOTOS => must be one of
 *   - LLLL, PPPP, LLPP, PPLL => 2 rows x 2 cols
 *   - else => fallback
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

  // 1 Photo
  function renderOnePhoto() {
    return (
      <div className="w-full max-w-a4 max-h-a4 border h-full">
        {showImage(photosArray[0], 0)}
      </div>
    );
  }

  // 2 Photos
  function renderTwoPhotos() {
    const [p1, p2] = photosArray;
    const bothPortrait = p1.portrait && p2.portrait;
    const bothLandscape = !p1.portrait && !p2.portrait;

    if (bothPortrait) {
      // 2P => side by side
      return (
        <div className="grid grid-cols-2 gap-2 w-full max-w-a4 max-h-a4 border h-full">
          {showImage(p1, 0)}
          {showImage(p2, 1)}
        </div>
      );
    } else if (bothLandscape) {
      // 2L => stacked
      return (
        <div className="grid grid-rows-2 gap-2 w-full max-w-a4 max-h-a4 border h-full">
          {showImage(p1, 0)}
          {showImage(p2, 1)}
        </div>
      );
    } else {
      // L+P => side by side
      return (
        <div className="grid grid-cols-2 gap-2 w-full max-w-a4 max-h-a4 border h-full">
          {showImage(p1, 0)}
          {showImage(p2, 1)}
        </div>
      );
    }
  }

  // 3 Photos
  function renderThreePhotos() {
    // orientation pattern: e.g. PPP, LLL, PPL, etc.
    const pattern = photosArray.map((p) => (p.portrait ? 'P' : 'L')).join('');
    // Sort so that 'LPP' becomes 'PPL' for easier matching
    const sortedPattern = pattern.split('').sort().join(''); // e.g. LPP => PPL

    // We'll place them in a 3x3 grid:
    //  - PPP => each photo occupies one column across all 3 rows
    //  - LLL => each photo occupies one row across all 3 columns
    //  - PPL => same as PPP
    //  - otherwise => fallback

    if (sortedPattern === 'LLL') {
      // each photo in a distinct row, col-span-3
      return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-a4 max-h-a4 border h-full">
          {/* photo1 in row1 col-span-3 */}
          <div className="col-span-3 row-start-1 row-span-1">
            {showImage(photosArray[0], 0)}
          </div>
          <div className="col-span-3 row-start-2 row-span-1">
            {showImage(photosArray[1], 1)}
          </div>
          <div className="col-span-3 row-start-3 row-span-1">
            {showImage(photosArray[2], 2)}
          </div>
        </div>
      );
    } else if (sortedPattern === 'PPP' || sortedPattern === 'PPL') {
      // each photo in a distinct column, row-span-3
      return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-a4 max-h-a4 border h-full">
          <div className="row-span-3 col-span-1">{showImage(photosArray[0], 0)}</div>
          <div className="row-span-3 col-span-1">{showImage(photosArray[1], 1)}</div>
          <div className="row-span-3 col-span-1">{showImage(photosArray[2], 2)}</div>
        </div>
      );
    } else {
      // fallback message
      return (
        <div className="w-full max-w-a4 max-h-a4 border h-full flex items-center justify-center bg-gray-100 text-gray-500">
          3-photo combo ({pattern}) not supported.
        </div>
      );
    }
  }

  // 4 Photos
  // Allowed combos: LLLL, PPPP, LLPP, PPLL
  function renderFourPhotos() {
    // orientation pattern: e.g. PPPP, LLLL, LLPP, etc.
    const pattern = photosArray.map((p) => (p.portrait ? 'P' : 'L')).join('');
    // Sort them to handle any order of LLPP or PPLL
    const sortedPattern = pattern.split('').sort().join(''); // e.g. LPLP => LLPP

    // Check if in the valid sets
    const validCombos = ['LLLL', 'PPPP', 'LLPP'];
    if (validCombos.includes(sortedPattern)) {
      // 2x2
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full max-w-a4 max-h-a4 border h-full">
          {photosArray.map((photo, idx) => (
            <div key={idx}>{showImage(photo, idx)}</div>
          ))}
        </div>
      );
    } else {
      // fallback
      return (
        <div className="w-full max-w-a4 max-h-a4 border h-full flex items-center justify-center bg-gray-100 text-gray-500">
          4-photo combo ({pattern}) not supported.
        </div>
      );
    }
  }

  // Switch over number of photos
  const count = photosArray.length;
  switch (count) {
    case 1:
      return renderOnePhoto();
    case 2:
      return renderTwoPhotos();
    case 3:
      return renderThreePhotos();
    case 4:
      return renderFourPhotos();
    default:
      return (
        <div className="w-full max-w-a4 max-h-a4 border h-full flex items-center justify-center bg-gray-100 text-gray-500">
          Only 1–4 photos supported at this time.
        </div>
      );
  }
};


export const PdfBig = ({ photosArray }: { photosArray: Photo[] }) => {

    const chunks = sortAndChunkPhotos(photosArray);
// export function sortAndChunkPhotos(photos: Photo[]): Photo[][] {

    return (
        <>
            {chunks.map((c, i) => (<PdfGrid key={i} photosArray={c}/>))}
        </>
    )

    function mapChunks(chunks){
        return (
            chunks.map((chunk, idx) => (
                <div key={idx}>
                    <div>{`Chunk ${idx} (size: ${chunk.length})`}</div>
                    {chunk.map((photo, i) => {
                        const orientation = photo.portrait ? 'P' : 'L';
                        return <span key={i}>{JSON.stringify(photo, null, 4)}</span>;
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
}
