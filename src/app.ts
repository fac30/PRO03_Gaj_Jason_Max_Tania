//h1 SETUP
import * as dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import swaggerDocs from './swagger.js';
import { router as routes } from "./routes/routes.js";

//h2 CONFIG
dotenv.config();
const keys = { port: process.env.PORT };
const app = express();
const router = express.Router();
swaggerDocs(app);

//h1 ACTIVE
app.listen(keys.port, () => { console.log(`Server Listening on Port ${keys.port}`) });

//h2 Routers
app.use(routes);

//h2 Routes
app.get('/', (req: Request, res: Response) => {
    res.json({ route: "/", message: "test router" });
})

app.get('/routes', (req: Request, res: Response) => {
    res.json({ route: "/routes", message: "test router" });
});

app.get('/routes/internal/transfer', (req: Request, res: Response) => {
    res.json({ route: "/routes/internal/transfer", message: "test router" });
})

app.get('/routes/internal/user', (req: Request, res: Response) => {
    res.json({ route: "/routes/internal/user", message: "test router" });
});

app.get("/routes/external/openAI", (req: Request, res: Response) => {
    res.json({ route: "/routes/external/openAI", message: "test router" });
});

app.get("/routes/external/spotify", (req: Request, res: Response) => {
    res.json({ route: "/routes/external/spotify", message: "test router" });
});

//h1 EXPORT
export { router };