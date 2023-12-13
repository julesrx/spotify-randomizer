import { createContext, useContext, useEffect, useState } from 'react';
import type { Device, SavedAlbum } from '@spotify/web-api-ts-sdk';
import useSWR from 'swr';

import { getAvailableDevices } from './utils/spotify';

export const AlbumsContext = createContext<SavedAlbum[]>([]);

interface DeviceContext {
  activeDevice?: Device;
  lastActiveDevice?: Device;
}

export const DevicesContext = createContext<DeviceContext>({});

export const useProvideDeviceContext = () => {
  const { data } = useSWR('devices', () => getAvailableDevices(), {
    refreshInterval: 30000,
  });

  const activeDevice = data?.devices.find((d) => d.is_active);
  const [lastActiveDevice, setLastActiveDevice] = useState<Device>();

  useEffect(() => {
    if (!activeDevice) return;
    setLastActiveDevice(activeDevice);
  }, [activeDevice]);

  return {
    activeDevice,
    lastActiveDevice,
  };
};

export const useDeviceContext = () => {
  const { activeDevice, lastActiveDevice } = useContext(DevicesContext);
  const hasDevice = !!activeDevice || !!lastActiveDevice;

  const getDevice = () => activeDevice ?? lastActiveDevice;

  return {
    activeDevice,
    lastActiveDevice,
    hasDevice,
    getDevice,
  };
};

export const SignoutContext = createContext<{ signout: () => void }>({ signout: () => {} });
