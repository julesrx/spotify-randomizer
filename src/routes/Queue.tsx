import useSWR from 'swr';
import type { Track } from '@spotify/web-api-ts-sdk';

import { getUsersQueue } from '~/spotify';

function QueueItem({
  index,
  track,
  isCurrent
}: {
  index: number;
  track: Track;
  isCurrent?: boolean;
}) {
  return <li className={isCurrent ? 'font-bold' : ''}>{`${index}: ${track.name}`}</li>;
}

export default function Queue() {
  const { data, isLoading } = useSWR('queue', () => getUsersQueue(), { refreshInterval: 30000 });

  if (isLoading) return <p>Loading...</p>;

  const current = data!.currently_playing as Track;
  const queue = data!.queue as Track[];

  return (
    <div>
      <ul>
        <QueueItem index={1} track={current} key={current.id} isCurrent />
        {queue.map((t, i) => (
          <QueueItem index={i + 2} track={t} key={t.id} />
        ))}
      </ul>
    </div>
  );
}
