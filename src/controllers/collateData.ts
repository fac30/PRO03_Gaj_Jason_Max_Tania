import { SpotifyQuery } from '../types/spotifyQuery';
import { OpenAIResponse } from '../types/openaiResponse';

export function collateData(features: OpenAIResponse, date: string, playlistCount: number): SpotifyQuery {
    return {
        ...features,
        date: new Date(date),
        playlistCount: playlistCount
    };
}
