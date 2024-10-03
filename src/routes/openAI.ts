//h1 IMPORT
import { NextFunction, Request, Response, Router } from "express";
import { generateFeatures } from "../controllers/openAI/extractEmotion";
import { OpenAIQuery } from '../types/openaiQuery';
import { OpenAIResponse } from '../types/openaiResponse';

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json(
    { route: "/api/openai/", message: "openai Router" }
  );
	next("")
});

router.get("/extractEmotion", async (req: Request, res: Response) => {
  // 1. Get user inputs through query url parameters
  const { musicGenre, eventDescription } = req.query as { [key: string]: string };

  // 2. Call generateFeatures() directly
  const openaiQuery: OpenAIQuery = { musicGenre, eventDescription };
  const openaiResponse: OpenAIResponse = await generateFeatures(openaiQuery);
  res.json(openaiResponse);
});

export { router };
