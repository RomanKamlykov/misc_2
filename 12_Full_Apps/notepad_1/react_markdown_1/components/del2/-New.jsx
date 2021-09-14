import React, { useState, useEffect } from 'react';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import titleMaker from './utils/titleMaker';

export default function New() {
  // const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const { parentKey } = useParams();

  // const history = useHistory();

  // setParent(history.location.hash);
  // console.log(history.location);

  async function saveArticle() {
    const uri = 'http://localhost:8888/.netlify/functions/createArticle';
    const title = titleMaker(markdown);
    if (!title) return;
    // const parent = parentMaker();
    const parent = Number(parentKey);

    const article = {
      title,
      markdown,
      parent,
    };
    try {
      await axios.post(uri, article);
    } catch (error) {
      console.log(error);
    }
  }

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
        </ul>
      </header>
      <main className="new">
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
      </main>
    </>
  );
}
