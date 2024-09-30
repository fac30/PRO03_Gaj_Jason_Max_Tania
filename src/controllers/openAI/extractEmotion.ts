import OpenAI from "openai";
import dotenv from 'dotenv';
import emotionsToAttributes from '../../data/schema/emotionsToAttributes.json' assert { type: 'json' };
import { OpenAIQuery } from "../../types/openaiQuery";
import { OpenAIResponse } from "../../types/openaiResponse";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//example 
const userInput: OpenAIQuery = {
  eventDescription: "I feel amazing and happy today, filled with excitement!",
  musicGenre: "pop"
}

//function to extract emotions from text
async function extractEmotionFromText(query: OpenAIQuery): Promise<string[]> {
    try {
      // Call the OpenAI Chat Completion API
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'user', content: query.eventDescription },
          { role: 'system', content: 'Please extract the mood or emotions from the above text. It should be 3-5 emotions as an array of strings, and the output should be a valid JSON array. Do not format it in code blocks or include any extra characters.' },
        ],
      });
  
      // Extract the emotion from the response and ensure it's valid JSON
      const emotionText = response.choices[0].message?.content?.trim() ?? '';  // Trim any extra spaces or characters
      //console.log('Raw emotion response:', emotionText);  // Log the raw response for debugging
  
      // Try parsing the result as JSON
      const emotions = JSON.parse(emotionText);  // This should be a valid JSON array
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
  
// Function to get embeddings for any given text using OpenAI's embeddings API
async function getEmbeddingForText(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });
    //console.log(`Embedding for "${text}":`, response.data[0].embedding);  // Debugging embedding generation
    return response.data[0].embedding;
  }
  
// Function to find the closest matching emotion using embeddings and cosine similarity
async function findClosestEmotionUsingEmbeddings(extractedEmotion: string): Promise<any> {
    // Get the embedding for the extracted emotion
    const extractedEmotionEmbedding = await getEmbeddingForText(extractedEmotion);
  
    let highestSimilarity = -Infinity;
    let closestEmotion = null;
  
    // console.log('Emotions to compare:', emotionsToAttributes.emotions);  // Debugging JSON data
  
    for (const emotion of emotionsToAttributes.emotions) {
      // Get the embedding for the emotion name
      const emotionEmbedding = await getEmbeddingForText(emotion.name);
  
      // Calculate the cosine similarity between the extracted emotion and the emotion name
      const similarityScore = cosineSimilarity(extractedEmotionEmbedding, emotionEmbedding);
      
      //console.log(`Similarity between "${extractedEmotion}" and "${emotion.name}": ${similarityScore}`);  // Debugging similarity scores
  
      // Track the highest similarity score and corresponding emotion
      if (similarityScore > highestSimilarity) {
        highestSimilarity = similarityScore;
        closestEmotion = emotion;  // Save the closest emotion object
      }
    }
  
    return closestEmotion; // || { message: 'No close emotion found' };
  }


// Function to transform the object
function transformEmotionObject(emotionObj: any, query: OpenAIQuery): OpenAIResponse {
  return {
    mood: emotionObj.name,
    genre: query.musicGenre, 
    spotifyFeatures: emotionObj.spotify_features
  };
}

  

async function generateFeatures(userInput: OpenAIQuery): Promise<OpenAIResponse> {
  try {
    const extractedEmotions = await extractEmotionFromText(userInput);
    const chosenEmotion = getRandomEmotion(extractedEmotions);
    const closestEmotion = await findClosestEmotionUsingEmbeddings(chosenEmotion);
    const transformedObject = transformEmotionObject(closestEmotion, userInput);
    console.log(transformedObject);
    
    return transformedObject; // Return the transformed object if everything succeeds
  } catch (error) {
    console.error('Error:', error);
    
    // Return a default object in case of error
    return {
      mood: 'neutral',
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