// src/App.jsx
// Added state and handler for Capsule Edition

import React, { useState } from 'react';
// No Provider needed for App Bridge v4 script setup
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import './App.css'; // Styles for App layout

function App() {
  // --- State ---
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedEdition, setSelectedEdition] = useState(''); // <-- NEW: State for Capsule Edition
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  const [finalSelectionDetail, setFinalSelectionDetail] = useState(''); // Quantity
  const [selectedFrequency, setSelectedFrequency] = useState('');

  // --- Handlers ---
  const handleMethodChange = (newMethod) => {
    setSelectedMethod(newMethod);
    setSelectedCoffeeType(''); // Reset dependents
    setSelectedRegion('');
    setSelectedEdition(''); // <-- NEW: Reset Edition
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleCoffeeTypeChange = (newType) => {
    setSelectedCoffeeType(newType);
    setSelectedRegion(''); // Reset dependents
    setSelectedEdition(''); // <-- NEW: Reset Edition
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
   };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
    // Assuming selecting a region means it's not capsules
    setSelectedEdition(''); // <-- NEW: Reset Edition
    setFinalSelectionDetail(''); // Reset dependents
    setSelectedFrequency('');
   };

   // --- NEW: Handler for Capsule Edition Change ---
   const handleEditionChange = (newEdition) => {
    setSelectedEdition(newEdition);
    // Reset potentially conflicting state and subsequent steps
    setSelectedCoffeeType(''); // Clear coffee type if switching to capsules/edition
    setSelectedRegion('');
    setSelectedSizeOption(''); // Capsules have fixed size, clear this
    setFinalSelectionDetail('');
    setSelectedFrequency('');
   };
   // --- End New Handler ---

  const handleSizeOptionChange = (newSizeOption) => {
    setSelectedSizeOption(newSizeOption);
     // Assuming selecting a size option means it's not capsules
    setSelectedEdition(''); // <-- NEW: Reset Edition
    setFinalSelectionDetail(''); // Reset dependents
    setSelectedFrequency('');
   };

  const handleQuantityChange = (newQuantity) => {
    setFinalSelectionDetail(newQuantity);
    setSelectedFrequency(''); // Reset frequency on quantity change
   };

  const handleFrequencyChange = (newFrequency) => {
    setSelectedFrequency(newFrequency);
   };

  const handleResetSelections = () => {
    setSelectedMethod('');
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedEdition(''); // <-- NEW: Reset Edition
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
            // Pass down state values
            selectedMethod={selectedMethod}
            selectedCoffeeType={selectedCoffeeType}
            selectedRegion={selectedRegion}
            selectedEdition={selectedEdition} // <-- NEW: Pass Edition state
            selectedSizeOption={selectedSizeOption}
            finalSelectionDetail={finalSelectionDetail}
            selectedFrequency={selectedFrequency}

            // Pass down callback functions
            onMethodChange={handleMethodChange}
            onCoffeeTypeChange={handleCoffeeTypeChange}
            onRegionChange={handleRegionChange}
            onEditionChange={handleEditionChange} // <-- NEW: Pass Edition handler
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
            edition={selectedEdition} // <-- NEW: Pass Edition state
            sizeOption={selectedSizeOption}
            quantity={finalSelectionDetail}
            frequency={selectedFrequency}
          />
        </div>

      </div>
  );
}

export default App;