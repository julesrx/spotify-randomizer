import { UserProfile } from '@spotify/web-api-ts-sdk';
import { useLoaderData } from 'react-router-dom';

import Layout from '~/Layout';
import LoginScreen from './components/LoginScreen';

export default function App() {
  const profile = useLoaderData() as UserProfile;
  return profile ? <Layout /> : <LoginScreen />;
}
