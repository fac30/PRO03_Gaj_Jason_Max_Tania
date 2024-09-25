import { openaiQuery } from "./openaiQuery.js"

interface userInput extends openaiQuery {
    date: Date
};

export { userInput };