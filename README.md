# Spotify Randomizer

[![GitHub Pages](https://github.com/julesrx/spotify-randomizer/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/julesrx/spotify-randomizer/deployments/activity_log?environment=github-pages)

If your Spotify library has grown too large, and you can't decide what to listen to next, then this tool will help you make a choice by selecting a random album from your library, and add it to the queue.

This project is using the [Spotify Web API](https://developer.spotify.com/documentation/web-api), and is built with [Vite](https://vitejs.dev/) and [React](https://react.dev/).

## Development

To run the project locally, you first need to configure the Spotify API key in the `.env` file :

```env
VITE_SPOTIFY_CLIENT_ID=xxx
```

Then install the dependencies and run the project :

```bash
pnpm i
pnpm dev
```
