const EngCyr = require('./models/EngCyr');

async function getFromDb(wordEng) {
  let wordCyr;
  wordCyr = await EngCyr.findOne({ eng: wordEng });
  return wordCyr;
}

module.exports = getFromDb;
