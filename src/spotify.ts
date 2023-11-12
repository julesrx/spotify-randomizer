import { ofetch } from 'ofetch';
import type { PlaybackState, Queue, UserProfile } from '@spotify/web-api-ts-sdk';

import { getToken } from './auth';

const api = ofetch.create({
  baseURL: 'https://api.spotify.com/v1',
  onRequest: ({ options }) => {
    const token = getToken();
    if (!token) return;

    options.headers = new Headers(options.headers);
    options.headers.set('Authorization', `Bearer ${token.access_token}`);
  }
});

export const getProfile = async () => await api<UserProfile>('me');
export const getPlaybackState = async () => await api<PlaybackState>('me/player');
export const getUsersQueue = async () => await api<Queue>('me/player/queue');
