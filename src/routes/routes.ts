//h1 IMPORT
import express, { Request, Response, Router } from "express";

const app = express();
const router = express.Router();

import { router as dev } from "./internal/dev.js";
import { router as transfer } from "./internal/transfer.js";
import { router as user } from "./internal/user.js";
import { router as openAI } from "./external/openAI.js";
import { router as spotify } from "./external/spotify.js";

app.use(dev);
app.use(openAI);
app.use(spotify);
app.use(user);
app.use(transfer);

app.get('/routes', (req: Request, res: Response) => {
    res.json([
        {
            route: "/routes/",
            path: "./routes/routes",
            purpose: "test router"
        }
    ])
});

//h1 EXPORT
export { router };