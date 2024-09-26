//h1 IMPORT
import express, { Request, Response, Router } from 'express';

const app = express();
const router = express.Router();

import { searchGenre } from '../../models/spotify/searchGenre.js';
import { userInput } from '../../controllers/user/getInput.js';

app.get("/spotify", async (req: Request, res: Response) => {
    const input = await userInput();
    const output = await searchGenre(input.musicGenre);
});

export { router };