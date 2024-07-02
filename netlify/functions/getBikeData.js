const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { make, model } = event.queryStringParameters;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`, {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};