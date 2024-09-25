import express, { Express, Request, Response, Router } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();
const router: Router = Router();

//h1 System Logs
console.log(`Now in ./src/routes/router.ts`);

//h1 Routers
app.get('/openai', (req: Request, res: Response) => {
  res.send({ message: "Server --> OpenAI" });
});

app.get('/spotify', (req: Request, res: Response) => {
  res.send({ message: "Server --> Spotify" });
});

//h2 Server
app.get('/', (req: Request, res: Response) => {
  res.send({ message: "Server --> Server" });
});

//h2 Fallbacks