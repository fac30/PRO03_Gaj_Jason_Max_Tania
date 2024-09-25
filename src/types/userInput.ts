import { openaiQuery } from "./openaiQuery.ts"

interface userInput extends openaiQuery {
    date: Date
};

export { userInput };