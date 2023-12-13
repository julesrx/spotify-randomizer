import { PowerIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

import auth from '~/auth/provider';
import { useDeviceContext } from '~/context';
import ExternalLink from './ExternalLink';
import GitHubIcon from './GitHubIcon';

const buttonSize = 'w-6 h-6';

export default function Nav({ onRevalidate }: { onRevalidate: () => void }) {
  const profile = auth.profile!;
  const url = profile.external_urls.spotify;
  const name = profile.display_name;
  const avatar = profile.images.sort((a, b) => a.height - b.height)[0].url;

  const signout = async () => {
    await auth.signout();
    onRevalidate();
  };

  const { activeDevice } = useDeviceContext();

  return (
    <nav className="fixed top-0 w-screen flex items-center p-4 space-x-4">
      <ExternalLink to="https://github.com/julesrx/spotify-randomizer" title="Source">
        <GitHubIcon />
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
