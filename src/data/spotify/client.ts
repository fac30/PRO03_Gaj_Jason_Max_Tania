import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import * as env from 'dotenv';

env.config();
const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const scopes = []

 
const sdk = SpotifyApi.withClientCredentials(clientId, clientSecret, scopes);

async function searchArtist() {
    try {
        console.log("Searching Spotify for The Beatles...");

        const items = await sdk.search("The Beatles", ["artist"]);

        console.table(items.artists.items.map((item) => ({
            name: item.name,
            followers: item.followers.total,
            popularity: item.popularity,
        })));
    } catch (error) {
        console.error("Error searching for artist:", error);
    }
}