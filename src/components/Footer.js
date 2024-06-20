// Footer.js

// Import necessary libraries and components
import React from 'react';
import SocialButtons from './SocialButtons'; // Import the SocialButtons component
import Map from './Map'; // Import the Map component
import './Footer.scss'; // Import the specific SCSS file for styling

// Define the functional component Footer
const Footer = () => {
  return (
    // Main footer element
    <footer>
      <div className="footer-content">
        {/* Left section of the footer containing social buttons */}
        <div className="footer-left">
          <SocialButtons />
        </div>
        
        {/* Central section of the footer containing the map */}
        <div className="footer-map">
          <Map /> {/* Add the Map component here */}
        </div>
        
        {/* Right section of the footer containing legal notices */}
        <div className="footer-right">
          <h4>Legal Notices</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Use</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

// Export the Footer component for use in other parts of the application
export default Footer;