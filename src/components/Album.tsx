import type { SavedAlbum, Track } from '@spotify/web-api-ts-sdk';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { createDurationFormatter } from '@julesrx/utils';

import { getAlbumTracks } from '~/spotify';
import cache from '~/utils/cache';

const getFullAlbumTracks = async (id: string) => {
  return await cache.gset(`album:${id}:tracks`, async () => {
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

function Point() {
  return <span>&bull;</span>;
}

const ducrationFormatter = createDurationFormatter(undefined, 'short', 'narrow');
const getAlbumDuration = (tracks: Track[]) => {
  // TODO: remove milliseconds
  const ms = tracks.map((t) => t.duration_ms).reduce((a, b) => a + b, 0);
  return ducrationFormatter.format(ms);
};

export default function Album({ album }: { album: SavedAlbum }) {
  const id = album.album.id;
  const url = album.album.external_urls.spotify;
  const name = album.album.name;
  const cover = album.album.images[0].url;
  const artist = album.album.artists[0].name;
  const year = new Date(album.album.release_date).getFullYear();
  const totalTracks = album.album.total_tracks;

  const { data: tracks, isLoading } = useSWR(`album:${id}:tracks`, () => getFullAlbumTracks(id));

  return (
    <div className="flex space-x-4">
      <img src={cover} alt={name} className={'w-80 h-80'} />

      <div className="w-[32rem]">
        <h2 className="text-3xl font-bold">
          <Link to={url}>{name}</Link>
        </h2>

        <div className="flex space-x-1">
          <h3 className="font-bold">{artist}</h3>
          <Point />
          <div>{year}</div>
        </div>

        <div className="flex space-x-1 opacity-70 text-sm">
          <span>{totalTracks} songs</span>
          <Point />
          {!isLoading && tracks && <span>{getAlbumDuration(tracks)}</span>}
        </div>
      </div>
    </div>
  );
}
