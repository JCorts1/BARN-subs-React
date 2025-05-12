// src/components/MiddleContainer.jsx
// Updates "Office" flow: adds info text, new "Size" (quantity of 1kg) options,
// hides generic quantity, and sets specific frequency options.

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

const filterOptions = [ /* ... unchanged ... */
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Curated", label: "Curated" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Regional", label: "Regional" },
];
const espressoOptions = [ /* ... unchanged ... */
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Curated", label: "Curated" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Office", label: "Office" },
    { value: "Regional", label: "Regional" },
];

// --- UPDATED: Office "Size" options, now acting as quantity of 1kg bags ---
const officeSizeOptions = [
    { value: "1x 1kg", label: "1x 1kg" },
    { value: "2x 1kg", label: "2x 1kg" },
    { value: "3x 1kg", label: "3x 1kg" },
    { value: "4x 1kg", label: "4x 1kg" },
    { value: "5x 1kg", label: "5x 1kg" },
];
// --- END UPDATED Office Size ---

const standardQuantityOptions = [ /* ... unchanged ... */
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];
const curatedQuantityOptions = [ /* ... unchanged ... */
    { value: "2", label: "2x 250g" },
    { value: "4", label: "4x 250g" },
    { value: "6", label: "6x 250g" },
];
const curatedQuantityLabelMap = curatedQuantityOptions.reduce((acc, option) => { /* ... unchanged ... */
    acc[option.value] = option.label;
    return acc;
}, {});
const masterpieceQuantityOptions = [ /* ... unchanged ... */
    { value: "1", label: "1x bag (100-150g)" },
    { value: "2", label: "2x bags (100-150g)" },
    { value: "3", label: "3x bags (100-150g)" },
];
const masterpieceQuantityLabelMap = masterpieceQuantityOptions.reduce((acc, option) => { /* ... unchanged ... */
    acc[option.value] = option.label;
    return acc;
}, {});
const regionOptions = [ /* ... unchanged ... */
    { value: "Brazil", label: "Brazil" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Center America", label: "Center America" },
];
const baseFrequencyOptions = [ /* ... unchanged ... */
    { value: "1 Week", label: "1 Week" },
    { value: "2 Weeks", label: "2 Weeks" },
    { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks (Recommended)", label: "4 Weeks (Recommended)" },
    { value: "5 Weeks", label: "5 Weeks" },
    { value: "6 Weeks", label: "6 Weeks" }
];

const allowedRCorCuratedFrequencies = ["4 Weeks (Recommended)", "6 Weeks"];
const allowedLowCafRegionalFrequencies = ["2 Weeks", "4 Weeks (Recommended)", "6 Weeks"];
// --- NEW: Frequencies for Office ---
const allowedOfficeFrequencies = ["2 Weeks", "4 Weeks (Recommended)"];

const capsuleEditionOptions = [ /* ... unchanged ... */
    { value: "Seasonal Brazil", label: "Seasonal Brazil" },
    { value: "Seasonal Ethiopia", label: "Seasonal Ethiopia" },
];
// --- End Data Constants ---


// --- Component ---
const MiddleContainer = ({ /* ... props ... */
    selectedMethod,
    selectedCoffeeType,
    selectedRegion,
    selectedSizeOption, // For Office, this IS the quantity, e.g., "1x 1kg"
    finalSelectionDetail, // For Office, this will be set to selectedSizeOption by App.jsx
    selectedFrequency,
    onMethodChange,
    onCoffeeTypeChange,
    onRegionChange,
    onSizeOptionChange,
    onQuantityChange,
    onFrequencyChange,
    onResetSelections,
    selectedEdition,
    onEditionChange,
}) => {

    const [showOptionsContainer, setShowOptionsContainer] = useState(null);

    // --- useEffect Hooks ---
    useEffect(() => { // Default frequency setter
        if (typeof onFrequencyChange !== 'function') { return; }
        const isReadyForFrequency = (selectedCoffeeType === 'Office' && selectedSizeOption) || (finalSelectionDetail && selectedCoffeeType !== 'Office');
        const shouldSetDefault = isReadyForFrequency && !selectedFrequency;

        if (!shouldSetDefault) return;

        const isMasterpiece = selectedCoffeeType === 'Masterpiece';
        if (!isMasterpiece && !selectedFrequency) {
            // Determine appropriate default if current selection is invalid or not set
            let defaultFreq = '4 Weeks (Recommended)';
            if (selectedCoffeeType === 'Office' && !allowedOfficeFrequencies.includes(defaultFreq)) {
                defaultFreq = allowedOfficeFrequencies[0]; // Default to first available for Office if 4 weeks isn't allowed
            } else if ( (selectedCoffeeType === 'Low-Caf' || selectedCoffeeType === 'Regional') && !allowedLowCafRegionalFrequencies.includes(defaultFreq) ) {
                 defaultFreq = allowedLowCafRegionalFrequencies[0];
            } else if ( (selectedCoffeeType === 'Roasters Choice' || selectedCoffeeType === 'Curated') && !allowedRCorCuratedFrequencies.includes(defaultFreq) ) {
                 defaultFreq = allowedRCorCuratedFrequencies[0];
            }

            try { onFrequencyChange(defaultFreq); }
            catch (error) { console.error('Error setting initial default frequency:', error); }
        }
    }, [finalSelectionDetail, selectedCoffeeType, selectedFrequency, onFrequencyChange, selectedSizeOption]);


    useEffect(() => { // Masterpiece frequency state setter
        if (selectedCoffeeType === 'Masterpiece' && ((selectedCoffeeType === 'Office' && selectedSizeOption) || (finalSelectionDetail && selectedCoffeeType !== 'Office')) && typeof onFrequencyChange === 'function') {
             try {
                 if (!selectedFrequency || selectedFrequency !== '4 Weeks (Recommended)') {
                     onFrequencyChange('4 Weeks (Recommended)');
                 }
             } catch (error) { console.error('Error auto-setting Masterpiece frequency state:', error); }
        }
    }, [selectedCoffeeType, finalSelectionDetail, selectedSizeOption, selectedFrequency, onFrequencyChange]);


    useEffect(() => { // Frequency resetter on type change
        let resetToFrequency = null;
        let needsReset = false;
        let currentAllowedFrequencies = [];

        if (['Roasters Choice', 'Curated'].includes(selectedCoffeeType)) {
            currentAllowedFrequencies = allowedRCorCuratedFrequencies;
        } else if (['Low-Caf', 'Regional'].includes(selectedCoffeeType)) {
            currentAllowedFrequencies = allowedLowCafRegionalFrequencies;
        } else if (selectedCoffeeType === 'Office') { // <-- ADDED Office
            currentAllowedFrequencies = allowedOfficeFrequencies;
        }

        if (currentAllowedFrequencies.length > 0 && selectedFrequency && !currentAllowedFrequencies.includes(selectedFrequency)) {
            resetToFrequency = currentAllowedFrequencies.includes('4 Weeks (Recommended)') ? '4 Weeks (Recommended)' : currentAllowedFrequencies[0];
            needsReset = true;
        }

        if (needsReset && typeof onFrequencyChange === 'function') {
            console.warn(`${selectedCoffeeType} selected with invalid frequency '${selectedFrequency}', resetting to ${resetToFrequency}.`);
            try { onFrequencyChange(resetToFrequency); }
            catch (error) { console.error(`Error resetting frequency for ${selectedCoffeeType}:`, error); }
        }
    }, [selectedCoffeeType, selectedFrequency, onFrequencyChange]);


    useEffect(() => { // Quantity resetter for specific types
        let isValidQty = true;
        if (selectedCoffeeType === 'Curated' && finalSelectionDetail) {
            isValidQty = curatedQuantityOptions.some(o => o.value === finalSelectionDetail);
        } else if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail) {
            isValidQty = masterpieceQuantityOptions.some(o => o.value === finalSelectionDetail);
        }
        // Office uses selectedSizeOption for its quantity, which is validated by its own dropdown.
        // Regional & Low-Caf use standardQuantityOptions, no specific invalidation needed here.

        if (!isValidQty && selectedCoffeeType !== 'Office') { // Don't reset for office here
             console.warn(`${selectedCoffeeType} selected with invalid quantity '${finalSelectionDetail}', resetting quantity.`);
             if (typeof onQuantityChange === 'function') {
                 try { onQuantityChange(''); } catch (error) { console.error(`Error resetting quantity for ${selectedCoffeeType}:`, error); }
             }
        }
    }, [selectedCoffeeType, finalSelectionDetail, onQuantityChange]);

    // --- END useEffect ---


    const handleSelectSelf = () => { setShowOptionsContainer(true); };
    const handleSelectGift = () => { setShowOptionsContainer(false); if (onResetSelections) onResetSelections(); };

    const currentCoffeeTypeOptions = selectedMethod === 'Filter' ? filterOptions : espressoOptions;

    // --- UPDATED: showQuantity now excludes Office ---
    const showQuantity =
        (selectedMethod === 'Capsules' && selectedEdition) ||
        (selectedMethod !== 'Capsules' && selectedCoffeeType &&
         (selectedCoffeeType === 'Roasters Choice' ||
          selectedCoffeeType === 'Curated' ||
          selectedCoffeeType === 'Masterpiece' ||
          selectedCoffeeType === 'Low-Caf' ||
          // Office type does NOT use this generic quantity dropdown
          (selectedCoffeeType === 'Regional' && selectedRegion)
         )
        );

    // Determine if Frequency step (dropdown or info) should be shown
    // For Office, frequency is shown after selectedSizeOption (which acts as finalSelectionDetail)
    const officeIsReadyForFrequency = selectedCoffeeType === 'Office' && selectedSizeOption;
    const genericIsReadyForFrequency = showQuantity && finalSelectionDetail && selectedCoffeeType !== 'Office';
    const showFrequencyStep = officeIsReadyForFrequency || genericIsReadyForFrequency;

    const showFrequencyDropdown = showFrequencyStep && (selectedMethod === 'Capsules' || selectedCoffeeType !== 'Masterpiece');
    const showMasterpieceFrequencyInfo = showFrequencyStep && selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';


    // Determine which frequency options to display (for dropdown)
    const currentFrequencyOptions =
        selectedCoffeeType === 'Roasters Choice' || selectedCoffeeType === 'Curated'
            ? baseFrequencyOptions.filter(option => allowedRCorCuratedFrequencies.includes(option.value))
            : selectedCoffeeType === 'Low-Caf' || selectedCoffeeType === 'Regional'
                ? baseFrequencyOptions.filter(option => allowedLowCafRegionalFrequencies.includes(option.value))
                : selectedCoffeeType === 'Office' // <-- ADDED Office
                    ? baseFrequencyOptions.filter(option => allowedOfficeFrequencies.includes(option.value))
                    : baseFrequencyOptions;

    // Determine which quantity options to display (for the generic quantity dropdown)
    const currentQuantityOptions =
        selectedCoffeeType === 'Curated' ? curatedQuantityOptions
        : selectedCoffeeType === 'Masterpiece' ? masterpieceQuantityOptions
        : standardQuantityOptions;

    // Helper function to get the display label for the selected quantity/size value
    const getQuantityDisplayLabel = (value) => {
        if (!value) return selectedCoffeeType === 'Office' ? "Select Size..." : "Select Quantity..."; // Differentiate prompt for Office
        if (selectedCoffeeType === 'Curated') return curatedQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Masterpiece') return masterpieceQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Low-Caf') return `${value}x 250g`;
        if (selectedCoffeeType === 'Regional') return `${value}x 250g`;
        if (selectedCoffeeType === 'Office') return value; // Value is already "1x 1kg" etc.
        if (selectedMethod === 'Capsules') return `${value} box${parseInt(value) > 1 ? 'es' : ''}`;
        if (selectedCoffeeType === 'Roasters Choice') return `${value} x 250g`;
        return value;
    };


    // --- Component Render ---
    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">
            {/* ... Recipient Selection ... */}
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

            {showOptionsContainer !== null && (
                <div className='coffee-type-container w-5/6 rounded-md p-3 pt-5 flex flex-col items-center gap-y-2 bg-[#3a3c3d] justify-center mt-5'>

                    {/* Step 1: Method Selection */}
                    <div className='dropdown-row'> {/* ... Method ... */}
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
                    {selectedMethod === 'Capsules' && ( /* ... Capsule Edition ... */
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
                    {['Filter', 'Espresso'].includes(selectedMethod) && ( /* ... Subscription Style ... */
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
                            {selectedMethod === 'Capsules' && selectedEdition && ( /* ... Capsule Size Info ... */
                                <div className='dropdown-row capsule-size-info' key="capsule-size">
                                    <h3 className='dropdown-label'>Size</h3>
                                    <div className='info-text-container flex items-center justify-center'>
                                        <div className='static-text-value h-10 px-3 py-2 bg-muted text-muted-foreground rounded-md text-sm flex items-center w-full justify-center border border-input'>
                                            30 capsules
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedMethod !== 'Capsules' && selectedCoffeeType && (
                                <>
                                    {/* Info Texts for various types */}
                                    {selectedCoffeeType === 'Roasters Choice' && ( /* ... RC Info ... */
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="rc-info">
                                             <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every Month,</span> Our Roasters Pick a New Coffee for You</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {selectedCoffeeType === 'Curated' && ( /* ... Curated Info ... */
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="curated-info">
                                             <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> Our Roasters pick two different coffees for you</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                     {selectedCoffeeType === 'Masterpiece' && ( /* ... Masterpiece Info ... */
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="masterpiece-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> We send you one bag of the most extraordinary coffee</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {selectedCoffeeType === 'Low-Caf' && ( /* ... Low-Caf Info ... */
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="lowcaf-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Receive our</span> low-caf varietal coffee on repeat</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {selectedCoffeeType === 'Regional' && ( /* ... Regional Info ... */
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="regional-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Pick your favourite region</span> and receive the same coffee on repeat</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {/* --- ADDED: Office Info Text --- */}
                                    {selectedCoffeeType === 'Office' && (
                                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="office-info">
                                            <div className='w-fit'>
                                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Our Espresso works on all Office Machines:</span> Full Automat, Espresso, Filter</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {/* --- END ADDED: Office Info Text --- */}


                                    {/* Office "Size" (Quantity of 1kg bags) Dropdown */}
                                    {selectedCoffeeType === 'Office' && (
                                         <div className='dropdown-row' key="office-size">
                                            <h3 className='dropdown-label'>Size</h3> {/* Label kept as "Size" but options are quantities */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className='dropdown-trigger-button'>
                                                        {selectedSizeOption || "Select Size..."}
                                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className='dropdown-content-panel'>
                                                    <DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={onSizeOptionChange}>
                                                        {officeSizeOptions.map((option) => ( // Using new officeSizeOptions
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
                                    {selectedCoffeeType === 'Regional' && ( /* ... Regional Dropdown ... */
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
                                </>
                            )}
                        </>
                    )}

                    {/* Step 4: Generic Quantity Dropdown (NOT shown for Office) */}
                    {showQuantity && ( // showQuantity logic now excludes Office
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
                                                        : selectedCoffeeType === 'Low-Caf'
                                                            ? `${option.label}x 250g`
                                                            : selectedCoffeeType === 'Regional'
                                                                ? `${option.label}x 250g`
                                                                : selectedMethod === 'Capsules'
                                                                    ? `${option.label} box${parseInt(option.value) > 1 ? 'es' : ''} (30 caps each)`
                                                                    // Office is excluded from this dropdown
                                                                    : selectedCoffeeType === 'Roasters Choice'
                                                                        ? `${option.label} x 250g`
                                                                        : `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)` // Fallback
                                                }
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {/* Step 5: Frequency Selection / Display */}
                    {showFrequencyDropdown && ( /* ... Frequency Dropdown ... */
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
                    {showMasterpieceFrequencyInfo && ( /* ... Masterpiece Frequency Info ... */
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
                   {((selectedCoffeeType === 'Office' && selectedSizeOption && selectedFrequency) || (finalSelectionDetail && selectedFrequency && selectedCoffeeType !== 'Office')) && (
                       <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                           Selected: {selectedMethod}
                           {selectedMethod === 'Capsules' && selectedEdition && ` - ${selectedEdition} (30 caps)`}
                           {selectedMethod !== 'Capsules' && selectedCoffeeType && ` - ${selectedCoffeeType}`}
                           {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                           {/* For Office, selectedSizeOption IS the quantity/size detail */}
                           {selectedCoffeeType === 'Office' && selectedSizeOption && ` - ${selectedSizeOption}`}
                           {/* For other types, use getQuantityDisplayLabel with finalSelectionDetail */}
                           {selectedCoffeeType !== 'Office' && finalSelectionDetail && ` - Qty: ${getQuantityDisplayLabel(finalSelectionDetail)}`}
                           {selectedFrequency && ` - Every ${selectedFrequency.replace(' (Recommended)', '')}`}
                       </div>
                   )}

                </div> // End coffee-type-container
            )}
        </div> // End middle-content-wrapper
    );
};

export default MiddleContainer;