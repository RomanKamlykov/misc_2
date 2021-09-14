import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import useGetPath from './custom_hooks/useGetPath';
import deletePageRequest from './utils/deletePageRequest';

export default function Nav() {
  const { id } = useParams();
  const history = useHistory();
  // let path = [];
  // if (id) path = useGetPath(id);
  const path = useGetPath(id);
  function deletePage() {
    deletePageRequest(id);
    history.push('/');
  }

  return (
    <nav className="nav">
      <ul className="breadcrumb list-unstyled">
        <li>
          <Link to="/">🏠</Link>
        </li>
        {path.map((page) => (<li key={page._id}><Link to={`/view/${page._id}`}>{page.title || 'Untitled'}</Link></li>))}
      </ul>

      <ul className="control list-unstyled">
        <li>
          <Link to={`/edit/${id}`} className="btn-plain">✏️</Link>
        </li>
        <li>
          <button type="button" className="btn-plain" onClick={deletePage}>🗑️</button>
        </li>
      </ul>
    </nav>
  );
}
