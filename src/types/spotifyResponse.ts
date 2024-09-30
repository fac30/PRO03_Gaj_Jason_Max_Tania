export interface Track {
    id: string,
    title: string,
    artist: string,
    album: string,
    releaseDate: Date,
    duration: number
};

export type SpotifyResponse = Track[];