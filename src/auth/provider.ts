import type { UserProfile } from '@spotify/web-api-ts-sdk';

import { clearToken, fetchToken, setToken } from '.';
import { getProfile } from '../spotify';

class AuthProvider {
  public profile: null | UserProfile = null;

  async signin(code: string) {
    const token = await fetchToken(code);
    setToken(token);

    await this.load();
  }

  async load() {
    if (this.profile) return;

    const profile = await getProfile();
    console.log('Loaded user profile', profile);

    this.profile = profile;
  }

  async signout() {
    // TODO: clear token
    clearToken();
    this.profile = null;
  }
}

export default new AuthProvider();
