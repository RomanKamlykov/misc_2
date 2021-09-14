import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import useGetSearchData from './custom_hooks/useGetSearchData';

export default function Search2() {
  const history = useHistory();
  const { q } = useParams();
  console.log(q);
  const { posts } = useGetSearchData(q);
  const [query, setQuery] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/search/${query}`);
  }

  return (
    <div className="view sheet">

      <nav className="nav">
        <ul className="breadcrumb list-unstyled">
          <li><Link to="/">🏠</Link></li>
        </ul>
        <ul className="control list-unstyled">
          <li><Link to="/pages-tree" className="btn-plain">🌳</Link></li>
        </ul>
      </nav>

      <div className="search">
        <h3>Search</h3>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="" id="" onChange={(e) => { setQuery(e.target.value); }} />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="recent">
        <h3>Posts</h3>
        <ul className="list-unstyled">
          {posts.map((el) => (
            <li key={el._id}><Link to={`/post/${el._id}`}>{el.title || 'Untitled'}</Link></li>
          ))}
        </ul>
      </div>

    </div>
  );
}
