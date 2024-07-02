// netlify/functions/getBikeData.mjs
import fetch from 'node-fetch';

export async function handler(event, context) {
  const { make, model } = event.queryStringParameters;
  const apiKey = process.env.API_KEY;

  if (!make || !model) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Make and model are required parameters.' })
    };
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`, {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}