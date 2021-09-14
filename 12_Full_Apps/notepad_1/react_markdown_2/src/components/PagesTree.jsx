import React from 'react';
import { Link } from 'react-router-dom';
import useGetAllPagesList from './custom_hooks/useGetAllPagesList';

export default function ArticlesTree() {
  // get array of articles
  const { data: articles } = useGetAllPagesList();
  if (!articles) return <p>Loading...</p>;
  // const articles = [...data];

  function toggleClass(event) {
    event.target.parentElement.classList.toggle('opened');
  }

  function treeBuilder(parentKey) {
    // array of React elements
    const children = [];

    // loop through the array of articles
    for (let i = 0; i < articles.length;) {
      const article = articles[i];

      // check the article
      if (article.parent === parentKey) {
        // push a React element to the array
        children.push(
          <li key={article._id}>
            <Link to={`/view/${article._id}`} className="view" target="_blank">{article.title || 'Untitled'}</Link>
            <Link to={`/new/${article.key}`} className="new">[+]</Link>
            {treeBuilder(article.key)}
          </li>,
        );

        // remove the article from the array
        articles.splice(i, 1);
        // start over
        i = 0;
      } else {
        // check next article
        i += 1;
      }

      // finnaly
      if (articles.length === 0) {
        children.push(
          <li key=":-)">
            <Link to={`/new/${0}`} className="new">[+]</Link>
          </li>,
        );
      }
    }

    if (!children.length) return null;
    return (
      <>
        <ol key={children[0]._id}>{children}</ol>
        <button type="button" className="btn-open" onClick={toggleClass}>＋</button>
        <button type="button" className="btn-close" onClick={toggleClass}>－</button>
      </>
    );
  }

  return (
    <>
      <h3>Articles tree</h3>
      {treeBuilder(0)}
    </>
  );
}
