//h1 IMPORT
import express, { Request, Response, Router } from "express";

const app = express();
const router = express.Router();

//h1 ACTIVE
app.get('/internal/transfer', (req: Request, res: Response) => {
    res.json([
        { route: "/internal/transfer", purpose: "send to Spotify" }
    ])
})

//h1 EXPORT
export { router };
