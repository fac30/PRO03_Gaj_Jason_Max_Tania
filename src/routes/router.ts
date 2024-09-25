import express, { Express, Request, Response, Router } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();
const router: Router = Router();

//h1 System Logs
console.log(`Now in ./src/routes/router.ts`);

//h1 Routers
router.get('/openai', (req: Request, res: Response) => {
  res.send({ message: "Server --> OpenAI" });
});

router.get('/spotify', (req: Request, res: Response) => {
  res.send({ message: "Server --> Spotify" });
});

//h2 Server
router.get('/', (req: Request, res: Response) => {
  res.send({ message: "Server --> Server" });
});

//h2 Fallbacks

export