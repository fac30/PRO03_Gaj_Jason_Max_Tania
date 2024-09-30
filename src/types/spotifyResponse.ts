export interface track {
    id: string,
    title: string,
    artist: string,
    album: string,
    releaseDate: Date,
    duration: number
};

export type spotifyResponse = track[];