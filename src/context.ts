import { createContext, useContext } from 'react';
import type { Device, SavedAlbum } from '@spotify/web-api-ts-sdk';

interface DeviceContext {
  activeDevice?: Device;
  lastActiveDevice?: Device;
}

export const DevicesContext = createContext<DeviceContext>({});
export const AlbumsContext = createContext<SavedAlbum[]>([]);

// export const setDeviceContext=()=>{

// }

export const useDeviceContext = () => {
  const { activeDevice, lastActiveDevice } = useContext(DevicesContext);
  const hasActiveDevice = !!activeDevice;

  return {
    activeDevice,
    hasActiveDevice,
    lastActiveDevice,
  };
};
