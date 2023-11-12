import { ofetch } from 'ofetch';

import { getToken } from './auth';
import type { SpotifyProfile } from './auth/types';

const api = ofetch.create({
  baseURL: 'https://api.spotify.com/v1',
  onRequest: ({ options }) => {
    const token = getToken();
    if (!token) return;

    options.headers = new Headers(options.headers);
    options.headers.set('Authorization', `Bearer ${token.access_token}`);
  }
});

export async function fetchProfile(): Promise<SpotifyProfile> {
  const res = await api<SpotifyProfile>('me');
  console.log(res);

  return res;
}
