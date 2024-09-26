//h1 SETUP
import * as dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import swaggerDocs from './swagger.js';
import { router as routes } from "./routes/routes.js";

//h2 CONFIG
dotenv.config();
const keys = { port: process.env.PORT };
const app = express();
const router = express.Router();
swaggerDocs(app);

//h1 ACTIVE
app.listen(keys.port, () => { console.log(`Port ${keys.port}`) });

//h2 Routers
app.use(routes);

//h1 EXPORT
export { router };