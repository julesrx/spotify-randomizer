import useSWR from 'swr';
import type { SavedAlbum } from '@spotify/web-api-ts-sdk';

import { getUsersSavedAlbums } from '../spotify';

const loadAlbumLibrary = async () => {
  const limit = 50;
  let offset = 0;
  let res: SavedAlbum[] = [];

  for (;;) {
    const r = await getUsersSavedAlbums(limit, offset);
    if (!r.next) break;

    res = [...res, ...r.items];
    offset += limit;
  }

  return res;
};

export default function Albums() {
  const { data, isLoading } = useSWR('albums', () => loadAlbumLibrary(), {
    revalidateOnFocus: false
  });
  
  if (isLoading) return <p>Loading...</p>;

  const list = data!.map(a => ({
    id: a.album.id,
    name: a.album.name,
    cover: a.album.images[0].url
  }));

  return (
    <ul>
      {list.map(a => (
        <li key={a.id}>
          <img src={a.cover} className="w-8 h-8" />
          {a.name}
        </li>
      ))}
    </ul>
  );
}
