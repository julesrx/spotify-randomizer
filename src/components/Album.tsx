import { useState, useEffect, memo } from 'react';
import useSWR from 'swr';
import { createDurationFormatter, createTimeAgoFormatter } from '@julesrx/utils';
import { ArrowPathIcon, QueueListIcon } from '@heroicons/react/24/solid';
import type { SavedAlbum, Track } from '@spotify/web-api-ts-sdk';

import { addItemToPlaybackQueue, getAlbumTracks, getPaginated } from '~/spotify';
import { cache, locale } from '~/utils';
import { useDeviceContext } from '~/context';
import ExternalLink from './ExternalLink';

const Point = memo(() => <span>&bull;</span>);

const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: 'medium',
  timeStyle: 'short',
});
const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });

const timeAgoFormatter = createTimeAgoFormatter(locale);
const durationFormatter = createDurationFormatter(locale, {
  unitDisplay: 'narrow',
  listStyle: 'narrow',
});

const getAlbumDuration = (tracks: Track[]) => {
  const ms = tracks.map((t) => t.duration_ms).reduce((a, b) => a + b, 0);
  return durationFormatter.format(ms);
};

interface Props {
  album: SavedAlbum;
  onRandomize: () => void;
}

export default function Album({ album, onRandomize }: Props) {
  const { hasDevice, getDevice } = useDeviceContext();
  const device = getDevice();

  const [canAddToQueue, setCanAddToQueue] = useState(hasDevice);
  useEffect(() => setCanAddToQueue(hasDevice), [hasDevice]);

  const id = album.album.id;
  const url = album.album.external_urls.spotify;
  const name = album.album.name;
  const cover = album.album.images[0].url;
  const artist = album.album.artists[0];
  const totalTracks = album.album.total_tracks;

  const releaseDate = new Date(album.album.release_date);
  const releaseYear = releaseDate.getFullYear();
  const releaseDateFormatted = dateFormatter.format(releaseDate);

  const addedAt = new Date(album.added_at);
  const addedAgo = timeAgoFormatter.format(addedAt);
  const addedAtFormatted = dateTimeFormatter.format(addedAt);

  const { data: tracks, isLoading } = useSWR(`album:${id}:tracks`, () =>
    cache.gset(`album:${id}:tracks`, () => getPaginated((l, o) => getAlbumTracks(id, l, o)))
  );

  const addToQueue = async () => {
    if (!tracks) return;
    if (!hasDevice) return;

    setCanAddToQueue(false);

    for (const track of tracks) {
      await addItemToPlaybackQueue(track.uri, device?.id);
    }

    setCanAddToQueue(true);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-center md:space-x-2 lg:space-x-4 space-y-2 md:space-y-0 px-2 md:px-0">
      <ExternalLink to={url}>
        <img src={cover} alt={name} className="w-80 h-80 md:w-60 md:h-60 lg:w-80 lg:h-80" />
      </ExternalLink>

      <div className="md:w-80 lg:w-[32rem] flex flex-col justify-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-center md:text-left">
            <ExternalLink to={url}>{name}</ExternalLink>
          </h2>

          <div className="flex space-x-1 justify-center md:justify-start">
            <h3 className="font-bold">
              <ExternalLink to={artist.external_urls.spotify}>{artist.name}</ExternalLink>
            </h3>
            <Point />
            <div title={releaseDateFormatted}>{releaseYear}</div>
          </div>

          <div className="flex space-x-1 opacity-70 text-sm justify-center md:justify-start">
            <span>{totalTracks} songs</span>

            {!isLoading && tracks && (
              <>
                <Point />
                <span>{getAlbumDuration(tracks)}</span>
              </>
            )}
          </div>

          <div className="flex space-x-1 opacity-70 text-sm justify-center md:justify-start">
            <span title={addedAtFormatted}>Added {addedAgo}</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0 justify-center md:justify-start">
          <button
            type="button"
            onClick={() => addToQueue()}
            title={
              hasDevice
                ? `Add to queue (${device!.name})`
                : 'A device needs to be accessible to add to queue'
            }
            disabled={!canAddToQueue}
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
