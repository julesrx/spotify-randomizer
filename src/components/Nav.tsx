import { useCallback } from 'react';
import type { UserProfile } from '@spotify/web-api-ts-sdk';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { PowerIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

import auth from '~/auth/provider';
import { useDeviceContext } from '~/context';
import ExternalLink from './ExternalLink';

const useRevalidate = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  return useCallback(() => {
    navigate('/', { replace: true });
    revalidator.revalidate();
  }, [navigate, revalidator]);
};

const buttonSize = 'w-6 h-6';

export default function Nav() {
  const profile = useLoaderData() as UserProfile;
  const url = profile.external_urls.spotify;
  const name = profile.display_name;
  const avatar = profile.images.sort((a, b) => a.height - b.height)[0].url;

  const revalidate = useRevalidate();
  const signout = async () => {
    await auth.signout();
    revalidate();
  };

  const { activeDevice } = useDeviceContext();

  return (
    <nav className="fixed top-0 w-screen flex justify-end items-center p-4 space-x-4">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          title={activeDevice ? `Playing on ${activeDevice.name}` : 'Not devices in use'}
          className={`${buttonSize} ${activeDevice ? 'text-spotify-green' : ''}`}
        >
          <ComputerDesktopIcon />
        </button>

        <button type="button" onClick={() => signout()} title="Sign out" className={buttonSize}>
          <PowerIcon />
        </button>
      </div>

      <ExternalLink to={url} title={name}>
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
      </ExternalLink>
    </nav>
  );
}
