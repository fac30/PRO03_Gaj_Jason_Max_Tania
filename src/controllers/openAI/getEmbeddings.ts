import fs from 'fs';
import OpenAI from "openai";
import dotenv from 'dotenv';
import emotionsToAttributes from '../../data/schema/emotionsToAttributes.json' assert { type: 'json' };

dotenv.config();

// Initialize OpenAI with your API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface EmotionEmbedding {
  name: string;
  spotify_features: any;  
  embedding: any;
}

// Function to get embeddings for any given text using OpenAI's embeddings API
export async function getEmbeddingForText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return response.data[0].embedding;
}

// Function to precompute embeddings for all emotions and save them in a file (to be run once)
export async function precomputeAndSaveEmbeddings() {
  const emotionEmbeddings: { [key: string]: EmotionEmbedding } = {};

  for (const emotion of emotionsToAttributes.emotions) {
    const embedding = await getEmbeddingForText(emotion.name);
    emotionEmbeddings[emotion.name] = {
      name: emotion.name,
      spotify_features: emotion.spotify_features,
      embedding: embedding
    };
  }

  // Save embeddings to a file (run this manually when needed)
  fs.writeFileSync('precomputedEmbeddings.json', JSON.stringify(emotionEmbeddings, null, 2));
  console.log('Precomputed embeddings saved to precomputedEmbeddings.json');
}

// Run this manually to generate embeddings
// precomputeAndSaveEmbeddings().catch(console.error); // Uncomment when you want to generate embeddings