import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Main from './components/Main';

import Home from './components/Home';
import New from './components/New';
import Edit from './components/Edit';
import View from './components/View';
// import './App.scss';

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <header className="header">
          <Navbar />
        </header>
        <main className="main"> */}
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
        {/* </main> */}
      </div>
    </Router>
  );
}
