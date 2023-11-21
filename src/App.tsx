import { UserProfile } from '@spotify/web-api-ts-sdk';
import { useLoaderData } from 'react-router-dom';

import Layout from '~/Layout';
import SigninScreen from './components/SigninScreen';

export default function App() {
  const profile = useLoaderData() as UserProfile;
  return profile ? <Layout /> : <SigninScreen />;
}
