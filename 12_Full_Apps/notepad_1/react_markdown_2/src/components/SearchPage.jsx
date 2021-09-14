import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavHome from './_NavHome';
import SearchForm from './_Search';
import useGetFilteredPages from './custom_hooks/useGetFilteredPages';

export default function SearchPage() {
  const { query } = useParams();
  const pages = useGetFilteredPages(query);
  if (!pages) return <p>Loading...</p>;

  return (
    <div className="sheet">
      <NavHome />
      <SearchForm />

      <div className="recent">
        <h3>Results</h3>
        <ul className="list-unstyled">
          {pages.map((page) => (<li key={page._id}><Link to={`/view/${page._id}`}>{page.title || 'Untitled'}</Link></li>))}
        </ul>
      </div>
    </div>
  );
}
