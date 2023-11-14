import type { Track } from '@spotify/web-api-ts-sdk';

const getCover = (track: Track) => {
  const images = track.album.images;
  const cover =
    images.find((i) => i.height === 64) ??
    images.sort((a, b) => a.height - b.height)[0];

  return cover.url;
};

const getArtists = (track: Track) => {
  return track.artists.map((a) => a.name).join(', ');
};

export default function TrackItem({ track }: { track: Track }) {
  const cover = getCover(track);
  const artists = getArtists(track);

  return (
    <div className="flex items-center space-x-2">
      <img src={cover} className="h-16 w-16" />

      <div>
        <div>{track.name}</div>
        <div className="text-sm">{artists}</div>
      </div>
    </div>
  );
}
