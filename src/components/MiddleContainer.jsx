// src/components/MiddleContainer.jsx

import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuLabel, // Not strictly used in dropdowns below, keep if needed elsewhere
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    // DropdownMenuSeparator, // Not strictly used in dropdowns below, keep if needed elsewhere
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
// --- RE-ADD roastersChoiceOptions ---
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
    { value: "4 Weeks", label: "4 Weeks" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// --- Component receives state and callbacks as props ---
const MiddleContainer = ({
    selectedMethod,
    selectedCoffeeType,
    selectedRegion,
    selectedSizeOption, // Now used for 'Roasters Choice' AND 'Office'
    finalSelectionDetail, // Quantity
    selectedFrequency,
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange, // Now used for 'Roasters Choice' AND 'Office'
    onQuantityChange,
    onFrequencyChange,
    onResetSelections
}) => {

    const [showCoffeeType, setShowCoffeeType] = useState(false);

    const handleSelectSelf = () => {
        setShowCoffeeType(true);
        if (onResetSelections) onResetSelections();
    };

    const handleSelectGift = () => {
        setShowCoffeeType(false);
        if (onResetSelections) onResetSelections();
    };

    // Handler to reset downstream selections when coffee type changes
    const handleCoffeeTypeChange = (value) => {
        onCoffeeTypeChange(value);
        // Reset dependent selections
        onRegionChange(null);
        onSizeOptionChange(null); // Reset size/option (used by Roasters Choice & Office)
        onQuantityChange(null);
        onFrequencyChange(null);
    };

    // --- NEW: Handler specifically for Roasters Choice Option change ---
    // Ensure Quantity & Frequency are reset if the Option changes
    const handleRoastersChoiceOptionChange = (value) => {
        onSizeOptionChange(value); // Call the original handler
        // Reset quantity and frequency which depend on this selection
        onQuantityChange(null);
        onFrequencyChange(null);
    }

    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">

            {/* --- Recipient Selection --- */}
            <div className='recipient-container mt-10'>
                <div className='recipient-buttons-container'>
                    <div className={`recipient-button ${showCoffeeType ? 'selected' : ''}`} onClick={handleSelectSelf}>
                        <h2>It's for me</h2>
                        <p>Taking care of yourself</p>
                    </div>
                    <div className={`recipient-button ${!showCoffeeType ? 'selected' : ''}`} onClick={handleSelectGift}>
                        <h2>It's a gift</h2>
                        <p>Oh wow</p>
                    </div>
                </div>
            </div>

            {/* --- Coffee Selection Flow (Only if 'It's for me' is selected) --- */}
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
                                    {/* Use the refined handler to reset downstream state */}
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
                            {/* --- Roasters Choice Flow --- */}
                            {selectedCoffeeType === 'Roasters Choice' && (
                                <>
                                    {/* Informational Container */}
                                    <div className='dropdown-row roasters-choice-info'>
                                        <h3 className='dropdown-label'>Roaster's Pick</h3>
                                        <div className='info-text-container flex-1 text-left pl-2'>
                                            <p className='text-sm text-muted-foreground'>
                                                Our expert roasters select a unique coffee for you, based on seasonality and peak flavor. Enjoy the surprise!
                                            </p>
                                        </div>
                                    </div>

                                    {/* Option Dropdown (Now appears AFTER the info) */}
                                    <div className='dropdown-row'>
                                        <h3 className='dropdown-label'>Option</h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className='dropdown-trigger-button'>
                                                    {/* Use selectedSizeOption state here */}
                                                    {selectedSizeOption || "Select Option..."}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='dropdown-content-panel'>
                                                {/* Use the new handler for Roasters Choice options */}
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

                                    {/* Quantity Dropdown - Appears only after Option is selected */}
                                    {/* RE-ADD condition: selectedSizeOption */}
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
                                                                {option.label} {/* You might want context here based on selectedSizeOption */}
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
                                    {/* Size Dropdown (Uses officeSizeOptions) */}
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
                                                {/* Use onSizeOptionChange directly here */}
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
                                    {/* Quantity Dropdown (Appears after Size is selected) */}
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

                            {/* --- Regional Flow --- */}
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
                                    {/* Quantity Dropdown (Appears after Region is selected) */}
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

                            {/* --- Other Coffee Types Flow (e.g., Masterpiece, Low-Caf) --- */}
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
                    {/* Render frequency dropdown only after quantity (or equivalent final step) is selected */}
                    {/* The condition remains finalSelectionDetail - this works for all paths */}
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


                    {/* --- Final Selection Display --- */}
                    {/* Ensure selectedSizeOption is shown correctly for Roasters Choice */}
                    {finalSelectionDetail && selectedFrequency && (
                        <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                            Selected: {selectedMethod} - {selectedCoffeeType}
                            {/* Conditionally show details based on type */}
                            {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                            {/* Show selectedSizeOption if it's Roasters Choice or Office */}
                            {(selectedCoffeeType === 'Roasters Choice' || selectedCoffeeType === 'Office') && selectedSizeOption && ` - ${selectedSizeOption}`}
                            {' '}- Qty: {finalSelectionDetail}
                            {/* Add context to quantity based on type if needed, more complex now */}
                            {/* Example: {selectedCoffeeType !== 'Office' && ` x 250g bag${parseInt(finalSelectionDetail) > 1 ? 's' : ''}`} */}
                            {selectedFrequency && ` - Every ${selectedFrequency}`}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MiddleContainer;