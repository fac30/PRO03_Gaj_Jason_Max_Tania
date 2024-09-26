import { spotifyFeatures } from "./spotifyQuery.js";

export interface openaiResponse {
    mood: string,
    genre: string,
    spotifyFeatures: spotifyFeatures
};