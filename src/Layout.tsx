import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

import type { SpotifyProfile } from './auth/types';
import { redirectToAuthCodeFlow } from './auth';

export default function Layout() {
  const { profile } = useLoaderData() as { profile: SpotifyProfile };

  if (!profile)
    return (
      <button type="button" onClick={() => redirectToAuthCodeFlow()}>
        Login
      </button>
    );

  return (
    <>
      <nav>
        <h1>This is nav</h1>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>

        <div>
            <h2>Welcome {profile.display_name}!</h2>
            {profile.images[0] && <img src={profile.images[0].url} />}
        </div>
      </nav>

      <pre>{JSON.stringify(profile, null, 4)}</pre>

      <Outlet />
    </>
  );
}
