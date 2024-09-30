//h1 IMPORT
import { Router, Request, Response } from 'express';
import { generatePlaylist, query } from '../../controllers/spotify/generatePlaylist';

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(
		{ route: "/api/spotify/", message: "Spotify Router" }
	);
});

router.get('/playlist', async (req: Request, res: Response) => {
  const playlist = await generatePlaylist(query);
	res.status(200).json(playlist);
});

export { router };
