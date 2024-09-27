import fs from 'fs';
import OpenAI from "openai";
import dotenv from 'dotenv';
import emotionsToAttributes from '../../data/schema/emotionsToAttributes.json' assert { type: 'json' };

dotenv.config();

// Initialize OpenAI with your API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Function to get embeddings for any given text using OpenAI's embeddings API
async function getEmbeddingForText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return response.data[0].embedding;
}

// Precompute embeddings for all emotions and save them in a file
async function precomputeAndSaveEmbeddings() {
  const emotionEmbeddings = {};

  for (const emotion of emotionsToAttributes.emotions) {
    const embedding = await getEmbeddingForText(emotion.name);
    emotionEmbeddings[emotion.name] = embedding;
  }

  // Save embeddings to a file
  fs.writeFileSync('precomputedEmbeddings.json', JSON.stringify(emotionEmbeddings, null, 2));
  console.log('Precomputed embeddings saved to precomputedEmbeddings.json');
}

// Run this once to precompute the embeddings and save them
precomputeAndSaveEmbeddings().catch(console.error);