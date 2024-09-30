/* import promptSync from 'prompt-sync'; */
import { UserInput } from "../types/userInput.js";
/* const prompt = promptSync(); */

async function getUserInput(): Promise<UserInput> {
    /* const mood: string = await prompt(`
        Tell me what happened on that date, and how you felt about it.
    `);

    const genre: string = await prompt(`
        What genre of music would you like to feature on this playlist?
    `); */

    const mood: string = "It was dark and stormy";

    const genre: string = "Me like pigs";
    
    const userInput: UserInput = {
        eventDescription: mood,
        musicGenre: genre,
        date: new Date()
    };
    
    /* userInput.date.setFullYear(parseInt(await prompt(`Type a 4 digit year`), 10));
    userInput.date.setMonth(parseInt(await prompt(`Type a 2 digit month`), 10));
    userInput.date.setDate(parseInt(await prompt(`Type a 2 digit day`), 10)); */
    userInput.date.setFullYear(1994);
    userInput.date.setMonth(5);
    userInput.date.setDate(23);

    return userInput;
}

export { getUserInput };