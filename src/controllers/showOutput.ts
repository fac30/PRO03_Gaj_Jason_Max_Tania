import express, { Request, Response } from 'express';
import { searchGenre as generatePlaylist } from './spotify/searchGenre.js';
const router = express.Router();

/**
 * @openapi
 * /playlist:
 *   post:
 *     summary: Generate a playlist
 *     description: Accepts user input and returns a playlist of 10 songs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: A list of tracks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpotifyResponse'
 *       '400':
 *         description: Invalid input
 */

function userOutput () {}

router.get('/playlist', async (req: Request, res: Response) => {
  const userInput = req.body;
    const playlist = await generatePlaylist(userInput);
    res.status(200).json(playlist);
});

export { userOutput };