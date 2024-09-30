import { SpotifyQuery } from '../types/spotifyQuery';
import { OpenAIResponse } from '../types/openaiResponse';

export function collateData(features: OpenAIResponse, date: Date): SpotifyQuery {
    return {
        ...features,
        date: date.toISOString().split('T')[0]
    };
}
