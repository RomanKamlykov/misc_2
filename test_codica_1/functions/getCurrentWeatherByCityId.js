const fetch = require("node-fetch");
const { API_KEY } = process.env;
const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

exports.handler = async (event, context, callback) => {
  const { locationId, lang } = event.queryStringParameters;
  try {
    const response = await fetch(`${API_ENDPOINT}?appid=${API_KEY}&id=${locationId}&units=metric&lang=${lang}`);
    if (!response.ok) { throw Error(response.statusText); }

    const weather = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ weather })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: String(error)
    }
  }
}
