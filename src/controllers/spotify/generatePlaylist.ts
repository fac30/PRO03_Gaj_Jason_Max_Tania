import SpotifyWebApi from "spotify-web-api-node";
import * as dotenv from "dotenv";
import { spotifyResponse, track } from "../../types/spotifyResponse";
import { spotifyQuery } from "../../types/spotifyQuery";
import {spotifyFeatures } from "../../types/openaiResponse";

dotenv.config();

/*General explanation
  This script builds upon the original index.ts that searches for tracks based on genre.
  The original script effectively establishes the foundation for making API calls and processing responses.
  Here, we are adding to that foundation by a date range (by year) search criteria and making a subsequent
  API call to retrieve audio features, then filtering them and sorting them based on the intended audio
  feature results we have targeted. We are making 6 API calls of 50 (API limit) to get a pool of 300 tracks
  to filer and sort for audio filters in order to get tracks that more or less meet our criteria. We are
  prioritising valence and energy audio features and then danceability, tempo and acousticness (in that order).
  The playlist being output produced duplicate songs or many songs by the same artists so we are
  also filtering the results so we only keep the highest scoring song by a certain artist.
*/

/*spotify-web-api-node module instead of @spotify/web-api-ts-sdk - why?
  In order to perform more custom queries, we can use spotify-web-api-node module which allows us to build
  a custom query string (find the searchQuery string variable to see how this is built) and use it to search the
  API using the spotifyApi.searchTracks function.
*/

/*Typescript
  We also utilize TypeScript's typing system to define clear interfaces for our data structures.
*/

// Accessing the client ID and secret from the .env file
const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

// Initializing the Spotify API client with your credentials
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

// Function to obtain and set an access token
async function getAccessToken() {
  const data = await spotifyApi.clientCredentialsGrant(); // Getting an access token using client credentials
  spotifyApi.setAccessToken(data.body["access_token"]); // Setting the access token for future API requests
}

// Helper function to calculate the absolute difference between two numbers
function calculateFeatureDifference(a: number, b: number) {
  return Math.abs(a - b);
}

// Helper function to fetch audio features for tracks in batches - this is effectively a subsequent API call to retrieve
// the audio feature settings of each song we collected from the previous 6 API calls
async function getAudioFeaturesInBatches(
  trackIds: string[],
  spotifyApi: SpotifyWebApi,
): Promise<SpotifyApi.AudioFeaturesObject[]> {
  const audioFeatures: SpotifyApi.AudioFeaturesObject[] = [];
  const batchSize = 100; // Spotify API allows up to 100 track IDs per request

  // Looping through the track IDs in batches to comply with API limitations
  for (let i = 0; i < trackIds.length; i += batchSize) {
    const batch = trackIds.slice(i, i + batchSize); // Creating a batch of track IDs
    const response = await spotifyApi.getAudioFeaturesForTracks(batch); // Fetching audio features for the batch
    if (response.body.audio_features) {
      audioFeatures.push(...response.body.audio_features); // Accumulating the audio features
    }
  }

  return audioFeatures; // Returning all collected audio features
}

