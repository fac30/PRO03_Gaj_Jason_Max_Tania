import promptSync from 'prompt-sync';
import { userInput } from "../types/userInput.js";
const prompt = promptSync();

async function userInput() {
    const mood: string = prompt(`
        Tell me what happened on that date, and how you felt about it.
    `);

    const genre: string = prompt(`
        What genre of music would you like to feature on this playlist?
    `);
    
    const userInput: userInput = {
        eventDescription: mood,
        musicGenre: genre,
        date: new Date()
    };
    
    userInput.date.setFullYear(parseInt(await prompt(`Type a 4 digit year`), 10));
    userInput.date.setMonth(parseInt(await prompt(`Type a 2 digit month`), 10));
    userInput.date.setDate(parseInt(await prompt(`Type a 2 digit day`), 10));

    return userInput;
}

userInput();

export { userInput };