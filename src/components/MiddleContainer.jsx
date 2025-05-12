// src/components/MiddleContainer.jsx
// Adds "Curated" type with specific info, quantity, and frequency options.

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
    { value: "Curated", label: "Curated" }, // <-- ADDED
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Regional", label: "Regional" },
];

// Subscription Styles for Espresso Method
const espressoOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Curated", label: "Curated" }, // <-- ADDED
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Office", label: "Office" },
    { value: "Regional", label: "Regional" },
];

// Note: roastersChoiceOptions array no longer used by UI after removing Option dropdown
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

// Quantity options for MOST types (value = number of bags/units)
const standardQuantityOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];

// --- NEW: Quantity options specifically for Curated type ---
// Value should be the numeric quantity selected (e.g., 2, 4, 6)
const curatedQuantityOptions = [
    { value: "2", label: "2x 250g" },
    { value: "4", label: "4x 250g" },
    { value: "6", label: "6x 250g" },
];
// Helper map to get Curated label from value
const curatedQuantityLabelMap = curatedQuantityOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {});
// --- END NEW Curated Quantity ---

const regionOptions = [
    { value: "Brazil", label: "Brazil" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Center America", label: "Center America" },
];

// Base frequency options available for most types
const baseFrequencyOptions = [
    { value: "1 Week", label: "1 Week" },
    { value: "2 Weeks", label: "2 Weeks" },
    { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks (Recommended)", label: "4 Weeks (Recommended)" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// Specific frequencies allowed for Roasters Choice AND Curated
const allowedLimitedFrequencies = ["4 Weeks (Recommended)", "6 Weeks"];

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
    finalSelectionDetail, // Stores the QUANTITY value (e.g., "1", "2", "4")
    selectedFrequency,
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange,
    onQuantityChange, // Expects the VALUE (e.g., "1", "2", "4")
    onFrequencyChange,
    onResetSelections,
    selectedEdition,
    onEditionChange,
}) => {

    // State
    const [showOptionsContainer, setShowOptionsContainer] = useState(null);

    // --- useEffect Hooks ---
    useEffect(() => {
        // Sets default frequency after quantity is chosen
        if (typeof onFrequencyChange !== 'function') { return; }
        const isReadyForFrequency = finalSelectionDetail && !selectedFrequency;
        const isMasterpiece = selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';
        const requiresLimitedFrequency = ['Roasters Choice', 'Curated'].includes(selectedCoffeeType);

        // Set default only if not Masterpiece AND does not require limited frequency
        if (isReadyForFrequency && !isMasterpiece && !requiresLimitedFrequency) {
            try { onFrequencyChange('4 Weeks (Recommended)'); } catch (error) { console.error('Error setting default frequency:', error); }
        }
        // If it requires limited frequency and ready, ensure default is set (handled by reset effect too)
        else if (isReadyForFrequency && requiresLimitedFrequency) {
             try { onFrequencyChange('4 Weeks (Recommended)'); } catch (error) { console.error('Error setting default limited frequency:', error); }
        }

    }, [finalSelectionDetail, selectedFrequency, selectedCoffeeType, selectedMethod, onFrequencyChange]);

    useEffect(() => {
        // Auto-set frequency info display for Masterpiece
        if (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece' && finalSelectionDetail && typeof onFrequencyChange === 'function') {
             try {
                 // While displayed as fixed, set state for consistency / potential future use
                 if (!selectedFrequency || selectedFrequency !== '4 Weeks (Recommended)') {
                     onFrequencyChange('4 Weeks (Recommended)');
                 }
             } catch (error) {
                 console.error('Error auto-setting Masterpiece frequency state:', error);
             }
        }
    }, [selectedMethod, selectedCoffeeType, finalSelectionDetail, selectedFrequency, onFrequencyChange]);

    // Effect to reset frequency if invalid for Roasters Choice OR Curated
    useEffect(() => {
        const requiresLimitedFrequency = ['Roasters Choice', 'Curated'].includes(selectedCoffeeType);
        if (requiresLimitedFrequency && selectedFrequency && !allowedLimitedFrequencies.includes(selectedFrequency)) {
            // If RC or Curated is selected and the current frequency is now invalid, reset.
            console.warn(`${selectedCoffeeType} selected with invalid frequency '${selectedFrequency}', resetting.`);
            if (typeof onFrequencyChange === 'function') {
                try {
                    onFrequencyChange('4 Weeks (Recommended)'); // Reset to default
                } catch (error) {
                    console.error(`Error resetting frequency for ${selectedCoffeeType}:`, error);
                }
            }
        }
    }, [selectedCoffeeType, selectedFrequency, onFrequencyChange]);

    // Effect to reset quantity if invalid for Curated
    useEffect(() => {
        if (selectedCoffeeType === 'Curated' && finalSelectionDetail) {
            const isValidCuratedQty = curatedQuantityOptions.some(option => option.value === finalSelectionDetail);
            if (!isValidCuratedQty) {
                 console.warn(`Curated selected with invalid quantity '${finalSelectionDetail}', resetting quantity.`);
                 if (typeof onQuantityChange === 'function') {
                     try { onQuantityChange(''); } catch (error) { console.error(`Error resetting quantity for Curated:`, error); }
                 }
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
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Roasters Choice') ||
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Curated') || // <-- ADDED Curated
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Office' && selectedSizeOption) ||
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Regional' && selectedRegion) ||
        (selectedMethod !== 'Capsules' && ['Masterpiece', 'Low-Caf'].includes(selectedCoffeeType) && selectedCoffeeType);

    // Determine if Frequency dropdown should be shown (Masterpiece has fixed display)
    const showFrequency = showQuantity && finalSelectionDetail && (selectedMethod === 'Capsules' || selectedCoffeeType !== 'Masterpiece');

    // Determine if Masterpiece fixed frequency info should be shown
    const showMasterpieceFrequencyInfo = showQuantity && finalSelectionDetail && selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';


    // Determine which frequency options to display based on Coffee Type
    const currentFrequencyOptions = ['Roasters Choice', 'Curated'].includes(selectedCoffeeType)
        ? baseFrequencyOptions.filter(option => allowedLimitedFrequencies.includes(option.value))
        : baseFrequencyOptions;

    // Determine which quantity options to display
    const currentQuantityOptions = selectedCoffeeType === 'Curated' ? curatedQuantityOptions : standardQuantityOptions;

    // Helper function to get the display label for the selected quantity value
    const getQuantityDisplayLabel = (value) => {
        if (!value) return "Select Quantity...";
        if (selectedCoffeeType === 'Curated') {
            return curatedQuantityLabelMap[value] || value; // Use map, fallback to value
        }
        // Add logic for other types if their labels differ significantly from their value
        if (selectedMethod === 'Capsules') return `${value} box${parseInt(value) > 1 ? 'es' : ''}`;
        if (selectedCoffeeType === 'Roasters Choice') return `${value} x 250g`;
        if (selectedCoffeeType === 'Masterpiece') return `${value} ${parseInt(value) > 1 ? 'bags' : 'bag'}`;
        if (selectedCoffeeType === 'Office') return value; // Office uses size dropdown
        if (selectedCoffeeType === 'Regional' || selectedCoffeeType === 'Low-Caf') return `${value} ${parseInt(value) > 1 ? 'bags' : 'bag'}`;

        return value; // Default fallback
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
                       <DropdownMenu>
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
                           <DropdownMenu>
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
                           <DropdownMenu>
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
                                                {option.label} {/* Includes "Curated" now */}
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
                                <div className='dropdown-row capsule-size-info' key="capsule-size">
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
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="rc-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every Month,</span> Our Roasters Pick a New Coffee for You</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* --- ADDED: Curated Info Text --- */}
                                    {selectedCoffeeType === 'Curated' && (
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="curated-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'> {/* Reusing class for similar style */}
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> Our Roasters pick two different coffees for you</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {/* --- END ADDED: Curated Info Text --- */}


                                    {/* Office Size Dropdown */}
                                    {selectedCoffeeType === 'Office' && (
                                         <div className='dropdown-row' key="office-size">
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
                                        <div className='dropdown-row' key="regional-region">
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
                                   {/* Masterpiece/Low-Caf skip this step */}
                                </>
                            )}
                        </>
                    )}

                    {/* Step 4: Quantity Dropdown */}
                    {showQuantity && (
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Quantity of Coffee</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {getQuantityDisplayLabel(finalSelectionDetail)} {/* Use helper for display */}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    {/* Pass the numeric quantity value on change */}
                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                        {/* Use conditional quantity options */}
                                        {currentQuantityOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                               {/* Generate item label based on type */}
                                               {selectedCoffeeType === 'Curated'
                                                    ? option.label // Use pre-defined label like "2x 250g"
                                                    : selectedMethod === 'Capsules'
                                                        ? `${option.label} box${parseInt(option.value) > 1 ? 'es' : ''} (30 caps each)`
                                                        : selectedCoffeeType === 'Masterpiece'
                                                            ? `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (100-200g each)`
                                                            : selectedCoffeeType === 'Office'
                                                                ? option.label // Office size already specified
                                                                : selectedCoffeeType === 'Regional'
                                                                    ? `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)`
                                                                    : selectedCoffeeType === 'Roasters Choice'
                                                                        ? `${option.label} x 250g`
                                                                        // Fallback for Low-Caf etc. (assuming 250g)
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
                    {showFrequency && (
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
                                        {/* Map over the conditionally determined frequency options */}
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

                    {/* Masterpiece Fixed Frequency Info */}
                     {showMasterpieceFrequencyInfo && (
                        <div className='dropdown-row masterpiece-frequency-info'>
                            <h3 className='dropdown-label'>Frequency</h3>
                            <div className='info-text-container'>
                                <div className='text-sm text-white bg-[#161616] w-full p-2 rounded-sm border border-[#A67C52] masterpiece-info-text text-center'>
                                     Ships every month
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
                           {/* Display Quantity - Use helper to get correct label for Curated */}
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