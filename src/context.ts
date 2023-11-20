import { createContext, useContext } from 'react';
import type { Devices, SavedAlbum } from '@spotify/web-api-ts-sdk';

export const DevicesContext = createContext<Devices>({ devices: [] });
export const AlbumsContext = createContext<SavedAlbum[]>([]);

export const useDeviceContext = () => {
  const devices = useContext(DevicesContext);
  const activeDevice = devices.devices.find((d) => d.is_active);
  const hasActiveDevice = !!activeDevice;

  return {
    devices,
    activeDevice,
    hasActiveDevice,
  };
};
