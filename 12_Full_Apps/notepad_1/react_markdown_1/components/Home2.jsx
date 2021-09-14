import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useGetHomeData from './custom_hooks/useGetHomeData';

export default function Home2() {
  const history = useHistory();
  const { childPosts, recentPosts } = useGetHomeData();
  const [query, setQuery] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/search/${query}`);
  }

  return (
    <div className="home sheet">

      <nav className="nav">
        <ul className="breadcrumb list-unstyled">
          <li><Link to="/">🏠</Link></li>
        </ul>
        <ul className="control list-unstyled">
          <li><Link to="/pages-tree" className="btn-plain">🌳</Link></li>
        </ul>
      </nav>

      <div className="child-pages">
        <h3>Posts</h3>
        <ul className="list-unstyled">
          {childPosts.map((el) => (
            <li key={el._id}><Link to={`/post/${el._id}`}>{el.title || 'Untitled'}</Link></li>
          ))}
          <li><button type="button" className="btn-plain">Add a post</button></li>
        </ul>
      </div>

      <div className="search">
        <h3>Search</h3>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="" id="" onChange={(e) => { setQuery(e.target.value); }} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="recent">
        <h3>Recent</h3>
        <ul className="list-unstyled">
          {recentPosts.map((el) => (
            <li key={el._id}><Link to={`/post/${el._id}`}>{el.title || 'Untitled'}</Link></li>
          ))}
        </ul>
      </div>

    </div>
  );
}
