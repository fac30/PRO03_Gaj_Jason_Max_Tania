//h1 IMPORT
import { Request, Response, Router } from "express";
import { router as openai } from "./openAI";
import { router as spotify } from "./spotify";
import { router as user } from "./user";
import { router as run } from "./run";
const router = Router();

//h1 Router
router.use('/openai', openai);
router.use('/spotify', spotify);
router.use('/user', user);
router.use('/run', run);

//h2 Routes
router.get('/', (req: Request, res: Response) => {
	res.redirect('/api/menu');
});

router.get('/menu', (req: Request, res: Response) => {
	res.send(`
		<h1>MoodTime</h1>
		<h2>Available Endpoints:</h2>
		<ul>
			<li><a href="/">/</a>: Redirect to \`/api\`</li>
			<ul>
				<li><a href="/api">/api</a>: Router Hub</li>
				<ul>
					<li><a href="/api/menu">/api/menu</a>: Show this menu</li>
					<li><a href="/api/openAI">/api/openAI</a>: OpenAI Routes</li>
					<ul>
						<li><a href="/api/openAI/extractEmotion">/api/openAI/extractEmotion</a>: Extract Emotion from Text</li>
					</ul>
					<li><a href="/api/spotify">/api/spotify</a>: Spotify Routes</li>
					<ul>
						<li><a href="/api/spotify/playlist">/api/spotify/playlist</a>: Generate Test Playlist</li>
					</ul>
					<li><a href="/api/user">/api/user</a> - User-Facing Endpoints</li>
					<ul>
						<li><a href="/api/user/input">/api/user/input</a>: Run CLI program to get user input</li>
						<li><a href="/api/user/output">/api/user/output</a>: Redirect to \`/api/spotify/playlist\`</li>
					</ul>
				</ul>
			</ul>
		</ul>
	`);
});

//h1 EXPORT
export { router };