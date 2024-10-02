// IMPORT
import { NextFunction, Request, Response, Router } from "express";
import { collateData } from "../controllers/collateData";
// import { getUserInput } from "../controllers/userInput";
import { generateFeatures } from '../controllers/openai/extractEmotion';
import { generatePlaylist } from '../controllers/spotify/generatePlaylist';
import { OpenAIQuery } from '../types/openaiQuery';
import { OpenAIResponse } from '../types/openaiResponse';
import { SpotifyQuery } from '../types/spotifyQuery';
import { SpotifyResponse } from '../types/spotifyResponse';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// 1. Get user inputs through query url parameters
		const {
			musicGenre,
			eventDescription,
			date,
			playlistCount
		} = req.query as {
			[key: string]: string
		};

		// 2. Call generateFeatures() directly
		const openaiQuery: OpenAIQuery = {
			musicGenre,
			eventDescription
		};
		const features: OpenAIResponse = await generateFeatures(openaiQuery);

		// 3. Call collateData() to combine output of generateFeatures() and date from userInput
		const spotifyQuery: SpotifyQuery = collateData(
			features,
			date,
			parseInt(playlistCount, 10)
		);

		// 4. Call generatePlaylist() directly to get playlist
		const playlist: SpotifyResponse = await generatePlaylist(spotifyQuery);

		res.json(playlist);
	} catch (error: any) {
		next(error);
	}
});

// EXPORT
export { router };