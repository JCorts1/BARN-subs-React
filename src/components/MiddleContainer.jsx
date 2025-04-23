import React, { useState } from 'react';
// Import DropdownMenu parts, Button, and Icon
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
import "../components/MiddleContainer.css"; // Ensure this path is correct

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
    { value: "5 kilos", label: "5 kilos" },
];
const quantityOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];
// --- NEW: Region Options ---
const regionOptions = [
    { value: "Brazil", label: "Brazil" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Center America", label: "Center America" },
];


const MiddleContainer = () => {

  const [showCoffeeType, setShowCoffeeType] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  // NEW state to hold the intermediate size/option selection for Roasters/Office
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  // finalSelectionDetail will now primarily hold the QUANTITY in most flows
  const [finalSelectionDetail, setFinalSelectionDetail] = useState('');


  // Helper to reset subsequent selections
  const resetSelections = () => {
      setSelectedCoffeeType('');
      setSelectedRegion('');
      setSelectedSizeOption(''); // Reset new state
      setFinalSelectionDetail('');
  }

  const handleSelectSelf = () => {
    setShowCoffeeType(true);
    setSelectedMethod('');
    resetSelections();
  };
  const handleSelectGift = () => {
    setShowCoffeeType(false);
    setSelectedMethod('');
    resetSelections();
  };

  const handleMethodChange = (newMethod) => {
      setSelectedMethod(newMethod);
      resetSelections(); // Reset everything after method
  };

  const handleCoffeeTypeChange = (newCoffeeType) => {
      setSelectedCoffeeType(newCoffeeType);
      setSelectedRegion(''); // Reset subsequent specific selections
      setSelectedSizeOption('');
      setFinalSelectionDetail('');
  };

  const handleRegionChange = (newRegion) => {
      setSelectedRegion(newRegion);
      // Reset only the final detail (quantity) if region changes
      setFinalSelectionDetail('');
  }

  // NEW Handler for Size/Option change (Roasters/Office)
  const handleSizeOptionChange = (newSizeOption) => {
      setSelectedSizeOption(newSizeOption);
      // Reset only the final detail (quantity) if size/option changes
      setFinalSelectionDetail('');
  }

  return (
    <div className="middle-content-wrapper">

      <div className='recipient-container'>
         <div className='recipient-buttons-container'>
          <div className='recipient-button mt' onClick={handleSelectSelf}>
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
        <div className='coffee-type-container flex flex-col items-center gap-6 mt-6'>

           {/* Step 1: Method Selection */}
           <div className='flex flex-col items-center gap-2 w-[250px]'>
             <h3 className="text-lg font-semibold mb-1">Select Method</h3>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                    {selectedMethod || "Select Method..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px]">
                    <DropdownMenuRadioGroup value={selectedMethod} onValueChange={handleMethodChange}>
                    <DropdownMenuRadioItem value="Filter">Filter</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Espresso">Espresso</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
           </div>

          {/* Step 2: Coffee Type Selection (Conditional on Method) */}
          {selectedMethod && (
             <div className="next-step-container w-[250px]">
                 <h3 className="text-lg font-semibold mb-1">Select Type</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedCoffeeType || (selectedMethod === 'Filter' ? "Select Filter Type..." : "Select Espresso Type...")}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                        <DropdownMenuRadioGroup value={selectedCoffeeType} onValueChange={handleCoffeeTypeChange}>
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

          {/* Step 3 & 4: Dependent Selections based on Coffee Type */}
          {selectedCoffeeType && (
            <>
              {/* --- Roasters Choice Flow --- */}
              {selectedCoffeeType === 'Roasters Choice' && (
                <>
                  {/* Step 3: Roasters Option */}
                  <div className="third-step-container w-[250px]">
                    <h3 className="text-lg font-semibold mb-1">Select Option</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                              {/* Use selectedSizeOption state here */}
                              {selectedSizeOption || "Select Roaster Option..."}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </DropdownMenuTrigger>
                       <DropdownMenuContent className="w-[250px]">
                          {/* Use handleSizeOptionChange to update state */}
                          <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={handleSizeOptionChange}>
                              {roastersChoiceOptions.map((option) => (
                                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                                      {option.label}
                                  </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                       </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Step 4: Quantity (Show only after Roaster Option selected) */}
                  {selectedSizeOption && (
                       <div className="fourth-step-container w-[250px]">
                           <h3 className="text-lg font-semibold mb-1">Select Quantity</h3>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="w-full justify-between">
                                      {/* Use finalSelectionDetail for quantity */}
                                      {finalSelectionDetail || "Select Quantity..."}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[250px]">
                                  <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {/* Update finalSelectionDetail */}
                                  <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
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

              {/* --- Office Flow --- */}
              {selectedCoffeeType === 'Office' && (
                <>
                  {/* Step 3: Office Size */}
                  <div className="third-step-container w-[250px]">
                    <h3 className="text-lg font-semibold mb-1">Select Size</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                              {/* Use selectedSizeOption state here */}
                              {selectedSizeOption || "Select Office Size..."}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </DropdownMenuTrigger>
                       <DropdownMenuContent className="w-[250px]">
                          {/* Use handleSizeOptionChange to update state */}
                          <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={handleSizeOptionChange}>
                              {officeSizeOptions.map((option) => (
                                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                                      {option.label}
                                  </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                       </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Step 4: Quantity (Show only after Office Size selected) */}
                  {selectedSizeOption && (
                       <div className="fourth-step-container w-[250px]">
                           <h3 className="text-lg font-semibold mb-1">Select Quantity</h3>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="w-full justify-between">
                                      {/* Use finalSelectionDetail for quantity */}
                                      {finalSelectionDetail || "Select Quantity..."}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[250px]">
                                  <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {/* Update finalSelectionDetail */}
                                  <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
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

              {/* --- Regional Flow --- */}
              {selectedCoffeeType === 'Regional' && (
                 <>
                    {/* Step 3: Region Selection */}
                    <div className="third-step-container w-[250px]">
                       <h3 className="text-lg font-semibold mb-1">Select Region</h3>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full justify-between">
                                  {selectedRegion || "Select Region..."}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[250px]">
                              <DropdownMenuLabel>Region</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup value={selectedRegion} onValueChange={handleRegionChange}>
                                  {regionOptions.map((option) => (
                                      <DropdownMenuRadioItem key={option.value} value={option.value}>
                                          {option.label}
                                      </DropdownMenuRadioItem>
                                  ))}
                              </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                       </DropdownMenu>
                    </div>

                    {/* Step 4: Quantity (Show only after Region selected) */}
                    {selectedRegion && (
                         <div className="fourth-step-container w-[250px]">
                             <h3 className="text-lg font-semibold mb-1">Select Quantity</h3>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {/* Use finalSelectionDetail for quantity */}
                                        {finalSelectionDetail || "Select Quantity..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[250px]">
                                    <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {/* Update finalSelectionDetail */}
                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
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

              {/* --- Other Coffee Types Flow (e.g., Masterpiece, Low-Caf) --- */}
              {/* Step 3: Quantity (Show directly after type selection) */}
              {!['Roasters Choice', 'Office', 'Regional'].includes(selectedCoffeeType) && (
                 <div className="third-step-container w-[250px]">
                     <h3 className="text-lg font-semibold mb-1">Select Quantity</h3>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                {/* Use finalSelectionDetail for quantity */}
                                {finalSelectionDetail || "Select Quantity..."}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[250px]">
                            <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* Update finalSelectionDetail */}
                            <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
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

          {/* Final Selection Display */}
          {/* Show summary only when the final selection (usually quantity) is made */}
          {finalSelectionDetail && (
                <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-[250px] text-center">
                    Selected: {selectedMethod} - {selectedCoffeeType}
                    {/* Conditionally add Region if selected */}
                    {selectedRegion && ` - ${selectedRegion}`}
                    {/* Conditionally add Size/Option if selected (for Roasters/Office) */}
                    {selectedSizeOption && ` - ${selectedSizeOption}`}
                    {/* Display the final detail, which is quantity in these flows */}
                    {' '}- Qty: {finalSelectionDetail}
                </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiddleContainer;