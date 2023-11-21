import { redirectToAuthCodeFlow } from '~/auth';
import icon from '~/assets/spotify-icon-white.png';

export default function LoginScreen() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        type="button"
        className="bg-spotify-green flex justify-between items-center py-4 px-4 space-x-4 rounded-full text-xl font-semibold hover:opacity-95"
        onClick={() => redirectToAuthCodeFlow(location.pathname)}
      >
        <img src={icon} className="w-12 h-12" />
        <span>Sign in with Spotify</span>
      </button>
    </div>
  );
}
