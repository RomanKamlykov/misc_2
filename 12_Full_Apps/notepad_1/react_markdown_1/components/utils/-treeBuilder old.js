// @ts-check
/**
 * @param {Array} arrayOfArticles
 * @param {Element} parentElement
 * @param {number} parentKey
 * @returns {void}
 */
export default function treeBuilder(arrayOfArticles, parentElement, parentKey = 0) {
  // create and append an <ol> element to the parent
  const olElement = document.createElement('ol');
  // olElement.classList.add('list-unstyled');
  parentElement.appendChild(olElement);

  // loop through the arrayOfArticles
  for (let i = 0; i < arrayOfArticles.length;) {
    const article = arrayOfArticles[i];

    // check the article
    if (article.parent === parentKey) {
      // create and append an <li> element to the parent
      const liElement = document.createElement('li');

      // <a> to /view
      const aElement = document.createElement('a');
      aElement.classList.add('view');
      aElement.innerText = article.title;
      aElement.href = `/view/${article._id}`;
      liElement.appendChild(aElement);

      // <a> to /new
      const aElement2 = document.createElement('a');
      aElement2.classList.add('new');
      aElement2.innerText = '[+]';
      aElement2.href = `/new/${article.key}`;
      liElement.appendChild(aElement2);

      olElement.appendChild(liElement);

      // remove the article from the array
      arrayOfArticles.splice(i, 1);
      // look for child articles
      treeBuilder(arrayOfArticles, liElement, article.key);
      // start over
      i = 0;
    } else {
      // check next article
      i += 1;
    }

    // finnaly
    if (arrayOfArticles.length === 0) {
      const liElement = document.createElement('li');
      const aElement = document.createElement('a');
      aElement.classList.add('new');
      aElement.innerText = '[+]';
      aElement.href = `/new/${0}`;
      liElement.appendChild(aElement);
      olElement.appendChild(liElement);
    }
  }
}
