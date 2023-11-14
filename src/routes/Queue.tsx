import useSWR from 'swr';
import type { Track } from '@spotify/web-api-ts-sdk';

import { getUserQueue } from '~/spotify';

function QueueItem({
  index,
  track,
  isCurrent,
}: {
  index: number;
  track: Track;
  isCurrent?: boolean;
}) {
  const text = `${index}: ${track.name}`;
  return <li className={isCurrent ? 'font-bold' : ''}>{text}</li>;
}

export default function Queue() {
  const { data, isLoading } = useSWR('queue', () => getUserQueue(), {
    refreshInterval: 30000,
  });

  if (isLoading) return <p>Loading...</p>;

  const current = data!.currently_playing as Track | null;
  const queue = data!.queue as Track[];

  return (
    <div>
      <ul>
        {current && (
          <QueueItem index={1} track={current} key={current.id} isCurrent />
        )}
        {queue.map((t, i) => (
          <QueueItem index={i + 2} track={t} key={t.id} />
        ))}
      </ul>
    </div>
  );
}
