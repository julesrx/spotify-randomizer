import useSWR from 'swr';
import ArrowPathIcon from '~icons/heroicons/arrow-path-solid';

import { getPaginated, getUserSavedAlbums } from '~/utils/spotify';
import { AlbumsContext } from '~/context';
import AlbumRandomizer from '~/components/AlbumRandomizer';
import Loading from '~/components/Loading';
import { cache } from '~/utils';

export default function Home() {
  const { data, isLoading } = useSWR(
    'albums',
    () => cache.gset('user:albums', async () => await getPaginated(getUserSavedAlbums)),
    { revalidateOnFocus: false }
  );

  if (isLoading)
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
