import React, { useState } from 'react';
import axios from '../api/axios'; // Assurez-vous que ce chemin est correct

const ReservationForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reservations', formData);
      alert('Reservation submitted successfully');
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Owner Name" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <select name="service" value={formData.service} onChange={handleChange} required>
        <option value="">Select Service</option>
        <option value="Dog Walking - 45min">Dog Walking - 45min</option>
        <option value="Dog Walking - 1h30min">Dog Walking - 1h30min</option>
        <option value="Cat Sitting - 15min">Cat Sitting - 15min</option>
        <option value="Cat Sitting - 30min">Cat Sitting - 30min</option>
      </select>
      <input type="date" name="reservationDate" value={formData.reservationDate} onChange={handleChange} required />
      <input type="text" name="animalName" value={formData.animalName} onChange={handleChange} placeholder="Animal Name" required />
      <input type="text" name="animalBreed" value={formData.animalBreed} onChange={handleChange} placeholder="Animal Breed" required />
      <textarea name="importantInfo" value={formData.importantInfo} onChange={handleChange} placeholder="Important Info"></textarea>
      <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Additional Info"></textarea>
      <button type="submit">Submit Reservation</button>
    </form>
  );
};

export default ReservationForm;
