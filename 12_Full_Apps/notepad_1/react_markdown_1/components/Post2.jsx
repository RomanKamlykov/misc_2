import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import useGetPostData from './custom_hooks/useGetPostData';

export default function Post2() {
  const { id } = useParams();
  const { path, post, childPosts } = useGetPostData(id);

  return (
    <div className="view sheet">

      <nav className="nav">
        <ul className="breadcrumb list-unstyled">
          <li><Link to="/">🏠</Link></li>
          {path.map((el) => (<li key={el._id}><Link to={`/post/${el._id}`}>{el.title || 'Untitled'}</Link></li>))}
        </ul>
        <ul className="control list-unstyled">
          <li><Link to={`/edit/${post.id}`} className="btn-plain">✏️</Link></li>
          <li><button type="button" className="btn-plain">🗑️</button></li>
        </ul>
      </nav>

      <div className="page">
        <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml>
          {post.markdown}
        </ReactMarkdownWithHtml>
      </div>

      <div className="child-pages">
        <h3>Posts</h3>
        <ul className="list-unstyled">
          {childPosts.map((el) => (
            <li key={el._id}><Link to={`/post/${el._id}`}>{el.title || 'Untitled'}</Link></li>
          ))}
          <li><button type="button" className="btn-plain">Add a post</button></li>
        </ul>
      </div>

    </div>
  );
}
