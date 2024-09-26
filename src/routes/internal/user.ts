//h1 IMPORT
import express, { Request, Response, Router } from "express";

import { userInput } from "../../controllers/user/getInput.js";

const app = express();
const router = express.Router();

//h1 ACTIVE
//app.get userInput

//h1 EXPORT
export { router };
