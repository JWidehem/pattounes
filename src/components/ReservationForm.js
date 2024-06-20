// ReservationForm.js

// Import necessary libraries and components
import React, { useState } from 'react';
import axios from '../api/axios'; // Ensure this path is correct

// Define the functional component ReservationForm
const ReservationForm = () => {
  // Initialize state to manage form data
  const [formData, setFormData] = useState({
    ownerName: '',
    address: '',
    email: '',
    phone: '',
    service: '',
    reservationDate: '',
    animalName: '',
    animalBreed: '',
    importantInfo: '',
    additionalInfo: ''
  });

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reservations', formData); // Send form data to the server
      alert('Reservation submitted successfully'); // Show success message
    } catch (error) {
      console.error('Error submitting reservation:', error); // Log any errors
    }
  };

  return (
    // Form element for reservation
    <form onSubmit={handleSubmit}>
      {/* Input for owner's name */}
      <input
        type="text"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleChange}
        placeholder="Owner Name"
        required
      />
      {/* Input for address */}
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      {/* Input for email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {/* Input for phone number */}
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      {/* Dropdown for selecting service */}
      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        required
      >
        <option value="">Select Service</option>
        <option value="Dog Walking - 45min">Dog Walking - 45min</option>
        <option value="Dog Walking - 1h30min">Dog Walking - 1h30min</option>
        <option value="Cat Sitting - 15min">Cat Sitting - 15min</option>
        <option value="Cat Sitting - 30min">Cat Sitting - 30min</option>
      </select>
      {/* Input for reservation date */}
      <input
        type="date"
        name="reservationDate"
        value={formData.reservationDate}
        onChange={handleChange}
        required
      />
      {/* Input for animal's name */}
      <input
        type="text"
        name="animalName"
        value={formData.animalName}
        onChange={handleChange}
        placeholder="Animal Name"
        required
      />
      {/* Input for animal's breed */}
      <input
        type="text"
        name="animalBreed"
        value={formData.animalBreed}
        onChange={handleChange}
        placeholder="Animal Breed"
        required
      />
      {/* Textarea for important information */}
      <textarea
        name="importantInfo"
        value={formData.importantInfo}
        onChange={handleChange}
        placeholder="Important Info"
      ></textarea>
      {/* Textarea for additional information */}
      <textarea
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        placeholder="Additional Info"
      ></textarea>
      {/* Submit button for the form */}
      <button type="submit">Submit Reservation</button>
    </form>
  );
};

// Export the ReservationForm component for use in other parts of the application
export default ReservationForm;