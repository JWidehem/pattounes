import React, { useState } from 'react';
import './ContactForm.scss';

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="contact-button" onClick={handleOpenModal}>
        Contactez moi
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Contact Form</h2>
            {/* Add your form here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
