import { openaiQuery } from "./openaiQuery.js"

export interface userInput extends openaiQuery {
    date: Date
};