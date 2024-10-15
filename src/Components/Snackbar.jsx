// src/components/Snackbar.js
import React from 'react';
import './Snackbar.css'; // Add your custom styles for the snackbar

const Snackbar = ({ message, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="snackbar">
      {message}
      <button className="snackbar-close" onClick={onClose}>X</button>
    </div>
  );
};

export default Snackbar;
