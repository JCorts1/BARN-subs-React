// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Make sure this CSS file exists and is styled appropriately

// --- Carousel components are still needed ---
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"; // Ensure this path matches your project structure
// --- Card and CardContent imports are REMOVED ---

// --- Image Data for Carousel ---
// TODO: Replace placeholder URLs with your actual image URLs
const carouselImageData = {
    "Roasters Choice": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Curated_Subscription_Coffee_FIL_March_2025.jpg?v=1745957301", 
        "https://cdn.shopify.com/s/files/1/0831/4141/files/330B7ED3-F6D7-452A-80C1-F377D55D8FA6-2950-000002F30AF09FBC.jpg?v=1745591524", 
    ],
    "Masterpiece": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Aroma_Nativo_Masterpiece.jpg?v=1744711907",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/MasterpiecePourover_62c21026-4dd5-492f-a000-2389bad32528.jpg?v=1716801442",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/1A811F5A-D50E-4B89-B35D-1F3F68BFC79C-1435-0000008C80587130.jpg?v=1734608120"
    ],
    "Low-Caf": [
        "https://cdn.shopify.com/s/files/1/0831/4141/products/thebarn_neu_1200x1200_lowcaf_kanne_813bf11a-da59-4525-8620-5e8f281c8b8d.png?v=1739286465",
        "https://cdn.shopify.com/s/files/1/0831/4141/products/NanoChalla_32c7ddc5-d7a5-4989-8483-b2a358c63eb5.jpg?v=1739301233",
        "https://cdn.shopify.com/s/files/1/0831/4141/products/caffeine_levels_d161625f-8c4c-4a27-86fb-b3c5b94a3414.jpg?v=1739301233"
    ],
    "Office": [
        "https://cdn.shopify.com/s/files/1/1657/3941/files/volcan_azul_1kg.webp?v=1743027540", 
        "https://cdn.shopify.com/s/files/1/0831/4141/files/gigesa_EOM.jpg?v=1741274114", 
        "https://cdn.shopify.com/s/files/1/0831/4141/products/espressoshotsCropped_60eb6865-fd62-43c7-90c5-2bc9050f167b.jpg?v=1741274114"
    ],
    "Regional": {
        "Brazil": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/Elemental_Bag_Catuai_mit_labelle.png?v=1723799712",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/Image_26.04.24_at_14.12.jpg?v=1728375513",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/2_v60_6c2d62af-96c2-4e95-a9f9-5d66eb85efb8.png?v=1712752891", 
        ],
        "Ethiopia": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Chelbesa_Natural_2024.png?v=1729679115",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/Image_26.04.24_at_14.12.jpg?v=1728375513",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/2_v60_6c2d62af-96c2-4e95-a9f9-5d66eb85efb8.png?v=1712752891", 
        ],
        "Center America": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Volcan_Azul_Caturra_OMNI_3a40d3d4-a185-4da0-99ff-b8d0f43479b7.png?v=1743674027",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/Image_26.04.24_at_14.12.jpg?v=1728375513",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/2_v60_6c2d62af-96c2-4e95-a9f9-5d66eb85efb8.png?v=1712752891", 
        ],
         // Image(s) shown when 'Regional' is selected but no specific region yet
        "_default": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/map.png?v=1745847536" // Map image
        ]
    },
     // Fallback images if type is somehow not found
     "_fallback": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883" // Default logo or other fallback image
     ]
};

