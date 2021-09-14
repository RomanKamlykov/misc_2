import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import Home from './Home';
import New from './New';
import Edit from './Edit';
import View from './View';
import './Main.scss';

export default function Main() {
  return (
    <main className="main">
      <Switch>
        <Route path="/new/:parentKey">
          <New />
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/view/:id">
          <View />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </main>
  );
}
