//h1 IMPORT
import { Request, Response, Router } from "express";
// import { userInput } from "../../controllers/internal/getInput.js";

const router = Router();

//h1 ACTIVE
router.get("/test", (req: Request, res: Response) => {
  res.json(
    { route: "/api/user/test", message: "User Router" }
  );
});

/* router.get('/input', (req: Request, res: Response) => {}); */

/* router.get('/output', (req: Request, res: Response) => {}); */

//h1 EXPORT
export { router };
