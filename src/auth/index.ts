import { ofetch } from 'ofetch';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';

import { generateCodeChallenge, generateCodeVerifier } from './utils';
import auth from './provider';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const baseUrl = 'https://accounts.spotify.com';
export const callbackUri = '/callback';
const redirectUri = `${location.origin}${callbackUri}`;

// ----
export async function redirectToAuthCodeFlow() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', redirectUri);
  params.append('scope', 'user-read-private user-read-email');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `${baseUrl}/authorize?${params.toString()}`;
}

export async function fetchToken(code: string): Promise<TokenResponse> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', verifier!);

  return await ofetch<TokenResponse>(`${baseUrl}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
}

// ----
const tokenKey = 'spotify-token';

export const setToken = (response: TokenResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(response));
};

export const getToken = (): TokenResponse | null => {
  const json = localStorage.getItem(tokenKey);
  if (!json) return null;

  return JSON.parse(json);
};

// ----
export const callbackLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) throw new Response("Couldn't get authorization code", { status: 400 });

  await auth.signin(code);
  return redirect('/');
};

// ----
interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
