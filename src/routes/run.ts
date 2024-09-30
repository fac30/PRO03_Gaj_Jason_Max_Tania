// IMPORT
import { NextFunction, Request, Response, Router } from "express";
/* import { moodTimeApi } from "../controllers/moodTimeApi"; */
import { collateData } from "../controllers/collateData";
import { getUserInput } from "../controllers/userInput";
import { generateFeatures } from '../controllers/openAI/extractEmotion';
import { generatePlaylist } from '../controllers/spotify/generatePlaylist';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// 1. Call userInput() directly
		const userInputData = await getUserInput();

		// 2. Call generateFeatures() directly
		const features = await generateFeatures(userInputData);

		// 3. Call collateData() to combine output of generateFeatures() and date from userInput
		const collatedData = collateData(features, userInputData.date);

		// 4. Call generatePlaylist() directly to get playlist
		const playlist = await generatePlaylist(collatedData);

		res.json(playlist);
	} catch (error: any) {
		next(error);
	}
});

/* router.get('/old', async (req: Request, res: Response) => {
    // Destructure query parameters from req.query
    const { musicGenre, eventDescription, date } = req.query;

    try {
        // Call moodTimeApi with query parameters
        const result = await moodTimeApi({
            musicGenre: musicGenre as string,
            eventDescription: eventDescription as string,
            date: new Date(date) as Date
        });

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}); */
// EXPORT
export { router };