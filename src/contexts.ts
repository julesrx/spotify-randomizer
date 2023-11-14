import { SavedAlbum } from "@spotify/web-api-ts-sdk";
import { createContext } from "react";

export const AlbumsContext = createContext<SavedAlbum[]>([]);
