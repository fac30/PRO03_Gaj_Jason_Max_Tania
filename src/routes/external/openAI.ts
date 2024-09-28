//h1 IMPORT
import express, { Request, Response, Router } from "express";
import { extractEmotionFromText as parseMood } from "../../controllers/openAI/extractEmotion.js";
import { userInput } from "../../controllers/internal/getInput.js";

const app = express();
const router = express.Router();

app.get("/openAI/parseMood", async (req: Request, res: Response) => {
  res.json(
    { route: "/openAI/parseMood", purpose: "use userInput to extract emotion description" }
  );
  // const input = await userInput();
  // const output = await parseMood(input.eventDescription);

  // return output;
});

export { router };
