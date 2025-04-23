import React, { useState } from 'react'; // Import useState
import "../components/MiddleContainer.css"

const MiddleContainer = () => {
  const [showCoffeeType, setShowCoffeeType] = useState(false);

  // Handler for clicking "It's for me"
  const handleSelectSelf = () => {
    setShowCoffeeType(true); // Show the coffee type section
  };

  // Handler for clicking "It's a gift"
  const handleSelectGift = () => {
    setShowCoffeeType(false); // Hide the coffee type section
  };

  return (
    // Using React Fragment <>...</> to return multiple top-level elements if needed,
    // though here the outer div works fine. Sticking with div for consistency.
    <div className="middle-content-wrapper"> {/* Renamed for clarity from previous steps, or keep as middle-container if preferred */}

        {/* --- Recipient Selection --- */}
        <div className='recipient-container'>
          <h3>Select Recipient</h3>
          <div className='recipient-buttons-container'>
            {/* Add onClick handler */}
            <div className='recipient-button' onClick={handleSelectSelf}>
              <h2>It's for me</h2>
              <p>Taking care of yourself</p>
            </div>
            {/* Add onClick handler */}
            <div className='recipient-button' onClick={handleSelectGift}>
              <h2>It's a gift</h2>
              <p>Oh wow</p>
            </div>
          </div>
        </div>

        {/* --- Coffee Type Selection (Conditional) --- */}
        {/* This block only renders if showCoffeeType is true */}
        {showCoffeeType && (
          <div className='coffee-type-container'> {/* New container for styling */}
            <h3>Time for a Brew-tiful Choice!</h3> {/* Funny header */}
            <div className='recipient-buttons-container'> {/* Re-use existing style */}
              <div className='recipient-button'> {/* Re-use existing style */}
                <h2>Filter</h2>
                <p>Smooth & classic</p>
              </div>
              <div className='recipient-button'> {/* Re-use existing style */}
                <h2>Espresso</h2>
                <p>Bold & intense</p>
              </div>
            </div>
          </div>
        )}

    </div> // Closes middle-content-wrapper / middle-container
  );
};

export default MiddleContainer;