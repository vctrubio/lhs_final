import { Photo } from "#/backend/types";

export function sortAndChunkPhotos(photos: Photo[]): Photo[][] {
    // 1) Mark each photo as portrait or landscape
    photos.forEach((photo) => {
        photo.portrait = photo.width < photo.height;
    });

    // 2) Separate into two arrays
    const landscapeArr: Photo[] = [];
    const portraitArr: Photo[] = [];
    for (const photo of photos) {
        if (photo.portrait) {
            portraitArr.push(photo);
        } else {
            landscapeArr.push(photo);
        }
    }

    // 3) Chunk the landscapes (L) in groups of up to 4
    const landscapeChunks = chunkLandscapes(landscapeArr);

    // 4) Chunk the portraits (P) allowing chunk sizes of 1,2,4
    //    (Never 3 alone => if we have 3 leftover, we do [2,1].)
    const portraitChunks = chunkPortraits(portraitArr);

    // 5) Combine them: all L-chunks first, then all P-chunks
    //    (If you prefer P first, swap them.)
    const finalChunks = [...landscapeChunks, ...portraitChunks];

    return finalChunks;
}

/** 
 * Takes an array of landscape photos and returns Photo[][] 
 * in groups of up to 4. 
 */
function chunkLandscapes(landscapes: Photo[]): Photo[][] {
    const result: Photo[][] = [];
    let i = 0;
    while (i < landscapes.length) {
        // Slice up to 4
        const slice = landscapes.slice(i, i + 4);
        result.push(slice);
        i += slice.length;
    }
    return result;
}

/**
 * Takes an array of portrait photos and returns Photo[][],
 * ensuring chunk sizes are in {1,2,4}, and never exactly 3 alone.
 * E.g. if you have 3 leftover, it becomes [2,1].
 */
function chunkPortraits(portraits: Photo[]): Photo[][] {
    const result: Photo[][] = [];
    let i = 0;
    while (i < portraits.length) {
        const remaining = portraits.length - i;

        if (remaining >= 4) {
            // Ideally we take 4 if we can
            result.push(portraits.slice(i, i + 4));
            i += 4;
        } else if (remaining === 3) {
            // 3 leftover => split as 2, then 1
            result.push(portraits.slice(i, i + 2)); // 2
            i += 2;
            result.push(portraits.slice(i, i + 1)); // 1
            i += 1;
        } else {
            // remaining is 1 or 2 => push them directly
            result.push(portraits.slice(i, i + remaining));
            i += remaining;
        }
    }
    return result;
}

