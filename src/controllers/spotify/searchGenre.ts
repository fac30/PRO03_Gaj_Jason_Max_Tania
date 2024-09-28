import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

// Access the client ID and secret from the .env file
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Initialize the Spotify SDK using client credentials
const sdk = SpotifyApi.withClientCredentials(clientId, clientSecret);
console.log('Client ID:', clientId);

// Define an async function to search tracks based on genre
export async function searchGenre(genre: string) {
    try {
        console.log(`Searching for tracks in the genre: ${genre}`);

        // Search for tracks by genre
        const searchResults = await sdk.search(`genre:${genre}`, ['track']);

        // Check if any tracks are found
        if (searchResults.tracks && searchResults.tracks.items.length > 0) {
            searchResults.tracks.items.forEach((track, index) => {
                console.log(`${index + 1}. ${track.name} by ${track.artists[0].name}`);
            });
        } else {
            console.log(`No tracks found for the genre: ${genre}`);
        }

        return searchResults.tracks?.items;
    } catch (error) {
        console.error('Error fetching tracks by genre:', error);
    }
}

// Call the function with a specific genre (e.g., jazz)
// searchGenre('rock');