//h1 IMPORT
import express, { Request, Response, Router } from "express";
import { extractEmotionFromText as parseMood } from "../../controllers/openAI/extractEmotion.js";
import { userInput } from "../../controllers/user/getInput.js";

const app = express();
const router = express.Router();

app.get("/openAI", async (req: Request, res: Response) => {
    const input = await userInput();
    const output = await parseMood(input.eventDescription);
    
    return output;
});

export { router };
