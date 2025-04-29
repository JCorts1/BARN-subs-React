// src/components/MiddleContainer.jsx

import React, { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import "./MiddleContainer.css"; // Your CSS file

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
const frequencyOptions = [
    { value: "1 Week", label: "1 Week" },
    { value: "2 Weeks", label: "2 Weeks" },
    { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks (Recommended)", label: "4 Weeks (Recommended)" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// --- Component ---
const MiddleContainer = ({
    selectedMethod,
    selectedCoffeeType,
    selectedRegion,
    selectedSizeOption,
    finalSelectionDetail,
    selectedFrequency,
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange,
    onQuantityChange,
    onFrequencyChange,
    onResetSelections
}) => {

    // Initial state remains null
    const [showCoffeeType, setShowCoffeeType] = useState(null);

    // --- useEffect Hook ---
    useEffect(() => {
      if (typeof onFrequencyChange !== 'function') { return; }
      if (finalSelectionDetail && !selectedFrequency) {
          try { onFrequencyChange('4 Weeks (Recommended)'); } catch (error) { console.error('Error calling onFrequencyChange:', error); }
      }
    }, [finalSelectionDetail, selectedFrequency, onFrequencyChange]);

    // --- Event Handlers ---
    const handleSelectSelf = () => { setShowCoffeeType(true); };
    const handleSelectGift = () => { setShowCoffeeType(false); if (onResetSelections) onResetSelections(); };
    const handleCoffeeTypeChange = (value) => { onCoffeeTypeChange(value); onRegionChange(null); onSizeOptionChange(null); onQuantityChange(null); onFrequencyChange(null); };
    const handleRoastersChoiceOptionChange = (value) => { onSizeOptionChange(value); onQuantityChange(null); onFrequencyChange(null); };

    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">

            {/* --- Recipient Selection --- */}
            <div className='recipient-container mt-10'>
               <div className='recipient-buttons-container'>
                    <div className={`recipient-button ${showCoffeeType === true ? 'selected' : ''}`} onClick={handleSelectSelf}>
                        <h2>It's for me</h2>
                        <p>Taking care of yourself</p>
                    </div>
                    <div className={`recipient-button ${showCoffeeType === false ? 'selected' : ''}`} onClick={handleSelectGift}>
                        <h2>It's a gift</h2>
                        <p>Oh wow</p>
                    </div>
                </div>
            </div>

            {/* --- Coffee Selection Flow --- */}
            {showCoffeeType && (
                <div className='coffee-type-container w-5/6 rounded-md p-3 pt-5 flex flex-col items-center gap-y-2 bg-[#3a3c3d] justify-center mt-5'>

                    {/* Step 1: Method Selection */}
                    <div className='dropdown-row'>
                       <h3 className='dropdown-label'>Method</h3>
                       <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className='dropdown-trigger-button'>
                                    {selectedMethod || "What roast style?"}
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
                                        {selectedCoffeeType || "Select Type..."}
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
                            {/* --- Roasters Choice Specific Flow --- */}
                            {selectedCoffeeType === 'Roasters Choice' && (
                                <>
                                    {/* Informational Container */}
                                    <div className='dropdown-row roasters-choice-info'>
                                        <h3 className='dropdown-label'>Roaster's Pick</h3>
                                        {/* --- MODIFIED: Removed flex-1 class --- */}
                                        <div className='info-text-container'>
                                        {/* --- END MODIFICATION --- */}
                                            <ul className='text-sm text-white bg-[#161616] w-full p-2 rounded-sm border border-[#A67C52] roasters-info-list'>
                                                <li><span className='text-[#A67C52]'>1 Bag:</span> Our rotating monthly feature.</li>
                                                <li><span className='text-[#A67C52]'>2 Bags:</span> 2 different rotating coffees monthly.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Option Dropdown */}
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
                                                <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={handleRoastersChoiceOptionChange}>
                                                    {roastersChoiceOptions.map((option) => (
                                                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </DropdownMenuRadioItem>
                                                    ))}
                                                </DropdownMenuRadioGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {/* Quantity Dropdown */}
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

                           {/* --- Office Specific Flow --- */}
                           {selectedCoffeeType === 'Office' && (
                                <>
                                    {/* Size Dropdown */}
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
                                    {/* Quantity Dropdown */}
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
                           {/* --- Regional Specific Flow --- */}
                           {selectedCoffeeType === 'Regional' && (
                                <>
                                    {/* Region Dropdown */}
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
                                    {/* Quantity Dropdown */}
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
                                                                {option.label} {parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)
                                                            </DropdownMenuRadioItem>
                                                        ))}
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )}
                                </>
                           )}
                           {/* --- Other Coffee Types Flow --- */}
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
                                                         {option.label} {parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)
                                                    </DropdownMenuRadioItem>
                                                ))}
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                           )}
                        </>
                    )}

                    {/* --- Frequency Selection --- */}
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

                   {/* --- Final Selection Display (Hidden by default in CSS) --- */}
                   {finalSelectionDetail && selectedFrequency && (
                       <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                           Selected: {selectedMethod} - {selectedCoffeeType}
                           {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                           {(selectedCoffeeType === 'Roasters Choice' || selectedCoffeeType === 'Office') && selectedSizeOption && ` - ${selectedSizeOption}`}
                           {' '}- Qty: {finalSelectionDetail}
                           {selectedFrequency && ` - Every ${selectedFrequency.replace(' (Recommended)', '')}`}
                       </div>
                   )}
                </div>
            )}
        </div>
    );
};

export default MiddleContainer;