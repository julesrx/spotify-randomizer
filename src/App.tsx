import useSWR from 'swr';
import { UserProfile } from '@spotify/web-api-ts-sdk';

import auth from '~/auth/provider';
import SigninScreen from '~/components/SigninScreen';
import Loading from '~/components/Loading';
import Layout from '~/components/Layout';
import { SignoutContext } from './context';

export default function App() {
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

  const signout = async () => {
    await auth.signout();
    mutate();
  };

  if (isLoading) return <Loading fullHeight>Loading...</Loading>;

  if (!profile) return <SigninScreen />;

  return (
    <SignoutContext.Provider value={{ signout }}>
      <Layout />
    </SignoutContext.Provider>
  );
}
