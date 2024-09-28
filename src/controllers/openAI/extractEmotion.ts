import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function extractEmotionFromText(userInput: string): Promise<string> {
    try {
      // Call the OpenAI Chat Completion API
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'user', content: userInput },
          { role: 'system', content: 'Please extract the mood or emotions from the above text.' },
        ],
      });
  
      // Extract the emotion from the response
      const emotion = response.choices[0].message?.content || 'No emotion detected';
      return emotion;
  
    } catch (error) {
      console.error('Error extracting emotion:', error);
      throw error;
    }
  }
  
  // Example usage:
const demo = {
  userInput: `To be, or not to be, that is the question:
    Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune,
    Or to take Arms against a Sea of troubles,
    And by opposing end them: to die, to sleep
  `
};

/* extractEmotionFromText(demo.userInput)
  .then(emotion => { console.log(`Extracted Emotion: ${emotion}`)}); */

export { extractEmotionFromText }