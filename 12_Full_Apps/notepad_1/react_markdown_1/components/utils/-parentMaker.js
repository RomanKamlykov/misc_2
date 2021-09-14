// @ts-check
/**
 * @returns {string}
 */
export default function parentMaker() {
  const { href } = document.location;
  const parent = Number(href.split('/').pop());
  return parent;
}
