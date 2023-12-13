import { safeDestr } from 'destr';
import { ofetch } from 'ofetch';

import { addSeconds } from '~/utils';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const baseUrl = 'https://accounts.spotify.com';
const redirectUri = `${location.origin}${import.meta.env.BASE_URL}`;

// ----
const verifierKey = 'auth:verifier';
const returnPathnameKey = 'auth:returnPathname';
export async function redirectToAuthCodeFlow(returnPathname: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem(verifierKey, verifier);
  localStorage.setItem(returnPathnameKey, returnPathname);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', redirectUri);
  params.append(
    'scope',
    'user-read-private user-read-email user-library-read user-read-playback-state user-modify-playback-state user-top-read'
  );
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `${baseUrl}/authorize?${params.toString()}`;
}

export async function fetchToken(code: string): Promise<TokenResponse> {
  const verifier = localStorage.getItem(verifierKey);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', verifier!);

  const token = await ofetch<TokenResponse>(`${baseUrl}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  localStorage.removeItem(verifierKey);

  return token;
}

export async function refreshToken(token: TokenResponse): Promise<TokenResponse> {
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', token.refresh_token);

  return await ofetch<TokenResponse>(`${baseUrl}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
}

// ----
const tokenKey = 'auth:token';
const tokenExpKey = 'auth:token-expiration';

export const setToken = (response: TokenResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(response));

  let expiration = new Date();
  expiration = addSeconds(expiration, response.expires_in);

  localStorage.setItem(tokenExpKey, JSON.stringify(expiration));
};

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
};

export const getToken = async (): Promise<TokenResponse | null> => {
  const json = localStorage.getItem(tokenKey);
  if (!json) return null;

  let token = safeDestr<TokenResponse>(json);

  const expiration = safeDestr<Date>(localStorage.getItem(tokenExpKey));
  if (expiration >= new Date()) {
    token = await refreshToken(token);
    setToken(token);
  }

  return token;
};

// ----
interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

// ----
const generateCodeVerifier = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};
