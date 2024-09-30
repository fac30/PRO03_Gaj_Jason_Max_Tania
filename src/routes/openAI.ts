//h1 IMPORT
import { NextFunction, Request, Response, Router } from "express";
import { 
	generateFeatures as parseMood,
	userInput as demoInput
} from "../controllers/openai/extractEmotion";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json(
    { route: "/api/openai/", message: "openai Router" }
  );
	next("")
});

router.get("/extractEmotion", async (req: Request, res: Response) => {
  const output = await parseMood(demoInput);
  res.json(output);
});

export { router };
