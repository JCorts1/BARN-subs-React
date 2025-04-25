// src/App.jsx

import React, { useState } from 'react';
import MiddleContainer from './components/MiddleContainer'; // Ensure path is correct
import RightContainer from './components/RightContainer';   // Ensure path is correct
import './App.css'; // Styles for App layout

function App() {
  // --- State for selections lives in the parent (App) ---
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  const [finalSelectionDetail, setFinalSelectionDetail] = useState(''); // Represents quantity
  const [selectedFrequency, setSelectedFrequency] = useState(''); // <-- NEW State for frequency

  // --- Handlers update App's state and reset dependent states ---
  const handleMethodChange = (newMethod) => {
    setSelectedMethod(newMethod);
    // Reset everything below method
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency(''); // <-- Reset frequency
  };

  const handleCoffeeTypeChange = (newType) => {
    setSelectedCoffeeType(newType);
     // Reset everything below type
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency(''); // <-- Reset frequency
  };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
     // Reset quantity and frequency
    setFinalSelectionDetail('');
    setSelectedFrequency(''); // <-- Reset frequency
  };

  const handleSizeOptionChange = (newSizeOption) => {
    setSelectedSizeOption(newSizeOption);
    // Reset quantity and frequency
    setFinalSelectionDetail('');
    setSelectedFrequency(''); // <-- Reset frequency
  };

  const handleQuantityChange = (newQuantity) => {
    setFinalSelectionDetail(newQuantity);
    // Reset only frequency when quantity changes
    setSelectedFrequency(''); // <-- Reset frequency
  };

  // --- NEW Handler for frequency ---
  const handleFrequencyChange = (newFrequency) => {
    setSelectedFrequency(newFrequency);
  };
  // --- End NEW Handler ---

  const handleResetSelections = () => {
    setSelectedMethod('');
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency(''); // <-- Reset frequency
  }
  // --- End Handlers ---

  return (
    <div className="app-container">

      <div className="function-container">
        <MiddleContainer
          // State values
          selectedMethod={selectedMethod}
          selectedCoffeeType={selectedCoffeeType}
          selectedRegion={selectedRegion}
          selectedSizeOption={selectedSizeOption}
          finalSelectionDetail={finalSelectionDetail} // Quantity
          selectedFrequency={selectedFrequency}       // <-- Pass frequency state

          // Callback functions
          onMethodChange={handleMethodChange}
          onCoffeeTypeChange={handleCoffeeTypeChange}
          onRegionChange={handleRegionChange}
          onSizeOptionChange={handleSizeOptionChange}
          onQuantityChange={handleQuantityChange}
          onFrequencyChange={handleFrequencyChange}     // <-- Pass frequency handler
          onResetSelections={handleResetSelections}
        />
      </div>

      {/* Right Side: Pass state values down for display */}
      <div className="result-container">
        <RightContainer
          // State values
          method={selectedMethod}
          type={selectedCoffeeType}
          region={selectedRegion}
          sizeOption={selectedSizeOption}
          quantity={finalSelectionDetail}
          frequency={selectedFrequency}               // <-- Pass frequency state
        />
      </div>

    </div>
  );
}

export default App;