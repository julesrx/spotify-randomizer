import useSWR from 'swr';
import type { SavedAlbum } from '@spotify/web-api-ts-sdk';

import { getUserSavedAlbums } from '~/spotify';
import { AlbumsContext } from '~/context';
import AlbumRandomizer from '~/components/AlbumRandomizer';
import cache from '~/utils/cache';

const loadAlbumLibrary = async (): Promise<SavedAlbum[]> => {
  // TODO: set short cache expiration
  return await cache.gset('user:albums', async () => {
    const limit = 50;
    let offset = 0;
    let res: SavedAlbum[] = [];

    for (;;) {
      const r = await getUserSavedAlbums(limit, offset);
      res = [...res, ...r.items];

      if (!r.next) break;
      offset += limit;
    }

    return res;
  });
};

export default function Index() {
  const { data, isLoading } = useSWR('albums', () => loadAlbumLibrary(), {
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data?.length) return <p>You don't have any saved albums</p>;

  return (
    <AlbumsContext.Provider value={data}>
      <AlbumRandomizer />
    </AlbumsContext.Provider>
  );
}
