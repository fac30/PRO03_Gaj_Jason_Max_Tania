//h1 IMPORT
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import { AutoRouter, html, IRequest, json, text } from "itty-router";
import { router as hub } from "./routes/router.js";

//h1 CONFIG
dotenv.config();
const keys = { port: process.env.PORT };
const app = express();
const router = AutoRouter();

//h1 SERVER
app.listen(keys.port, () => {
  console.log(`Port ${keys.port}`)
});

router
  .all("/go/*", hub.fetch)
  .get('/', () => ({ message: "Router Path: './app'" }));

//h1 EXPORT
export default router;