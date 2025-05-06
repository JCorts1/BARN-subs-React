// src/App.jsx
// Final version for Native Assets approach (No App Bridge Provider needed)

import React, { useState } from 'react';
// No Provider import needed from '@shopify/app-bridge-react'
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import './App.css'; // Styles for App layout

function App() {
  // --- State for selections lives in the parent (App) ---
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  const [finalSelectionDetail, setFinalSelectionDetail] = useState(''); // Represents quantity
  const [selectedFrequency, setSelectedFrequency] = useState('');

  // --- App Bridge Configuration Logic is REMOVED ---
  // Not needed when running same-origin via native assets

  // --- Event Handlers ---
  const handleMethodChange = (newMethod) => {
    setSelectedMethod(newMethod);
    setSelectedCoffeeType(''); // Reset dependents
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleCoffeeTypeChange = (newType) => {
    setSelectedCoffeeType(newType);
    setSelectedRegion(''); // Reset dependents
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
   };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
    setFinalSelectionDetail(''); // Reset dependents
    setSelectedFrequency('');
   };

  const handleSizeOptionChange = (newSizeOption) => {
    setSelectedSizeOption(newSizeOption);
    setFinalSelectionDetail(''); // Reset dependents
    setSelectedFrequency('');
   };

  const handleQuantityChange = (newQuantity) => {
    setFinalSelectionDetail(newQuantity);
    // Reset frequency on quantity change
    setSelectedFrequency('');
   };

  const handleFrequencyChange = (newFrequency) => {
    setSelectedFrequency(newFrequency);
   };

  const handleResetSelections = () => {
    setSelectedMethod('');
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  }
  // --- End Handlers ---

  // --- No Conditional Rendering needed based on App Bridge Config here ---

  // --- Main App Render ---
  // No <Provider> wrapper needed
  return (
      <div className="app-container">

        <div className="function-container">
          <MiddleContainer
            // Pass down state values
            selectedMethod={selectedMethod}
            selectedCoffeeType={selectedCoffeeType}
            selectedRegion={selectedRegion}
            selectedSizeOption={selectedSizeOption}
            finalSelectionDetail={finalSelectionDetail} // Quantity
            selectedFrequency={selectedFrequency}

            // Pass down callback functions
            onMethodChange={handleMethodChange}
            onCoffeeTypeChange={handleCoffeeTypeChange}
            onRegionChange={handleRegionChange}
            onSizeOptionChange={handleSizeOptionChange}
            onQuantityChange={handleQuantityChange}
            onFrequencyChange={handleFrequencyChange}
            onResetSelections={handleResetSelections}
          />
        </div>

        {/* Right Side: Pass state values down for display */}
        <div className="result-container">
          <RightContainer
            // Pass down state values
            method={selectedMethod}
            type={selectedCoffeeType}
            region={selectedRegion}
            sizeOption={selectedSizeOption}
            quantity={finalSelectionDetail}
            frequency={selectedFrequency}
          />
        </div>

      </div>
  );
}

export default App;