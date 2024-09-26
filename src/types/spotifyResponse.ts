export interface track {
    title: string,
    artist: string,
    album: string,
    realeaseDate: Date,
    duration: number
};

export type spotifyResponse = track[];