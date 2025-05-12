// src/components/MiddleContainer.jsx
// Adds "Curated" type. Updates "Masterpiece" flow.
// Updates "Low-Caf" flow: adds info text, specific quantity labels, and frequency options.

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

// Subscription Styles for Filter Method
const filterOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Curated", label: "Curated" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Regional", label: "Regional" },
];

// Subscription Styles for Espresso Method
const espressoOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Curated", label: "Curated" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Office", label: "Office" },
    { value: "Regional", label: "Regional" },
];

const officeSizeOptions = [
    { value: "2 x 250g", label: "2 x 250g" },
    { value: "1 x 1kg", label: "1 x 1kg" },
    { value: "2 x 1kg", label: "2 x 1kg" },
    { value: "5 kg", label: "5 kg" },
];

// Standard Quantity options (values: "1" to "5")
const standardQuantityOptions = [
    { value: "1", label: "1" }, // Base label, will be formatted per type
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];

// Quantity options for Curated
const curatedQuantityOptions = [
    { value: "2", label: "2x 250g" },
    { value: "4", label: "4x 250g" },
    { value: "6", label: "6x 250g" },
];
const curatedQuantityLabelMap = curatedQuantityOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});

// Quantity options for Masterpiece
const masterpieceQuantityOptions = [
    { value: "1", label: "1x bag (100-150g)" },
    { value: "2", label: "2x bags (100-150g)" },
    { value: "3", label: "3x bags (100-150g)" },
];
const masterpieceQuantityLabelMap = masterpieceQuantityOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});

