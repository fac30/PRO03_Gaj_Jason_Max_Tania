//h1 IMPORT
import { AutoRouter, html, IRequest, json, text } from "itty-router";

//h1 ROUTES
const router = AutoRouter({ base: "/go" });

router.get("/openai", ( req: IRequest ) => {
    console.log("Router Path: ./routes/router:openai");
});

router.get("/spotify", ( req: IRequest ) => {
    console.log("Router Path: ./routes/router:spotify");
});

router.get("/", ( req: IRequest ) => {
    console.log("Router Path: ./routes/router:server");
});

export { router };