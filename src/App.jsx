// src/App.jsx
// Updated handleSizeOptionChange for Office type.

import React, { useState } from 'react';
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import './App.css'; // Styles for App layout

function App() {
  // --- State ---
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedEdition, setSelectedEdition] = useState('');
  const [selectedSizeOption, setSelectedSizeOption] = useState(''); // For Office: "1x 1kg", "2x 1kg", etc.
  const [finalSelectionDetail, setFinalSelectionDetail] = useState(''); // Generic Quantity OR Office Size
  const [selectedFrequency, setSelectedFrequency] = useState('');

  // --- Handlers ---
  const handleMethodChange = (newMethod) => {
    setSelectedMethod(newMethod);
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedEdition('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleCoffeeTypeChange = (newType) => {
    setSelectedCoffeeType(newType);
    setSelectedRegion('');
    setSelectedEdition('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
   };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
    setSelectedEdition('');
    setFinalSelectionDetail(''); // Regional uses the standard quantity dropdown
    setSelectedFrequency('');
   };

   const handleEditionChange = (newEdition) => {
    setSelectedEdition(newEdition);
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail(''); // Capsules use the standard quantity dropdown
    setSelectedFrequency('');
   };

  const handleSizeOptionChange = (newSizeOption) => {
    setSelectedSizeOption(newSizeOption);
    // For Office, the "Size" (e.g., "1x 1kg") IS the quantity detail.
    // For other types that might use a size option differently, this might need adjustment.
    if (selectedCoffeeType === 'Office') {
        setFinalSelectionDetail(newSizeOption);
    } else {
        setFinalSelectionDetail(''); // Reset if it's not Office, to allow generic quantity
    }
    setSelectedEdition('');
    setSelectedFrequency('');
   };

  const handleQuantityChange = (newQuantity) => {
    // This is for the generic quantity dropdown, not used by Office directly
    setFinalSelectionDetail(newQuantity);
    setSelectedFrequency('');
   };

  const handleFrequencyChange = (newFrequency) => {
    setSelectedFrequency(newFrequency);
   };

  const handleResetSelections = () => {
    setSelectedMethod('');
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedEdition('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  }
  // --- End Handlers ---

  // --- Main App Render ---
  return (
      <div className="app-container">
        <div className="function-container">
          <MiddleContainer
            selectedMethod={selectedMethod}
            selectedCoffeeType={selectedCoffeeType}
            selectedRegion={selectedRegion}
            selectedEdition={selectedEdition}
            selectedSizeOption={selectedSizeOption}
            finalSelectionDetail={finalSelectionDetail}
            selectedFrequency={selectedFrequency}
            onMethodChange={handleMethodChange}
            onCoffeeTypeChange={handleCoffeeTypeChange}
            onRegionChange={handleRegionChange}
            onEditionChange={handleEditionChange}
            onSizeOptionChange={handleSizeOptionChange}
            onQuantityChange={handleQuantityChange}
            onFrequencyChange={handleFrequencyChange}
            onResetSelections={handleResetSelections}
          />
        </div>

        <div className="result-container">
          <RightContainer
            method={selectedMethod}
            type={selectedCoffeeType}
            region={selectedRegion}
            edition={selectedEdition}
            sizeOption={selectedSizeOption} // This is key for Office display
            quantity={finalSelectionDetail} // For Office, this will be same as sizeOption
            frequency={selectedFrequency}
          />
        </div>
      </div>
  );
}

export default App;