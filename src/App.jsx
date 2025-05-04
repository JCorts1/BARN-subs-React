// src/App.jsx
// Updated for App Bridge v4 (Provider removed, setup via index.html)

import React, { useState } from 'react';
// No 'Provider' import needed from '@shopify/app-bridge-react' for v4 script tag setup
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import './App.css'; // Styles for App layout

function App() {
  // --- State for selections lives in the parent (App) ---
  // (Keep all your existing useState hooks)
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  const [finalSelectionDetail, setFinalSelectionDetail] = useState(''); // Represents quantity
  const [selectedFrequency, setSelectedFrequency] = useState('');

  // --- App Bridge Configuration Logic is REMOVED ---
  // Setup is now done via <meta name="shopify-api-key"...> and <script src="...app-bridge.js">
  // tags in your main index.html file.

  // --- Event Handlers ---
  // (Keep all your existing handler functions: handleMethodChange, etc.)
  const handleMethodChange = (newMethod) => {
    setSelectedMethod(newMethod);
    setSelectedCoffeeType('');
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleCoffeeTypeChange = (newType) => {
    setSelectedCoffeeType(newType);
    setSelectedRegion('');
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleSizeOptionChange = (newSizeOption) => {
    setSelectedSizeOption(newSizeOption);
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  };

  const handleQuantityChange = (newQuantity) => {
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
    setSelectedSizeOption('');
    setFinalSelectionDetail('');
    setSelectedFrequency('');
  }
  // --- End Handlers ---

  // --- No Conditional Rendering needed based on App Bridge Config here ---

  // --- Main App Render ---
  // No <Provider> wrapper needed here
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