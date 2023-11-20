import { useCallback } from 'react';
import type { UserProfile } from '@spotify/web-api-ts-sdk';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';

import auth from '~/auth/provider';
import Devices from 'components/Devices';

const useRevalidate = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  return useCallback(() => {
    navigate('/', { replace: true });
    revalidator.revalidate();
  }, [navigate, revalidator]);
};

export default function Nav() {
  const profile = useLoaderData() as UserProfile;
  const revalidate = useRevalidate();

  const logout = async () => {
    await auth.signout();
    revalidate();
  };

  const avatar = profile.images.sort((a, b) => a.height - b.height)[0].url;

  return (
    <nav className="fixed top-0 w-screen flex justify-end">
      <Devices />

      <img src={avatar} className="w-16 h-16" />

      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </nav>
  );
}
