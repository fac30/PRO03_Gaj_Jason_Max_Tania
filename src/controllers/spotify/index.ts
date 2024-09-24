import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

//access the client id and sectret on the .env ignore file
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// this allows access without needing user permission. 
const sdk = SpotifyApi.withClientCredentials(clientId, clientSecret);
console.log('Client ID:', clientId);
console.log('Client Secret:', clientSecret);

//an async function which right now is filling the node console with artist: name, followers, popularity. using spotifyClientCredentials.
async function searchArtist() {
    try {
        console.log("Searching Spotify for The Beatles...");
        
    //here i'll create 
        const items = await sdk.search("Astroworld", ["album"]);
        console.log("Searching:", items.albums.items[0]);

        // // Printing the albums along with their popularity   
        // console.table(items.albums.items.map((item) => ({
        //     name: item.name,
        //     popularity: item.popularity,
        // })));
    } catch (error) {
        console.error("Error searching for artist:", error);
    }
}

// Call the function
searchArtist();