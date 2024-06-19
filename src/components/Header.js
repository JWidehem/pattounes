import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'; // Assurez-vous de lier le fichier SCSS pour les styles
import logo from '../img/logo-color.png'; // Importez le logo modifié

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/booking">Booking</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
