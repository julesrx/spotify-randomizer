import useSWR from 'swr';
import type { SavedAlbum } from '@spotify/web-api-ts-sdk';

import AlbumsList from 'components/AlbumsList';
import { getUserSavedAlbums } from '~/spotify';
import { AlbumsContext } from '~/context';
import { shuffle } from '~/utils';

const loadAlbumLibrary = async (): Promise<SavedAlbum[]> => {
  const r = await getUserSavedAlbums();
  return r.items;
};

export default function Albums() {
  const { data, isLoading } = useSWR('albums', () => loadAlbumLibrary(), {
    revalidateOnFocus: false,
    // revalidateOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data?.length) return <p>You don't have any saved albums</p>;

  return (
    <AlbumsContext.Provider value={shuffle(data)}>
      <AlbumsList />
    </AlbumsContext.Provider>
  );
}
