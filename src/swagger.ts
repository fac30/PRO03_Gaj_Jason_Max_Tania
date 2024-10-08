import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Playlist API',
      version: '1.0.0',
      description: 'API to generate a playlist based on user input.',
    },
    components: {
      schemas: {
        UserInput: {
          type: 'object',
          properties: {
            eventDescription: { type: 'string', description: 'User mood or event description.' },
            musicGenre: { type: 'string', description: 'Preferred music genre.' },
            date: { type: 'string', format: 'date', description: 'Selected date.' },
          },
          required: ['eventDescription', 'musicGenre', 'date'],
        },
        OpenAIQuery: {
          type: 'object',
          properties: {
            eventDescription: { type: 'string', description: 'User mood or event description.' },
            musicGenre: { type: 'string', description: 'Preferred music genre.' },
          },
          required: ['eventDescription', 'musicGenre'],
        },
        OpenAIResponse: {
          type: 'object',
          properties: {
            mood: { type: 'string', description: 'OpenAI inferred mood based on user input.' },
            genre: { type: 'string', description: 'Preferred music genre.' },
            spotifyFeatures: {
              $ref: '#/components/schemas/SpotifyFeatures',
            },
          },
          required: ['mood', 'genre'],
        },
        SpotifyFeatures: {
          type: 'object',
          properties: {
            valence: {
              type: 'number',
              description: 'A measure from 0.0 to 1.0 describing the musical positivity of the track.',
            },
            energy: {
              type: 'number',
              description: 'A measure from 0.0 to 1.0 that represents intensity and activity.',
            },
            danceability: {
              type: 'number',
              description: 'A measure from 0.0 to 1.0 that describes how suitable a track is for dancing.',
            },
            acousticness: {
              type: 'number',
              description: 'A confidence measure from 0.0 to 1.0 on whether the track is acoustic.',
            },
            tempo: {
              type: 'number',
              description: 'The overall estimated tempo of a track in beats per minute (BPM).',
            },
          },
          required: ['valence', 'energy', 'danceability', 'acousticness', 'tempo'],
        },
        SpotifyQuery: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date',
              description: 'The date of the query.',
            },
            spotifyFeatures: {
              $ref: '#/components/schemas/SpotifyFeatures',
            },
            mood: {
              type: 'string',
              description: 'The mood description from the OpenAI response.',
            },
            genre: {
              type: 'string',
              description: 'The music genre chosen by the user.',
            },
          },
          required: ['date', 'spotifyFeatures', 'mood', 'genre'],
        },
        Track: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Song title.' },
            artist: { type: 'string', description: 'Artist name.' },
            album: { type: 'string', description: 'Album name.' },
            releaseDate: { type: 'string', format: 'date', description: 'Song release date.' },
            duration: { type: 'integer', format: 'int32', description: 'Duration in seconds.' },
          },
          required: ['title', 'artist', 'album', 'releaseDate', 'duration'],
        },
        SpotifyResponse: {
          type: 'array',
          items: { $ref: '#/components/schemas/Track' },
        },
      },
    },
    paths: {
      '/playlist': {
        get: {
          tags: ['Endpoint'],
          summary: 'Ask user for an event date, description and music genre and send back a playlist.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserInput' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Generated playlist based on user input.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SpotifyResponse' },
                },
              },
            },
            '400': {
              description: 'Invalid input.',
            },
          },
        },
      },
      '/openai': {
        get: {
          tags: ['Dev Endpoints'],
          summary: 'Get the inferred mood and spotify feature metric settings extracted from event description by OpenAI',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OpenAIQuery' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Return mood and spotify feature metric settings.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/OpenAIResponse' },
                },
              },
            },
            '404': {
              description: 'No mood found.',
            },
          },
        },
      },
      '/spotify': {
        get: {
          tags: ['Dev Endpoints'],
          summary: 'Search for tracks and return a playlist based on a predefined genre, date and spotify feature metric settings.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SpotifyQuery' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Return a playlist to be delivered to the user.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SpotifyResponse' },
                },
              },
            },
            '404': {
              description: 'No songs found.',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.ts', './app.ts'], // Adjust the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default function swaggerDocs(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}