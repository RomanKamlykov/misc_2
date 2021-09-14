import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';
import View from './View';
import SearchPage from './SearchPage';
import Login from './Login';
// import PagesTree from './components/PagesTree';

export default function App2() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/edit/:id">
            <Edit />
          </Route>
          <Route path="/view/:id">
            <View />
          </Route>
          <Route path="/help">
            <div>123</div>
          </Route>
          <Route path="/pages-tree">
            <div>123</div>
          </Route>
          <Route path="/search/:query">
            <SearchPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
