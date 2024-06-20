import React, { useState } from 'react';
import './ContactForm.scss';

const ContactForm = () => {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="contact-button" onClick={handleOpenModal}>
        Contactez moi
      </button>
      
      {/* Modal content, shown only when showModal is true */}
      {showModal && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
          <div className="modal-content">
            {/* Close button inside the modal */}
            <span className="close" onClick={handleCloseModal} role="button" aria-label="Close">
              &times;
            </span>
            <h2 id="contact-form-title">Contact Form</h2>
            {/* Add your form here */}
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <br />
              <label>
                Message:
                <textarea name="message"></textarea>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;