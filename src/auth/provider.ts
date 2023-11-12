import { fetchToken, setToken } from '.';
import { fetchProfile } from '../spotify';
import type { SpotifyProfile } from './types';

class AuthProvider {
  public profile: null | SpotifyProfile = null;

  async signin(code: string) {
    const token = await fetchToken(code);
    setToken(token);

    await this.load();
  }

  async load() {
    try {
      const profile = await fetchProfile();
      console.log(profile);

      this.profile = profile;
    } catch {
      //
    }
  }

  async signout() {
    // TODO: clear token
    this.profile = null;
  }
}

export default new AuthProvider();
