//h1 IMPORT
import { Request, Response, Router } from "express";
import { router as transfer } from "./internal/transfer.js";
import { router as user } from "./internal/user.js";
import { router as openAI } from "./external/openAI.js";
import { router as spotify } from "./external/spotify.js";

const router = Router();

//h1 Router
router.use('/openAI', openAI);
router.use('/spotify', spotify);
router.use('/user', user);
router.use('/transfer', transfer);

//h2 Routes
router.get('/', (req: Request, res: Response) => {
	res.send(`
		<h1>MoodTime</h1>
		<h2>Available Endpoints:</h2>
		<ul>
			<li><a href="/api">/api</a>: Router Hub</li>
			<ul>
				<li><a href="/api/openAI">/api/openAI</a>: OpenAI Router</li>
				<li><a href="/api/spotify">/api/spotify</a>: Spotify Router</li>
				<ul>
					<li><a href="/api/spotify/playlist">/api/spotify/playlist</a>: Generate Test Playlist</li>
				</ul>
				<li><a href="/api/user">/api/user</a> - User-Facing Endpoints</li>
				<ul>
					<li><a href="/api/user/input">/api/user/input</a>: Run CLI program to get user input</li>
					<li><a href="/api/user/output">/api/user/output</a>: Redirect to \`/api/spotify/playlist\`</li>
				</ul>
				<li><a href="/api/transfer">/api/transfer</a> - Data Transfer Endpoints</li>
			</ul>
		</ul>
	`);
});

//h1 EXPORT
export { router };