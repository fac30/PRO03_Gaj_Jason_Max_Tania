//h1 IMPORT
import { Request, Response, Router } from "express";
// import { searchGenre } from "../../controllers/spotify/searchGenre.js";
// import { userInput } from "../../controllers/internal/getInput.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(
		{ route: "/api/spotify/", message: "Spotify Router" }
	);
});

/* router.get("/searchGenre", async (req: Request, res: Response) => {
  const input = await userInput();
  const output = await searchGenre(input.musicGenre);
}); */

export { router };
