import useSWR from 'swr';
import { UserProfile } from '@spotify/web-api-ts-sdk';

import SigninScreen from './components/SigninScreen';
import Home from './components/Home';
import Nav from './components/Nav';
import { DevicesContext, useProvideDeviceContext } from './context';
import auth from '~/auth/provider';
import Loading from './components/Loading';

export default function App() {
  const { activeDevice, lastActiveDevice } = useProvideDeviceContext();

  const {
    isLoading,
    data: profile,
    mutate,
  } = useSWR<UserProfile | null>('profile', async () => {
    const code = new URL(location.href).searchParams.get('code');
    if (code) {
      await auth.signin(code);
      history.replaceState({}, '', '/');
      return auth.profile;
    }

    await auth.load();
    return auth.profile;
  });

  if (isLoading) return <Loading fullHeight>Loading...</Loading>;

  if (!profile) return <SigninScreen />;

  return (
    <DevicesContext.Provider value={{ activeDevice, lastActiveDevice }}>
      <Nav onRevalidate={() => mutate()} />
      <main className="h-screen">
        <Home />
      </main>
    </DevicesContext.Provider>
  );
}
