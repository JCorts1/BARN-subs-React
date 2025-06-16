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
import "./MiddleContainer.css"; // This CSS works in harmony with Tailwind

// --- Data Constants ---
const filterOptions = [
    { value: "Curated", label: "Curated" },
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Regional", label: "Regional" },
];

const espressoOptions = [
    { value: "Curated", label: "Curated" },
    { value: "Roasters Choice", label: "Roasters Choice" },
    { value: "Masterpiece", label: "Masterpiece" },
    { value: "Low-Caf", label: "Low-Caf" },
    { value: "Office", label: "Office" },
    { value: "Regional", label: "Regional" },
];

const officeSizeOptions = [
    { value: "1x 1kg", label: "1 x 1kg" },
    { value: "2x 1kg", label: "2 x 1kg" },
    { value: "3x 1kg", label: "3 x 1kg" },
    { value: "4x 1kg", label: "4 x 1kg" },
    { value: "5x 1kg", label: "5 x 1kg" },
];

const standardQuantityOptions = [
    { value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" },
    { value: "4", label: "4" }, { value: "5", label: "5" },
];

const curatedQuantityOptions = [
    { value: "2", label: "2 x 250g" }, { value: "4", label: "4 x 250g" }, { value: "6", label: "6 x 250g" },
];
const curatedQuantityLabelMap = curatedQuantityOptions.reduce((acc, o) => { acc[o.value] = o.label; return acc; }, {});

const masterpieceQuantityOptions = [
    { value: "1", label: "1 bag" },
    { value: "2", label: "2 bags" },
    { value: "3", label: "3 bags" },
];
const masterpieceQuantityLabelMap = masterpieceQuantityOptions.reduce((acc, o) => { acc[o.value] = o.label; return acc; }, {});

const capsuleTasteProfileOptions = [
    { value: "Brazil", label: "Brazil" }, { value: "Ethiopia", label: "Ethiopia" },
];

const capsuleQuantityOptions = [
    { value: "3", label: "3 x 10 capsules" },
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
    onResetSelections, selectedEdition, onEditionChange,
}) => {

    const [showOptionsContainer, setShowOptionsContainer] = useState(true);

    // --- useEffect Hooks (assumed unchanged from your original) ---
    useEffect(() => {
        if (typeof onFrequencyChange !== 'function') { return; }
        let isReadyForFrequency;
        if (selectedMethod === 'Capsules') isReadyForFrequency = selectedEdition && finalSelectionDetail && !selectedFrequency;
        else if (selectedCoffeeType === 'Office') isReadyForFrequency = selectedSizeOption && !selectedFrequency;
        else isReadyForFrequency = finalSelectionDetail && !selectedFrequency;

        if (!isReadyForFrequency || showOptionsContainer === false) return;

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
    }, [finalSelectionDetail, selectedCoffeeType, selectedMethod, selectedEdition, selectedSizeOption, selectedFrequency, onFrequencyChange, showOptionsContainer]);


    useEffect(() => {
        if (selectedCoffeeType === 'Masterpiece' && finalSelectionDetail && typeof onFrequencyChange === 'function' && showOptionsContainer !== false) {
             try {
                 if (!selectedFrequency || selectedFrequency !== '4 Weeks (Recommended)') {
                     onFrequencyChange('4 Weeks (Recommended)');
                 }
             } catch (error) { console.error('Error auto-setting Masterpiece frequency state:', error); }
        }
    }, [selectedCoffeeType, finalSelectionDetail, selectedFrequency, onFrequencyChange, showOptionsContainer]);


    useEffect(() => {
        if (showOptionsContainer === false) return;

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
    }, [selectedCoffeeType, selectedMethod, selectedFrequency, onFrequencyChange, showOptionsContainer]);


    useEffect(() => {
        if (showOptionsContainer === false) return;

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
    }, [selectedCoffeeType, selectedMethod, finalSelectionDetail, onQuantityChange, showOptionsContainer]);
    // --- END useEffect ---

    const handleSelectSelf = () => {
        setShowOptionsContainer(true);
        if (typeof onResetSelections === 'function' && showOptionsContainer === false) {
            onResetSelections();
        }
    };

    const handleSelectGift = () => {
        setShowOptionsContainer(false);
        if (typeof onResetSelections === 'function') {
            onResetSelections();
        }
        window.location.href = 'https://thebarn.de/collections/prepaid-subscription';
    };

    const currentCoffeeTypeOptions = selectedMethod === 'Filter' ? filterOptions : espressoOptions;
    // `isSubscriptionStyleDisabled` is used directly in the trigger, not for row visibility anymore
    const isSubscriptionStyleDisabled = !['Filter', 'Espresso'].includes(selectedMethod);


    // Conditions for enabling dropdown triggers / interactive content
    const showCapsuleQuantityDropdown = selectedMethod === 'Capsules' && selectedEdition;
    const showGenericQuantityDropdown =
        selectedMethod !== 'Capsules' && selectedCoffeeType && selectedCoffeeType !== 'Office' &&
         (selectedCoffeeType === 'Roasters Choice' ||
          selectedCoffeeType === 'Curated' ||
          selectedCoffeeType === 'Masterpiece' ||
          selectedCoffeeType === 'Low-Caf' ||
          (selectedCoffeeType === 'Regional' && selectedRegion)
         );

    const officeIsReadyForFrequency = selectedCoffeeType === 'Office' && selectedSizeOption;
    const capsuleIsReadyForFrequency = selectedMethod === 'Capsules' && selectedEdition && finalSelectionDetail;
    const genericIsReadyForFrequency = finalSelectionDetail && selectedCoffeeType && !['Office'].includes(selectedCoffeeType) && selectedMethod !== 'Capsules';
    const showFrequencyStep = officeIsReadyForFrequency || capsuleIsReadyForFrequency || genericIsReadyForFrequency;

    const quantityTriggerDisabled = !(
        (selectedMethod === 'Capsules' && showCapsuleQuantityDropdown) ||
        (selectedMethod && selectedMethod !== 'Capsules' && selectedCoffeeType !== 'Office' && showGenericQuantityDropdown)
    );

    const frequencyTriggerDisabled = !showFrequencyStep;

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

    // Determine current quantity options for the dropdown, used if quantity step is active
    let activeQuantityOptions = standardQuantityOptions; // Default
    if (selectedMethod === 'Capsules') {
        activeQuantityOptions = capsuleQuantityOptions;
    } else if (selectedCoffeeType === 'Curated') {
        activeQuantityOptions = curatedQuantityOptions;
    } else if (selectedCoffeeType === 'Masterpiece') {
        activeQuantityOptions = masterpieceQuantityOptions;
    }
    // Standard options are used for Roaster's Choice, Low-Caf, Regional if not specified otherwise

    const getDynamicLabelForSecondStep = () => {
        if (selectedMethod === 'Capsules') return "Taste Profile";
        if (selectedMethod === 'Filter' || selectedMethod === 'Espresso') return "Subscription Style";
        return "Style / Profile"; // Generic placeholder if method not yet selected
    };

    const getButtonTextForSecondStep = () => {
        if (!selectedMethod) return "Select Method first...";
        if (selectedMethod === 'Capsules') return selectedEdition || "Select Profile...";
        // Filter or Espresso
        if (isSubscriptionStyleDisabled) return "Select Method first..."; // Should not happen if selectedMethod is Filter/Espresso
        return selectedCoffeeType || "Select Type...";
    };
    
    const getQuantityDisplayLabelText = () => {
        if (finalSelectionDetail) { // A quantity/size is actually selected
            if (selectedMethod === 'Capsules') return capsuleQuantityLabelMap[finalSelectionDetail] || finalSelectionDetail;
            if (selectedCoffeeType === 'Curated') return curatedQuantityLabelMap[finalSelectionDetail] || finalSelectionDetail;
            if (selectedCoffeeType === 'Masterpiece') return masterpieceQuantityLabelMap[finalSelectionDetail] || finalSelectionDetail;
            if (selectedCoffeeType === 'Office') return selectedSizeOption; // Office uses size option for its display
            if (['Roasters Choice', 'Low-Caf', 'Regional'].includes(selectedCoffeeType)) return `${finalSelectionDetail} x 250g`;
            return `${finalSelectionDetail} bag(s)`; // Fallback
        }

        // Placeholder logic
        if (!selectedMethod) return "Select Method first...";
        if (selectedMethod === 'Capsules') {
            return selectedEdition ? "Select Quantity..." : "Select Profile first...";
        }
        // Filter/Espresso path
        if (!selectedCoffeeType) return "Select Type first...";
        if (selectedCoffeeType === 'Office') return selectedSizeOption || "Select Size..."; // Office size is its quantity
        if (selectedCoffeeType === 'Regional' && !selectedRegion) return "Select Region first...";
        
        return "Select Quantity...";
    };

    const getFrequencyButtonText = () => {
        if (selectedFrequency) return selectedFrequency.replace(' (Recommended)', '');
        if (!selectedMethod) return "Select Method first...";
        if (selectedMethod === 'Capsules' && !selectedEdition) return "Select Profile first...";
        if (selectedMethod !== 'Capsules' && !selectedCoffeeType) return "Select Type first...";
        if (selectedCoffeeType === 'Office' && !selectedSizeOption) return "Select Size first...";
        if ( (selectedMethod === 'Capsules' && selectedEdition && !finalSelectionDetail) ||
             (selectedMethod !== 'Capsules' && selectedCoffeeType && selectedCoffeeType !== 'Office' && !finalSelectionDetail) ) {
            return "Select Quantity first...";
        }
        return "Select Frequency...";
    };
    
    const renderQuantityDropdownItem = (option) => {
        let label = option.label; // Default label from option object
        if (selectedMethod === 'Capsules') {
            // Label is already like "3 x 10 capsules"
        } else if (selectedCoffeeType === 'Curated' || selectedCoffeeType === 'Masterpiece') {
            // Labels are already like "2 x 250g" or "1 bag"
        } else if (['Roasters Choice', 'Low-Caf', 'Regional'].includes(selectedCoffeeType)) {
            label = `${option.label} x 250g`;
        } else if (selectedCoffeeType) { // Fallback for other bean types if any
            label = `${option.label} ${parseInt(option.value) > 1 ? 'bags' : 'bag'} (250g each)`;
        }
    
        return (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
                {label}
            </DropdownMenuRadioItem>
        );
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

            {showOptionsContainer === true && (
                <div className='coffee-type-container w-5/6 rounded-md p-3 pt-5 flex flex-col items-center gap-y-2 bg-[#3a3c3d] justify-center mt-5'>

                    {/* Step 1: Method Row - Always Visible */}
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

                    {/* Step 2: Style / Profile Row - Always Visible */}
                    <div className='dropdown-row'>
                        <h3 className='dropdown-label'>{getDynamicLabelForSecondStep()}</h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                disabled={!selectedMethod || (selectedMethod !== 'Capsules' && isSubscriptionStyleDisabled)}
                            >
                                <Button variant="outline" className='dropdown-trigger-button'>
                                    {getButtonTextForSecondStep()}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='dropdown-content-panel'>
                                {selectedMethod === 'Capsules' && (
                                    <DropdownMenuRadioGroup value={selectedEdition} onValueChange={onEditionChange}>
                                        {capsuleTasteProfileOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                )}
                                {selectedMethod && selectedMethod !== 'Capsules' && !isSubscriptionStyleDisabled && (
                                    <DropdownMenuRadioGroup value={selectedCoffeeType} onValueChange={onCoffeeTypeChange}>
                                        {currentCoffeeTypeOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    {/* Type-Specific Info & Controls (Region/Office Size) - Conditionally Rendered AFTER type is known */}
                    {selectedMethod && selectedMethod !== 'Capsules' && selectedCoffeeType && (
                        <>
                            {selectedCoffeeType === 'Roasters Choice' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="rc-info">
                                    <div className='w-fit'><ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'><li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every Month,</span> Our Roasters Pick a New Coffee for You</li></ul></div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Curated' && (
                                 <div className='dropdown-row' style={{ justifyContent: 'center' }} key="curated-info">
                                     <div className='w-fit'><ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                        <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month</span>, Our Roasters pick two different coffees for you.</li>
                                        </ul>
                                    </div>
                                 </div>
                            )}
                            {selectedCoffeeType === 'Masterpiece' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="masterpiece-info">
                                    <div className='w-fit'><ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'><li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Every month,</span> We send you one bag of the most extraordinary coffee. Each bag contains 100 - 150g</li></ul></div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Low-Caf' && (
                                <div className='dropdown-row' style={{ justifyContent: 'center' }} key="lowcaf-info">
                                    <div className='w-fit'><ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'><li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Receive our</span> low-caf varietal coffee on repeat</li></ul></div>
                                </div>
                            )}
                            {selectedCoffeeType === 'Regional' && (
                                <>
                                    <div className='dropdown-row' style={{ justifyContent: 'center' }} key="regional-info">
                                        <div className='w-fit'><ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'><li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Pick your favourite region</span> and receive the same coffee on repeat</li></ul></div>
                                    </div>
                                    <div className='dropdown-row' key="regional-region">
                                        <h3 className='dropdown-label'>Region</h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="outline" className='dropdown-trigger-button'>{selectedRegion || "Select Region..."}<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent className='dropdown-content-panel'><DropdownMenuRadioGroup value={selectedRegion} onValueChange={onRegionChange}>{regionOptions.map((o) => (<DropdownMenuRadioItem key={o.value} value={o.value}>{o.label}</DropdownMenuRadioItem>))}</DropdownMenuRadioGroup></DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </>
                            )}
                            {selectedCoffeeType === 'Office' && (
                                <>
                                    <div className='dropdown-row' style={{ justifyContent: 'center' }} key="office-info">
                                        <div className='w-fit'><ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'><li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Our Espresso works on all Office Machines:</span> Full Automat, Espresso, Filter</li></ul></div>
                                    </div>
                                    <div className='dropdown-row' key="office-size">
                                        <h3 className='dropdown-label'>Size</h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="outline" className='dropdown-trigger-button'>{selectedSizeOption || "Select Size..."}<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent className='dropdown-content-panel'><DropdownMenuRadioGroup value={selectedSizeOption} onValueChange={onSizeOptionChange}>{officeSizeOptions.map((o) => (<DropdownMenuRadioItem key={o.value} value={o.value}>{o.label}</DropdownMenuRadioItem>))}</DropdownMenuRadioGroup></DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                     {selectedMethod === 'Capsules' && selectedEdition && ( // Info for capsules after edition is selected
                        <div className='dropdown-row' style={{ justifyContent: 'center' }} key="capsule-edition-info">
                            <div className='w-fit'>
                                <ul className='text-white bg-[#161616] w-full rounded-sm border border-[#A67C52] roasters-info-list'>
                                    <li className='w-full p-1 text-lg'><span className='text-[#A67C52]'>Sustainable</span> Nespresso® Compatible Capsules</li>
                                </ul>
                            </div>
                        </div>
                    )}


                    {/* Step 3: Quantity of Coffee Row - Always Visible (but content/state dynamic) */}
                    {/* This row should not show if Office type is selected, as Office uses Size for quantity */}
                    {selectedCoffeeType !== 'Office' && (
                        <div className='dropdown-row'>
                            <h3 className='dropdown-label'>Quantity of Coffee</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild disabled={quantityTriggerDisabled}>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {getQuantityDisplayLabelText()}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='dropdown-content-panel'>
                                    {selectedMethod === 'Capsules' && showCapsuleQuantityDropdown && (
                                        <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                            {activeQuantityOptions.map(option => renderQuantityDropdownItem(option))}
                                        </DropdownMenuRadioGroup>
                                    )}
                                    {selectedMethod && selectedMethod !== 'Capsules' && showGenericQuantityDropdown && (
                                        <DropdownMenuRadioGroup value={finalSelectionDetail} onValueChange={onQuantityChange}>
                                            {activeQuantityOptions.map(option => renderQuantityDropdownItem(option, selectedCoffeeType, selectedMethod))}
                                        </DropdownMenuRadioGroup>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {/* Step 4: Frequency Row - Always Visible (but content/state dynamic) */}
                    <div className='dropdown-row'>
                        <h3 className='dropdown-label'>Frequency</h3>
                        {selectedMethod !== 'Capsules' && selectedCoffeeType === 'Masterpiece' ? (
                            // Masterpiece Frequency Info
                            <div className='info-text-container flex items-center justify-center'>
                                {showFrequencyStep ? (
                                    <div className='static-text-value h-10 px-3 py-2 bg-[#161616] text-[#A67C52] font-bold rounded-md flex items-center w-full justify-center border-1 border-[#A67C52]'>
                                         4 weeks
                                    </div>
                                ) : (
                                    <Button variant="outline" className='dropdown-trigger-button w-full' style={{ justifyContent: 'center' }} disabled>
                                        {getFrequencyButtonText()}
                                    </Button>
                                )}
                            </div>
                        ) : (
                            // Standard Frequency Dropdown
                            <DropdownMenu>
                                 <DropdownMenuTrigger asChild disabled={frequencyTriggerDisabled}>
                                    <Button variant="outline" className='dropdown-trigger-button'>
                                        {getFrequencyButtonText()}
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
                        )}
                       </div>

                    {/* Final Selection Summary (Original logic) */}
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
                           {(selectedMethod === 'Capsules' || (selectedMethod !== 'Capsules' && selectedCoffeeType !== 'Office')) && finalSelectionDetail && ` - Qty: ${getQuantityDisplayLabelText()}`}
                           {selectedFrequency && ` - Every ${selectedFrequency.replace(' (Recommended)', '')}`}
                       </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MiddleContainer;