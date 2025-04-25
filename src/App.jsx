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

  // --- Handlers update App's state and reset dependent states ---
  const handleMethodChange = (newMethod) => {
    setSelectedMethod(newMethod);
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
  };

  const handleCoffeeTypeChange = (newType) => {
    setSelectedCoffeeType(newType);
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
  };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
    setFinalSelectionDetail('');
  };

  const handleSizeOptionChange = (newSizeOption) => {
    setSelectedSizeOption(newSizeOption);
    setFinalSelectionDetail('');
  };

  const handleQuantityChange = (newQuantity) => {
    setFinalSelectionDetail(newQuantity);
  };

  const handleResetSelections = () => {
    setSelectedMethod('');
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
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

          // Callback functions
          onMethodChange={handleMethodChange}
          onCoffeeTypeChange={handleCoffeeTypeChange}
          onRegionChange={handleRegionChange}
          onSizeOptionChange={handleSizeOptionChange}
          onQuantityChange={handleQuantityChange}
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
        />
      </div>

    </div>
  );
}

export default App;