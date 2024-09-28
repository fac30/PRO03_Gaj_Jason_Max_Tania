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
	res.json({
			message: "Welcome to the API",
			endpoints: [
					{
							path: "/api",
							description: "API root",
							subRoutes: [
									{
											path: "/openAI",
											description: "OpenAI-related endpoints"
									},
									{
											path: "/spotify",
											description: "Spotify-related endpoints"
									},
									{
											path: "/user",
											description: "User-related endpoints"
									},
									{
											path: "/transfer",
											description: "Transfer-related endpoints"
									}
							]
					}
			]
	});
});

//h1 EXPORT
export { router };