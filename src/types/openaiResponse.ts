export interface SpotifyFeatures {
    valence: number, 
    energy: number,
    danceability: number,
    acousticness: number,
    tempo: number
}

export interface OpenAIResponse {
    mood: string,
    genre: string,
    spotifyFeatures: SpotifyFeatures
};

export interface Emotion {
  name: string;
  spotify_features: SpotifyFeatures;
}