import SpotifyWebApi from 'spotify-web-api-node';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../config';

// Accessing the client ID and secret from the .env file
const clientId = SPOTIFY_CLIENT_ID!;
const clientSecret = SPOTIFY_CLIENT_SECRET!;

// Initialize the Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// List of album names from your SQL query
const albums = [
  'The Wall', 'Kind of Blue', '25', 'Born to Run', 'Highway 61 Revisited',
  'The Rise and Fall of Ziggy Stardust', 'Elvis Presley', 'The Man-Machine',
  'Wasting Light', 'Because the Internet', 'The Essential Pavarotti',
  'Let It Bleed', 'It\'s Not Unusual', 'Hello, Dolly!',
  'Blues Breakers with Eric Clapton', 'Abbey Road', 'Discovery',
  'OK Computer', 'Teenage Dream', 'The Number of the Beast',
  'Blue Train', 'Maiden Voyage', 'Moanin\'',
  'Genius of Modern Music: Volume 1', 'Song for My Father',
  'Who\'s Next', 'Arrival', 'Technique', 'Disraeli Gears',
  'The Fame', 'Crazy Blues', 'West End Blues',
  'Black Snake Moan', 'Downhearted Blues', 'The Mooche',
  'Sing, Sing, Sing', 'Minnie the Moocher', 'One O\'Clock Jump',
  'Strange Fruit', 'In the Mood', 'Pet Sounds',
  'Come Fly with Me', 'Californication', 'Licensed to Ill',
  'No Fences', '1989', 'After Hours', 'The Joshua Tree',
  'DAMN.', 'Chromatica'
];

// Function to authenticate and get access token using client credentials
const authenticateSpotify = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    console.log('The access token is: ' + data.body['access_token']);

    // Set access token on the API object
    spotifyApi.setAccessToken(data.body['access_token']);
  } catch (error) {
    console.error('Error authenticating with Spotify:', error);
  }
};

// Function to fetch album image from Spotify API
const getAlbumImage = async (albumName: string) => {
  try {
    // Step 1: Search for the album by name
    const searchResponse = await spotifyApi.searchAlbums(albumName, { limit: 1 });
    
    const albumsItems = searchResponse.body.albums.items;
    
    if (albumsItems.length > 0) {
      const albumId = albumsItems[0].id;

      // Step 2: Get detailed album info including images
      const albumResponse = await spotifyApi.getAlbum(albumId);
      
      return albumResponse.body.images; // Return the images key
    } else {
      console.log(`No album found for ${albumName}`);
    }
  } catch (error) {
    console.error(`Error fetching album image for ${albumName}:`, error);
  }
  return null;
};

// Function to fetch images for all albums
const fetchAlbumImages = async () => {
  await authenticateSpotify(); // Authenticate before making requests
  
  for (const album of albums) {
    const images = await getAlbumImage(album);
    if (images) {
      console.log(`Images for ${album}:`, images);
    } else {
      console.log(`No images found for ${album}`);
    }
  }
};

// Run the function to fetch album images
fetchAlbumImages();