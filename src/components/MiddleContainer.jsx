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

// --- MODIFIED espressoOptions array ---
const espressoOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" }, // First option
    { value: "Masterpiece", label: "Masterpiece" },         // Second option (Moved up)
    { value: "Low-Caf", label: "Low-Caf" },                 // Now third
    { value: "Office", label: "Office" },                   // Now fourth
    { value: "Regional", label: "Regional" },               // Now fifth
];
// --- END MODIFICATION ---

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
// --- End Data Constants ---


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

    const [showCoffeeType, setShowCoffeeType] = useState(null);

    // --- useEffect Hooks ---
    // This effect sets a default frequency if one isn't set yet after quantity selection (for non-Masterpiece)
    useEffect(() => {
        if (typeof onFrequencyChange !== 'function') { return; }
        // Only set default if NOT Masterpiece and frequency isn't already set
        if (finalSelectionDetail && !selectedFrequency && selectedCoffeeType !== 'Masterpiece') {
            try { onFrequencyChange('4 Weeks (Recommended)'); } catch (error) { console.error('Error calling onFrequencyChange:', error); }
        }
    }, [finalSelectionDetail, selectedFrequency, selectedCoffeeType, onFrequencyChange]);

    // --- useEffect: Auto-set frequency for Masterpiece ---
    useEffect(() => {
        // Automatically set frequency for Masterpiece when quantity is selected
        if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail && typeof onFrequencyChange === 'function') {
             // Ensure the frequency isn't already set to avoid potential loops if needed, though App.jsx resets it
             // if (selectedFrequency !== '4 Weeks (Recommended)') {
                 try {
                     onFrequencyChange('4 Weeks (Recommended)'); // Set the fixed frequency
                 } catch (error) {
                     console.error('Error auto-setting Masterpiece frequency:', error);
                 }
             // }
        }
        // Note: We don't need to clear it here if switching away,
        // because handleCoffeeTypeChange in App.jsx already clears frequency.
    }, [selectedCoffeeType, finalSelectionDetail, onFrequencyChange]); // Dependency array includes relevant state/props
    // --- END useEffect ---


    // --- Event Handlers ---
    const handleSelectSelf = () => { setShowCoffeeType(true); };
    const handleSelectGift = () => { setShowCoffeeType(false); if (onResetSelections) onResetSelections(); };

    // Handlers delegate state updates (and subsequent resets) to props from parent
    const handleCoffeeTypeChange = (value) => { onCoffeeTypeChange(value); };
    const handleRoastersChoiceOptionChange = (value) => { onSizeOptionChange(value); };
    const handleRegionChangeInternal = (value) => { onRegionChange(value); };
    const handleSizeOptionChangeInternal = (value) => { onSizeOptionChange(value); };
    const handleQuantityChangeInternal = (value) => { onQuantityChange(value); };

    // Determine the correct coffee type options based on the selected method
    const currentCoffeeTypeOptions = selectedMethod === 'Filter' ? filterOptions : espressoOptions;

    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">

            {/* --- Recipient Selection --- */}
            <div className='recipient-container mt-10'>
               <div className='recipient-buttons-container'>
                    <div className={`recipient-button ${showCoffeeType === true ? 'selected' : ''}`} onClick={handleSelectSelf}>
                        <h2>It's for me</h2>
                        <p>Ahhh, My Coffee!</p>
                    </div>
                    <div className={`recipient-button ${showCoffeeType === false ? 'selected' : ''}`} onClick={handleSelectGift}>
                        <h2>It's a gift</h2>
                        <p>Top friend!</p>
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
                                        {/* Use the determined options array */}
                                        {currentCoffeeTypeOptions.map((option) => (
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
                                        <div className='info-text-container'>
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
                                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChangeInternal}>
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
                                                <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={handleSizeOptionChangeInternal}>
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
                                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChangeInternal}>
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
                                                <DropdownMenuRadioGroup value={selectedRegion} onValueChange={handleRegionChangeInternal}>
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
                                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChangeInternal}>
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
                           {/* --- Other Coffee Types Flow (Includes Masterpiece and Low-Caf for Quantity) --- */}
                           {/* Note: Masterpiece quantity text updated inside this block */}
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
                                            <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={handleQuantityChangeInternal}>
                                                {quantityOptions.map((option) => (
                                                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                       {selectedCoffeeType === 'Masterpiece'
                                                           ? `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (100 - 200g each)` // Text for Masterpiece
                                                           : `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)`   // Text for others (e.g., Low-Caf)
                                                       }
                                                    </DropdownMenuRadioItem>
                                                ))}
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                           )}
                        </>
                    )}

                    {/* --- Frequency Selection / Display --- */}
                    {/* Show Dropdown ONLY if quantity selected AND type is NOT Masterpiece */}
                    {finalSelectionDetail && selectedCoffeeType !== 'Masterpiece' && (
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

                    {/* --- Show Static Info Box ONLY if quantity selected AND type IS Masterpiece --- */}
                    {finalSelectionDetail && selectedCoffeeType === 'Masterpiece' && (
                        <div className='dropdown-row masterpiece-frequency-info'> {/* Re-use dropdown-row for alignment */}
                            <h3 className='dropdown-label'>Frequency</h3>
                            <div className='info-text-container'> {/* Borrow class from Roasters Choice */}
                                {/* Mimic Roasters Choice info box style */}
                                <div className='text-sm text-white bg-[#161616] w-full p-2 rounded-sm border border-[#A67C52] masterpiece-info-text text-center'>
                                    Ships every 4 weeks
                                </div>
                            </div>
                        </div>
                    )}
                    {/* --- END FREQUENCY DISPLAY --- */}


                   {/* --- Final Selection Display (Hidden by default in CSS) --- */}
                   {/* Condition remains the same: show when quantity AND frequency are set */}
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