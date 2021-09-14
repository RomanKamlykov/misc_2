import React from 'react';
import { Link } from 'react-router-dom';
import useGetFavoritePages from './custom_hooks/useGetFavoritePages';

export default function Favorites() {
  const pages = useGetFavoritePages();
  if (!pages) return <p>Loading...</p>;
  // const pages = [{ _id: '123', title: '123' }];

  return (
    <div className="favorites">
      <h3>Favorites</h3>
      <ul className="list-unstyled">
        {pages.map((page) => (<li key={page._id}><Link to={`/view/${page._id}`}>{page.title || 'Untitled'}</Link></li>))}
      </ul>
    </div>
  );
}
