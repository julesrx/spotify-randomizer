import { createContext, useContext, useEffect, useState } from 'react';
import type { Device, SavedAlbum, Track } from '@spotify/web-api-ts-sdk';
import useSWR from 'swr';

import { getPlaybackState } from './utils/spotify';

export const AlbumsContext = createContext<SavedAlbum[]>([]);

interface DeviceContext {
  activeDevice?: Device;
  lastActiveDevice?: Device;
  currentlyPlaying?: string;
}

export const DevicesContext = createContext<DeviceContext>({});

export const useProvideDeviceContext = () => {
  const { data } = useSWR('playback-state', () => getPlaybackState(), { refreshInterval: 10_000 });

  const activeDevice = data?.device;
  const [lastActiveDevice, setLastActiveDevice] = useState<Device>();

  useEffect(() => {
    if (!activeDevice) return;
    setLastActiveDevice(activeDevice);
  }, [activeDevice]);

  const track = data?.item as Track | undefined;
  const currentlyPlaying = track ? `${track.name} by ${track.artists[0].name}` : undefined;

  return {
    activeDevice,
    lastActiveDevice,
    currentlyPlaying,
  };
};

export const useDeviceContext = () => {
  const { activeDevice, lastActiveDevice, currentlyPlaying } = useContext(DevicesContext);
  const hasDevice = !!activeDevice || !!lastActiveDevice;

  const getDevice = () => activeDevice ?? lastActiveDevice;

  return {
    activeDevice,
    lastActiveDevice,
    currentlyPlaying,
    hasDevice,
    getDevice,
  };
};
