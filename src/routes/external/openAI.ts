//h1 IMPORT
import { Request, Response, Router } from "express";
import { 
	extractEmotionFromText as parseMood,
	userInput as demoInput
} from "../../controllers/openAI/extractEmotion.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(
    { route: "/api/openAI/", message: "openAI Router" }
  );
});

router.get("/parseMood", async (req: Request, res: Response) => {
  const output = await parseMood(demoInput);
  res.json(output);
});

/* router.get("/parseMood", async (req: Request, res: Response) => {
  const input = await userInput();
  const output = await parseMood(input.eventDescription);

  return output;
}); */

export { router };
