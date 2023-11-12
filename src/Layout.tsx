import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import type { UserProfile } from '@spotify/web-api-ts-sdk';

import { redirectToAuthCodeFlow } from './auth';
import auth from './auth/provider';
import PlaybackState from './components/PlaybackState';

export default function Layout() {
  const profile = useLoaderData() as UserProfile;
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signout();
    navigate('/', { replace: true });
  };

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

        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </nav>

      <Outlet />

      <PlaybackState />
    </>
  );
}
