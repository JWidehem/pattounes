// Header.js

// Import necessary libraries and components
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import './Header.scss'; // Ensure the SCSS file for styles is linked
import logo from '../img/logo-color.png'; // Import the modified logo

// Define the functional component Header
const Header = () => {
  const location = useLocation(); // Get the current location

  return (
    // Main header element
    <header className="header">
      <nav className="nav">
        <ul>
          {/* Navigation link to the Services page */}
          <li>
            <Link
              to="/services"
              className={location.pathname === '/services' ? 'active' : ''} // Add 'active' class if the current path is '/services'
            >
              Services
            </Link>
          </li>
          {/* Navigation link to the About page */}
          <li>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''} // Add 'active' class if the current path is '/about'
            >
              About
            </Link>
          </li>
        </ul>
        {/* Logo container with a link to the home page */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" /> {/* Display the logo */}
          </Link>
        </div>
        <ul>
          {/* Navigation link to the Gallery page */}
          <li>
            <Link
              to="/gallery"
              className={location.pathname === '/gallery' ? 'active' : ''} // Add 'active' class if the current path is '/gallery'
            >
              Gallery
            </Link>
          </li>
          {/* Navigation link to the Booking page */}
          <li>
            <Link
              to="/booking"
              className={location.pathname === '/booking' ? 'active' : ''} // Add 'active' class if the current path is '/booking'
            >
              Booking
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Export the Header component for use in other parts of the application
export default Header;