import { Outlet, useLoaderData } from 'react-router-dom';
import type { UserProfile } from '@spotify/web-api-ts-sdk';

import { redirectToAuthCodeFlow } from './auth';
import PlaybackState from './components/PlaybackState';
import Nav from './components/Nav';

export default function Layout() {
  const profile = useLoaderData() as UserProfile;

  if (!profile)
    return (
      <button type="button" onClick={() => redirectToAuthCodeFlow()}>
        Login
      </button>
    );

  return (
    <>
      <Nav />
      <Outlet />
      <PlaybackState />
    </>
  );
}
