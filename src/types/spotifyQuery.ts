import { openaiResponse } from "./openaiResponse.js";

interface spotifyFeatures {
    valence: number, 
    energy: number,
    danceability: number,
    acousticness: number,
    tempo: number
}

interface spotifyQuery extends openaiResponse {
    date: Date,
    spotifyFeatures: spotifyFeatures
};

/*
Instantiating an entire spotifyQuery object will look like:

const query: spotifyQuery = {
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

export { spotifyQuery };