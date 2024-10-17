import React from 'react';
// import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        {/* <li><Link to="/admin">Admin</Link></li> Link to admin page */}
      </ul>
    </nav>
  );
}

export default Navigation;