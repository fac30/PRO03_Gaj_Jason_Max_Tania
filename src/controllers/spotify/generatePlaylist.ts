import SpotifyWebApi from "spotify-web-api-node";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "../../config";
import { SpotifyResponse, Track } from "../../types/spotifyResponse";
import { SpotifyQuery } from "../../types/spotifyQuery";

// Accessing the client ID and secret from the config
const clientId = SPOTIFY_CLIENT_ID!;
const clientSecret = SPOTIFY_CLIENT_SECRET!;

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

// Function to obtain and set an access token
async function getAccessToken() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body["access_token"]);
}

// Function to randomly shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Main function to generate a playlist
async function generatePlaylist(query: SpotifyQuery): Promise<SpotifyResponse> {
  try {
    await getAccessToken(); // Ensure a valid access token

    const { genre, date, playlistCount } = query; // Destructure the query object
    console.log(query);

    // Calculate the date range (1 year before the given date)
    const startYear = date.getFullYear() - 1;
    const endYear = date.getFullYear();

    // Create the search query string
    const searchQuery = `genre:${genre} year:${startYear}-${endYear}`;

    // Fetch tracks from Spotify (limit set to maximum: 50 tracks per Spotify API spec)
    const searchResults = await spotifyApi.searchTracks(searchQuery, {
      limit: 50,
    });
    const tracks = searchResults.body.tracks?.items;

    if (!tracks || tracks.length === 0) {
      console.log(
        `No tracks found for genre '${genre}' between ${startYear} and ${endYear}.`,
      );
      return []; // Return an empty array if no tracks are found
    }

    console.log(
      `Found ${tracks.length} tracks for genre '${genre}' between ${startYear} and ${endYear}.`,
    );

    // Shuffle the tracks for randomness
    const shuffledTracks = shuffleArray(tracks);

    // Filter tracks to ensure unique artists
    const uniqueArtistTracks: Track[] = [];
    const seenArtists = new Set<string>();

    for (const track of shuffledTracks) {
      const artistName = track.artists[0].name;
      if (!seenArtists.has(artistName)) {
        uniqueArtistTracks.push({
          id: track.id,
          title: track.name,
          artist: artistName,
          album: track.album.name,
          releaseDate: new Date(track.album.release_date),
          duration: track.duration_ms,
        });
        seenArtists.add(artistName); // Mark this artist as included
      }
      if (uniqueArtistTracks.length >= playlistCount) break; // Stop when we reach the desired count
    }

    console.log(
      `Generated a playlist with ${uniqueArtistTracks.length} unique artist tracks.`,
    );
    return uniqueArtistTracks;
  } catch (error) {
    console.error("Error generating playlist:", error);
    return []; // Return an empty array in case of error
  }
}

// Example usage
const query: SpotifyQuery = {
  genre: "jazz",
  mood: "relaxed",
  date: new Date("2024-09-23T19:00:00.000Z"),
  playlistCount: 10, // Number of tracks to include in the playlist
  spotifyFeatures: {
    valence: 0.8, // Ignored in this version
    energy: 0.7, // Ignored in this version
    danceability: 0.6, // Ignored in this version
    acousticness: 0.2, // Ignored in this version
    tempo: 120, // Ignored in this version
  },
};

// Calling the function with the query object
// generatePlaylist(query);

export { generatePlaylist, query };
