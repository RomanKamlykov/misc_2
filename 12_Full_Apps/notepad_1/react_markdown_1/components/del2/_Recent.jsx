import React from 'react';
import { Link } from 'react-router-dom';
import useGetRecentPages from './custom_hooks/useGetRecentPages';

export default function Recent() {
  const pages = useGetRecentPages();
  if (!pages) return <p>Loading...</p>;
  // const pages = [{ _id: '123', title: '123' }];

  return (
    <div className="recent">
      <h3>Recent</h3>
      <ul className="list-unstyled">
        {pages.map((page) => (<li key={page._id}><Link to={`/view/${page._id}`}>{page.title || 'Untitled'}</Link></li>))}
      </ul>
    </div>
  );
}
