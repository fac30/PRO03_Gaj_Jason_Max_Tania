//h1 IMPORT
import { Request, Response, Router } from "express";
// import { extractEmotionFromText as parseMood } from "../../controllers/openAI/extractEmotion.js";
// import { userInput } from "../../controllers/internal/getInput.js";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.json(
    { route: "/api/openAI/test", message: "openAI Router" }
  );
});

/* router.get("/parseMood", async (req: Request, res: Response) => {
  const input = await userInput();
  const output = await parseMood(input.eventDescription);

  return output;
}); */

export { router };
