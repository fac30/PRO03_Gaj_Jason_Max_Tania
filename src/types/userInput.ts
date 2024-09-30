import { openaiQuery } from "./openaiQuery"

export interface userInput extends openaiQuery {
    date: Date
};