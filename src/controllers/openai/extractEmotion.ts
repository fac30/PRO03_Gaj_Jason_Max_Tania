import OpenAI from "openai";
import dotenv from 'dotenv';
import { getEmbeddingForText } from '../../controllers/openai/getEmbeddings';
import precomputedEmbeddings from '../../data/schema/precomputedEmbeddings.json' assert { type: 'json' };
import emotionsToAttributes from '../../data/schema/emotionsToAttributes.json' assert { type: 'json' };
import { OpenAIQuery } from "../../types/openaiQuery.js";
import { OpenAIResponse, Emotion } from "../../types/openaiResponse.js"

dotenv.config();

// Initialize OpenAI with your API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example user input
const userInput: OpenAIQuery = {
  eventDescription: "I was so sad and didn't know what to expect, but suddenly everything changed and I felt myself really better.",
  musicGenre: "sad"
};

// Function to extract emotions from text
async function extractEmotionFromText(query: OpenAIQuery): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: query.eventDescription },
        { role: 'system', content: 'Please extract the mood or emotions from the above text. It should be 3-5 emotions as an array of strings, and the output should be a valid JSON array.' }
      ],
    });

    const emotionText = response.choices[0].message?.content?.trim() ?? '';
    const emotions = JSON.parse(emotionText);
    return emotions;

  } catch (error) {
    console.error('Error extracting emotions:', error);
    throw error;
  }
}

// Function to randomly choose one emotion from the list of extracted emotions
function getRandomEmotion(emotions: string[]): string {
  const randomIndex = Math.floor(Math.random() * emotions.length);
  return emotions[randomIndex];
}

// Function to compute cosine similarity between two embedding vectors
const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};


// Function to find the closest matching emotion using precomputed embeddings and cosine similarity
async function findClosestEmotionUsingPrecomputedEmbeddings(extractedEmotion: string): Promise<string> {
  // Get the embedding for the extracted emotion
  const extractedEmotionEmbedding = await getEmbeddingForText(extractedEmotion);

  let highestSimilarity = -Infinity;
  let closestEmotion = '';

  for (const [emotionName, emotionEmbedding] of Object.entries(precomputedEmbeddings)) {
    // emotionEmbedding is directly the array of numbers (embedding vector)
    const similarityScore = cosineSimilarity(extractedEmotionEmbedding, emotionEmbedding as number[]);

    // Track the highest similarity score and corresponding emotion
    if (similarityScore > highestSimilarity) {
      highestSimilarity = similarityScore;
      closestEmotion = emotionName;  // Save the emotion name (e.g., "Happy")
    }
  }

  return closestEmotion;  // Return the closest emotion name (string)
}


// Function to transform the object
function transformEmotionObject(closestEmotion: string, query: OpenAIQuery): OpenAIResponse {
  // // Step 1: Find the closest emotion in emotionsToAttributes.json
  // const emotionObj = emotionsToAttributes.emotions.find((emotion: any) => emotion.name === closestEmotion);
  
  // Step 1: Find the closest emotion in emotionsToAttributes
  const emotionObj: Emotion | undefined = emotionsToAttributes.emotions.find(
    (emotion: Emotion) => emotion.name === closestEmotion
  );
  
  // Handle the case where the emotion is not found
  if (!emotionObj) {
    throw new Error(`Emotion ${closestEmotion} not found`);
  }

  // Step 3: Create the response object
  return {
    mood: emotionObj.name,  // Use the found emotion's name
    genre: query.musicGenre,  // Use the genre from the query
    spotifyFeatures: emotionObj.spotify_features  // Use spotify_features from the found emotion
  };
}

// Main function to process everything
async function generateFeatures(userInput: OpenAIQuery): Promise<OpenAIResponse> {
  try {
    const extractedEmotions = await extractEmotionFromText(userInput);
    //console.log(`Extracted Emotions: ${extractedEmotions}`);

    const chosenEmotion = getRandomEmotion(extractedEmotions);
    //console.log(`Randomly Chosen Emotion: ${chosenEmotion}`);

    const closestEmotion = await findClosestEmotionUsingPrecomputedEmbeddings(chosenEmotion);
    //console.log('Closest Emotion Match:', JSON.stringify(closestEmotion, null, 2));

    const transformedObject = transformEmotionObject(closestEmotion, userInput);
    //console.log(transformedObject);

    return transformedObject;

  } catch (error) {
    console.error('Error:', error);

    // Return a default object in case of error
    return {
      mood: 'thats an error',
      genre: 'ambient',
      spotifyFeatures: {
        valence: 0.5,
        energy: 0.5,
        danceability: 0.5,
        tempo: 120,
        acousticness: 0.5,
      },
    };
  }
}

export {
	generateFeatures,
	userInput
};
