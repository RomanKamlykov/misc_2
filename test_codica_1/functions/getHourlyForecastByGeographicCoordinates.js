const fetch = require("node-fetch")
const { API_KEY } = process.env
const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/onecall"

exports.handler = async (event, context, callback) => {
  const { lat, lon, lang } = event.queryStringParameters
  
  try {
    const response = await fetch(`${API_ENDPOINT}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=metric&lang=${lang}&exclude=minutely,daily,alerts`)
    if (!response.ok) { throw 'Something went wrong :-(' }

    const weather = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify({ weather }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: error,
    }
  }
}
