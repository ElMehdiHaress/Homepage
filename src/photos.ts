// Single source of truth for the photography gallery.
// Web-optimized images live in assets/photos/{thumb,full}; full-resolution
// originals stay in assets/ but are intentionally NOT imported, so they are
// never bundled into the deploy (keeps every shipped file well under limits).
const thumbModules = import.meta.glob('./assets/photos/thumb/*.jpg', {
  eager: true,
  import: 'default',
});
const fullModules = import.meta.glob('./assets/photos/full/*.jpg', {
  eager: true,
  import: 'default',
});

const fileName = (path: string) => path.split('/').pop() ?? path;

// Captions keyed by the 1-based frame number (gallery is sorted by filename).
const captions: Record<number, string> = {
  1: 'Fujifilm Quicksnap — Tokyo',
  2: 'Lumix G80 — Osaka',
  3: 'Lumix G80 — Osaka',
  4: 'Lumix G80 — Osaka',
  5: 'Lumix G80 — Nara',
  6: 'Lumix G80 — Onomichi',
  7: 'Lumix G80 — Onomichi',
  8: 'Lumix G80 — Ikuchijima',
  9: 'Pixel 8 Pro — Tokyo',
  10: 'Lumix G80 — Tokyo',
  11: 'Lumix G80 — Tokyo',
  12: 'Pixel 8 Pro — Tokyo',
  13: 'Lumix G80 — Tokyo',
  14: 'Lumix G80 — Tokyo',
  15: 'Pixel 8 Pro — Osaka',
  16: 'Pixel 8 Pro — Kyoto',
  17: 'Pixel 8 Pro — Osaka',
  18: 'Pixel 8 Pro — Onomichi',
  19: 'Pixel 8 Pro — Onomichi',
  20: 'Pixel 8 Pro — Ikuchijima',
  21: 'Pixel 8 Pro — Tokyo',
  22: 'Lumix G80 — Tokyo',
  23: 'Pixel 8 Pro — Tokyo',
};

export interface Photo {
  thumb: string;
  full: string;
  caption: string;
}

export const photos: Photo[] = Object.entries(thumbModules)
  .sort(([a], [b]) => fileName(a).localeCompare(fileName(b)))
  .map(([path, thumb], i) => {
    const name = fileName(path);
    const fullEntry = Object.entries(fullModules).find(
      ([fullPath]) => fileName(fullPath) === name
    );
    return {
      thumb: thumb as string,
      full: (fullEntry?.[1] as string) ?? (thumb as string),
      caption: captions[i + 1] ?? '',
    };
  });

export const photoCount = photos.length;
