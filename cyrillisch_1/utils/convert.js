// @ts-check
const map = {
  'm': 'м',
  'n': 'н',
  'ŋ': 'ң',

  'p': 'п', 'b': 'б',
  't': 'т', 'd': 'д',
  'k': 'к', 'ɡ': 'г',
  'ʧ': 'ч', 'ʤ': 'дж',

  'f': 'ф', 'v': 'в',
  'θ': 'ћ', 'ð': 'ђ',
  's': 'с', 'z': 'з',
  'ʃ': 'ш', 'ʒ': 'ж',
  'h': 'х',

  'l': 'л',
  'r': 'р',
  'j': 'й',
  'w': 'ў',

  'æ': 'æ',
  'a': 'а', 'ɑ': 'а',
  'e': 'е', 'ɛ': 'е',
  'ə': 'ә', 'ʌ': 'ә',
  'i': 'и', 'ɪ': 'и',
  'o': 'о', 'ɔ': 'о', 'ɒ': 'о',
  'u': 'у', 'ʊ': 'у',

  'ː': 'ː',
}

const map2 = {
  'm': 'm',
  'n': 'n',
  'ŋ': 'ŋ',

  'p': 'p', 'b': 'b',
  't': 't', 'd': 'd',
  'k': 'k', 'ɡ': 'g',
  'ʧ': 'ch', 'ʤ': 'j',

  'f': 'f', 'v': 'v',
  'θ': 'th', 'ð': 'dh',
  's': 's', 'z': 'z',
  'ʃ': 'sh', 'ʒ': 'zh',
  'h': 'х',

  'l': 'l',
  'r': 'r',
  'j': 'y',
  'w': 'w',

  'æ': 'æ',
  'a': 'a', 'ɑ': 'a',
  'e': 'e', 'ɛ': 'e',
  'ə': 'ə', 'ʌ': 'ə',
  'i': 'i', 'ɪ': 'i',
  'o': 'o', 'ɔ': 'o', 'ɒ': 'o',
  'u': 'u', 'ʊ': 'u',

  'ː': 'ː',
}

const map3 = {
  'm': 'м',
  'n': 'н',
  'ŋ': 'ң',

  'p': 'п', 'b': 'б',
  't': 'т', 'd': 'д',
  'k': 'к', 'ɡ': 'г',
  'ʧ': 'ч', 'ʤ': 'дж',

  'f': 'ф', 'v': 'в',
  'θ': 'ћ', 'ð': 'ђ',
  's': 'с', 'z': 'з',
  'ʃ': 'ш', 'ʒ': 'ж',
  'h': 'х',

  'l': 'л',
  'r': 'р',
  'j': 'й',
  'w': 'ў',

  'a': 'а',
  'æ': 'æ',
  'ɛ': 'е', 'e': 'е',
  'ə': 'ә',
  'i': 'ӥ', 'ɪ': 'и',
  'ɔ': 'ӧ', 'ɑ': 'о', 'o': 'о',
  'u': 'уу', 'ʊ': 'у',
}
/**
 * @param {string} phonetic_transcription
 * @returns {string}
 */
function convert(phonetic_transcription) {
  let wordCyr;
  const arr = phonetic_transcription
    .replaceAll('/', '')
    .replaceAll('ˈ', '')
    .replaceAll('ˌ', '')
    .replaceAll(/\(.\)/g, '')
    // .replaceAll('(', '')
    // .replaceAll(')', '')
    .replaceAll('tʃ', 'ʧ')
    .replaceAll('dʒ', 'ʤ')
    .split('');
  wordCyr = arr.map(s => {
    return map3[s] || `[${s}]`;
  })
  // .map((s, i, arr) => {
  //   if(s == 'и' && arr[i-1] == 'а') return 'й';
  //   if(s == 'и' && arr[i-1] == 'е') return 'й';
  //   if(s == 'и' && arr[i-1] == 'о') return 'й';

  //   if(s == 'ː') return arr[i-1];
  //   return s;
  // })
  .join('');
  return wordCyr;
}

module.exports = convert;
