import { GoogleGenerativeAI } from '@google/generative-ai';
import { rightSwipedActivities } from '../screens/SwipeScreen';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateDateRecommendations() {
  if (rightSwipedActivities.length === 0) {
    console.log('No activities have been liked yet. Swipe right on some activities to get recommendations!');
    return;
  }

  const likedActivities = rightSwipedActivities
    .map(activity => activity.title)
    .join(', ');

  const prompt = `Based on these liked date activities: ${likedActivities}, 
    suggest 3 specific date ideas that combine or build upon these interests. 
    For each suggestion, provide a brief description and why it would be a good match.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('\n=== Date Recommendations ===\n');
    console.log(text);
    
  } catch (error) {
    console.error('Error generating date recommendations:', error);
  }
}