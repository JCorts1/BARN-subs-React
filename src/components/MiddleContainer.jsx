// src/components/MiddleContainer.jsx
// Adds info text for Capsules. Updates Capsules flow: "Taste Profile",
// new options, new quantity structure, and specific frequencies.

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
    { value: "Curated", label: "Curated" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Regional", label: "Regional" },
];
const espressoOptions = [
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Curated", label: "Curated" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Office", label: "Office" },
    { value: "Regional", label: "Regional" },
];

const officeSizeOptions = [
    { value: "1x 1kg", label: "1x 1kg" }, { value: "2x 1kg", label: "2x 1kg" }, { value: "3x 1kg", label: "3x 1kg" },
    { value: "4x 1kg", label: "4x 1kg" }, { value: "5x 1kg", label: "5x 1kg" },
];

const standardQuantityOptions = [
    { value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" },
    { value: "4", label: "4" }, { value: "5", label: "5" },
];
const curatedQuantityOptions = [
    { value: "2", label: "2x 250g" }, { value: "4", label: "4x 250g" }, { value: "6", label: "6x 250g" },
];
const curatedQuantityLabelMap = curatedQuantityOptions.reduce((acc, o) => { acc[o.value] = o.label; return acc; }, {});

const masterpieceQuantityOptions = [
    { value: "1", label: "1x bag (100-150g)" }, { value: "2", label: "2x bags (100-150g)" }, { value: "3", label: "3x bags (100-150g)" },
];
const masterpieceQuantityLabelMap = masterpieceQuantityOptions.reduce((acc, o) => { acc[o.value] = o.label; return acc; }, {});

const capsuleTasteProfileOptions = [
    { value: "Brazil", label: "Brazil" }, { value: "Ethiopia", label: "Ethiopia" }, { value: "Masterpiece", label: "Masterpiece" },
];
const capsuleQuantityOptions = [
    { value: "3", label: "3x 10 capsules" }, { value: "4", label: "4x 10 capsules" }, { value: "5", label: "5x 10 capsules" },
];
const capsuleQuantityLabelMap = capsuleQuantityOptions.reduce((acc, o) => { acc[o.value] = o.label; return acc; }, {});

const regionOptions = [
    { value: "Brazil", label: "Brazil" }, { value: "Ethiopia", label: "Ethiopia" }, { value: "Center America", label: "Center America" },
];
const baseFrequencyOptions = [
    { value: "1 Week", label: "1 Week" }, { value: "2 Weeks", label: "2 Weeks" }, { value: "3 Weeks", label: "3 Weeks" },
    { value: "4 Weeks (Recommended)", label: "4 Weeks (Recommended)" }, { value: "5 Weeks", label: "5 Weeks" }, { value: "6 Weeks", label: "6 Weeks" }
];

const allowedRCorCuratedFrequencies = ["4 Weeks (Recommended)", "6 Weeks"];
const allowedLowCafRegionalFrequencies = ["2 Weeks", "4 Weeks (Recommended)", "6 Weeks"];
const allowedOfficeFrequencies = ["2 Weeks", "4 Weeks (Recommended)"];
const allowedCapsuleFrequencies = ["2 Weeks", "4 Weeks (Recommended)"];


// --- Component ---
const MiddleContainer = ({
    selectedMethod, selectedCoffeeType, selectedRegion, selectedSizeOption,
    finalSelectionDetail, selectedFrequency, onMethodChange, onCoffeeTypeChange,
    onRegionChange, onSizeOptionChange, onQuantityChange, onFrequencyChange,
    onResetSelections, selectedEdition, onEditionChange, // selectedEdition is Taste Profile for Capsules
}) => {

    const [showOptionsContainer, setShowOptionsContainer] = useState(null);

    // --- useEffect Hooks ---
    useEffect(() => { // Default frequency setter
        if (typeof onFrequencyChange !== 'function') { return; }
        let isReadyForFrequency;
        if (selectedMethod === 'Capsules') isReadyForFrequency = selectedEdition && finalSelectionDetail && !selectedFrequency;
        else if (selectedCoffeeType === 'Office') isReadyForFrequency = selectedSizeOption && !selectedFrequency;
        else isReadyForFrequency = finalSelectionDetail && !selectedFrequency;

        if (!isReadyForFrequency) return;

        const isMasterpiece = selectedCoffeeType === 'Masterpiece';
        if (isMasterpiece) return;

        let defaultFrequencyToSet = '4 Weeks (Recommended)';
        let currentAllowed = baseFrequencyOptions.map(f => f.value);

        if (selectedMethod === 'Capsules') currentAllowed = allowedCapsuleFrequencies;
        else if (selectedCoffeeType === 'Office') currentAllowed = allowedOfficeFrequencies;
        else if (['Low-Caf', 'Regional'].includes(selectedCoffeeType)) currentAllowed = allowedLowCafRegionalFrequencies;
        else if (['Roasters Choice', 'Curated'].includes(selectedCoffeeType)) currentAllowed = allowedRCorCuratedFrequencies;

        if (!currentAllowed.includes(defaultFrequencyToSet)) {
            defaultFrequencyToSet = currentAllowed.length > 0 ? currentAllowed[0] : '';
        }

        if (defaultFrequencyToSet && !selectedFrequency) {
            try { onFrequencyChange(defaultFrequencyToSet); }
            catch (error) { console.error(`Error setting initial default frequency for ${selectedCoffeeType || selectedMethod}:`, error); }
        }
    }, [finalSelectionDetail, selectedCoffeeType, selectedMethod, selectedEdition, selectedSizeOption, selectedFrequency, onFrequencyChange]);


    useEffect(() => { // Masterpiece frequency state setter
        if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail && typeof onFrequencyChange === 'function') {
             try {
                 if (!selectedFrequency || selectedFrequency !== '4 Weeks (Recommended)') {
                     onFrequencyChange('4 Weeks (Recommended)');
                 }
             } catch (error) { console.error('Error auto-setting Masterpiece frequency state:', error); }
        }
    }, [selectedCoffeeType, finalSelectionDetail, selectedFrequency, onFrequencyChange]);


    useEffect(() => { // Frequency resetter on type/method change
        let resetToFrequency = null;
        let needsReset = false;
        let currentAllowedFrequencies = [];

        if (selectedMethod === 'Capsules') {
            currentAllowedFrequencies = allowedCapsuleFrequencies;
        } else if (['Roasters Choice', 'Curated'].includes(selectedCoffeeType)) {
            currentAllowedFrequencies = allowedRCorCuratedFrequencies;
        } else if (['Low-Caf', 'Regional'].includes(selectedCoffeeType)) {
            currentAllowedFrequencies = allowedLowCafRegionalFrequencies;
        } else if (selectedCoffeeType === 'Office') {
            currentAllowedFrequencies = allowedOfficeFrequencies;
        }

        if (currentAllowedFrequencies.length > 0 && selectedFrequency && !currentAllowedFrequencies.includes(selectedFrequency)) {
            resetToFrequency = currentAllowedFrequencies.includes('4 Weeks (Recommended)') ? '4 Weeks (Recommended)' : currentAllowedFrequencies[0];
            needsReset = true;
        }

        if (needsReset && typeof onFrequencyChange === 'function') {
            console.warn(`${selectedCoffeeType || selectedMethod} selected with invalid frequency '${selectedFrequency}', resetting to ${resetToFrequency}.`);
            try { onFrequencyChange(resetToFrequency); }
            catch (error) { console.error(`Error resetting frequency for ${selectedCoffeeType || selectedMethod}:`, error); }
        }
    }, [selectedCoffeeType, selectedMethod, selectedFrequency, onFrequencyChange]);


    useEffect(() => { // Quantity resetter for specific types/methods
        let isValidQty = true;
        let resetQty = false;

        if (selectedMethod === 'Capsules' && finalSelectionDetail) {
            isValidQty = capsuleQuantityOptions.some(o => o.value === finalSelectionDetail);
            if(!isValidQty) resetQty = true;
        } else if (selectedCoffeeType === 'Curated' && finalSelectionDetail) {
            isValidQty = curatedQuantityOptions.some(o => o.value === finalSelectionDetail);
            if(!isValidQty) resetQty = true;
        } else if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail) {
            isValidQty = masterpieceQuantityOptions.some(o => o.value === finalSelectionDetail);
            if(!isValidQty) resetQty = true;
        }

        if (resetQty && selectedCoffeeType !== 'Office') {
             console.warn(`${selectedCoffeeType || selectedMethod} selected with invalid quantity '${finalSelectionDetail}', resetting quantity.`);
             if (typeof onQuantityChange === 'function') {
                 try { onQuantityChange(''); } catch (error) { console.error(`Error resetting quantity for ${selectedCoffeeType || selectedMethod}:`, error); }
             }
        }
    }, [selectedCoffeeType, selectedMethod, finalSelectionDetail, onQuantityChange]);

    // --- END useEffect ---

    const handleSelectSelf = () => { setShowOptionsContainer(true); };
    const handleSelectGift = () => { setShowOptionsContainer(false); if (onResetSelections) onResetSelections(); };

    const currentCoffeeTypeOptions = selectedMethod === 'Filter' ? filterOptions : espressoOptions;

    const showGenericQuantityDropdown =
        selectedMethod !== 'Capsules' && selectedCoffeeType && selectedCoffeeType !== 'Office' &&
         (selectedCoffeeType === 'Roasters Choice' ||
          selectedCoffeeType === 'Curated' ||
          selectedCoffeeType === 'Masterpiece' ||
          selectedCoffeeType === 'Low-Caf' ||
          (selectedCoffeeType === 'Regional' && selectedRegion)
         );
    const showCapsuleQuantityDropdown = selectedMethod === 'Capsules' && selectedEdition; // selectedEdition is Taste Profile


    const officeIsReadyForFrequency = selectedCoffeeType === 'Office' && selectedSizeOption;
    const capsuleIsReadyForFrequency = selectedMethod === 'Capsules' && selectedEdition && finalSelectionDetail;
    const genericIsReadyForFrequency = finalSelectionDetail && selectedCoffeeType && !['Office'].includes(selectedCoffeeType) && selectedMethod !== 'Capsules';
    const showFrequencyStep = officeIsReadyForFrequency || capsuleIsReadyForFrequency || genericIsReadyForFrequency;

    const showFrequencyDropdown = showFrequencyStep && (selectedMethod === 'Capsules' || selectedCoffeeType !== 'Masterpiece');
    const showMasterpieceFrequencyInfo = showFrequencyStep && selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece';


    const currentFrequencyOptions =
        selectedMethod === 'Capsules'
            ? baseFrequencyOptions.filter(option => allowedCapsuleFrequencies.includes(option.value))
            : selectedCoffeeType === 'Office'
                ? baseFrequencyOptions.filter(option => allowedOfficeFrequencies.includes(option.value))
                : ['Roasters Choice', 'Curated'].includes(selectedCoffeeType)
                    ? baseFrequencyOptions.filter(option => allowedRCorCuratedFrequencies.includes(option.value))
                    : ['Low-Caf', 'Regional'].includes(selectedCoffeeType)
                        ? baseFrequencyOptions.filter(option => allowedLowCafRegionalFrequencies.includes(option.value))
                        : baseFrequencyOptions;

    const currentQuantityOptions =
        selectedMethod === 'Capsules' ? capsuleQuantityOptions
        : selectedCoffeeType === 'Curated' ? curatedQuantityOptions
        : selectedCoffeeType === 'Masterpiece' ? masterpieceQuantityOptions
        : standardQuantityOptions;

    const getQuantityDisplayLabel = (value) => {
        if (!value) {
            if (selectedCoffeeType === 'Office') return "Select Size...";
            if (selectedMethod === 'Capsules') return "Select Quantity...";
            return "Select Quantity...";
        }
        if (selectedMethod === 'Capsules') return capsuleQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Curated') return curatedQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Masterpiece') return masterpieceQuantityLabelMap[value] || value;
        if (selectedCoffeeType === 'Low-Caf') return `${value}x 250g`;
        if (selectedCoffeeType === 'Regional') return `${value}x 250g`;
        if (selectedCoffeeType === 'Office') return value;
        if (selectedCoffeeType === 'Roasters Choice') return `${value} x 250g`;
        return value;
    };


    // --- Component Render ---
    return (
        <div className="middle-content-wrapper flex flex-col justify-center items-center">
            <div className='recipient-container mt-10'>
               <div className='recipient-buttons-container'>
                    <div className={`recipient-button ${showOptionsContainer === true ? 'selected' : ''}`} onClick={handleSelectSelf}>
                        <h2>PAY PER DELIVERY</h2>
                        <p>(Flexible Subscriptions)</p>
                    </div>
                    <div className={`recipient-button ${showOptionsContainer === false ? 'selected' : ''}`} onClick={handleSelectGift}>
                        <h2>UPFRONT PAYMENT</h2>
                        <p>(Term / Gift)</p>
                    </div>
                </div>
            </div>

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

                    {/* --- ADDED: Info text for Capsules (appears after method selection) --- */}
                    {selectedMethod === 'Capsules' && (
                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="capsule-method-info">
                            <div className='w-fit'>
                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Receive our</span> Sustainable Capsules on repeat</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {/* --- END ADDED --- */}


                    {/* Step 2: Conditional Type OR Taste Profile (for Capsules) */}
                    {selectedMethod === 'Capsules' && (
                        <div className='dropdown-row'>
                           <h3 className='dropdown-label'>Taste Profile</h3>
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {selectedEdition || "Select Profile..."} {/* selectedEdition is Taste Profile */}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    <DropdownMenuRadioGroup value={selectedEdition} onValueChange={onEditionChange}>
                                        {capsuleTasteProfileOptions.map((option) => (
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
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {/* Step 3: Info Texts & Type-Specific Options (like Office Size, Regional Region) */}
                    {/* These info texts appear AFTER type selection for Filter/Espresso */}
                    {selectedMethod !== 'Capsules' && selectedCoffeeType && (
                        <>
                            {selectedCoffeeType === 'Roasters Choice' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="rc-info">
                                     <div className='w-fit'>
                                        <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                            <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every Month,</span> Our Roasters Pick a New Coffee for You</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Curated' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="curated-info">
                                     <div className='w-fit'>
                                        <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                            <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> Our Roasters pick two different coffees for you</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                             {selectedCoffeeType === 'Masterpiece' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="masterpiece-info">
                                    <div className='w-fit'>
                                        <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                            <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> We send you one bag of the most extraordinary coffee</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Low-Caf' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="lowcaf-info">
                                    <div className='w-fit'>
                                        <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                            <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Receive our</span> low-caf varietal coffee on repeat</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Regional' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="regional-info">
                                    <div className='w-fit'>
                                        <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                            <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Pick your favourite region</span> and receive the same coffee on repeat</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Office' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="office-info">
                                    <div className='w-fit'>
                                        <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                            <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Our Espresso works on all Office Machines:</span> Full Automat, Espresso, Filter</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Office "Size" Dropdown */}
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
                        </>
                    )}

                    {/* Step 4: Quantity Dropdown */}
                    {(showCapsuleQuantityDropdown || showGenericQuantityDropdown) && (
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Quantity of Coffee</h3>
                            <DropdownMenu>
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
                                               {selectedMethod === 'Capsules'
                                                    ? option.label // e.g., "3x 10 capsules"
                                                    : selectedCoffeeType === 'Curated'
                                                        ? option.label
                                                        : selectedCoffeeType === 'Masterpiece'
                                                            ? option.label
                                                            : selectedCoffeeType === 'Low-Caf'
                                                                ? `${option.label}x 250g`
                                                                : selectedCoffeeType === 'Regional'
                                                                    ? `${option.label}x 250g`
                                                                    : selectedCoffeeType === 'Roasters Choice'
                                                                        ? `${option.label} x 250g`
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
                    {showFrequencyDropdown && (
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
                    {showMasterpieceFrequencyInfo && (
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
                   {((selectedCoffeeType === 'Office' && selectedSizeOption && selectedFrequency) ||
                     (selectedMethod === 'Capsules' && selectedEdition && finalSelectionDetail && selectedFrequency) ||
                     (finalSelectionDetail && selectedFrequency && selectedCoffeeType && selectedCoffeeType !== 'Office' && selectedMethod !== 'Capsules')
                   ) && (
                       <div className="final-selection mt-4 p-3 border rounded-md bg-secondary text-secondary-foreground w-5/6 text-center">
                           Selected: {selectedMethod}
                           {selectedMethod === 'Capsules' && selectedEdition && ` - Taste: ${selectedEdition}`}
                           {selectedMethod !== 'Capsules' && selectedCoffeeType && ` - ${selectedCoffeeType}`}
                           {selectedCoffeeType === 'Regional' && selectedRegion && ` - ${selectedRegion}`}
                           {selectedCoffeeType === 'Office' && selectedSizeOption && ` - ${selectedSizeOption}`}
                           {(selectedMethod === 'Capsules' || (selectedMethod !== 'Capsules' && selectedCoffeeType !== 'Office')) && finalSelectionDetail && ` - Qty: ${getQuantityDisplayLabel(finalSelectionDetail)}`}
                           {selectedFrequency && ` - Every ${selectedFrequency.replace(' (Recommended)', '')}`}
                       </div>
                   )}

                </div>
            )}
        </div>
    );
};

export default MiddleContainer;