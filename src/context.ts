import { createContext } from "react";
import type { Devices, SavedAlbum } from "@spotify/web-api-ts-sdk";

export const DevicesContext = createContext<Devices>({ devices: [] });
export const AlbumsContext = createContext<SavedAlbum[]>([]);