// --- Data for Subscription Descriptions ---
// TODO: Ensure these descriptions are complete and accurate
const subscriptionDescriptions = {
    "Roasters Choice": {
        description: "Our most popular Subscription. Every month, we source stunning coffees from around the world. This is the best way to explore the origins, varietals, and processes that make Single Origin flavour so special.",
        currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral." // Example
    },
    "Masterpiece": {
        description: "The rarest coffees on the planet. Scoring 90 points and up. Omni Roast.",
        currentOffering: "Current Offering:\n\nFinca Sophia Natural Gesha, Panama 🇵🇦" // Example
    },
    "Low-Caf": {
        description: "This subscription sends out 250g of rare coffee varietals that naturally contain low caffeine: Aramosa or Laurina.",
        currentOffering: "Current Offering:\n\nDaterra Reserve from Brazil 🇧🇷" // Example
    },
    "Office": {
        description: "This subscription is for offices that prefer espresso and need a little more volume each month. The coffee selection changes every month, allowing you to explore different coffee regions!",
        currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral." // Example
    },
    "Regional": {
        "Brazil": {
            description: "People love Brazilian Coffees for their sweetness, low acidity and chocolate notes.",
            currentOffering: "Current Offering:\n\n🇧🇷 Elemental, Brazil: Milk Chocolate. Macadamia. Smooth." // Example
        },
        "Ethiopia": {
            description: "People love Ethiopian Coffees for their floral notes and its tea-like character.",
            currentOffering: "Current Offering:\n\n🇪🇹 Chelbesa, Ethiopia: Peach. Fudge. Jasmine." // Example
        },
        "Center America": {
            description: "People like Central Coffees for their exciting acidity and clean notes of terroir.",
            currentOffering: "Current Offering:\n\n🇨🇷 Volcan Azul, Costa Rica: Dried Fig. Vanilla." // Example
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

    // --- Default/Introductory Content (Shown initially) ---
    const DefaultIntroContent = () => {
        const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883"; // The Barn Logo
        return (
            <div className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
                <div className='mt-8'> {/* Added margin top */}
                    <img src={defaultImageUrl} alt="The Barn Coffee Roasters Logo" style={{ width: '100%', maxWidth: '350px', height: 'auto', margin: '1rem 0' }} />
                </div>
                <div className='p-5 border border-[#A57C62] rounded-md mt-8 w-full max-w-md'> {/* Added max-width */}
                    <ul className="intro-list text-xl sm:text-2xl" style={{ listStyle: 'none', padding: 0 }}> {/* Adjusted text size */}
                        <li className="my-2">🌱 Sustainably sourced from top farms</li>
                        <li className="my-2">🔥 Expertly roasted in Berlin</li>
                        <li className="my-2">📦 Delivered fresh, right when you need it</li>
                        <li className="my-2">☕ Always rotating—always exceptional</li>
                    </ul>
                </div>
            </div>
        );
    };
    // --- End Default/Introductory Content ---

    // --- Determine Display Logic ---
    const showSummaryLayout = method && type;
    const canAddToCart = method && type && quantity && frequency &&
        (type !== 'Regional' || region) &&
        (type !== 'Roasters Choice' || sizeOption) &&
        (type !== 'Office' || sizeOption);

    let contentToRender;
    let imagesToShow = [];

    // --- Logic to determine content based on selections ---
    if (showSummaryLayout) {
        // --- Determine which images to show in the carousel ---
        if (type === 'Regional') {
            imagesToShow = carouselImageData.Regional[region] || carouselImageData.Regional._default;
        } else {
            imagesToShow = carouselImageData[type] || carouselImageData._fallback;
        }
        if (!Array.isArray(imagesToShow)) {
            imagesToShow = carouselImageData._fallback || [];
        }
        // --- End Image determination ---

        // --- Get Subscription Description Text ---
        let currentDescriptionData = null;
        if (type === 'Regional') {
            currentDescriptionData = subscriptionDescriptions.Regional[region] || subscriptionDescriptions.Regional._default;
        } else {
            currentDescriptionData = subscriptionDescriptions[type] || null;
        }
        // --- End Get Description Text ---

        // --- Construct the dynamic summary sentence ---
        const highlightClass = "text-[#A67C52] font-semibold";
        const sentenceParts = [];
        sentenceParts.push('Your selection: ');
        if (sizeOption) { sentenceParts.push(<span key="amount" className={highlightClass}>{sizeOption}</span>); sentenceParts.push(' '); }
        else if (type === 'Roasters Choice' || type === 'Office') { sentenceParts.push('(select size/option) '); }
        sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>); sentenceParts.push(' ');
        sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);
        if (region) { sentenceParts.push(' from '); sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>); }
        else if (type === 'Regional') { sentenceParts.push(' (select region)'); }
        sentenceParts.push(' coffee');
        if (quantity) { sentenceParts.push(' '); sentenceParts.push(<span key="qty-val" className={highlightClass}>{quantity}</span>); sentenceParts.push(' '); sentenceParts.push(<span key="qty-word" className={highlightClass}>{parseInt(quantity) > 1 ? 'times' : 'time'}</span>); }
        else { sentenceParts.push(' (select quantity)'); }
        if (frequency) { sentenceParts.push(', delivered every '); const displayFrequency = frequency.replace(' (Recommended)', ''); sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>); }
        else { sentenceParts.push(' (select frequency)'); }
        sentenceParts.push('.');
        // --- End sentence construction ---

        // --- JSX for the summary layout (includes Carousel WITHOUT Card) ---
        contentToRender = (
            <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4"> {/* Added padding */}
                <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>

                {/* === CAROUSEL IMPLEMENTATION START (No Card/CardContent) === */}
                {imagesToShow.length > 0 ? (
                    <Carousel
                        className="w-full max-w-xs mx-auto mb-6" // Center carousel, limit width, add bottom margin
                        opts={{
                            align: "start",
                            loop: imagesToShow.length > 1,
                        }}
                    >
                        <CarouselContent>
                            {imagesToShow.map((imageUrl, index) => (
                                <CarouselItem key={`${type}-${region || ''}-${index}`}>
                                    <div className="p-1"> {/* Optional: Padding around image slide */}
                                        {/* Image displayed directly */}
                                        <img
                                            src={imageUrl}
                                            alt={`${type}${region ? ' - ' + region : ''} image ${index + 1}`}
                                            className="w-full h-auto aspect-square object-cover rounded-md block" // Style image directly
                                            loading="lazy"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {imagesToShow.length > 1 && (
                            <>
                                <CarouselPrevious className="absolute left-[-25px] sm:left-[-40px] top-1/2 -translate-y-1/2 text-[#A67C52] bg-[#1a1a1a]/80 hover:bg-[#3a3c3d] border-none" />
                                <CarouselNext className="absolute right-[-25px] sm:right-[-40px] top-1/2 -translate-y-1/2 text-[#A67C52] bg-[#1a1a1a]/80 hover:bg-[#3a3c3d] border-none" />
                            </>
                        )}
                    </Carousel>
                ) : (
                    // Fallback display if no images are available
                    <div className="w-full max-w-xs h-[250px] bg-[#3a3c3d]/50 flex items-center justify-center rounded-md mb-6 border border-[#A67C52]/30">
                        <p className="text-gray-400">Image Coming Soon</p>
                    </div>
                )}
                {/* === CAROUSEL IMPLEMENTATION END === */}


                {/* --- Subscription Description Section --- */}
                {currentDescriptionData && currentDescriptionData.description && (
                    <div className="subscription-description text-white my-4 text-left w-full max-w-md flex justify-center">
                        <div className="bg-[#3a3c3d] p-4 rounded-md border border-[#A67C52] text-base sm:text-lg w-full">
                            <p className="mb-3">{currentDescriptionData.description}</p>
                            {currentDescriptionData.currentOffering && (
                                <p className="whitespace-pre-wrap text-sm sm:text-base">
                                    {currentDescriptionData.currentOffering}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* --- Summary Paragraph --- */}
                <p className="summary-sentence text-base sm:text-lg leading-relaxed my-4 w-full max-w-md min-h-[3em]">
                    {sentenceParts}
                </p>

                {/* --- Add to Cart Button --- */}
                <div className="cart-btn mt-auto pt-4 w-full max-w-md flex justify-center sm:justify-end">
                    <button
                        className={`
                          bg-[#A67C52] py-2 px-5 rounded-md border-[1.5px] border-transparent hover:border-[#3a3c3d]
                          transition-all duration-300 ease-in-out transform
                          text-white font-semibold text-base sm:text-md
                          disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:active:scale-95
                        `}
                        disabled={!canAddToCart}
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

    // --- Render the main container ---
    return (
        <div className="right-container pt-10 pb-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]">
            {contentToRender}
        </div>
    );
};

export default RightContainer;