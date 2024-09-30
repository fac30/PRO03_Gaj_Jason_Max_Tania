export interface spotifyFeatures {
    valence: number, 
    energy: number,
    danceability: number,
    acousticness: number,
    tempo: number
}

export interface openaiResponse {
    mood: string,
    genre: string,
    spotifyFeatures: spotifyFeatures
};

export interface Emotion {
  name: string;
  spotify_features: spotifyFeatures;
}