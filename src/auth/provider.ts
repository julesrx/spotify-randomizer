import type { UserProfile } from '@spotify/web-api-ts-sdk';

import { clearToken, fetchToken, getToken, setToken } from './utils';
import { getProfile } from '~/utils/spotify';

const createProvider = () => {
  let profile: null | UserProfile = null;

  const isAuthenticated = async () => {
    return !!(await getToken());
  };

  const signin = async (code: string) => {
    const token = await fetchToken(code);
    setToken(token);

    await load();
  };

  const load = async () => {
    if (profile) return;
    if (!(await isAuthenticated())) return;

    profile = await getProfile();
  };

  const signout = () => {
    clearToken();
    profile = null;
  };

  return { profile: () => profile, signin, load, signout };
};

export default createProvider();
