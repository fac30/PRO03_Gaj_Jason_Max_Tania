import * as dotenv from 'dotenv';
import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import swaggerDocs from './swagger';
import { router as hub } from "./routes/routes";

dotenv.config();
const keys = { port: process.env.PORT };

const app = express();
const router = Router();

app.use(cors({
	origin: 'http://localhost:5173',
}));

swaggerDocs(app);

app.listen(keys.port, () => {
	console.log(`Server Listening on Port ${keys.port}`)
});

app.use('/api', hub);

app.get('/', (req: Request, res: Response) => {
	res.redirect('/api/');
});

export { router };