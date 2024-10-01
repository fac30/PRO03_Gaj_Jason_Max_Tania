import { OpenAIQuery } from "./openaiQuery"

export interface UserInput extends OpenAIQuery {
    date: Date,
    playlistCount: number
};