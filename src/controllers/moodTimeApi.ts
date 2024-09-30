import { userInput } from "../types/userInput";
import { openaiQuery } from "../types/openaiQuery";
import { openaiResponse } from "../types/openaiResponse";
import { spotifyQuery } from "../types/spotifyQuery";
import { spotifyResponse } from "../types/spotifyResponse";
import { generateFeatures } from "./openai/extractEmotion";
import { generatePlaylist } from './spotify/generatePlaylist';

async function moodTimeApi(input: userInput) {
    const date = new Date(input.date);
    const openaiQuery: openaiQuery = { 
        eventDescription: input.eventDescription, 
        musicGenre: input.musicGenre 
    };
    const openaiResponse: openaiResponse = await generateFeatures(openaiQuery);
    const spotifyQuery: spotifyQuery = {
        mood: openaiResponse.mood,
        genre: openaiResponse.genre,
        spotifyFeatures: openaiResponse.spotifyFeatures,
        date: date
    };
    const spotifyResponse: spotifyResponse = await generatePlaylist(spotifyQuery);
    return spotifyResponse;
}

export { moodTimeApi };
