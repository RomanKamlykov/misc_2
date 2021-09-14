// @ts-check
/**
 * @param {string} phonetic_transcription
 * @returns {string}
 */
function convert(phonetic_transcription) {
  const wordCyr = phonetic_transcription
    .replaceAll('ˈ', '')
    .replaceAll('ˌ', '')
    .replaceAll('aɪ', 'ā')
    .replaceAll('eɪ', 'ē')
    .replaceAll('ɔɪ', 'ō')
    .replaceAll('aʊ', 'ă')
    .replaceAll('oʊ', 'ŏ')
    .replaceAll('ɑ', 'ä')
    .replaceAll('ɔ', 'ö')
    .replaceAll('u', 'ü')
    .replaceAll('ɛ', 'e')
    .replaceAll('ʊ', 'u')
    .replaceAll('ʌ', 'a')
    .replaceAll('tʃ', 'ʧ')
    .replaceAll('dʒ', 'ʤ');
  return wordCyr;
}

module.exports = convert;
