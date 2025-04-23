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
// --- End Imports ---
import "../components/MiddleContainer.css"; 

// --- Options Arrays ---
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
    { value: "5 kilos", label: "5 kg" },
];

const quantityOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];


const MiddleContainer = () => {

  const [showCoffeeType, setShowCoffeeType] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('');
  const [finalSelectionDetail, setFinalSelectionDetail] = useState('');

  const handleSelectSelf = () => {
    setShowCoffeeType(true);
    setSelectedMethod('');
    setSelectedCoffeeType('');
    setFinalSelectionDetail('');
  };
  const handleSelectGift = () => {

    setShowCoffeeType(false);

    setSelectedMethod('');
    setSelectedCoffeeType('');
    setFinalSelectionDetail('');
  };

  const handleMethodChange = (newMethod) => {
      setSelectedMethod(newMethod);
      setSelectedCoffeeType('');
      setFinalSelectionDetail(''); 
  };


  const handleCoffeeTypeChange = (newCoffeeType) => {
      setSelectedCoffeeType(newCoffeeType);
      setFinalSelectionDetail(''); 
  };

  return (
    <div className="middle-content-wrapper">

      {/* ========== Recipient Selection ========== */}
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

      {showCoffeeType && (

        <div className='coffee-type-container flex flex-col items-center gap-6 mt-6'> {/* Added margin top */}

          <div className='flex flex-col items-center gap-2 w-[250px]'> {/* Give width */}
            <h3 className="text-lg font-semibold mb-1">Select Method</h3> {/* Added margin bottom */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between"> {/* Use w-full */}
                  {selectedMethod || "Select Method..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[250px]">
                <DropdownMenuLabel>Brew Method</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedMethod} onValueChange={handleMethodChange}>
                  <DropdownMenuRadioItem value="Filter">Filter</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Espresso">Espresso</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {selectedMethod && ( // Only show Dropdown 2 if Method is selected
            <div className="next-step-container w-[250px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedCoffeeType || (selectedMethod === 'Filter' ? "Select Filter Type..." : "Select Espresso Type...")}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px]">
                  <DropdownMenuLabel>{selectedMethod} Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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

          {selectedCoffeeType && ( // Only show Dropdown 3 if Coffee Type is selected
            <div className="third-step-container w-[250px]">
              {/* Sub-Condition 1: Roasters Choice */}
              {selectedCoffeeType === 'Roasters Choice' && (
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                              {finalSelectionDetail || "Select Roaster Option..."}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[250px]">
                          <DropdownMenuLabel>Roaster Option</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
                              {roastersChoiceOptions.map((option) => (
                                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                                      {option.label}
                                  </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                  </DropdownMenu>
              )}

              {/* Sub-Condition 2: Office */}
              {selectedCoffeeType === 'Office' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {finalSelectionDetail || "Select Office Size..."}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                         <DropdownMenuLabel>Office Size</DropdownMenuLabel>
                         <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
                            {officeSizeOptions.map((option) => (
                                <DropdownMenuRadioItem key={option.value} value={option.value}>
                                    {option.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
              )}

              {!['Roasters Choice', 'Office'].includes(selectedCoffeeType) && (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {finalSelectionDetail || "Select Quantity..."}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                        <DropdownMenuLabel>Quantity</DropdownMenuLabel>
                         <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={setFinalSelectionDetail}>
                            {quantityOptions.map((option) => (
                                <DropdownMenuRadioItem key={option.value} value={option.value}>
                                    {option.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                 </DropdownMenu>
              )}
            </div> 
          )}


          {finalSelectionDetail && (
                <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-[250px] text-center">
                    Selected: {selectedMethod} - {selectedCoffeeType} - {finalSelectionDetail}
                </div>
          )}

        </div> // End of coffee-type-container
      )}

    </div>
  );
};

export default MiddleContainer;