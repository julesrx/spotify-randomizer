import { useState } from 'react';
import useSWR from 'swr';
import TrackItem from '~/components/TrackItem';
import { getUserTopItems } from '~/spotify';

export default function Tops() {
  const [limit] = useState(20);
  const { data, isLoading } = useSWR('top-tracks', () =>
    getUserTopItems('tracks', 'long_term', limit)
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      {data!.items.map((t, i) => (
        <div key={t.id} className="flex items-center space-x-4">
          <div className="w-4 text-end">{i + 1}</div>
          <TrackItem track={t} />{' '}
        </div>
      ))}
    </div>
  );
}
