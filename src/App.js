// App.js

// Import necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Import the Home page component
import About from './pages/About'; // Import the About page component
import Services from './pages/Services'; // Import the Services page component
import Gallery from './pages/Gallery'; // Import the Gallery page component
import Booking from './pages/Booking'; // Import the Booking page component
import AdminDashboard from './pages/AdminDashboard'; // Import the AdminDashboard page component
import Login from './pages/Login'; // Import the Login page component
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import './App.scss'; // Import the global SCSS file for styles

// Define the functional component App
const App = () => {
  return (
    // Router component to handle routing
    <Router>
      {/* Header component */}
      <Header />
      {/* Main content area */}
      <div className="content">
        {/* Define routes for the application */}
        <Routes>
          <Route exact path="/" element={<Home />} /> {/* Route for the Home page */}
          <Route path="/about" element={<About />} /> {/* Route for the About page */}
          <Route path="/services" element={<Services />} /> {/* Route for the Services page */}
          <Route path="/gallery" element={<Gallery />} /> {/* Route for the Gallery page */}
          <Route path="/booking" element={<Booking />} /> {/* Route for the Booking page */}
          <Route path="/admin" element={<AdminDashboard />} /> {/* Route for the AdminDashboard page */}
          <Route path="/login" element={<Login />} /> {/* Route for the Login page */}
        </Routes>
      </div>
      {/* Footer component */}
      <Footer />
    </Router>
  );
};

// Export the App component for use in other parts of the application
export default App;