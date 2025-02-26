import { Photo } from "#/backend/types";

export function sortAndChunkPhotos(photos: Photo[]): Photo[][] {
    const result: Photo[][] = [];
    const size = 2;
    let i = 0;
    while (i < photos.length) {
        const slice = photos.slice(i, i + size);
        result.push(slice);
        i += size;
    }

    return result;
}
