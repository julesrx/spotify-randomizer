import useSWR from "swr";
import type { SavedAlbum } from "@spotify/web-api-ts-sdk";

import { getUsersSavedAlbums } from "~/spotify";
import AlbumsList from "components/AlbumsList";
import { AlbumsContext } from "~/context";
import { shuffle } from "~/utils";

// const cacheKey = "albums-cache";

const loadAlbumLibrary = async (): Promise<SavedAlbum[]> => {
  const r = await getUsersSavedAlbums();
  return r.items;

  // const cache = localStorage.getItem(cacheKey);
  // if (cache) return JSON.parse(cache);

  // const limit = 50;
  // let offset = 0;
  // let res: SavedAlbum[] = [];

  // for (;;) {
  //   const r = await getUsersSavedAlbums(limit, offset);
  //   if (!r.next) break;

  //   res = [...res, ...r.items];
  //   offset += limit;
  // }

  // localStorage.setItem(cacheKey, JSON.stringify(res));

  // return res;
};

export default function Albums() {
  const { data, isLoading } = useSWR("albums", () => loadAlbumLibrary(), {
    revalidateOnFocus: false,
    // revalidateOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data?.length) return <p>You don't have any saved albums</p>;

  return (
    <>
      <AlbumsContext.Provider value={shuffle(data)}>
        <AlbumsList />
      </AlbumsContext.Provider>
    </>
  );
}
