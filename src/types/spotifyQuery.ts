import { openaiResponse } from "./openaiResponse";

export interface spotifyQuery extends openaiResponse {
    date: Date,
};

/*
Instantiating an entire spotifyQuery object will look like:

const query: spotifyQuery = {
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