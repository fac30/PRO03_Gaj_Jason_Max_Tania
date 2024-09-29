import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import swaggerDocs from './swagger.js';
import { router as hub } from "./routes/routes.js";

dotenv.config();
const keys = { port: process.env.PORT };

const app = express();
const router = Router();

swaggerDocs(app);

app.listen(keys.port, () => {
	console.log(`Server Listening on Port ${keys.port}`)
});

app.use('/api', hub);

export { router };