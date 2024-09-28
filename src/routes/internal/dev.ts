//h1 IMPORT
import express, { Request, Response, Router } from "express";

const app = express();
const router = express.Router();

//h1 ACTIVE
// app.get('/', (req: Request, res: Response) => {
//     res.json([
//         { route: "dev test", purpose: "test router" }
//     ])
// });

//h1 EXPORT
export { router };
