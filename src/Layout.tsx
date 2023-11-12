import { Outlet, useLoaderData } from 'react-router-dom';
import type { UserProfile } from '@spotify/web-api-ts-sdk';

import { redirectToAuthCodeFlow } from './auth';
import PlaybackState from './components/PlaybackState';
import Nav from './components/Nav';
import icon from './assets/spotify-icon-white.png';

function LoginScreen() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        type="button"
        className="bg-spotify-green flex uppercase justify-between items-center py-4 px-8 space-x-4 rounded-full text-xl hover:opacity-95"
        onClick={() => redirectToAuthCodeFlow()}
      >
        <img src={icon} className="w-14 h-14" />
        <span>Sign in with Spotify</span>
      </button>
    </div>
  );
}

export default function Layout() {
  const profile = useLoaderData() as UserProfile;

  if (!profile) return <LoginScreen />;

  return (
    <main>
      <Nav />
      <Outlet />
      <PlaybackState />
    </main>
  );
}
