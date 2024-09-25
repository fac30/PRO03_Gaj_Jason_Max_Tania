//h1 IMPORT
import { AutoRouter } from "itty-router";

//h1 ROUTES
export const router = AutoRouter({ base: "/go" });

router.get("/", () => "Router Path: ./routes/router");

/* router.get('/openai', (req: Request, res: Response) => {
    res.send({ message: "Server --> OpenAI" });
});
router.get('/spotify', (req: Request, res: Response) => {
    res.send({ message: "Server --> Spotify" });
});
router.get('/', (req: Request, res: Response) => {
    res.send({ message: "Server --> Server" });
}); */