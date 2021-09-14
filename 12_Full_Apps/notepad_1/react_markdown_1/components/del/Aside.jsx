import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import Recent from './Recent';
import Favorites from './Favorites';
import ArticlesTree from './ArticlesTree';

export default function Aside() {
  return (
    <div className="col-md-2 py-3 bg-light bg-gradient">
      <ol className="list-unstyled">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">New</Link>
        </li>
      </ol>
      <Recent />
      <Favorites />
      {/* <ArticlesTree /> */}
    </div>
  );
}
