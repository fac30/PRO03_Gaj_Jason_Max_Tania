//h1 IMPORT
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { AutoRouter } from "itty-router";
import { router as childRouter } from "./routes/router.js";

//h1 CONFIG
dotenv.config();
const keys = { port: process.env.PORT };
const app = express();
const router = AutoRouter();

//h1 SERVER
app.listen(keys.port, () => { console.log(`Port ${keys.port}`) });

router
  .all("/go/*", childRouter.fetch)
  .get('/', () => "Router Path: './app'");

//h1 EXPORT
export default router;