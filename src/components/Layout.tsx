import Home from '~/components/Home';
import Nav from '~/components/Nav';
import { DevicesContext, useProvideDeviceContext } from '~/context';

export default function Layout() {
  const { activeDevice, lastActiveDevice } = useProvideDeviceContext();

  return (
    <DevicesContext.Provider value={{ activeDevice, lastActiveDevice }}>
      <Nav />
      <main className="h-screen">
        <Home />
      </main>
    </DevicesContext.Provider>
  );
}
