import { useContext } from 'react';
import PowerIcon from '~icons/heroicons/power-solid';
import ComputerDesktopIcon from '~icons/heroicons/computer-desktop-solid';
import GithubIcon from '~icons/logos/github-icon';

import auth from '~/auth/provider';
import { SignoutContext, useDeviceContext } from '~/context';
import ExternalLink from './ExternalLink';

const buttonSize = 'w-6 h-6';

export default function Nav() {
  const { signout } = useContext(SignoutContext);

  const profile = auth.profile!;
  const url = profile.external_urls.spotify;
  const name = profile.display_name;
  const avatar = profile.images.sort((a, b) => a.height - b.height)[0].url;

  const { activeDevice } = useDeviceContext();

  return (
    <nav className="fixed top-0 w-screen flex items-center p-4 space-x-4">
      <ExternalLink to="https://github.com/julesrx/spotify-randomizer" title="Source">
        <GithubIcon className="w-6 h-6 opacity-50" id="github-icon" />
      </ExternalLink>

      <div className="flex-1" />
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
