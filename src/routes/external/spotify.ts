//h1 IMPORT
import express, { Request, Response, Router } from "express";

const app = express();
const router = express.Router();

import { searchGenre } from "../../models/spotify/searchGenre.js";
import { userInput } from "../../controllers/internal/getInput.js";

app.get("/spotify/searchGenre", async (req: Request, res: Response) => {
  res.json(
    { route: "searchGenre", purpose: "useOpenAI & Date to retrieve playlist" }
  );
  // const input = await userInput();
  // const output = await searchGenre(input.musicGenre);
});

export { router };
