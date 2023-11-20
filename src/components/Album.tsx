import type { SavedAlbum, Track } from '@spotify/web-api-ts-sdk';
import useSWR from 'swr';
import { createDurationFormatter, createTimeAgoFormatter } from '@julesrx/utils';
import { useState, useEffect } from 'react';
import { ArrowPathIcon, QueueListIcon } from '@heroicons/react/24/solid';

import { addItemToPlaybackQueue, getAlbumTracks } from '~/spotify';
import cache from '~/utils/cache';
import { locale } from '~/utils';
import { useDeviceContext } from '~/context';
import ExternalLink from './ExternalLink';

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

const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });
const timeAgoFormatter = createTimeAgoFormatter(locale);
const ducrationFormatter = createDurationFormatter(locale, {
  unitDisplay: 'narrow',
  listStyle: 'narrow',
});
const getAlbumDuration = (tracks: Track[]) => {
  const ms = tracks.map((t) => t.duration_ms).reduce((a, b) => a + b, 0);
  return ducrationFormatter.format(ms);
};

export default function Album({
  album,
  onRandomize,
}: {
  album: SavedAlbum;
  onRandomize: () => void;
}) {
  const { hasActiveDevice } = useDeviceContext();

  const [activeAddToQueue, setActiveAddToQueue] = useState(hasActiveDevice);
  useEffect(() => setActiveAddToQueue(hasActiveDevice), [hasActiveDevice]);

  const id = album.album.id;
  const url = album.album.external_urls.spotify;
  const name = album.album.name;
  const cover = album.album.images[0].url;
  const artist = album.album.artists[0];
  const year = new Date(album.album.release_date).getFullYear();
  const totalTracks = album.album.total_tracks;

  const addedAt = new Date(album.added_at);
  const addedAgo = timeAgoFormatter.format(addedAt);
  const addedAtFormatted = dateFormatter.format(addedAt);

  const { data: tracks, isLoading } = useSWR(`album:${id}:tracks`, () => getFullAlbumTracks(id));

  const addToQueue = async () => {
    if (!tracks) return;
    if (!hasActiveDevice) return;

    setActiveAddToQueue(false);

    for (const track of tracks) {
      await addItemToPlaybackQueue(track.uri);
    }

    setActiveAddToQueue(true);
  };

  return (
    <div className="flex space-x-4 md:ml-16">
      <ExternalLink to={url}>
        <img src={cover} alt={name} className={'w-80 h-80'} />
      </ExternalLink>

      <div className="w-[32rem] flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            <ExternalLink to={url}>{name}</ExternalLink>
          </h2>

          <div className="flex space-x-1">
            <h3 className="font-bold">
              <ExternalLink to={artist.external_urls.spotify}>{artist.name}</ExternalLink>
            </h3>
            <Point />
            <div>{year}</div>
          </div>

          <div className="flex space-x-1 opacity-70 text-sm">
            <span>{totalTracks} songs</span>

            {!isLoading && tracks && (
              <>
                <Point />
                <span>{getAlbumDuration(tracks)}</span>
              </>
            )}
          </div>

          <div className="flex space-x-1 opacity-70 text-sm">
            <span title={addedAtFormatted}>Added {addedAgo}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => addToQueue()}
            title={hasActiveDevice ? 'Add to queue' : 'A device needs to be active to add to queue'}
            disabled={!activeAddToQueue}
            className="disabled:opacity-50"
          >
            <QueueListIcon className="h-6 w-6" />
          </button>

          <button type="button" onClick={onRandomize} title="Randomize">
            <ArrowPathIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
