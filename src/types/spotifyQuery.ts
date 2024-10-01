import { OpenAIResponse } from "./openaiResponse";

export interface SpotifyQuery extends OpenAIResponse {
    date: Date,
    playlistCount: number
};