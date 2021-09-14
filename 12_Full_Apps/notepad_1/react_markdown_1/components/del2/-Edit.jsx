import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import axios from 'axios';
import titleMaker from './utils/titleMaker';
// import './Edit.scss';

export default function Edit() {
  const { id } = useParams();
  const [markdown, setMarkdown] = useState('');
  // const container = document.querySelector('.header .nav ul');

  async function loadArticle() {
    const uri = 'http://localhost:8888/.netlify/functions/readArticle';

    try {
      const { data } = await axios.get(uri, { params: { id } });
      setMarkdown(data.markdown);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadArticle();
  }, [id]);

  async function saveArticle() {
    const uri = 'http://localhost:8888/.netlify/functions/updateArticle';
    const title = titleMaker(markdown);

    if (!title) return;
    // const parent = parentMaker();
    // const parent = Number(parentKey);

    const article = {
      id,
      title,
      markdown,
    };
    try {
      await axios.post(uri, article);
    } catch (error) {
      console.log(error);
    }
  }

  if (!markdown) return <p>Loading...</p>;

  return (
    <>
      <header className="header">
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button type="button" className="btn" onClick={saveArticle}>Save</button>
          </li>
          <li>
            <Link to={`/view/${id}`} className="btn">View</Link>
          </li>
        </ul>
      </header>
      <main className="edit">
        <div className="editor">
          <form>
            <textarea value={markdown} onChange={(e) => { setMarkdown(e.target.value); }} />
          </form>
        </div>

        <div className="preview">
          <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml>
            {markdown}
          </ReactMarkdownWithHtml>
        </div>

        {/* --- control --- */}
        {/* {container && ReactDOM.createPortal(
        <>
          <li>
            <button type="button" className="btn" onClick={saveArticle}>Save</button>
          </li>
          <li>
            <Link to={`/view/${id}`} className="btn">View</Link>
          </li>
        </>,
        container,
      )} */}
      </main>
    </>
  );
}
