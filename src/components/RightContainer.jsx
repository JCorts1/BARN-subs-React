// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Make sure this CSS file exists or remove if not needed

// --- Image Map ---
const typeImageMap = {
        "Roasters Choice": "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
        "Masterpiece": "https://cdn.shopify.com/s/files/1/0831/4141/files/Aroma_Nativo_Masterpiece.jpg?v=1744711907",
        "Low-Caf": "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Daterra_Reserve_Low_Caf_2025.png?v=1739287021",
        "Office": "https://cdn.shopify.com/s/files/1/1657/3941/files/volcan_azul_1kg.webp?v=1743027540",
        // Regional images handled separately below
};

// --- Data for Subscription Descriptions ---
const subscriptionDescriptions = {
    "Roasters Choice": {
        description: "Our most popular Subscription. Every month, we source stunning coffees from around the world. This is the best way to explore the origins, varietals, and processes that make Single Origin flavour so special.",
        // Assuming current offering might change, example shown
        currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral."
    },
    "Masterpiece": {
        description: "The rarest coffees on the planet. Scoring 90 points and up. Omni Roast.",
        currentOffering: "Current Offering:\n\nFinca Sophia Natural Gesha, Panama 🇵🇦"
    },
    "Low-Caf": {
        description: "This subscription sends out 250g of rare coffee varietals that naturally contain low caffeine: Aramosa or Laurina.",
        currentOffering: "Current Offering:\n\nDaterra Reserve from Brazil 🇧🇷"
    },
    "Office": {
        description: "This subscription is for offices that prefer espresso and need a little more volume each month. The coffee selection changes every month, allowing you to explore different coffee regions!",
        currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral."
    },
    "Regional": {
        "Brazil": {
            description: "People love Brazilian Coffees for their sweetness, low acidity and chocolate notes.",
            currentOffering: "Current Offering:\n\n🇧🇷 Elemental, Brazil: Milk Chocolate. Macadamia. Smooth."
        },
        "Ethiopia": {
            description: "People love Ethiopian Coffees for their floral notes and its tea-like character.",
            currentOffering: "Current Offering:\n\n🇪🇹 Chelbesa, Ethiopia: Peach. Fudge. Jasmine."
        },
        "Center America": {
            description: "People like Central Coffees for their exciting acidity and clean notes of terroir.",
            currentOffering: "Current Offering:\n\n🇨🇷 Volcan Azul, Costa Rica: Dried Fig. Vanilla."
        },
        // Default text if type is Regional but region isn't selected/matched
        _default: {
            description: "Select a region to see details about the specific coffee offering for this type.",
            currentOffering: ""
        }
    }
};

