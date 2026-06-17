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

export interface Photo {
  thumb: string;
  full: string;
}

export const photos: Photo[] = Object.entries(thumbModules)
  .sort(([a], [b]) => fileName(a).localeCompare(fileName(b)))
  .map(([path, thumb]) => {
    const name = fileName(path);
    const fullEntry = Object.entries(fullModules).find(
      ([fullPath]) => fileName(fullPath) === name
    );
    return {
      thumb: thumb as string,
      full: (fullEntry?.[1] as string) ?? (thumb as string),
    };
  });

export const photoCount = photos.length;
