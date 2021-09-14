import React, { useEffect, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useArticlesTree from './custom_hooks/useArticlesTree';
import treeBuilder from './utils/treeBuilder old';

export default function ArticlesTree() {
  // const rootEl = useRef(null);
  const articles = useArticlesTree();
  const rootEl = useCallback(
    (node) => {
      // console.log(node);
      if (articles.data && node) treeBuilder([...articles.data], node);
    },
    [articles],
  );

  const history = useHistory();

  function handleClick(event) {
    if ((event.target.tagName === 'A') && (event.target.classList.contains('view'))) {
      event.preventDefault();
      const url = event.target.href;
      const id = url.split('/').pop();
      history.push(`/view/${id}`);
    }

    if ((event.target.tagName === 'A') && (event.target.classList.contains('new'))) {
      event.preventDefault();
      const url = event.target.href;
      const key = url.split('/').pop();
      history.push(`/new/${key}`);
    }
  }

  // if (articles.data && rootEl) treeBuilder([...articles.data], rootEl);
  // useEffect(() => {
  // treeBuilder([...articles.data], rootEl);
  // }, [articles]);
  // const articles = [{ _id: '123', title: '123' }];
  // if (articles.data) console.log([...articles.data]);

  if (!articles.data) return <p>Loading...</p>;
  return (
    <>
      <div>Articles</div>
      <TreeBuilder articles={[...articles.data]} />
      <div ref={rootEl} onClick={handleClick} />
    </>
  );
}
