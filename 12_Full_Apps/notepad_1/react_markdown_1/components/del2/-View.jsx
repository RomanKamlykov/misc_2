import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
// import './View.scss';

export default function View() {
  const [article, setArticle] = useState('');
  const { id } = useParams();
  // const container = document.querySelector('.header .nav ul');

  async function loadArticle() {
    const uri = 'http://localhost:8888/.netlify/functions/readArticle';

    try {
      const { data } = await axios.get(uri, { params: { id } });
      setArticle(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadArticle();
  }, [id]);

  async function deleteArticle() {
    const uri = 'http://localhost:8888/.netlify/functions/deleteArticle';

    try {
      const result = confirm('You serious?');
      if (result) console.log(id);
      // const { data } = await axios.get(uri, { params: { id } });
      // if (confirm('You serious?')) console.log(id);
      // setArticle(data);
    } catch (error) {
      console.error(error);
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
            <Link to={`/edit/${id}`} className="btn">Edit</Link>
          </li>
          <li>
            <button type="button" className="btn" onClick={deleteArticle}>Delete</button>
          </li>
        </ul>
      </header>
      <main className="view">
        {/* --- markdown --- */}
        <article className="article">
          <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml>
            {article.markdown}
          </ReactMarkdownWithHtml>
        </article>

        {/* --- control --- */}
        {/* {container && ReactDOM.createPortal(
          <>
            <li>
              <Link to={`/edit/${id}`} className="btn">Edit</Link>
            </li>
            <li>
              <button type="button" className="btn" onClick={deleteArticle}>Delete</button>
            </li>
          </>,
          container,
        )} */}
      </main>
    </>
  );
}
