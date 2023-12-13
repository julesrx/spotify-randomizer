import useSWR from 'swr';
import type { SavedAlbum } from '@spotify/web-api-ts-sdk';
import ArrowPathIcon from '~icons/heroicons/arrow-path-solid';

import { getPaginated, getUserSavedAlbums } from '~/utils/spotify';
import { AlbumsContext } from '~/context';
import AlbumRandomizer from '~/components/AlbumRandomizer';
import Loading from '~/components/Loading';
import { cache } from '~/utils';

const loadAlbumLibrary = async (): Promise<SavedAlbum[]> => {
  return await cache.gset('user:albums', async () => await getPaginated(getUserSavedAlbums));
};

export default function Home() {
  const { data, isLoading } = useSWR('albums', () => loadAlbumLibrary(), {
    revalidateOnFocus: false,
  });

  if (isLoading && !data?.length)
    return (
      <Loading>
        Loading library...
        <div className="flex justify-center mt-2">
          <ArrowPathIcon className="h-6 w-6 animate-spin" />
        </div>
      </Loading>
    );

  if (!data?.length) return <Loading>You don't have any saved albums</Loading>;

  return (
    <AlbumsContext.Provider value={data}>
      <AlbumRandomizer />
    </AlbumsContext.Provider>
  );
}
