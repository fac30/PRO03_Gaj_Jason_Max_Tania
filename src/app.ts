import express, { Express, Request, Response, Router } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();
const router: Router = Router();

//h1 System Logs
console.log(`Now in ./app`);

//h1 Routers

//h2 Fallback
app.get('/', (req: Request, res: Response) => {
  res.send({ message: "Server --> Server" });
});

//h1 Listeners
app.listen(keys.port, () => {
  console.log(`Server running on port ${keys.port}`);
});