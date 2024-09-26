//h1 itty-router syntax
import { AutoRouter, html, IRequest, json, text } from "itty-router";

const router = AutoRouter();

router
    .all("/go/*", hub.fetch)
    .get('/', () => ({ message: "Router Path: './app'" }));
    
//n3 one day. sigh.