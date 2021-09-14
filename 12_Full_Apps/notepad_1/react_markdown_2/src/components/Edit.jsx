import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import useGetMarkdown from './custom_hooks/useGetMarkdown';
// import useGetPage from './custom_hooks/useGetPage';
import updatePageRequest from './utils/updatePageRequest';

export default function Edit() {
  const { id } = useParams();
  const [markdown, setMarkdown] = useGetMarkdown(id);

  function updatePage() {
    updatePageRequest(id, markdown);
  }

  // if (!markdown) return <p>Loading...</p>;
  return (
    <>
      <div className="editor sheet">
        <form>
          <textarea value={markdown} onChange={(e) => { setMarkdown(e.target.value); }} />
        </form>

        <ul className="control list-unstyled">
          <li>
            <Link to="/help" className="btn-plain">❔</Link>
          </li>
          <li>
            <button type="button" className="btn-plain" onClick={updatePage}>💾</button>
          </li>
          <li>
            <Link to={`/view/${id}`} className="btn-plain">🚪</Link>
          </li>
        </ul>
      </div>

      <div className="preview sheet">
        <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml>
          {markdown}
        </ReactMarkdownWithHtml>
      </div>
    </>
  );
}