async function generatePlaylist(query: spotifyQuery): Promise<spotifyResponse> {
  try {
    await getAccessToken(); // Ensuring we have a valid access token before making API calls

    const { genre, date, spotifyFeatures } = query; // Destructuring the query object

    // Calculating the start and end dates for the 12-month range prior to the given date
    const endDate = new Date(date);
    const startDate = new Date(date);
    startDate.setFullYear(startDate.getFullYear() - 1); // Subtracting one year to get the start date

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    // Creating the search query string to include genre and year range
    const searchQuery = `genre:${genre} year:${startYear}-${endYear}`;

    let allTracks: SpotifyApi.TrackObjectFull[] = [];

    // Making multiple API calls to gather a larger set of tracks
    for (let i = 0; i < 6; i++) {
      const searchResults = await spotifyApi.searchTracks(searchQuery, {
        limit: 50,
        offset: i * 50,
      });
      const tracks = searchResults.body.tracks?.items;
      if (tracks && tracks.length > 0) {
        allTracks = allTracks.concat(tracks);
      }
    }

    if (allTracks.length > 0) {
      console.log(
        `Found ${allTracks.length} tracks in the genre '${genre}' between ${startYear} and ${endYear}:`
      );

      const trackIds = allTracks.map((track) => track.id); // Extracting track IDs for audio feature requests

      // Fetching audio features for all tracks in batches
      const audioFeatures = await getAudioFeaturesInBatches(trackIds, spotifyApi);

      // Sorting tracks based on how closely they match the desired audio features
      const sortedTracks = audioFeatures
        ?.filter((feature) => feature)
        .map((feature) => {
          if (!feature) return null;

          return {
            feature,
            differences: {
              valence: calculateFeatureDifference(
                feature.valence,
                spotifyFeatures.valence
              ),
              energy: calculateFeatureDifference(
                feature.energy,
                spotifyFeatures.energy
              ),
              danceability: calculateFeatureDifference(
                feature.danceability,
                spotifyFeatures.danceability
              ),
              tempo: calculateFeatureDifference(
                feature.tempo,
                spotifyFeatures.tempo
              ),
              acousticness: calculateFeatureDifference(
                feature.acousticness,
                spotifyFeatures.acousticness
              ),
            },
          };
        })
        .filter((item): item is {
          feature: SpotifyApi.AudioFeaturesObject;
          differences: spotifyFeatures;
        } => item !== null)
        .sort((a, b) => {
          const valenceEnergyDifference =
            a.differences.valence +
            a.differences.energy -
            (b.differences.valence + b.differences.energy);
          if (valenceEnergyDifference !== 0) return valenceEnergyDifference;
          return (
            a.differences.danceability - b.differences.danceability ||
            a.differences.tempo - b.differences.tempo ||
            a.differences.acousticness - b.differences.acousticness
          );
        });

      const uniqueArtistTracks = sortedTracks.filter((item, index, self) => {
        const track = allTracks.find((t) => t.id === item.feature.id);
        if (!track) return false;
        const artistName = track.artists[0].name;
        return (
          index ===
          self.findIndex((t) => {
            const otherTrack = allTracks.find((t2) => t2.id === t.feature.id);
            return otherTrack?.artists[0].name === artistName;
          })
        );
      });

      const topTracks = uniqueArtistTracks.slice(0, 10);
      const playlist: spotifyResponse = [];

      if (topTracks.length > 0) {
        console.log(
          `Returning ${topTracks.length} tracks matching audio feature criteria:`
        );

        topTracks.forEach((item, index) => {
          const track = allTracks.find((t) => t.id === item.feature.id);
          if (track) {
            const releaseDate = track.album.release_date;
            console.log(
              `${index + 1}. ${track.name} by ${track.artists[0].name}, Release Date: ${releaseDate}`
            );
            const song: track = {
              id: track?.id ?? '',
              title: track?.name ?? '',
              artist: track?.artists[0].name ?? '',
              album: track?.album.name ?? '',
              releaseDate: new Date(track?.album.release_date ?? ''),
              duration: track?.duration_ms ?? 0,
            };
            playlist.push(song);
          }
        });

        return playlist; // Return playlist if tracks are found
      } else {
        console.log("No tracks found matching the audio feature criteria.");
        return []; // Return an empty array if no matching tracks are found
      }
    } else {
      console.log(
        `No tracks found in the genre '${genre}' between ${startYear} and ${endYear}`
      );
      return []; // Return an empty array if no tracks are found
    }
  } catch (error) {
    console.error("Error searching for tracks:", error);
    return []; // Return an empty array in case of error
  }
}

// Example usage:
// Creating a query object with desired genre, date, and audio features
const query: spotifyQuery = {
  genre: "jazz",
  mood: "jazzy",
  date: new Date("2024-09-23T19:00:00.000Z"),
  spotifyFeatures: {
    valence: 0.8,
    energy: 0.7,
    danceability: 0.6,
    acousticness: 0.2,
    tempo: 120,
  },
};

// Calling the function with the query object
// generatePlaylist(query);

export { 
	generatePlaylist,
	query
};