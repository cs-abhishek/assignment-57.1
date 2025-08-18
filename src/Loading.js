import React from 'react';
import './App.css';

const Loading = () => {
  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '20px'
  };

  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff9900',
    borderRadius: '50%'
  };

  return (
    <div className="loading-container">
      <div className="container">
        <div style={loadingStyle}>
          <div style={spinnerStyle} className="loading-spinner"></div>
          <p style={{ fontSize: '18px', color: '#666' }}>Loading products...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
