//h1 SETUP
import * as dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import swaggerDocs from './swagger.js';
import { router as hub } from "./routes/routes.js";

//h2 CONFIG
dotenv.config();
const keys = { port: process.env.PORT };
const app = express();
const router = Router();
swaggerDocs(app);

//h1 ACTIVE
app.listen(keys.port, () => {
	console.log(`Server Listening on Port ${keys.port}`)
});

//h2 Routers
app.use('/api', hub);

//h2 Endpoints
app.get('/', (req: Request, res: Response) => {
	res.send(`
		<h1>MoodTime</h1>
		<h2>Available Endpoints:</h2>
		<ul>
			<li><a href="/api">/api</a> - API root</li>
			<ul>
				<li><a href="/api/openAI">/api/openAI</a> - OpenAI-related endpoints</li>
				<li><a href="/api/spotify">/api/spotify</a> - Spotify-related endpoints</li>
				<li><a href="/api/user">/api/user</a> - User-related endpoints</li>
				<li><a href="/api/transfer">/api/transfer</a> - Transfer-related endpoints</li>
			</ul>
		</ul>
	`);
});

//h1 EXPORT
export { router };