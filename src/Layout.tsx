import { Outlet } from 'react-router-dom';
import useSWR from 'swr';

import Nav from 'components/Nav';
import { getAvailableDevices } from '~/spotify';
import { DevicesContext } from '~/context';

export default function Layout() {
  const { data } = useSWR('devices', () => getAvailableDevices(), {
    refreshInterval: 30000,
  });

  return (
    <DevicesContext.Provider value={data ?? { devices: [] }}>
      <Nav />
      <main className="h-screen">
        <Outlet />
      </main>
    </DevicesContext.Provider>
  );
}
