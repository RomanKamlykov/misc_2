import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link, Route, useParams, useLocation,
} from 'react-router-dom';
// import './Navbar.scss';

export default function Navbar() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  // const { id } = useParams();

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className="navbar-brand">Home</Link>
        </li>
      </ul>
      {/* <div className="home" />
      <div className="control" /> */}
    </nav>
  );
}
