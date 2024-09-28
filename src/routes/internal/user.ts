//h1 IMPORT
import express, { Request, Response, Router } from "express";

import { userInput } from "../../controllers/internal/getInput.js";

const app = express();
const router = express.Router();

//h1 ACTIVE
app.get('/internal/user/input', (req: Request, res: Response) => {
    res.json([
        { route: "/internal/user/input", purpose: "get input from user" }
    ])
});

app.get('/internal/user/output', (req: Request, res: Response) => {
    res.json([
        { route: "/internal/user/output", purpose: "display output to user" }
    ])
});

//h1 EXPORT
export { router };
