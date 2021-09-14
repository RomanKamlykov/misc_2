import React from 'react';
import { Link } from 'react-router-dom';

function Li({ art }) {
  return (
    <li>
      <Link to={`/view/${art._id}`} className="view">{art.title}</Link>
      <Link to={`/new/${art.key}`} className="new">[+]</Link>
    </li>
  );
}

export default function TreeBuilder2({ articles }) {
  const art = [...articles];

  function T2({ parentKey }) {
    const children = [];
    for (let i = 0; i < art.length;) {
      const article = art[i];

      if (article.parent === parentKey) {
        children.push(
          <li>
            <Link to={`/view/${article._id}`} className="view">{article.title}</Link>
            <Link to={`/new/${article.key}`} className="new">[+]</Link>
            <T2 parentKey={article.key} />
          </li>,
        );

        art.splice(i, 1);
        i = 0;
      } else {
        // check next article
        i += 1;
      }
    }

    if (!children.length) return null;
    return <ol>{children}</ol>;
  }

  return (
    <div>
      <T2 parentKey={0} />
    </div>
  );
}
