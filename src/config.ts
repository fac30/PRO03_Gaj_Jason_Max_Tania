import { config as dotenvConfig } from 'dotenv';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

dotenvConfig();

const requiredEnvVars = [
  'OPENAI_API_KEY',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  const secret_name = 'moodtimesecrets';
  const client = new SecretsManagerClient({
    region: 'eu-west-2',
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT',
      })
    );
  } catch (error) {
    console.error('Error retrieving secrets from AWS Secrets Manager:', error);
    throw error;
  }

  const secretString = response.SecretString;

  if (secretString) {
    const secrets = JSON.parse(secretString);

    process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || secrets.OPENAI_API_KEY;
    process.env.SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || secrets.SPOTIFY_CLIENT_ID;
    process.env.SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || secrets.SPOTIFY_CLIENT_SECRET;
  } else {
    console.error('SecretString is empty');
    throw new Error('Failed to retrieve secrets from AWS Secrets Manager');
  }
}

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
export const PORT = process.env.PORT || 80;