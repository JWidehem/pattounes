import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss'; // Assurez-vous de lier le fichier SCSS pour les styles
import logo from '../img/logo-color.png'; // Importez le logo modifié

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link
              to="/services"
              className={location.pathname === '/services' ? 'active' : ''}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
        </ul>
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link
              to="/gallery"
              className={location.pathname === '/gallery' ? 'active' : ''}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/booking"
              className={location.pathname === '/booking' ? 'active' : ''}
            >
              Booking
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
