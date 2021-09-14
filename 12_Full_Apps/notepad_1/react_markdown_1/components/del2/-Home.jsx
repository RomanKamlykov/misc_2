import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import treeBuilder from './utils/treeBuilder old';
import ArticlesTree from './ArticlesTree';
import Recent from './Recent';
import Favorites from './Favorites';
import Search from './Search';
// import './Home.scss';

export default function Home() {
  // const [pages, setPages] = useState([]);
  // const pages = [{ _id: '123', title: '123' }];
  // const rootEl = useRef(null);

  // const loadPages = async () => {
  //   const uri = 'http://localhost:8888/.netlify/functions/getPages';

  //   try {
  //     const { data } = await axios.get(uri);
  //     setPages(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   loadPages();
  // }, []);

  // useEffect(() => {
  //   treeBuilder(pages, rootEl);
  // }, [pages]);

  // if (!pages.length) return <div>Loading...</div>;
  return (
    <main className="home">
      <div className="articles-tree">
        <ArticlesTree />
      </div>
      <div className="recent">
        <Recent />
      </div>
      <div className="favorites">
        <Favorites />
      </div>
      <div className="search">
        <Search />
      </div>
      {/* <div>
        {pages.map((page) => (<li key={page._id}><Link to={`/view/${page._id}`}>{page.title}</Link></li>))}
      </div>
      <div ref={rootEl} /> */}
    </main>
  );
}
