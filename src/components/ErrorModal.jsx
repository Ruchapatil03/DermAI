import React from 'react';
import '../stylesheets/ErrorModal.css';

function ErrorModal({ show, onClose }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Incorrect access role or user ID. Please check again.</p>
      </div>
    </div>
  );
}

export default ErrorModal;
