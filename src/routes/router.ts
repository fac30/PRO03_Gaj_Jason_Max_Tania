import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const keys = { port: process.env.PORT }
const app: Express = express();

//h1 Routers

console.log(`Now in ./src/routes/router.ts`);