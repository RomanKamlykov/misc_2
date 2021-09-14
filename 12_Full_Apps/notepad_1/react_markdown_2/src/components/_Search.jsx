import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Search() {
  const history = useHistory();
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/search/${query}`);
  }

  return (
    <div className="search">
      <h3>Search</h3>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" onChange={(e) => { setQuery(e.target.value); }} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
