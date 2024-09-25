import { openaiResponse } from "./openaiResponse.ts";

interface spotifyQuery extends openaiResponse {
    date: Date
};

export { spotifyQuery };