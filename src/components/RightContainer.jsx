// src/components/RightContainer.jsx
// Final version using AJAX POST for Add to Cart.
// Includes updated Roasters Choice Selling Plan IDs and corrected Masterpiece Variant ID.

import React from 'react';
import './RightContainer.css'; // Make sure this CSS file exists and is styled appropriately

// --- Carousel components ---
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"; // Ensure this path matches your project structure

// --- Image Data for Carousel ---
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
        "_default": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/map.png?v=1745847536"
        ]
    },
     "_fallback": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883"
     ]
};

// --- Data for Subscription Descriptions ---
const subscriptionDescriptions = {
    "Roasters Choice": { description: "Our most popular Subscription...", currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee..." },
    "Masterpiece": { description: "The rarest coffees on the planet...", currentOffering: "Current Offering:\n\nFinca Sophia..." },
    "Low-Caf": { description: "This subscription sends out...", currentOffering: "Current Offering:\n\nDaterra Reserve..." },
    "Office": { description: "This subscription is for offices...", currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee..." },
    "Regional": {
        "Brazil": { description: "People love Brazilian Coffees...", currentOffering: "Current Offering:\n\n🇧🇷 Elemental..." },
        "Ethiopia": { description: "People love Ethiopian Coffees...", currentOffering: "Current Offering:\n\n🇪🇹 Chelbesa..." },
        "Center America": { description: "People like Central Coffees...", currentOffering: "Current Offering:\n\n🇨🇷 Volcan Azul..." },
        _default: { description: "Select a region to see details...", currentOffering: "" }
    }
};

// --- MAPPING DATA (Partially Populated - NEEDS MORE IDs) ---

// Function to get Shopify Variant ID based on user selections
const getVariantIdFromSelections = (method, type, region, sizeOption) => {
  console.log("Looking up Variant ID for:", { method, type, region, sizeOption });
  // --- !! IMPORTANT: Fill in ALL 'TODO' sections below with your actual Shopify Variant IDs !! ---
  // --- !!           Get these IDs from your COPIED store for testing !! ---

  // --- Roasters Choice --- (Completed)
  if (type === 'Roasters Choice') {
    if (method === 'Filter') {
       if (sizeOption === '1 bag 250grams') return 45910178332939;
       if (sizeOption === '2 bags 250grams') return 54897259151735;
    } else if (method === 'Espresso') {
       if (sizeOption === '1 bag 250grams') return 45910178398475;
       if (sizeOption === '2 bags 250grams') return 54897259184503;
    }
  // --- Masterpiece --- (Completed)
  } else if (type === 'Masterpiece') {
     return 45969541562635; // Masterpiece Variant ID
  // --- Office --- (NEEDS IDs)
  } else if (type === 'Office') {
     if (method === 'Espresso') { // Assuming Office is Espresso only
         if (sizeOption === '2 x 250g') {
           // TODO: Add Variant ID for Office - 2 x 250g
           console.error("Missing Variant ID: Office - 2 x 250g"); return null;
         }
         if (sizeOption === '1 x 1kg') {
            // TODO: Add Variant ID for Office - 1 x 1kg
           console.error("Missing Variant ID: Office - 1 x 1kg"); return null;
         }
         if (sizeOption === '2 x 1kg') {
            // TODO: Add Variant ID for Office - 2 x 1kg
           console.error("Missing Variant ID: Office - 2 x 1kg"); return null;
         }
          if (sizeOption === '5 kg') {
            // TODO: Add Variant ID for Office - 5 kg
           console.error("Missing Variant ID: Office - 5 kg"); return null;
         }
     } else { console.error("Office type selected but method is not Espresso"); return null; }
  // --- Regional --- (NEEDS IDs)
  } else if (type === 'Regional') {
     // TODO: Check if Regional has different IDs based on method (Filter/Espresso)
     if (region === 'Brazil') {
       // TODO: Add Variant ID for Regional - Brazil
       console.error("Missing Variant ID: Regional - Brazil"); return null;
     }
     if (region === 'Ethiopia') {
        // TODO: Add Variant ID for Regional - Ethiopia (Use 45972211695883 from its link or confirm if different)
       console.error("Missing Variant ID: Regional - Ethiopia"); return null;
     }
     if (region === 'Center America') {
       // TODO: Add Variant ID for Regional - Center America
       console.error("Missing Variant ID: Regional - Center America"); return null;
     }
     console.warn("Regional type selected but region is missing or invalid:", region); return null;
  // --- Low-Caf --- (NEEDS IDs)
  } else if (type === 'Low-Caf') {
     // TODO: Add Variant ID for Low-Caf (consider method if needed)
     console.error("Missing Variant ID: Low-Caf"); return null;
  }

  console.warn(`Variant ID not found for selection combination: Type=${type}, Method=${method}, Size=${sizeOption}, Region=${region}`);
  return null;
};

// Map frequency selection string to Plan ID AND Interval/Unit for AJAX properties
// ** Contains CORRECTED IDs for Roasters Choice based on user input **
// ** Please verify all interval/unit values match your actual Shopify Selling Plan definitions **
const sellingPlanMapping = {
  // "Frequency String": { planId: SHOPIFY_SELLING_PLAN_ID, interval: FREQUENCY_NUMBER, unit: 'Days'|'Weeks'|'Months' },
  "1 Week":                  { planId: 710364201335, interval: 1, unit: 'Weeks' },
  "2 Weeks":                 { planId: 710364234103, interval: 2, unit: 'Weeks' },
  "3 Weeks":                 { planId: 710364266871, interval: 3, unit: 'Weeks' },
  "4 Weeks (Recommended)": { planId: 710364299639, interval: 4, unit: 'Weeks' },
  "5 Weeks":                 { planId: 710364332407, interval: 5, unit: 'Weeks' },
  "6 Weeks":                 { planId: 710364365175, interval: 6, unit: 'Weeks' },
};

// Define Masterpiece specific plan ID separately (used in properties)
const MASTERPIECE_4_WEEK_SELLING_PLAN_ID = 710364397943; // From Masterpiece link analysis

// --- Component ---
const RightContainer = ({ method, type, region, sizeOption, quantity, frequency }) => {

    // --- Default/Introductory Content ---
    const DefaultIntroContent = () => {
        const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883";
        return (
            <div className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
                <div className='mt-8'>
                    <img src={defaultImageUrl} alt="The Barn Coffee Roasters Logo" style={{ width: '100%', maxWidth: '350px', height: 'auto', margin: '1rem 0' }} />
                </div>
                <div className='p-5 border border-[#A57C62] rounded-md mt-8 w-full max-w-md'>
                    <ul className="intro-list text-xl sm:text-2xl" style={{ listStyle: 'none', padding: 0 }}>
                        <li className="my-2">🌱 Sustainably sourced from top farms</li>
                        <li className="my-2">🔥 Expertly roasted in Berlin</li>
                        <li className="my-2">📦 Delivered fresh, right when you need it</li>
                        <li className="my-2">☕ Always rotating—always exceptional</li>
                    </ul>
                </div>
            </div>
        );
    };
    // --- End Default Content ---

    // --- Determine Display Logic ---
    const showSummaryLayout = method && type;
    const canAddToCart = method && type && quantity && frequency &&
        (type !== 'Regional' || region) &&
        ((type !== 'Roasters Choice' && type !== 'Office') || sizeOption);

    // --- ADD TO CART HANDLER (AJAX POST to /cart/add.js - CORRECTED MASTERPIECE LOGIC) ---
    const handleAddToCartClick = async () => {
        console.log("Add to cart clicked (AJAX). State:", { method, type, region, sizeOption, quantity, frequency });

        if (!canAddToCart) {
            alert("Please complete your subscription selections.");
            console.warn("Add to cart blocked, selections incomplete.");
            return;
        }

        // 1. Look up Variant ID and Frequency Details
        const selectedVariantId = getVariantIdFromSelections(method, type, region, sizeOption);
        const selectedQuantity = parseInt(quantity, 10);
        let subscriptionInterval = null;
        let subscriptionUnit = null;
        let sellingPlanIdForProps = null; // Use the correct plan ID for properties

        // Determine frequency details and correct selling plan ID
        if (type === 'Masterpiece') {
            // Masterpiece uses a fixed MONTHLY plan (ID: ...397943) but UI selects "4 Weeks" state
            subscriptionInterval = 1; // Correct interval for the monthly plan
            subscriptionUnit = 'Months'; // Correct unit for the monthly plan
            sellingPlanIdForProps = MASTERPIECE_4_WEEK_SELLING_PLAN_ID; // Correct Plan ID for monthly Masterpiece
            console.log("Using specific Masterpiece Selling Plan ID (Monthly):", sellingPlanIdForProps);
        } else {
            // For other types, use the general mapping based on frequency selection state
            // ASSUMPTION: Other types use the Roasters Choice Selling Plan IDs. Verify this!
            const selectedPlanInfo = sellingPlanMapping[frequency];
            if (!selectedPlanInfo || !selectedPlanInfo.interval || !selectedPlanInfo.unit || !selectedPlanInfo.planId) {
                alert(`Error: Could not find full subscription plan details (interval/unit/planId) for frequency: "${frequency}". Check sellingPlanMapping.`);
                return;
            }
            subscriptionInterval = selectedPlanInfo.interval;
            subscriptionUnit = selectedPlanInfo.unit;
            sellingPlanIdForProps = selectedPlanInfo.planId;
            console.log(`Using general Selling Plan ID for ${frequency} (Type: ${type}):`, sellingPlanIdForProps);
        }

        // 3. Validate all looked-up values
        if (!selectedVariantId) {
            alert("Error: Could not determine the correct product variant. Please complete the getVariantIdFromSelections function.");
            return;
        }
        if (isNaN(selectedQuantity) || selectedQuantity < 1) {
           alert("Error: Invalid quantity selected.");
           return;
        }
        if (!subscriptionInterval || !subscriptionUnit || !sellingPlanIdForProps) {
            alert(`Error: Failed to determine valid subscription details for Type: ${type}, Frequency: ${frequency}.`);
            return;
        }

        console.log("Resolved Data for AJAX:", {
            variantId: selectedVariantId,
            quantity: selectedQuantity,
            interval: subscriptionInterval,
            unit: subscriptionUnit,
            sellingPlanIdForProps: sellingPlanIdForProps
        });

        // 4. Prepare Recharge Properties for AJAX call
        const rechargeProperties = {
            'shipping_interval_frequency': subscriptionInterval.toString(),
            'shipping_interval_unit_type': subscriptionUnit,
            'selling_plan': sellingPlanIdForProps
        };

        // 5. Prepare data payload for Shopify's /cart/add.js endpoint
        const formData = {
            items: [{
                id: selectedVariantId,
                quantity: selectedQuantity,
                properties: rechargeProperties
            }]
        };

        // 6. Make the AJAX POST request
        // Requires embedded context (Theme App Extension) or CLI proxy to work
        try {
            console.log("Sending AJAX POST to /cart/add.js with data:", JSON.stringify(formData));

            const response = await fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error('Shopify cart/add error:', response.status, responseData);
                alert(`Error adding to cart: ${responseData.description || responseData.message || 'Inventory issue or invalid selection. Please try again.'}`);
                return;
            }

            console.log('Successfully added to cart via AJAX:', responseData);
            alert('Subscription added to your cart!');
            // Optionally update UI or redirect
            // window.location.href = '/cart';

        } catch (error) {
            console.error("AJAX request failed (Network Error or other issue):", error);
            alert("Could not add subscription to cart due to an unexpected issue. Please check console or try again.");
        }
    };
    // --- END ADD TO CART HANDLER ---

    let contentToRender;
    let imagesToShow = [];

    // --- Logic to determine content based on selections ---
    if (showSummaryLayout) {
        // Determine images to show
        if (type === 'Regional') { imagesToShow = carouselImageData.Regional[region] || carouselImageData.Regional._default; }
        else { imagesToShow = carouselImageData[type] || carouselImageData._fallback; }
        if (!Array.isArray(imagesToShow)) { imagesToShow = carouselImageData._fallback || []; }

        // Get description text
        let currentDescriptionData = null;
        if (type === 'Regional') { currentDescriptionData = subscriptionDescriptions.Regional[region] || subscriptionDescriptions.Regional._default; }
        else { currentDescriptionData = subscriptionDescriptions[type] || null; }

        // Construct summary sentence
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
        if (frequency) {
            sentenceParts.push(', delivered every ');
            const displayFrequency = frequency.replace(' (Recommended)', '');
            sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>);
         } else {
            sentenceParts.push(' (select frequency)');
        }
        sentenceParts.push('.');


        // --- JSX for the summary layout ---
        contentToRender = (
            <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4">
                <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>

                {/* === CAROUSEL IMPLEMENTATION START === */}
                {imagesToShow.length > 0 ? (
                    <Carousel
                        className="w-full max-w-xs mx-auto mb-6"
                        opts={{ align: "start", loop: imagesToShow.length > 1 }}
                    >
                        <CarouselContent>
                            {imagesToShow.map((imageUrl, index) => (
                                <CarouselItem key={`${type}-${region || ''}-${index}-${index}`}>
                                    <div className="p-1">
                                        <img
                                            src={imageUrl}
                                            alt={`${type}${region ? ' - ' + region : ''} image ${index + 1}`}
                                            className="w-full h-auto aspect-square object-cover rounded-md block"
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
                        onClick={handleAddToCartClick} // Correctly attached handler
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