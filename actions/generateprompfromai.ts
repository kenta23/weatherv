'use server'

import { generateText } from 'ai';
import { createTogetherAI } from '@ai-sdk/togetherai';


const togetherai = createTogetherAI({ 
  apiKey: process.env.TOGETHER_AI_APIKEY ?? '',
  baseURL: 'https://api.together.ai/v1',
})

export async function generatePromptFromAI(prompt: Record<string | symbol, number> | undefined) {
  try {
    const { text } = await generateText({ 
        model: togetherai('meta-llama/Llama-3-70b-chat-hf'),
        system: 'You are a helpful assistant. ' + 'Please make a description about this data of air quality in weather based on this breakdown components i gave you here.' + 'To give you more ideas, this aqi data are from OpenWeather API, Take a look at their api to know the concepts' + 'If you didnt receive the data just say "No data summarize"' + "Don't overexplain, just simplify the info for example 'The current air quality index is poor. avoid strenuous activities and exposure'",
        prompt: `Make a short one paragraph description and summarize how good the air quality index right now ${JSON.stringify(prompt)}`,
    });
 
    return text;
    
  } catch (error) {
    console.log(error);
    return;
  }

}