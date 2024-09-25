import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();

//h1 Routers
app.get('/openai', (req: Request, res: Response) => {
  res.send({ message: "Server --> OpenAI" });
});

app.get('/spotify', (req: Request, res: Response) => {
  res.send({ message: "Server --> Spotify" });
});

//h2 Fallback
app.get('/', (req: Request, res: Response) => {
  res.send({ message: "Server --> Server" });
});

//h1 Listeners
app.listen(keys.port, () => {
  console.log(`Server running on port ${keys.port}`);
});