// --- Component ---
const RightContainer = ({ method, type, region, sizeOption, quantity, frequency }) => {

    // --- Default/Introductory Content ---
    const DefaultIntroContent = () => {
        const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883"; // Example Logo URL
        return (
            <div className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
                <div>
                    <img src={defaultImageUrl} alt="Select your coffee subscription" style={{ width: '100%', maxWidth: '350px', height: 'auto', margin: '1rem 0' }} />
                </div>
                <div className='p-5 border border-[#A57C62] rounded-md mt-8'>
                    <ul className="intro-list text-2xl" style={{ listStyle: 'none', padding: 0 }}>
                        <li>🌱 Sustainably sourced from top farms</li>
                        <li className="my-2">🔥 Expertly roasted in Berlin</li>
                        <li className="my-2">📦 Delivered fresh, right when you need it</li>
                        <li>☕ Always rotating—always exceptional</li>
                    </ul>
                </div>
            </div>
        );
    };
    // --- End Default/Introductory Content ---

    // --- Determine Display Logic ---
    // Show summary layout if at least method and type are selected
    const showSummaryLayout = method && type;

    // Determine if the "Add to Cart" button should be enabled
    const canAddToCart = method && type && quantity && frequency &&
        (type !== 'Regional' || region) && // If Regional, region must be selected
        (type !== 'Roasters Choice' || sizeOption) && // If Roasters Choice, sizeOption must be selected
        (type !== 'Office' || sizeOption); // If Office, sizeOption must be selected

    let contentToRender;

    // --- Show Summary Layout Logic ---
    if (showSummaryLayout) {
        // --- STATE 1: Display Summary (Dynamically Updating) ---

        // Initialize image URL
        let finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg"; // Provide a fallback image URL

        // Image selection logic for Regional type
        if (type === 'Regional') {
            if (region === 'Ethiopia') {
                finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Chelbesa_Natural_2024.png?v=1729679115";
            } else if (region === 'Brazil') {
                finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/Elemental_Bag_Catuai_mit_labelle.png?v=1723799712";
            } else if (region === 'Center America') {
                finalImageUrl = " https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Volcan_Azul_Caturra_OMNI_3a40d3d4-a185-4da0-99ff-b8d0f43479b7.png?v=1743674027";
            } else {
                // Show map if type is Regional but no specific region selected yet
                finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/map.png?v=1745847536";
            }
        }
        // --- End Image selection logic ---

        // --- Get Subscription Description Text ---
        let currentDescriptionData = null;
        if (type === 'Regional') {
            currentDescriptionData = subscriptionDescriptions.Regional[region] || subscriptionDescriptions.Regional._default;
        } else {
            currentDescriptionData = subscriptionDescriptions[type] || null; // Handle cases where type might not be in descriptions
        }
        // --- End Get Description Text ---

        // --- Construct summary sentence ---
        const highlightClass = "text-[#A67C52] font-semibold"; // Define highlight style class
        const sentenceParts = []; // Array to build the sentence parts

        sentenceParts.push('Your selection: '); // Start the sentence

        // Add size/option if selected (relevant for Roasters Choice/Office)
        if (sizeOption) {
            sentenceParts.push(<span key="amount" className={highlightClass}>{sizeOption}</span>);
            sentenceParts.push(' ');
        } else if (type === 'Roasters Choice' || type === 'Office') {
            sentenceParts.push('(select size/option) '); // Placeholder if not selected yet
        }

        // Add method and type
        sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);
        sentenceParts.push(' ');
        sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);

        // Add region if selected (relevant for Regional)
        if (region) {
            sentenceParts.push(' from ');
            sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>);
        } else if (type === 'Regional') {
            sentenceParts.push(' (select region)'); // Placeholder if not selected yet
        }

        sentenceParts.push(' coffee'); // Add the word coffee

        // Add quantity if selected
        if (quantity) {
            sentenceParts.push(' ');
            sentenceParts.push(<span key="qty-val" className={highlightClass}>{quantity}</span>);
            sentenceParts.push(' ');
            // Use 'time' or 'times' based on quantity
            sentenceParts.push(<span key="qty-word" className={highlightClass}>{parseInt(quantity) > 1 ? 'times' : 'time'}</span>);
        } else {
            sentenceParts.push(' (select quantity)'); // Placeholder if not selected yet
        }

        // Add frequency if selected, removing "(Recommended)" for display
        if (frequency) {
            sentenceParts.push(', delivered every ');
            // --- MODIFICATION IS HERE ---
            // Remove " (Recommended)" before creating the span for display
            const displayFrequency = frequency.replace(' (Recommended)', '');
            sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>);
            // --- END MODIFICATION ---
        } else {
            sentenceParts.push(' (select frequency)'); // Placeholder if not selected yet
        }

        sentenceParts.push('.'); // End the sentence
        // --- End sentence construction ---

        // JSX for the summary layout
        contentToRender = (
            <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center">
                <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>

                {/* Coffee Image */}
                <img
                    src={finalImageUrl}
                    alt={type === 'Regional' && !region ? "Select a coffee region" : `Coffee selection: ${type}${region ? ' - ' + region : ''}`}
                    style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
                />

                {/* Subscription Description Section */}
                {currentDescriptionData && (
                    <div className="subscription-description text-white my-4 px-2 text-left w-[90%] flex items-center justify-center">
                      {/* Check if description exists before trying to render */}
                      {currentDescriptionData.description && (
                         <div className="bg-[#3a3c3d] p-3 rounded-md border border-[#A67C52] text-lg w-[90%]">
                            <p className="mb-3">{currentDescriptionData.description}</p>
                            {/* Display current offering if available */}
                            {currentDescriptionData.currentOffering && (
                               <p className="whitespace-pre-wrap">
                                  {currentDescriptionData.currentOffering}
                               </p>
                            )}
                         </div>
                      )}
                    </div>
                )}


                {/* Summary Paragraph - built from sentenceParts */}
                <p className="summary-sentence text-lg leading-relaxed mt-0 mb-4 px-4 w-[90%] min-h-[3em]">
                    {sentenceParts}
                </p>

                {/* Add to Cart Button - enabled/disabled based on completion */}
                <div className="cart-btn mt-2 w-[100%] flex justify-end pr-[5%]"> {/* Adjusted padding for alignment */}
                    <button
                        className={`
                          bg-[#A67C52] p-2 px-3 rounded-md border-[1.5px] border-[#3a3c3d]
                          transition-all duration-300 ease-in-out transform
                          text-white font-semibold text-md mb-2
                          disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:hover:scale-105
                        `}
                        disabled={!canAddToCart} // Disable button if selection not complete
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        );

    } else {
        // --- STATE 0: Display Introductory Content ---
        contentToRender = <DefaultIntroContent />;
    }

    // --- Render the main container with either intro or summary ---
    return (
        <div className="right-container pt-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]"> {/* Ensure background covers area */}
            {contentToRender}
        </div>
    );
};

export default RightContainer;