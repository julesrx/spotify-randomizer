import { fetchToken, setToken } from '.';
import { fetchProfile } from '../spotify';
import type { SpotifyProfile } from './types';

interface AuthProvider {
  isAuthenticated: boolean;
  profile: null | SpotifyProfile;
  signin(code: string): Promise<void>;
  signout(): Promise<void>;
}

const provider: AuthProvider = {
  isAuthenticated: false,
  profile: null,
  async signin(code: string) {
    const token = await fetchToken(code);
    setToken(token);

    const profile = await fetchProfile();
    console.log(profile);

    provider.isAuthenticated = true;
    provider.profile = profile;
  },
  async signout() {
    // TODO: clear token
    provider.isAuthenticated = false;
    provider.profile = null;
  }
};

export default provider;
