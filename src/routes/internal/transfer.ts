//h1 IMPORT
import { Request, Response, Router } from "express";

const router = Router();

//h1 ACTIVE
router.get('/', (req: Request, res: Response) => {
	res.json([
			{ route: "/api/transfer/", purpose: "transfer Router" }
	])
})

//h1 EXPORT
export { router };
