const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();
const aget = promisify(client.get).bind(client);
const convert2 = require('./convert2');

async function getFromDb2(wordEng) {
  try {
    const phonetic_transcription = await aget(wordEng.toLowerCase());
    // client.quit(); здесь не закрываем соединение, т.к. происходит "затык" на самом сервере redis
    const wordCyr = convert2(phonetic_transcription);
    return wordCyr;
  } catch (error) {
    console.log(error);
    return '';
  }
}

module.exports = getFromDb2;
