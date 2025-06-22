import React from 'react';
import './LoadingSpinner.css'; 

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}

export default LoadingSpinner;