import { useContext, useState } from "react";
import type { Track } from "@spotify/web-api-ts-sdk";

import { AlbumsContext } from "../context";
import { getRandomElementInArray } from "../utils";
import cache from "../utils/cache";
import { addItemToPlaybackQueue, getAlbumTracks } from "../spotify";

interface Album {
  id: string;
  uri: string;
  name: string;
  cover: string;
}

const getFullAlbumTracks = async (id: string) => {
  return await cache.gset(`album:tracks:${id}`, async () => {
    const limit = 50;
    let offset = 0;
    let res: Track[] = [];

    for (;;) {
      const r = await getAlbumTracks(id, limit, offset);
      res = [...res, ...r.items];

      if (!r.next) break;
      offset += limit;
    }

    return res;
  });
};

function AlbumToolbar({ album }: { album: Album }) {
  const addToQueue = async () => {
    const tracks = await getFullAlbumTracks(album.id);
    for (const a of tracks) {
      await addItemToPlaybackQueue(a.uri);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => addToQueue()}>
        add to queue
      </button>
    </div>
  );
}

function AlbumItem({
  album,
  isSelected,
}: {
  album: Album;
  isSelected: boolean;
}) {
  return (
    <div>
      <img
        src={album.cover}
        alt={album.name}
        className={isSelected ? "w-16 h-16" : "w-8 h-8"}
      />

      {isSelected && <AlbumToolbar album={album} />}
    </div>
  );
}

export default function AlbumsList() {
  const albums = useContext(AlbumsContext).map((a) => ({
    id: a.album.id,
    uri: a.album.uri,
    name: a.album.name,
    cover: a.album.images[0].url,
  }));

  const [random, setRandom] = useState(getRandomElementInArray(albums));

  return (
    <>
      <button onClick={() => setRandom(getRandomElementInArray(albums))}>
        Randomize
      </button>

      <div className="relative">
        {albums.map((a) => {
          const isSelected = random.id === a.id;
          return <AlbumItem key={a.id} album={a} isSelected={isSelected} />;
        })}
      </div>
    </>
  );
}
