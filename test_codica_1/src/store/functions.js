export function parseCookie(cookieStr) { //+
  return Object.fromEntries(
    cookieStr // "locationIDs=1,2,3; lang=EN"
    .split('; ') // >> ["locationIDs=1,2,3", "lang=EN"]
    .map(x => x.split('=')) // >> [["locationIDs", "1,2,3"], ["lang", "EN"]]
  ) // >> {locationIDs: "1,2,3", lang: "EN"}
}
export async function getCurrentWeatherByCityName({ name, lang }) { //+
  try {
    const response = await fetch(`/.netlify/functions/getCurrentWeatherByCityName?name=${encodeURI(name)}&lang=${lang}`)
    if (!response.ok) { throw response.statusText }
    const { weather } = await response.json()
    return [weather, null]
  } catch (error) {
    return [null, 'Something went wrong :-(']
  }
}
export async function getCurrentWeatherByCityId({ locationId, lang }) { //+
  try {
    const response = await fetch(`/.netlify/functions/getCurrentWeatherByCityId?locationId=${locationId}&lang=${lang}`)
    if (!response.ok) { throw response.statusText }
    const { weather } = await response.json()

    return [weather, null]
  } catch (error) {
    return [null, 'Something went wrong :-(']
  }
}
export async function getCurrentWeatherByGeographicCoordinates({ latitude, longitude, lang }) { //+
  try {
    const response = await fetch(`/.netlify/functions/getCurrentWeatherByGeographicCoordinates?lat=${latitude}&lon=${longitude}&lang=${lang}`)
    if (!response.ok) { throw response.statusText }
    const { weather } = await response.json()

    return [weather, null]
  } catch (error) {
    return [null, 'Something went wrong :-(']
  }
}
export async function getHourlyForecastByGeographicCoordinates({ latitude, longitude, lang }) {
  try {
    const response = await fetch(`/.netlify/functions/getHourlyForecastByGeographicCoordinates?lat=${latitude}&lon=${longitude}&lang=${lang}`)
    if (!response.ok) { throw response.statusText }
    const { weather } = await response.json()

    return [weather, null]
  } catch (error) {
    return [null, 'Something went wrong :-(']
  }
}
export async function updateTheWeather({ locationId, lang }) {
  try {
    const response = await fetch(`/.netlify/functions/getCurrentWeatherByCityId?locationId=${locationId}&lang=${lang}`)
    if (!response.ok) { throw response.statusText }
    const { weather } = await response.json()

    return [weather, null]
  } catch (error) {
    return [null, 'Something went wrong :-(']
  }
}
