// src/components/MiddleContainer.jsx

import React, { useState, useEffect } from 'react'; // Ensure both useState and useEffect are imported
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuLabel, // Optional based on usage
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    // DropdownMenuSeparator, // Optional based on usage
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import "./MiddleContainer.css"; // Make sure this CSS file exists and is correctly styled

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
const roastersChoiceOptions = [ // Needed again for the Roasters Choice Option dropdown
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
    { value: "4 Weeks", label: "4 Weeks (Recommended)" }, 
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// --- Component ---
const MiddleContainer = ({
    selectedMethod,
    selectedCoffeeType,
    selectedRegion,
    selectedSizeOption, // Used for 'Roasters Choice' AND 'Office'
    finalSelectionDetail, // Quantity - Trigger for Frequency
    selectedFrequency,    // State for Frequency dropdown
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange,   // Used for 'Roasters Choice' AND 'Office'
    onQuantityChange,
    onFrequencyChange,    // Callback to set Frequency state in parent
    onResetSelections
}) => {

    // Internal state for showing the main selection area
    const [showCoffeeType, setShowCoffeeType] = useState(false);

    // --- useEffect Hook to Set Default Frequency (with Safeguards) ---
    useEffect(() => {
        // Log entry into the effect and current values
        // console.log('Effect running. Detail:', finalSelectionDetail, 'Freq:', selectedFrequency, 'Callback type:', typeof onFrequencyChange);

        // Safeguard: Check if the callback prop is actually a function
        if (typeof onFrequencyChange !== 'function') {
             // console.error('MiddleContainer Error: onFrequencyChange prop is not a function!');
             return; // Exit effect if callback is invalid
        }

        // Condition: Check if quantity has been selected AND frequency is not already set
        if (finalSelectionDetail && !selectedFrequency) {
            // console.log('Conditions met! Attempting to set default frequency to "4 Weeks".');
            try {
                 // Call the parent's state update function
                 onFrequencyChange('4 Weeks (Recommended)');
                 // console.log('Default frequency call successful.'); // Log success
            } catch (error) {
                // Log any error that occurs *during* the execution of onFrequencyChange
                console.error('Error occurred while calling onFrequencyChange:', error);
            }
        } else {
             // Log why the default wasn't set
             // console.log('Conditions NOT met for setting default frequency (Detail:', finalSelectionDetail, ', Freq:', selectedFrequency, ')');
        }

    // Dependency Array: Re-run effect if these values change
    }, [finalSelectionDetail, selectedFrequency, onFrequencyChange]);


    // --- Event Handlers ---

    // Toggle visibility based on recipient choice
    const handleSelectSelf = () => {
        setShowCoffeeType(true);
        if (onResetSelections) onResetSelections(); // Reset selections when switching recipient
    };
    const handleSelectGift = () => {
        setShowCoffeeType(false);
        if (onResetSelections) onResetSelections(); // Reset selections when switching recipient
    };

    // Handle Coffee Type change: Update state and reset dependent selections
    const handleCoffeeTypeChange = (value) => {
        onCoffeeTypeChange(value); // Update parent state
        // Reset downstream selections to avoid inconsistent state
        onRegionChange(null);
        onSizeOptionChange(null);
        onQuantityChange(null);
        onFrequencyChange(null); // Reset frequency too
    };

    // Handle Roasters Choice Option change: Update state and reset Quantity/Frequency
    const handleRoastersChoiceOptionChange = (value) => {
        onSizeOptionChange(value); // Update parent state for the selected option
        // Reset selections that depend on this specific option
        onQuantityChange(null);
        onFrequencyChange(null);
    }

    // --- Component Return Value (JSX) ---
    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">

            {/* --- Recipient Selection --- */}
            <div className='recipient-container mt-10'>
                <div className='recipient-buttons-container'>
                    {/* Add 'selected' class based on showCoffeeType state */}
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

            {/* --- Coffee Selection Flow (Conditionally Rendered) --- */}
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
                                    {/* Use handler that resets dependent state */}
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
                            {/* --- Roasters Choice Specific Flow --- */}
                            {selectedCoffeeType === 'Roasters Choice' && (
                                <>
                                    {/* Informational Container */}
                                    <div className='dropdown-row roasters-choice-info'>
                                        <h3 className='dropdown-label'>Roaster's Pick</h3>
                                        <div className='info-text-container flex-1 text-left pl-2'>
                                            <p className='text-sm text-muted-foreground'> {/* Adjust styling as needed */}
                                                Our expert roasters select a unique coffee for you, based on seasonality and peak flavor. Enjoy the surprise!
                                            </p>
                                        </div>
                                    </div>

                                    {/* Option Dropdown (Specific to Roasters Choice) */}
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
                                                {/* Use specific handler that resets Quantity/Frequency */}
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

                                    {/* Quantity Dropdown (Appears only after Option is selected) */}
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
                                                                {option.label} {/* Maybe add context: e.g., `${option.label} Set(s)` */}
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
                                                 {/* Use general onSizeOptionChange; resets handled by handleCoffeeTypeChange */}
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
                                                        {/* Assuming 250g bags for Regional */}
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

                            {/* --- Other Coffee Types Flow (Masterpiece, Low-Caf) --- */}
                            {/* Check includes all types handled above */}
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
                                                {/* Assuming 250g bags for these types */}
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

                    {/* --- Frequency Selection (Appears after Quantity/Final Detail is set) --- */}
                    {/* The useEffect hook above handles setting the default value */}
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
                    {/* Shows the summary only when the full flow is complete */}
                    {finalSelectionDetail && selectedFrequency && (
                        <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                            Selected: {selectedMethod} - {selectedCoffeeType}
                            {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                            {(selectedCoffeeType === 'Roasters Choice' || selectedCoffeeType === 'Office') && selectedSizeOption && ` - ${selectedSizeOption}`}
                            {' '}- Qty: {finalSelectionDetail}
                            {/* Optional: Add context based on type again if needed */}
                            {selectedFrequency && ` - Every ${selectedFrequency}`}
                        </div>
                    )}
                </div>
            )}
             {/* The conditional paragraph that was here has been removed */}
        </div>
    );
};

export default MiddleContainer;