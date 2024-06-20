// About.js

// Import necessary libraries and components
import React from 'react';
import './About.scss'; // Ensure the SCSS file for styles is linked
import lisaPhoto from '../img/Lisa-About.webp'; // Updated path to the image
import ContactForm from '../components/ContactForm'; // Import the ContactForm component

// Define the functional component About
const About = () => {
  return (
    // Main container for the About section
    <div className="about-container">
      <div className="about-content">
        <div className="about-left">
          {/* Header section with a title */}
          <div className="about-header">
            <h1>Lisa, the Pet Sitter you need!</h1>
          </div>
          {/* Presentation section with a description */}
          <div className="about-presentation">
            <p>
              My name is Lisa and I was born in the Nord Pas de Calais. I have always had a deep passion for animals. As a child, I often negotiated to have a pet, but since it was not possible, I took care of the cats that came into our family garden. Once independent, I had the joy of adopting my cat Bounty and my dog Floki.
              <br /><br />
              During the 2020 lockdown, I decided to go back to school to obtain my veterinary assistant diploma, motivated by my unwavering passion. I then chose to turn this passion into a profession by obtaining my Certificate of Capacity for Domestic Animals in January 2024. That's how I founded my business in Lille under the name "Les P'tites Pattounes".
            </p>
          </div>
          {/* Container for the contact form */}
          <div className="contact-button-container">
            <ContactForm /> {/* Include the ContactForm component */}
          </div>
        </div>
        <div className="about-right">
          {/* Container for the photo */}
          <div className="about-photo">
            <img src={lisaPhoto} alt="Lisa" /> {/* Display the photo of Lisa */}
          </div>
        </div>
      </div>
      {/* Section for certifications */}
      <div className="certifications">
        <h2>Certifications</h2>
        <div className="certification-item">
          <p>Certificate of Capacity for Domestic Animals - January 2024</p>
          <p>Veterinary Assistant Diploma - 2020</p>
        </div>
      </div>
    </div>
  );
};

// Export the About component for use in other parts of the application
export default About;