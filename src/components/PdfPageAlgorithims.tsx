import { Photo } from "#/backend/types";

export function sortAndChunkPhotos(photos: Photo[]): Photo[][] {
  // Step 1: Mark orientation

  // Step 2: Chunk into subarrays of length <= 4
  const result: Photo[][] = [];
  let i = 0;
  while (i < photos.length) {
    const slice = photos.slice(i, i + 4);
    result.push(slice);
    i += 4;
  }

  return result;
}
