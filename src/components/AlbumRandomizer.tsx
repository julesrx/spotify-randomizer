import { useContext, useState } from 'react';

import { AlbumsContext } from '~/context';
import { getRandomElementInArray } from '~/utils';

export default function AlbumRandomizer() {
  const albums = useContext(AlbumsContext);
  const [random, setRandom] = useState(getRandomElementInArray(albums));

  const randomize = () => setRandom(getRandomElementInArray(albums));

  const album = {
    id: random.album.id,
    uri: random.album.uri,
    name: random.album.name,
    cover: random.album.images[0].url,
  };

  return (
    <div>
      <div>
        <img src={album.cover} alt={album.name} className={'w-8 h-8'} />
      </div>

      <button type="button" onClick={() => randomize()}>
        Randomize
      </button>
    </div>
  );
}