const regionOptions = [
    { value: "Brazil", label: "Brazil" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Center America", label: "Center America" },
];

// Base frequency options
const baseFrequencyOptions = [
    { value: "1 Week", label: "1 Week" },
    { value: "2 Weeks", label: "2 Weeks" },
    { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks (Recommended)", label: "4 Weeks (Recommended)" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// Frequencies for RC & Curated
const allowedRCorCuratedFrequencies = ["4 Weeks (Recommended)", "6 Weeks"];
// --- NEW: Frequencies for Low-Caf ---
const allowedLowCafFrequencies = ["2 Weeks", "4 Weeks (Recommended)", "6 Weeks"];

// Capsule Edition Options
const capsuleEditionOptions = [
    { value: "Seasonal Brazil", label: "Seasonal Brazil" },
    { value: "Seasonal Ethiopia", label: "Seasonal Ethiopia" },
];
// --- End Data Constants ---


// --- Component ---
const MiddleContainer = ({
    // Props
    selectedMethod,
    selectedCoffeeType,
    selectedRegion,
    selectedSizeOption,
    finalSelectionDetail, // Quantity value ("1", "2", "3" etc.)
    selectedFrequency,
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange,
    onQuantityChange, // Expects the VALUE ("1", "2", "3" etc.)
    onFrequencyChange,
    onResetSelections,
    selectedEdition,
    onEditionChange,
}) => {

    // State
    const [showOptionsContainer, setShowOptionsContainer] = useState(null);

    // --- useEffect Hooks ---
    // Effect to set default frequency when quantity is chosen and frequency isn't set
    useEffect(() => {
        if (typeof onFrequencyChange !== 'function') { return; }
        const isReadyForFrequency = finalSelectionDetail && !selectedFrequency;
        if (!isReadyForFrequency) return;

        const isMasterpiece = selectedCoffeeType === 'Masterpiece';
        // Masterpiece handles its frequency state in a separate effect.
        // For other types, if ready and no frequency set, default to "4 Weeks (Recommended)".
        // The effect below will handle if this default is invalid for the specific type.
        if (!isMasterpiece && !selectedFrequency) {
            try { onFrequencyChange('4 Weeks (Recommended)'); }
            catch (error) { console.error('Error setting initial default frequency:', error); }
        }
    }, [finalSelectionDetail, selectedCoffeeType, selectedFrequency, onFrequencyChange]);


    useEffect(() => {
        // Set frequency state for Masterpiece (even though dropdown isn't shown)
        if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail && typeof onFrequencyChange === 'function') {
             try {
                 if (!selectedFrequency || selectedFrequency !== '4 Weeks (Recommended)') {
                     onFrequencyChange('4 Weeks (Recommended)');
                 }
             } catch (error) {
                 console.error('Error auto-setting Masterpiece frequency state:', error);
             }
        }
    }, [selectedCoffeeType, finalSelectionDetail, selectedFrequency, onFrequencyChange]);


    // Effect to reset frequency if current selection becomes invalid due to type change
    useEffect(() => {
        let resetToFrequency = null;
        let needsReset = false;
        let currentAllowedFrequencies = [];

        if (['Roasters Choice', 'Curated'].includes(selectedCoffeeType)) {
            currentAllowedFrequencies = allowedRCorCuratedFrequencies;
        } else if (selectedCoffeeType === 'Low-Caf') {
            currentAllowedFrequencies = allowedLowCafFrequencies; // <-- Use Low-Caf frequencies
        }

        if (currentAllowedFrequencies.length > 0 && selectedFrequency && !currentAllowedFrequencies.includes(selectedFrequency)) {
            // Default to the first allowed option or a specific default like '4 Weeks (Recommended)'
            resetToFrequency = currentAllowedFrequencies.includes('4 Weeks (Recommended)') ? '4 Weeks (Recommended)' : currentAllowedFrequencies[0];
            needsReset = true;
        }

        if (needsReset && typeof onFrequencyChange === 'function') {
            console.warn(`${selectedCoffeeType} selected with invalid frequency '${selectedFrequency}', resetting to ${resetToFrequency}.`);
            try { onFrequencyChange(resetToFrequency); }
            catch (error) { console.error(`Error resetting frequency for ${selectedCoffeeType}:`, error); }
        }
    }, [selectedCoffeeType, selectedFrequency, onFrequencyChange]);


    // Effect to reset quantity if invalid for specific types
    useEffect(() => {
        let isValidQty = true;
        if (selectedCoffeeType === 'Curated' && finalSelectionDetail) {
            isValidQty = curatedQuantityOptions.some(o => o.value === finalSelectionDetail);
        } else if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail) {
            isValidQty = masterpieceQuantityOptions.some(o => o.value === finalSelectionDetail);
        }
        // Low-Caf uses standardQuantityOptions (1-5), so specific invalidation isn't strictly needed here
        // unless its quantity range differs from standard. It does not for now.

        if (!isValidQty) {
             console.warn(`${selectedCoffeeType} selected with invalid quantity '${finalSelectionDetail}', resetting quantity.`);
             if (typeof onQuantityChange === 'function') {
                 try { onQuantityChange(''); } catch (error) { console.error(`Error resetting quantity for ${selectedCoffeeType}:`, error); }
             }
        }
    }, [selectedCoffeeType, finalSelectionDetail, onQuantityChange]);

    // --- END useEffect ---


    // --- Event Handlers ---
    const handleSelectSelf = () => { setShowOptionsContainer(true); };
    const handleSelectGift = () => { setShowOptionsContainer(false); if (onResetSelections) onResetSelections(); };
    // --- End Event Handlers ---

    // Determine Subscription Style options based on Method
    const currentCoffeeTypeOptions = selectedMethod === 'Filter' ? filterOptions : espressoOptions;

    // Determine if Quantity dropdown should be shown
    const showQuantity =
        (selectedMethod === 'Capsules' && selectedEdition) ||
        (selectedMethod !== 'Capsules' && selectedCoffeeType &&
         (selectedCoffeeType === 'Roasters Choice' ||
          selectedCoffeeType === 'Curated' ||
          selectedCoffeeType === 'Masterpiece' ||
          selectedCoffeeType === 'Low-Caf' || // Low-Caf now follows this path
          (selectedCoffeeType === 'Office' && selectedSizeOption) ||
          (selectedCoffeeType === 'Regional' && selectedRegion)
         )
        );

    // Determine if Frequency step (dropdown or info) should be shown
    const showFrequencyStep = showQuantity && finalSelectionDetail;
    // Determine if interactive Frequency dropdown should be shown (Not for Masterpiece)
    const showFrequencyDropdown = showFrequencyStep && (selectedMethod === 'Capsules' || selectedCoffeeType !== 'Masterpiece');
    // Determine if Masterpiece fixed frequency info should be shown
    const showMasterpieceFrequencyInfo = showFrequencyStep && selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';


    // Determine which frequency options to display (for dropdown)
    const currentFrequencyOptions =
        selectedCoffeeType === 'Roasters Choice' || selectedCoffeeType === 'Curated'
            ? baseFrequencyOptions.filter(option => allowedRCorCuratedFrequencies.includes(option.value))
            : selectedCoffeeType === 'Low-Caf' // <-- ADDED Low-Caf frequency filter
                ? baseFrequencyOptions.filter(option => allowedLowCafFrequencies.includes(option.value))
                : baseFrequencyOptions;

    // Determine which quantity options to display
    const currentQuantityOptions =
        selectedCoffeeType === 'Curated' ? curatedQuantityOptions
        : selectedCoffeeType === 'Masterpiece' ? masterpieceQuantityOptions
        : standardQuantityOptions; // Low-Caf uses standard options (1-5 values)

    // Helper function to get the display label for the selected quantity value
    const getQuantityDisplayLabel = (value) => {
        if (!value) return "Select Quantity...";
        if (selectedCoffeeType === 'Curated') return curatedQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Masterpiece') return masterpieceQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Low-Caf') return `${value}x 250g`; // <-- ADDED Low-Caf label format
        // Other types...
        if (selectedMethod === 'Capsules') return `${value} box${parseInt(value) > 1 ? 'es' : ''}`;
        if (selectedCoffeeType === 'Roasters Choice') return `${value} x 250g`;
        if (selectedCoffeeType === 'Office') return value;
        if (selectedCoffeeType === 'Regional') return `${value} ${parseInt(value) > 1 ? 'bags' : 'bag'}`; // Regional uses "bag(s)"
        return value; // Default
    };


    // --- Component Render ---
    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">

            {/* Recipient Selection */}
            <div className='recipient-container mt-10'>
               <div className='recipient-buttons-container'>
                    <div className={`recipient-button ${showOptionsContainer === true ? 'selected' : ''}`} onClick={handleSelectSelf}>
                        <h2>Pay per Delivery</h2>
                        <p>(Flexible Subscriptions)</p>
                    </div>
                    <div className={`recipient-button ${showOptionsContainer === false ? 'selected' : ''}`} onClick={handleSelectGift}>
                        <h2>Upfront Payment</h2>
                        <p>(Term / Gift)</p>
                    </div>
                </div>
            </div>

            {/* Coffee Selection Flow */}
            {showOptionsContainer !== null && (
                <div className='coffee-type-container w-5/6 rounded-md p-3 pt-5 flex flex-col items-center gap-y-2 bg-[#3a3c3d] justify-center mt-5'>

                    {/* Step 1: Method Selection */}
                    <div className='dropdown-row'>
                       <h3 className='dropdown-label'>Method</h3>
                       <DropdownMenu> {/* ... Method Dropdown ... */}
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className='dropdown-trigger-button'>
                                    {selectedMethod || "Select Method..."}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='dropdown-content-panel'>
                                <DropdownMenuRadioGroup value={selectedMethod} onValueChange={onMethodChange}>
                                    <DropdownMenuRadioItem value="Filter">Filter</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Espresso">Espresso</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Capsules">Capsules</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                       </div>

                    {/* Step 2: Conditional Type OR Edition */}
                    {selectedMethod === 'Capsules' && (
                        <div className='dropdown-row'>
                           <h3 className='dropdown-label'>Edition</h3>
                           <DropdownMenu> {/* ... Capsule Edition Dropdown ... */}
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {selectedEdition || "Select Edition..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    <DropdownMenuRadioGroup value={selectedEdition} onValueChange={onEditionChange}>
                                        {capsuleEditionOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                           </div>
                    )}

                    {['Filter', 'Espresso'].includes(selectedMethod) && (
                        <div className='dropdown-row'>
                           <h3 className='dropdown-label'>Subscription Style</h3>
                           <DropdownMenu> {/* ... Subscription Style Dropdown ... */}
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {selectedCoffeeType || "Select Type..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    <DropdownMenuRadioGroup value={selectedCoffeeType} onValueChange={onCoffeeTypeChange}>
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

                    {/* Step 3: Conditional Options / Info Text */}
                    {(selectedCoffeeType || selectedEdition) && (
                        <>
                            {/* Capsules: Static Size Info */}
                            {selectedMethod === 'Capsules' && selectedEdition && (
                                <div className='dropdown-row capsule-size-info' key="capsule-size"> {/* ... Capsule Size ... */}
                                    <h3 className='dropdown-label'>Size</h3>
                                    <div className='info-text-container flex items-center justify-center'>
                                        <div className='static-text-value h-10 px-3 py-2 bg-muted text-muted-foreground rounded-md text-sm flex items-center w-full justify-center border border-input'>
                                            30 capsules
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Filter/Espresso: Dynamic Options / Info */}
                            {selectedMethod !== 'Capsules' && selectedCoffeeType && (
                                <>
                                    {/* Roasters Choice Info Text */}
                                    {selectedCoffeeType === 'Roasters Choice' && (
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="rc-info"> {/* ... RC Info ... */}
                                             <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every Month,</span> Our Roasters Pick a New Coffee for You</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Curated Info Text */}
                                    {selectedCoffeeType === 'Curated' && (
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="curated-info"> {/* ... Curated Info ... */}
                                             <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> Our Roasters pick two different coffees for you</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                     {/* Masterpiece Info Text */}
                                     {selectedCoffeeType === 'Masterpiece' && (
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="masterpiece-info"> {/* ... Masterpiece Info ... */}
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> We send you one bag of the most extraordinary coffee</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* --- ADDED: Low-Caf Info Text --- */}
                                    {selectedCoffeeType === 'Low-Caf' && (
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="lowcaf-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'> {/* Reusing styles */}
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Receive our</span> low-caf varietal coffee on repeat</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {/* --- END ADDED: Low-Caf Info Text --- */}

                                    {/* Office Size Dropdown */}
                                    {selectedCoffeeType === 'Office' && (
                                         <div className='dropdown-row' key="office-size"> {/* ... Office Size ... */}
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
                                   )}

                                    {/* Regional Region Dropdown */}
                                    {selectedCoffeeType === 'Regional' && (
                                        <div className='dropdown-row' key="regional-region"> {/* ... Regional Region ... */}
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
                                   )}
                                </>
                            )}
                        </>
                    )}

                    {/* Step 4: Quantity Dropdown */}
                    {showQuantity && (
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Quantity of Coffee</h3>
                            <DropdownMenu> {/* ... Quantity Dropdown ... */}
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {getQuantityDisplayLabel(finalSelectionDetail)}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                        {currentQuantityOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                               {selectedCoffeeType === 'Curated'
                                                    ? option.label
                                                    : selectedCoffeeType === 'Masterpiece'
                                                        ? option.label
                                                        : selectedCoffeeType === 'Low-Caf' // <-- ADDED Low-Caf quantity label
                                                            ? `${option.label}x 250g`
                                                            : selectedMethod === 'Capsules'
                                                                ? `${option.label} box${parseInt(option.value) > 1 ? 'es' : ''} (30 caps each)`
                                                                : selectedCoffeeType === 'Office'
                                                                    ? option.label
                                                                    : selectedCoffeeType === 'Regional'
                                                                        ? `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)`
                                                                        : selectedCoffeeType === 'Roasters Choice'
                                                                            ? `${option.label} x 250g`
                                                                            // Fallback for any other unexpected type (shouldn't happen)
                                                                            : `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)`
                                                }
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                               </div>
                    )}

                    {/* Step 5: Frequency Selection / Display */}
                    {showFrequencyDropdown && ( // Interactive dropdown
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Frequency</h3>
                            <DropdownMenu> {/* ... Frequency Dropdown ... */}
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {selectedFrequency || "Select Frequency..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    <DropdownMenuRadioGroup value={selectedFrequency} onValueChange={onFrequencyChange}>
                                        {currentFrequencyOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                           </div>
                    )}

                    {showMasterpieceFrequencyInfo && ( // Masterpiece fixed info
                        <div className='dropdown-row masterpiece-frequency-info'>
                            <h3 className='dropdown-label'>Frequency</h3>
                            <div className='info-text-container flex items-center justify-center'>
                                <div className='static-text-value h-10 px-3 py-2 bg-[#161616] text-[#A67C52] font-bold rounded-md flex items-center w-full justify-center border-1 border-[#A67C52]'>
                                     4 weeks
                                </div>
                            </div>
                        </div>
                    )}

                   {/* Final Selection Display */}
                   {finalSelectionDetail && selectedFrequency && (
                       <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                           Selected: {selectedMethod}
                           {selectedMethod === 'Capsules' && selectedEdition && ` - ${selectedEdition} (30 caps)`}
                           {selectedMethod !== 'Capsules' && selectedCoffeeType && ` - ${selectedCoffeeType}`}
                           {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                           {selectedCoffeeType === 'Office' && selectedSizeOption && ` - ${selectedSizeOption}`}
                           {' '}- Qty: {getQuantityDisplayLabel(finalSelectionDetail)}
                           {selectedFrequency && ` - Every ${selectedFrequency.replace(' (Recommended)', '')}`}
                       </div>
                   )}

                </div> // End coffee-type-container
            )}
            {/* End Coffee Selection Flow */}
        </div> // End middle-content-wrapper
    );
};

export default MiddleContainer;