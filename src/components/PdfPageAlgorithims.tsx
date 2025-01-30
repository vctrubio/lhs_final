import { Photo } from "#/backend/types";

export function sortAndChunkPhotos(photos: Photo[]): Photo[][] {
  const result: Photo[][] = [];
  let i = 0;
  while (i < photos.length) {
    const slice = photos.slice(i, i + 3);
    result.push(slice);
    i += 4;
  }

  return result;
}
