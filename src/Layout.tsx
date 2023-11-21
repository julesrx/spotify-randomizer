import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useSWR from 'swr';
import { safeDestr } from 'destr';
import type { Device } from '@spotify/web-api-ts-sdk';

import Nav from 'components/Nav';
import { getAvailableDevices } from '~/spotify';
import { DevicesContext } from '~/context';

const deviceKey = 'device:last';

export default function Layout() {
  const { data: devices } = useSWR('devices', () => getAvailableDevices(), {
    refreshInterval: 30000,
  });

  const activeDevice = devices?.devices.find((d) => d.is_active);
  const [lastActiveDevice, setLastActiveDevice] = useState<Device>(
    safeDestr(localStorage.getItem(deviceKey)) ?? undefined
  );

  useEffect(() => {
    if (!activeDevice) return;

    setLastActiveDevice(activeDevice);
    localStorage.setItem(deviceKey, JSON.stringify(activeDevice));
  }, [activeDevice]);

  return (
    <DevicesContext.Provider value={{ activeDevice, lastActiveDevice }}>
      <Nav />
      <main className="h-screen">
        <Outlet />
      </main>
    </DevicesContext.Provider>
  );
}
