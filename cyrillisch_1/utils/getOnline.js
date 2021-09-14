const fetch = require('node-fetch');
const getFromDb = require('./getFromDb');
const convert = require('./convert');
const capitalizeFirstLetter = require('./capitalizeFirstLetter');
const EngCyr = require('./models/EngCyr');

async function getOnline(wordEng) {
  let wordCyr;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${wordEng}`;
  const response = await fetch(url);
  if (!response.ok) return undefined;
  const data = await response.json();
  // if (data[0].word.toLowerCase() != wordEng.toLowerCase()) return undefined;
  if (!data[0]?.phonetics[0]?.text) return undefined;
  let phonetic_transcription = data[0].phonetics[0].text;

  if (data[0].word.toLowerCase() + 'ing' == wordEng.toLowerCase()) phonetic_transcription = phonetic_transcription + '/ɪŋ/';
  if (data[0].word.toLowerCase() + 's' == wordEng.toLowerCase()) phonetic_transcription = phonetic_transcription + '/s/';

  wordCyr = convert(phonetic_transcription);
  // const word = new EngCyr({ eng: wordEng, cyr: wordCyr });
  // await word.save();
  if(wordEng.charAt(0).match(/[A-Z]/g)) wordCyr = capitalizeFirstLetter(wordCyr);
  return wordCyr;
}

module.exports = getOnline;
