import { openaiResponse } from "./openaiResponse.ts";

interface spotifyQuery extends openaiResponse {
    date: Date,
    mood: string,
    genre: string
};

export { spotifyQuery };