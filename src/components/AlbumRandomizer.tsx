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
      <div>
        <Album album={random} />
        <button type="button" onClick={() => randomize()}>
          Randomize
        </button>
      </div>
    </div>
  );
}
