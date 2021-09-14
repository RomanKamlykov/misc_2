import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import useGetChildPages from './custom_hooks/useGetChildPages';
import createPageRequest from './utils/createPageRequest';

export default function ChildPages() {
  const { id } = useParams();
  const history = useHistory();
  const childPages = useGetChildPages(id);

  async function createPage() {
    const createdPageId = await createPageRequest(id);
    history.push(`/edit/${createdPageId}`);
  }

  return (
    <div className="child-pages">
      <h3>Pages</h3>
      <ul className="list-unstyled">
        {childPages.map((page) => (
          <li key={page._id}><Link to={`/view/${page._id}`}>{page.title || 'Untitled'}</Link></li>
        ))}
        <li>
          <button type="button" className="btn-plain" onClick={createPage}>Add a page</button>
        </li>
      </ul>
    </div>
  );
}
