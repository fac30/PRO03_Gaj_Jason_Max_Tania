//h1 IMPORT
import { Request, Response, Router } from "express";
import { userInput } from "../../controllers/getInput.js";

const router = Router();

//h1 ACTIVE
router.get("/", (req: Request, res: Response) => {
  res.json(
    { route: "/api/user/", message: "User Router" }
  );
});

router.get('/input', async (req: Request, res: Response) => {
	try {
    const input = await userInput();
    res.json(input);
  } catch (error) {
    console.error("Error getting user input:", error);
    res.status(500).json({ error: "Failed to get user input" });
  }
});

router.get('/output', (req: Request, res: Response) => {
	res.redirect('/api/spotify/playlist');
});

//h1 EXPORT
export { router };
