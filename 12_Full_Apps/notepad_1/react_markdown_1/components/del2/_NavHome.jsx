import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="breadcrumb list-unstyled">
        <li>
          <Link to="/">🏠</Link>
        </li>
      </ul>

      <ul className="control list-unstyled">
        <li>
          <Link to="/pages-tree" className="btn-plain">🌳</Link>
        </li>
      </ul>
    </nav>
  );
}
