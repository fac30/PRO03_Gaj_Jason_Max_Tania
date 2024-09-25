interface track {
    title: string,
    artist: string,
    album: string,
    realeaseDate: Date,
    duration: number
};

type spotifyResponse = track[];

export { spotifyResponse };