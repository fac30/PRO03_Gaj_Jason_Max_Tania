//h1 SETUP
import * as dotenv from 'dotenv';

import express, { Request, Response } from 'express';
import { AutoRouter, html, IRequest, json, text } from "itty-router";

import swaggerDocs from './swagger.js';

import { router as hub } from "./routes/router.js";

//h2 CONFIG
dotenv.config();
const keys = { port: process.env.PORT };

const app = express();
const router = AutoRouter();

swaggerDocs(app);

//h1 ACTIVE
app.listen(keys.port, () => {
  console.log(`Port ${keys.port}`)
});

//h2 Routers
router
  .all("/go/*", hub.fetch)
  .get('/', () => ({ message: "Router Path: './app'" }));

//h3 Old Express Routers
/* app.get('/openai', (req: Request, res: Response) => {
  res.send({ message: "Server --> OpenAI" });
});
app.get('/spotify', (req: Request, res: Response) => {
  res.send({ message: "Server --> Spotify" });
});
app.get('/', (req: Request, res: Response) => {
  res.send({ message: "Server --> Server" });
}); */

//h1 EXPORT
export default router;