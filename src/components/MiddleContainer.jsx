// src/components/MiddleContainer.jsx

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import "./MiddleContainer.css";

// --- Data Constants ---
const filterOptions = [
  { value: "Roasters Choice", label: "Roasters Choice" },
  { value: "Masterpiece", label: "Masterpiece" },
  { value: "Low-Caf", label: "Low-Caf" },
  { value: "Regional", label: "Regional" },
];
const espressoOptions = [
  { value: "Roasters Choice", label: "Roasters Choice" },
  { value: "Low-Caf", label: "Low-Caf" },
  { value: "Office", label: "Office" },
  { value: "Regional", label: "Regional" },
  { value: "Masterpiece", label: "Masterpiece" },
];
const roastersChoiceOptions = [
    { value: "1 bag 250grams", label: "1 bag 250grams" },
    { value: "2 bags 250grams", label: "2 bags 250grams" },
];
const officeSizeOptions = [
    { value: "2 x 250g", label: "2 x 250g" },
    { value: "1 x 1kg", label: "1 x 1kg" },
    { value: "2 x 1kg", label: "2 x 1kg" },
    { value: "5 kg", label: "5 kg" },
];
const quantityOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];
const regionOptions = [
    { value: "Brazil", label: "Brazil" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Center America", label: "Center America" },
];
// --- NEW: Frequency Options ---
const frequencyOptions = [
    { value: "1 Week", label: "1 Week" },
    { value: "2 Weeks", label: "2 Weeks" },
    { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks", label: "4 Weeks" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// --- Component receives state and callbacks as props ---
const MiddleContainer = ({
  selectedMethod,
  selectedCoffeeType,
  selectedRegion,
  selectedSizeOption,
  finalSelectionDetail, // Quantity
  selectedFrequency,    // <-- NEW PROP for selected frequency
  onMethodChange,
  onCoffeeTypeChange,
  onRegionChange,
  onSizeOptionChange,
  onQuantityChange,
  onFrequencyChange,    // <-- NEW PROP for handling frequency change
  onResetSelections
}) => {

  // Internal state only for showing/hiding this section's dropdowns
  const [showCoffeeType, setShowCoffeeType] = useState(false);

  // Handlers for visibility and calling parent reset
  const handleSelectSelf = () => {
    setShowCoffeeType(true);
    if (onResetSelections) onResetSelections();
  };

  const handleSelectGift = () => {
    setShowCoffeeType(false);
     if (onResetSelections) onResetSelections();
  };

  return (
    <div className="middle-content-wrapper flex flex-col justify-center items-center">

      <div className='recipient-container mt-10'>
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

      {showCoffeeType && (
        <div className='coffee-type-container w-5/6 rounded-md p-3 pt-5 flex flex-col items-center gap-y-2 bg-[#3a3c3d] justify-center'>

           {/* Step 1: Method Selection */}
           <div className='dropdown-row'>
             <h3 className='dropdown-label'>Method</h3>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='dropdown-trigger-button'>
                      {selectedMethod || "What roast style would you like?"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='dropdown-content-panel'>
                    <DropdownMenuRadioGroup value={selectedMethod} onValueChange={onMethodChange}>
                      <DropdownMenuRadioItem value="Filter">Filter</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Espresso">Espresso</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
           </div>

          {/* Step 2: Coffee Type Selection */}
          {selectedMethod && (
             <div className='dropdown-row'>
                 <h3 className='dropdown-label'>Type</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='dropdown-trigger-button'>
                            {selectedCoffeeType || (selectedMethod === 'Filter' ? "Select Filter Type..." : "Select Espresso Type...")}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='dropdown-content-panel'>
                        <DropdownMenuRadioGroup value={selectedCoffeeType} onValueChange={onCoffeeTypeChange}>
                            {(selectedMethod === 'Filter' ? filterOptions : espressoOptions).map((option) => (
                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                {option.label}
                            </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
             </div>
          )}

          {/* Step 3 & 4: Dependent Selections */}
          {selectedCoffeeType && (
            <>
              {/* Roasters Choice Flow */}
              {selectedCoffeeType === 'Roasters Choice' && (
                <>
                  <div className='dropdown-row'>
                    <h3 className='dropdown-label'>Option</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className='dropdown-trigger-button'>
                              {selectedSizeOption || "Select Option..."}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </DropdownMenuTrigger>
                       <DropdownMenuContent className='dropdown-content-panel'>
                          <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={onSizeOptionChange}>
                              {roastersChoiceOptions.map((option) => (
                                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                                      {option.label}
                                  </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                       </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {selectedSizeOption && (
                       <div className='dropdown-row'>
                           <h3 className='dropdown-label'>Quantity</h3>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className='dropdown-trigger-button'>
                                      {finalSelectionDetail || "Select Quantity..."}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className='dropdown-content-panel'>
                                  {/* Removed Label/Separator for consistency, can add back if needed */}
                                  <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                      {quantityOptions.map((option) => (
                                          <DropdownMenuRadioItem key={option.value} value={option.value}>
                                              {option.label}
                                          </DropdownMenuRadioItem>
                                      ))}
                                  </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                           </DropdownMenu>
                       </div>
                  )}
                </>
              )}

              {/* Office Flow */}
              {selectedCoffeeType === 'Office' && (
                <>
                  <div className='dropdown-row'>
                    <h3 className='dropdown-label'>Size</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className='dropdown-trigger-button'>
                              {selectedSizeOption || "Select Size..."}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </DropdownMenuTrigger>
                       <DropdownMenuContent className='dropdown-content-panel'>
                          <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={onSizeOptionChange}>
                              {officeSizeOptions.map((option) => (
                                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                                      {option.label}
                                  </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                       </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {selectedSizeOption && (
                       <div className='dropdown-row'>
                           <h3 className='dropdown-label'>Quantity</h3>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className='dropdown-trigger-button'>
                                      {finalSelectionDetail || "Select Quantity..."}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className='dropdown-content-panel'>
                                  <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                      {quantityOptions.map((option) => (
                                          <DropdownMenuRadioItem key={option.value} value={option.value}>
                                              {option.label}
                                          </DropdownMenuRadioItem>
                                      ))}
                                  </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                           </DropdownMenu>
                       </div>
                  )}
                </>
              )}

              {/* Regional Flow */}
              {selectedCoffeeType === 'Regional' && (
                 <>
                    <div className='dropdown-row'>
                       <h3 className='dropdown-label'>Region</h3>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="outline" className='dropdown-trigger-button'>
                                  {selectedRegion || "Select Region..."}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='dropdown-content-panel'>
                              {/* Removed Label/Separator for consistency */}
                              <DropdownMenuRadioGroup value={selectedRegion} onValueChange={onRegionChange}>
                                  {regionOptions.map((option) => (
                                      <DropdownMenuRadioItem key={option.value} value={option.value}>
                                          {option.label}
                                      </DropdownMenuRadioItem>
                                  ))}
                              </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                       </DropdownMenu>
                    </div>
                    {selectedRegion && (
                         <div className='dropdown-row'>
                             <h3 className='dropdown-label'>Quantity</h3>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {finalSelectionDetail || "Select Quantity..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                        {quantityOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                             </DropdownMenu>
                         </div>
                    )}
                 </>
              )}

              {/* Other Coffee Types Flow (e.g., Masterpiece, Low-Caf) */}
              {!['Roasters Choice', 'Office', 'Regional'].includes(selectedCoffeeType) && (
                 <div className='dropdown-row'>
                     <h3 className='dropdown-label'>Quantity</h3>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='dropdown-trigger-button'>
                                {finalSelectionDetail || "Select Quantity..."}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='dropdown-content-panel'>
                            <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                {quantityOptions.map((option) => (
                                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                                        {option.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                     </DropdownMenu>
                 </div>
              )}
            </>
          )}

           {/* --- NEW: Frequency Selection --- */}
           {/* Render frequency dropdown only after quantity (or equivalent) is selected */}
           {finalSelectionDetail && (
                <div className='dropdown-row'>
                     <h3 className='dropdown-label'>Frequency</h3>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='dropdown-trigger-button'>
                                {selectedFrequency || "Select Frequency..."}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='dropdown-content-panel'>
                            <DropdownMenuRadioGroup value={selectedFrequency} onValueChange={onFrequencyChange}>
                                {frequencyOptions.map((option) => (
                                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                                        {option.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                     </DropdownMenu>
                 </div>
            )}


          {/* Final Selection Display (shows state passed from parent) */}
          {/* Updated to show frequency if selected */}
          {finalSelectionDetail && selectedFrequency && (
                <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-4/6 text-center">
                    Selected: {selectedMethod} - {selectedCoffeeType}
                    {selectedRegion && ` - ${selectedRegion}`}
                    {selectedSizeOption && ` - ${selectedSizeOption}`}
                    {' '}- Qty: {finalSelectionDetail}
                    {/* --- NEW: Display selected frequency --- */}
                    {selectedFrequency && ` - Every ${selectedFrequency}`}
                </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiddleContainer;