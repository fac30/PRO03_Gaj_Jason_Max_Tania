import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import * as dotenv from "dotenv";
import { spotifyResponse, track } from "../../types/spotifyResponse.js";
import { spotifyQuery, spotifyFeatures } from "../../types/spotifyQuery.js";

dotenv.config();

// Access the client ID and secret from the .env file
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Initialize the Spotify SDK using client credentials
const sdk = SpotifyApi.withClientCredentials(clientId, clientSecret);

// Define an async function to search tracks based on genre
async function searchGenre(query: spotifyQuery) {
  try {
    const playlist: spotifyResponse = [];
    const genre = query.genre;
    console.log(`Searching for tracks in the genre: ${genre}`);

    // Search for tracks by genre
    const searchResults = await sdk.search(`genre:${genre}`, ["track"]);

    // Check if any tracks are found
    if (searchResults.tracks && searchResults.tracks.items.length > 0) {
      searchResults.tracks.items.forEach((track, index) => {
        const song: track = {
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          releaseDate: new Date(track.album.release_date),
          duration: track.duration_ms,
        };
        
        playlist.push(song);
        console.log(track);
        console.log(`${index + 1}. ${track.name} by ${track.artists[0].name}`);
      });
      console.log(Object.keys(searchResults.tracks.items[0].album));
      console.log(playlist);
    } else {
      console.log(`No tracks found for the genre: ${genre}`);
    }

    return searchResults.tracks?.items;
  } catch (error) {
    console.error("Error fetching tracks by genre:", error);
  }
}
//dummy Object

const query: spotifyQuery = {
  mood: "sad",
  genre: "jazz",
  date: new Date("2024-09-23T19:00:00.000z"),
  spotifyFeatures: {
    valence: 0.9,
    energy: 0.8,
    danceability: 0.8,
    acousticness: 0.1,
    tempo: 120,
  },
};

// Call the function with a specific genre (e.g., jazz)
searchGenre(query);
