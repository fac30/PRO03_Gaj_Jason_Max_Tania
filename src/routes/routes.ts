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
	res.json({ route: "/api/", message: "Hub Router" });
});

//h1 EXPORT
export { router };