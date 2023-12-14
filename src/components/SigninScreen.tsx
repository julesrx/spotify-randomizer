import LogosSpotifyIcon from '~icons/logos/spotify-icon';
import { redirectToAuthCodeFlow } from '~/auth/utils';

export default function SigninScreen() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        type="button"
        className="bg-spotify-green text-spotify-white flex justify-between items-center py-4 px-4 space-x-4 rounded-full text-xl font-semibold hover:opacity-95"
        onClick={() => redirectToAuthCodeFlow(location.pathname)}
      >
        <LogosSpotifyIcon className="w-12 h-12" id="spotify-icon" />
        <span>Sign in with Spotify</span>
      </button>
    </div>
  );
}
