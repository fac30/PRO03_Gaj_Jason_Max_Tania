//h1 IMPORT
import { Router, Request, Response } from 'express';
import { generatePlaylist } from '../controllers/spotify/generatePlaylist';
import { SpotifyQuery } from '../types/spotifyQuery';
import { SpotifyResponse } from '../types/spotifyResponse';
import { SpotifyFeatures } from '../types/openaiResponse';

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(
		{ route: "/api/spotify/", message: "Spotify Router" }
	);
});

router.get('/playlist', async (req: Request, res: Response) => {
	// Destructure query parameters from the request
    const { genre, mood, date, playlistCount, valence, energy, danceability, acousticness, tempo } = req.query as { [key: string]: string };

    // Convert string values to numbers where necessary
    const spotifyFeatures: SpotifyFeatures = {
      valence: parseFloat(valence),        // Convert valence to a number
      energy: parseFloat(energy),          // Convert energy to a number
      danceability: parseFloat(danceability),  // Convert danceability to a number
      acousticness: parseFloat(acousticness),  // Convert acousticness to a number
      tempo: parseFloat(tempo),            // Convert tempo to a number
    };

    // Create the SpotifyQuery object
    const spotifyQuery: SpotifyQuery = {
      mood,
      genre,
      spotifyFeatures,
      date: new Date(date),               // Convert date to a Date object
      playlistCount: parseInt(playlistCount, 10), // Convert playlistCount to a number
    };

  	const playlist: SpotifyResponse = await generatePlaylist(spotifyQuery);
	res.status(200).json(playlist);
});

export { router };
