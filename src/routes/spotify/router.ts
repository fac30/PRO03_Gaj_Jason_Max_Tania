import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();

console.log(`Now in ./src/routes/spotify/router.ts`);