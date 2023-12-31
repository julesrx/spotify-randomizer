import { ofetch } from 'ofetch';
import type {
  Artist,
  Devices,
  Page,
  PlaybackState,
  Queue,
  SavedAlbum,
  Track,
  UserProfile,
} from '@spotify/web-api-ts-sdk';

import { getToken } from '~/auth/utils';

const api = ofetch.create({
  baseURL: 'https://api.spotify.com/v1',
  onRequest: async ({ options }) => {
    const token = await getToken();
    if (!token) return;

    options.headers = new Headers(options.headers);
    options.headers.set('Authorization', `Bearer ${token.access_token}`);
  },
});

export const getPaginated = async <T>(fn: (limit: number, offset: number) => Promise<Page<T>>) => {
  const limit = 50;
  let offset = 0;
  let res: T[] = [];

  for (;;) {
    const r = await fn(limit, offset);
    res = [...res, ...r.items];

    if (!r.next) break;
    offset += limit;
  }

  return res;
};

export const getProfile = async () => await api<UserProfile>('me');

export const getPlaybackState = async () => {
  return await api<PlaybackState>('me/player');
};

export const getUserQueue = async () => await api<Queue>('me/player/queue');

export const getUserSavedAlbums = async (limit = 50, offset = 0) => {
  return await api<Page<SavedAlbum>>('me/albums', {
    params: { limit, offset },
  });
};

export const getAlbumTracks = async (id: string, limit = 50, offset = 0) => {
  return await api<Page<Track>>(`albums/${id}/tracks`, {
    params: { limit, offset },
  });
};

export const addItemToPlaybackQueue = async (uri: string, deviceId?: string | null) => {
  await api('me/player/queue', {
    method: 'POST',
    params: { uri, device_id: deviceId },
  });
};

export const getAvailableDevices = async () => {
  return await api<Devices>('me/player/devices');
};

export const getUserTopItems = async <T extends 'artists' | 'tracks'>(
  type: T,
  timeRange: 'long_term' | 'medium_term' | 'short_term',
  limit = 50,
  offset = 0
) => {
  return await api<Page<T extends 'artists' ? Artist : Track>>(`me/top/${type}`, {
    params: { time_range: timeRange, limit, offset },
  });
};
