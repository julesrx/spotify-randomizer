import { redirectToAuthCodeFlow } from '~/auth';
import icon from '~/assets/spotify-icon-white.png';

export default function LoginScreen() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        type="button"
        className="bg-spotify-green flex uppercase justify-between items-center py-4 px-8 space-x-4 rounded-full text-xl hover:opacity-95"
        onClick={() => redirectToAuthCodeFlow(location.pathname)}
      >
        <img src={icon} className="w-14 h-14" />
        <span>Sign in with Spotify</span>
      </button>
    </div>
  );
}
