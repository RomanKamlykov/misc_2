// @ts-check
/**
 * @param {string} str
 * @returns {string}
 */
export default function titleMaker(str) {
  if (!str) return '';
  const indexEnd = str.indexOf('\n');
  if (!indexEnd) return str;
  const title = str.substring(0, indexEnd).replace(/#/g, '').trim();
  return title;
}
