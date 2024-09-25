import { openaiResponse } from "./openaiResponse.js";

interface spotifyQuery extends openaiResponse {
    date: Date
};

export { spotifyQuery };