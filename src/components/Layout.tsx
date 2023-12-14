import Home from '~/components/Home';
import Nav from '~/components/Nav';
import { DevicesContext, useProvideDeviceContext } from '~/context';

export default function Layout() {
  const { activeDevice, lastActiveDevice, currentlyPlaying } = useProvideDeviceContext();

  return (
    <DevicesContext.Provider value={{ activeDevice, lastActiveDevice, currentlyPlaying }}>
      <div className="fixed top-0 bottom-0 bg-black h-screen w-screen -z-10 opacity-80"></div>
      <Nav />
      <main className="h-screen">
        <Home />
      </main>
    </DevicesContext.Provider>
  );
}
