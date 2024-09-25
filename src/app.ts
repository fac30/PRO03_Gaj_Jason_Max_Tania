import express, { Express, Request, Response, Router } from "express";
import * as dotenv from "dotenv";
import * as hub from "./routes/router.js";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();
const router: Router = Router();

app.use(hub);

app.listen(keys.port, () => {
  console.log(`Server running on port ${keys.port}`);
});