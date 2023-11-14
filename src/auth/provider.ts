import type { UserProfile } from "@spotify/web-api-ts-sdk";

import { clearToken, fetchToken, getToken, setToken } from ".";
import { getProfile } from "~/spotify";

class AuthProvider {
  public profile: null | UserProfile = null;

  get isAuthenticated() {
    // TODO: handle refresh token and expired
    return !!getToken();
  }

  async signin(code: string) {
    const token = await fetchToken(code);
    setToken(token);

    await this.load();
  }

  async load() {
    if (this.profile) return;

    // TODO: handle expiration and refresh token, if fails, signout and redirect
    const profile = await getProfile();
    this.profile = profile;
  }

  async signout() {
    clearToken();
    this.profile = null;
  }
}

export default new AuthProvider();
