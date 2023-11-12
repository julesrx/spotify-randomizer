import { Outlet, useLoaderData } from 'react-router-dom';

import type { SpotifyProfile } from './auth/types';
import { redirectToAuthCodeFlow } from './auth';

export default function Layout() {
  //TODO: if logged out, do not display routes

  const { profile } = useLoaderData() as { profile: SpotifyProfile };

  if (!profile)
    return (
      <button type="button" onClick={() => redirectToAuthCodeFlow()}>
        Login
      </button>
    );

  return (
    <>
      <nav>This is nav</nav>

      <pre>{JSON.stringify(profile)}</pre>

      <Outlet />
    </>
  );
}