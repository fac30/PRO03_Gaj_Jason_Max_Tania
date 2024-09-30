import { OpenAIResponse } from "./openaiResponse";

export interface SpotifyQuery extends OpenAIResponse {
    date: string,
};

/*
Instantiating an entire spotifyQuery object will look like:

const query: SpotifyQuery = {
    date: ...,
    mood: "sad",
    genre: "jazz"
    spotifyFeatures: {
         valence: 0.9, 
        energy: 0.8,
        danceability: 0.8,
        acousticness: 0.1,
        tempo: 120  
    }
}; 
*/