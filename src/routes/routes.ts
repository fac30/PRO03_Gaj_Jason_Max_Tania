//h1 IMPORT
import express, { Request, Response, Router } from "express";

import { router as openAI } from "./openAI/index.js";
import { router as spotify } from "./spotify/index.js";
import { router as user } from "./internal/user.js";

const app = express();
const router = express.Router();

app.use(openAI);
app.use(spotify);
app.use(user);

//h1 EXPORT
export { router };