// netlify/functions/getBikeData.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { make, model } = event.queryStringParameters;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`, {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  }
};
