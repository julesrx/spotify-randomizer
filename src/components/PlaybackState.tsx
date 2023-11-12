import useSWR from 'swr';
import type { Track } from '@spotify/web-api-ts-sdk';

import { getPlaybackState } from '../spotify';

export default function PlaybackState() {
  const { data, error, isLoading } = useSWR('playback-state', () => getPlaybackState(), {
    refreshInterval: 5000
  });

  if (error || isLoading || !data?.is_playing) return <></>;

  const track = data.item as Track;
  const artist = track.artists[0].name;
  const cover = track.album.images.sort((a, b) => a.height - b.height)[0].url;

  // TODO: Intl.DurationFormat
  // const progress = Math.round((data.progress_ms * 100) / data.item.duration_ms);

  return (
    <div className="fixed bottom-0 w-full flex justify-between items-center bg-spotify-black text-white p-2">
      <div className="flex space-x-2">
        <img src={cover} className="w-16 h-16" />
        <div className="flex flex-col justify-center">
          <span>
            <b>{track.name}</b>
          </span>
          <span className="text-sm">{artist}</span>
        </div>
      </div>

      <div className="text-spotify-green">Listening on {data.device.name}</div>
    </div>
  );
}
