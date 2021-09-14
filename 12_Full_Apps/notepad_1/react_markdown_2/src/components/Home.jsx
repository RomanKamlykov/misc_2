import React from 'react';
import Nav from './_NavHome';
import ChildPages from './_ChildPages';
import SearchForm from './_Search';
import Recent from './_Recent';
// import Favorites from './_Favorites';

export default function Home() {
  return (
    <div className="home sheet">
      <Nav />
      <ChildPages />
      <SearchForm />
      <Recent />
      {/* <Favorites /> */}
    </div>
  );
}
