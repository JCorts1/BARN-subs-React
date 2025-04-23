import React from 'react';
import "../components/MiddleContainer.css"

const MiddleContainer = () => {
  return (
    <div className="middle-container">
        <div className='recipient-container'>
          <h3>Select Recipient</h3>
          <div className='recipient-buttons-container'>
            <div className='recipient-button'>
              <h2>It's for me</h2>
              <p>Taking care of yourself</p>
            </div>
            <div className='recipient-button'>
              <h2>It's a gift</h2>
              <p>Oh wow</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MiddleContainer;
