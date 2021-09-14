import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home2 from './components/Home2';
import Post2 from './components/Post2';
import Search2 from './components/Search2';

export default function App2() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/edit/:id">
            <div>123</div>
          </Route>
          <Route path="/post/:id">
            <Post2 />
          </Route>
          <Route path="/search/:q">
            <Search2 />
          </Route>
          <Route path="/help">
            <div>123</div>
          </Route>
          <Route path="/">
            <Home2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
