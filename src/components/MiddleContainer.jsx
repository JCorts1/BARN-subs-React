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
import "../components/MiddleContainer.css"; 

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
const regionOptions = [
    { value: "Brazil", label: "Brazil" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Center America", label: "Center America" },
];


const MiddleContainer = () => {

  // --- State and handlers remain the same ---
  const [showCoffeeType, setShowCoffeeType] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  const [finalSelectionDetail, setFinalSelectionDetail] = useState('');

  const resetSelections = () => {
      setSelectedCoffeeType('');
      setSelectedRegion('');
      setSelectedSizeOption('');
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
      resetSelections();
  };
  const handleCoffeeTypeChange = (newCoffeeType) => {
      setSelectedCoffeeType(newCoffeeType);
      setSelectedRegion('');
      setSelectedSizeOption('');
      setFinalSelectionDetail('');
  };
  const handleRegionChange = (newRegion) => {
      setSelectedRegion(newRegion);
      setFinalSelectionDetail('');
  }
  const handleSizeOptionChange = (newSizeOption) => {
      setSelectedSizeOption(newSizeOption);
      setFinalSelectionDetail('');
  }
  const handleQuantityChange = (newQuantity) => {
      setFinalSelectionDetail(newQuantity);
  }

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
           <div className='dropdown-row'>
             <h3 className='dropdown-label'>Method</h3>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* Keep Shadcn's variant, apply custom class for layout */}
                    <Button variant="outline" className='dropdown-trigger-button'>
                      {selectedMethod || "What roast style would you like?"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                </DropdownMenuTrigger>
                {/* Apply custom class for content panel width */}
                <DropdownMenuContent className='dropdown-content-panel'>
                    <DropdownMenuRadioGroup value={selectedMethod} onValueChange={handleMethodChange}>
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

          {/* Step 3 & 4: Dependent Selections */}
          {selectedCoffeeType && (
            <>
              {/* Roasters Choice Flow */}
              {selectedCoffeeType === 'Roasters Choice' && (
                <>
                  {/* Step 3: Roasters Option */}
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

                  {/* Step 4: Quantity */}
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
                                  <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChange}>
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
                  {/* Step 3: Office Size */}
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

                  {/* Step 4: Quantity */}
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
                                  <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChange}>
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
                    {/* Step 3: Region Selection */}
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

                    {/* Step 4: Quantity */}
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
                                    <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChange}>
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

              {/* Other Coffee Types Flow */}
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
                            <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChange}>
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
          {/* Kept Tailwind classes for specific styling here */}
          {finalSelectionDetail && (
                <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-4/6 text-center">
                    Selected: {selectedMethod} - {selectedCoffeeType}
                    {selectedRegion && ` - ${selectedRegion}`}
                    {selectedSizeOption && ` - ${selectedSizeOption}`}
                    {' '}- Qty: {finalSelectionDetail}
                </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiddleContainer;