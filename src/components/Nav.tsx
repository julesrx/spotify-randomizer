import { useCallback } from 'react';
import type { UserProfile } from '@spotify/web-api-ts-sdk';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

import auth from '~/auth/provider';
import { useDeviceContext } from '~/context';

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

  const { activeDevice, hasActiveDevice } = useDeviceContext();

  const logout = async () => {
    await auth.signout();
    revalidate();
  };

  const avatar = profile.images.sort((a, b) => a.height - b.height)[0].url;

  return (
    <nav className="fixed top-0 w-screen flex justify-end items-center p-2">
      <button
        type="button"
        title={activeDevice ? activeDevice.name : 'Not devices in use...'}
        className={'w-12 h-12 p-2 rounded-full ' + (hasActiveDevice ? 'text-spotify-green' : '')}
      >
        <DevicePhoneMobileIcon />
      </button>

      <button
        type="button"
        onClick={() => logout()}
        title="Logout"
        className="w-12 h-12 p-2 rounded-full"
      >
        <ArrowRightOnRectangleIcon />
      </button>

      <img src={avatar} className="w-12 h-12 rounded-full" />
    </nav>
  );
}
