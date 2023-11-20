import { useContext, useState } from 'react';

import { AlbumsContext } from '~/context';
import { getRandomElementInArray } from '~/utils';
import Album from './Album';

export default function AlbumRandomizer() {
  const albums = useContext(AlbumsContext);
  const [random, setRandom] = useState(getRandomElementInArray(albums));

  const randomize = () => setRandom(getRandomElementInArray(albums));

  return (
    <div className="h-full flex justify-center items-center">
      <Album album={random} onRandomize={() => randomize()} />
    </div>
  );
}
