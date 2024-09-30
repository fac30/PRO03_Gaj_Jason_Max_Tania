//h1 IMPORT
import { NextFunction, Request, Response, Router } from "express";
import { 
	generateFeatures as parseMood,
	userInput as demoInput
} from "../controllers/openAI/extractEmotion.js";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json(
    { route: "/api/openAI/", message: "openAI Router" }
  );
	next("")
});

router.get("/extractEmotion", async (req: Request, res: Response) => {
  const output = await parseMood(demoInput);
  res.json(output);
});

export { router };
