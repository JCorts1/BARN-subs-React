import React, { useState } from 'react';
// --- Import DropdownMenu parts, Button, and an icon ---
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust path if needed
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { ChevronDown } from "lucide-react"; // Example icon
// --- End Imports ---
import "../components/MiddleContainer.css"; // Assuming this file exists

const MiddleContainer = () => {
  const [showCoffeeType, setShowCoffeeType] = useState(false);
  // --- Add state for the method selection ---
  const [selectedMethod, setSelectedMethod] = useState(''); // Will hold 'Filter' or 'Espresso'
  // --- End State ---

  const handleSelectSelf = () => {
    setShowCoffeeType(true);
    setSelectedMethod(''); // Reset method when showing
  };
  const handleSelectGift = () => {
    setShowCoffeeType(false);
  };

  return (
    <div className="middle-content-wrapper">
      {/* --- Recipient Selection (Stays the same) --- */}
      <div className='recipient-container'>
        <h3>Select Recipient</h3>
        <div className='recipient-buttons-container'>
          <div className='recipient-button' onClick={handleSelectSelf}>
            <h2>It's for me</h2>
            <p>Taking care of yourself</p>
          </div>
          <div className='recipient-button' onClick={handleSelectGift}>
            <h2>It's a gift</h2>
            <p>Oh wow</p>
          </div>
        </div>
      </div>

      {/* --- Coffee Method Selection (Conditional) --- */}
      {showCoffeeType && (
        <div className='coffee-type-container'>
          <h3>Time for a Brew-tiful Choice!</h3>
          {/* --- Target container where DropdownMenu goes --- */}
          {/* Added style to center the trigger button */}
          <div className='recipient-buttons-container' style={{ justifyContent: 'center', alignItems: 'center', border: 'none', padding: '0' }}>

            {/* --- DropdownMenu replaces the two previous divs --- */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Button that opens the dropdown */}
                <Button variant="outline" className="w-[200px] justify-between"> {/* Adjust width as needed */}
                  {selectedMethod || "Select Method..."} {/* Shows selection or placeholder */}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]"> {/* Match trigger width */}
                <DropdownMenuLabel>Brew Method</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Radio group handles the single selection */}
                <DropdownMenuRadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                  <DropdownMenuRadioItem value="Filter">Filter</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Espresso">Espresso</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* --- End of DropdownMenu --- */}

          </div> {/* End of recipient-buttons-container */}

          {/* --- Conditionally Render Next Container (AFTER the dropdown) --- */}
          {/* This appears based on the selection made above */}
          {selectedMethod === 'Filter' && (
              <div className="next-step-container mt-6"> {/* Added margin-top for spacing */}
                  <h4>Filter Configuration</h4>
                  <p>Configure grind, ratio, etc.</p>
                  {/* Add specific Filter inputs/components here */}
              </div>
          )}
          {selectedMethod === 'Espresso' && (
              <div className="next-step-container mt-6"> {/* Added margin-top for spacing */}
                  <h4>Espresso Configuration</h4>
                  <p>Configure dose, yield, etc.</p>
                  {/* Add specific Espresso inputs/components here */}
              </div>
          )}
          {/* --- End Conditional Next Step --- */}

        </div> // End of coffee-type-container
      )}

    </div> // End of middle-content-wrapper
  );
};

export default MiddleContainer;