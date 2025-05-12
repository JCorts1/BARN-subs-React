// src/components/MiddleContainer.jsx
// FINAL VERSION: Adds Capsule flow, removes Roasters Choice "Option" dropdown,
// updates RC quantity label format, and restricts RC frequency options.

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

// --- Data Constants (Complete) ---
const filterOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Regional", label: "Regional" },
];

const espressoOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" },
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

// Base frequency options available for most types
const baseFrequencyOptions = [
    { value: "1 Week", label: "1 Week" },
    { value: "2 Weeks", label: "2 Weeks" },
    { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks (Recommended)", label: "4 Weeks (Recommended)" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

// Specific frequencies allowed for Roasters Choice
const allowedRoastersChoiceFrequencies = ["4 Weeks (Recommended)", "6 Weeks"];

// --- Added: Capsule Edition Options ---
const capsuleEditionOptions = [
    { value: "Seasonal Brazil", label: "Seasonal Brazil" },
    { value: "Seasonal Ethiopia", label: "Seasonal Ethiopia" },
];
// --- End Data Constants ---


// --- Component ---
const MiddleContainer = ({
    // Existing props
    selectedMethod,
    selectedCoffeeType,
    selectedRegion,
    selectedSizeOption, // Still needed for Office
    finalSelectionDetail,
    selectedFrequency,
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange, // Still needed for Office
    onQuantityChange,
    onFrequencyChange,
    onResetSelections,
    // --- Added Props for Capsules ---
    selectedEdition,
    onEditionChange,
}) => {

    // This state only controls initial visibility after gift/self selection
    const [showOptionsContainer, setShowOptionsContainer] = useState(null);

    // --- useEffect Hooks ---
    useEffect(() => {
        // Sets default frequency (excluding Masterpiece) after quantity is chosen
        if (typeof onFrequencyChange !== 'function') { return; }
        const isReadyForFrequency = finalSelectionDetail && !selectedFrequency;
        const isMasterpiece = selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';
        const isRoastersChoice = selectedCoffeeType === 'Roasters Choice';

        // Set default only if not Masterpiece AND not Roasters Choice (RC default is handled by the reset effect below)
        if (isReadyForFrequency && !isMasterpiece && !isRoastersChoice) {
            try { onFrequencyChange('4 Weeks (Recommended)'); } catch (error) { console.error('Error calling onFrequencyChange:', error); }
        }
        // If it's Roasters Choice and ready, ensure default is set (handled by the reset effect too, but belt-and-suspenders)
        else if (isReadyForFrequency && isRoastersChoice) {
             try { onFrequencyChange('4 Weeks (Recommended)'); } catch (error) { console.error('Error setting default RC frequency:', error); }
        }

    }, [finalSelectionDetail, selectedFrequency, selectedCoffeeType, selectedMethod, onFrequencyChange]);

    useEffect(() => {
        // Auto-set frequency for Masterpiece (only if method isn't Capsules)
        if (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece' && finalSelectionDetail && typeof onFrequencyChange === 'function') {
             try {
                 onFrequencyChange('4 Weeks (Recommended)'); // Masterpiece frequency is fixed display, but state might need setting
             } catch (error) {
                 console.error('Error auto-setting Masterpiece frequency:', error);
             }
        }
    }, [selectedMethod, selectedCoffeeType, finalSelectionDetail, onFrequencyChange]);

    // --- ADDED: Effect to reset frequency if invalid for Roasters Choice ---
    useEffect(() => {
        if (selectedCoffeeType === 'Roasters Choice' && selectedFrequency && !allowedRoastersChoiceFrequencies.includes(selectedFrequency)) {
            // If Roasters Choice is selected and the current frequency is now invalid for it,
            // reset to the default allowed frequency.
            console.warn(`Roasters Choice selected with previously valid frequency '${selectedFrequency}', resetting to default allowed.`);
            if (typeof onFrequencyChange === 'function') {
                try {
                    onFrequencyChange('4 Weeks (Recommended)'); // Reset to default
                } catch (error) {
                    console.error('Error resetting frequency for Roasters Choice:', error);
                }
            }
        }
    }, [selectedCoffeeType, selectedFrequency, onFrequencyChange]);
    // --- END useEffect ---


    // --- Event Handlers ---
    const handleSelectSelf = () => { setShowOptionsContainer(true); };
    const handleSelectGift = () => { setShowOptionsContainer(false); if (onResetSelections) onResetSelections(); };
    // We just pass the handlers from App.jsx directly to the Dropdown components now
    // --- End Event Handlers ---

    // Determine coffee type options (only needed for Filter/Espresso)
    const currentCoffeeTypeOptions = selectedMethod === 'Filter' ? filterOptions : espressoOptions;

    // Determine if the main selection process after Method is complete enough to show Quantity
    // --- UPDATED showQuantity logic ---
    const showQuantity =
        (selectedMethod === 'Capsules' && selectedEdition) || // Capsules path needs Edition selected
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Roasters Choice') || // Roasters Choice just needs Type
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Office' && selectedSizeOption) || // Office needs Size
        (selectedMethod !== 'Capsules' && selectedCoffeeType === 'Regional' && selectedRegion) || // Regional needs Region
        (selectedMethod !== 'Capsules' && ['Masterpiece', 'Low-Caf'].includes(selectedCoffeeType) && selectedCoffeeType); // Masterpiece/LowCaf just need Type selected

    // Determine if Frequency dropdown should be shown
    // Masterpiece has fixed frequency info instead of a dropdown
    const showFrequency = showQuantity && finalSelectionDetail && (selectedMethod === 'Capsules' || selectedCoffeeType !== 'Masterpiece');

    // Determine if Masterpiece fixed frequency info should be shown
    const showMasterpieceFrequencyInfo = showQuantity && finalSelectionDetail && selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';


    // --- Determine which frequency options to display ---
    const currentFrequencyOptions = selectedCoffeeType === 'Roasters Choice'
        ? baseFrequencyOptions.filter(option => allowedRoastersChoiceFrequencies.includes(option.value))
        : baseFrequencyOptions;


    // --- Component Render ---
    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">

            {/* --- Recipient Selection (Complete and Unchanged) --- */}
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
            {/* --- End Recipient Selection --- */}


            {/* --- Coffee Selection Flow --- */}
            {showOptionsContainer !== null && (
                <div className='coffee-type-container w-5/6 rounded-md p-3 pt-5 flex flex-col items-center gap-y-2 bg-[#3a3c3d] justify-center mt-5'>

                    {/* Step 1: Method Selection (Capsules Added) */}
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
                                {/* Use onMethodChange prop */}
                                <DropdownMenuRadioGroup value={selectedMethod} onValueChange={onMethodChange}>
                                    <DropdownMenuRadioItem value="Filter">Filter</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Espresso">Espresso</DropdownMenuRadioItem>
                                    {/* --- ADDED CAPSULES --- */}
                                    <DropdownMenuRadioItem value="Capsules">Capsules</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {/* End Step 1 */}


                    {/* --- START: Conditional Step 2: Type OR Edition --- */}
                    {/* Show Edition Dropdown only if Method is Capsules */}
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
                                    {/* Use onEditionChange prop */}
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

                    {/* Show Original Type Dropdown only if Method is Filter or Espresso */}
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
                                    {/* Use onCoffeeTypeChange prop */}
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
                     {/* --- End Conditional Step 2 --- */}


                    {/* --- START: Conditional Step 3: Options OR Static Text --- */}
                    {/* Show this block if a Type (for Filter/Espresso) OR an Edition (for Capsules) is selected */}
                    {(selectedCoffeeType || selectedEdition) && (
                        <>
                            {/* --- Capsules: Show Static Size Info --- */}
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

                            {/* --- Filter/Espresso: Show Dynamic Options --- */}
                            {selectedMethod !== 'Capsules' && selectedCoffeeType && (
                                <>
                                    {/* --- Roasters Choice Specific Flow (Option Dropdown REMOVED) --- */}
                                    {selectedCoffeeType === 'Roasters Choice' && (
                                        <React.Fragment key="roasters-choice-flow">
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }}>
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every Month,</span> Our Roasters Pick a New Coffee for You</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    )}

                                   {/* --- Office Specific Flow (Complete and Unchanged from original) --- */}
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
                                                     {/* Use onSizeOptionChange prop */}
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
                                   {/* --- Regional Specific Flow (Complete and Unchanged from original) --- */}
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
                                                     {/* Use onRegionChange prop */}
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
                                   {/* --- Other Coffee Types Flow (Masterpiece/Low-Caf) --- */}
                                   {/* These types skip Step 3, Quantity appears next based on showQuantity */}

                                </>
                            )}
                            {/* End Filter/Espresso Dynamic Options */}
                        </>
                    )}
                    {/* --- End Conditional Step 3 --- */}


                    {/* Step 4: Quantity Dropdown */}
                    {/* Renders based on calculated showQuantity condition */}
                    {showQuantity && (
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Quantity of Coffee</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {finalSelectionDetail || "Select Quantity..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                     {/* Use onQuantityChange prop */}
                                    <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                        {quantityOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                               {/* Label Logic Updated for Capsules & RC */}
                                               {selectedMethod === 'Capsules'
                                                   ? `${option.label} box${parseInt(option.value) > 1 ? 'es' : ''} (30 caps each)`
                                                   : selectedCoffeeType === 'Masterpiece'
                                                       ? `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (100-200g each)`
                                                       : selectedCoffeeType === 'Office'
                                                            ? option.label // Office size specified elsewhere
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
                    {/* End Quantity Dropdown */}


                    {/* Step 5: Frequency Selection / Display */}
                    {/* Show dropdown only if frequency should be shown AND type is not Masterpiece */}
                    {showFrequency && (
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Frequency</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {/* Display selected frequency or prompt */}
                                        {selectedFrequency || "Select Frequency..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    {/* Use onFrequencyChange prop */}
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

                    {/* Show fixed frequency info only for Masterpiece (when frequency step is reached) */}
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
                    {/* --- END FREQUENCY DISPLAY --- */}


                   {/* --- Final Selection Display (Complete and Updated for Capsules) --- */}
                   {finalSelectionDetail && selectedFrequency && (
                       <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                           Selected: {selectedMethod}
                           {selectedMethod === 'Capsules' && selectedEdition && ` - ${selectedEdition} (30 caps)`}
                           {selectedMethod !== 'Capsules' && selectedCoffeeType && ` - ${selectedCoffeeType}`}
                           {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                           {/* Only show sizeOption if it's Office and selected */}
                           {selectedCoffeeType === 'Office' && selectedSizeOption && ` - ${selectedSizeOption}`}
                           {' '}- Qty: {finalSelectionDetail} {/* Quantity value */}
                           {/* Size/Unit appended based on type in RightContainer now */}
                           {selectedFrequency && ` - Every ${selectedFrequency.replace(' (Recommended)', '')}`}
                       </div>
                   )}
                   {/* End Final Selection Display */}

                </div> // End coffee-type-container
            )}
            {/* End Coffee Selection Flow */}
        </div> // End middle-content-wrapper
    );
};

export default MiddleContainer;