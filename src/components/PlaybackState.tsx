import useSWR from 'swr';
import type { Track } from '@spotify/web-api-ts-sdk';

import { getPlaybackState } from '../spotify';

export default function PlaybackState() {
  const { data, error, isLoading } = useSWR('playback-state', () => getPlaybackState(), {
    refreshInterval: 5000
  });

  if (error || isLoading || !data?.is_playing) return <p>Not playing anything.</p>;

  // TODO: handle tack or albulm

  const track = data.item as Track;

  const artist = track.artists[0].name;

  // TODO: Intl.DurationFormat
  const progress = Math.round((data.progress_ms * 100) / data.item.duration_ms);

  const cover = track.album.images[0].url;

  return (
    <div>
      <img src={cover} />
      <p>
        Currently playing <b>{track.name}</b> by {artist} on <i>{data.device.name}</i> ({progress}
        %)
      </p>
    </div>
  );
}
