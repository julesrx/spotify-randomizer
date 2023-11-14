import { useContext, useState } from "react";

import { AlbumsContext } from "../contexts";
import { getRandomElementInArray } from "../utils";

export default function AlbumsList() {
  const albums = useContext(AlbumsContext).map((a) => ({
    id: a.album.id,
    name: a.album.name,
    cover: a.album.images[0].url,
  }));

  const [random, setRandom] = useState(getRandomElementInArray(albums));

  return (
    <>
      <button onClick={() => setRandom(getRandomElementInArray(albums))}>
        Randomize
      </button>

      <div className="flex">
        {albums.map((a) => (
          <div key={a.id}>
            <img
              src={a.cover}
              alt={a.name}
              className={random.id === a.id ? "w-16 h-16" : "w-8 h-8"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
