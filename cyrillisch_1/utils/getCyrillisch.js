const fetch = require('node-fetch');
const getFromDb2 = require('./getFromDb2');
const getOnline = require('./getOnline');

async function getCyrillisch(eng) {
  let cyr = [];
  const arrayEng = eng
    .trim()
    .replaceAll('.', '')
    .replaceAll(',', '')
    .replaceAll(':', '')
    .replaceAll(';', '')
    .replaceAll('!', '')
    .replaceAll('?', '')
    .split(' ');
  // const arrayCyr = await Promise.all(arrayEng.map(async (wordEng) => {
  //   if(!wordEng.match(/\w/)) return `\"${wordEng}\"`;
  //   const wordCyr = await getFromDb(wordEng) || await getOnline(wordEng) || `\"${wordEng}\"`;
  //   return wordCyr;
  // }));
  // cyr = arrayCyr.join(' ');

  // await Promise.all(arrayEng.forEach(async (wordEng) => {
  //   if(!wordEng.match(/\w/)) {
  //     cyr.push({ wordEng, wordCyr: '', });
  //     return;
  //   }
  //   const wordCyr = await getFromDb(wordEng) || await getOnline(wordEng) || '';
  //   cyr.push({ wordEng, wordCyr, });
  //   return;
  // }));

  // arrayEng.forEach(async (wordEng) => {
  //   if(!wordEng.match(/\w/)) { cyr.push({ wordEng, wordCyr: '', }); return; }
  //   const wordCyr = await getFromDb(wordEng) || await getOnline(wordEng) || '';
  //   cyr.push({ wordEng, wordCyr, }); return;
  // });

  cyr = await Promise.all(arrayEng.map(async (wordEng) => {
    if(!wordEng.match(/\w/)) return { wordEng, wordCyr: '', };
    const wordCyr = await getFromDb2(wordEng) || await getOnline(wordEng) || '';
    return { wordEng, wordCyr, };
  }));

  console.log(cyr);
  return cyr;
}

module.exports = getCyrillisch;
