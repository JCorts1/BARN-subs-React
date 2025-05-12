// src/components/RightContainer.jsx
// FINAL VERSION: Includes Capsule logic/data, uses AJAX POST, reflects removal of Roasters Choice 'Option',
// updates summary sentence quantity display, and adds h1 for animation.

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
        "_default": [ "https://cdn.shopify.com/s/files/1/0831/4141/files/map.png?v=1745847536" ]
    },
    // --- ADDED: Capsule Images (Uses same images for all editions) ---
    "Capsules": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/capsules_1.png?v=1695032905",
        "https://cdn.shopify.com/s/files/1/0831/4141/products/94caa496-c974-436d-a877-91b5f1deee76_e692294a-dcda-4e46-97cf-cb22632a1acf.jpg?v=1667996022",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Capsules.jpg?v=1629729054"
    ],
    // --- End Capsule Images ---
     "_fallback": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883"
     ]
};

// --- Data for Subscription Descriptions ---
// TODO: Review/Update Placeholder Capsule Descriptions
const subscriptionDescriptions = {
    "Roasters Choice": { description: "Our most popular Subscription. Every month, we source stunning coffees from around the world. This is the best way to explore the origins, varietals, and processes that make Single Origin flavour so special.", currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral." },
    "Masterpiece": { description: "The rarest coffees on the planet. Scoring 90 points and up. Omni Roast.", currentOffering: "Current Offering:\n\nFinca Sophia Natural Gesha, Panama 🇵🇦" },
    "Low-Caf": { description: "This subscription sends out 250g of rare coffee varietals that naturally contain low caffeine: Aramosa or Laurina.", currentOffering: "Current Offering:\n\nDaterra Reserve from Brazil 🇧🇷" },
    "Office": { description: "This subscription is for offices that prefer espresso and need a little more volume each month. The coffee selection changes every month, allowing you to explore different coffee regions!", currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral." },
    "Regional": {
        "Brazil": { description: "People love Brazilian Coffees for their sweetness, low acidity and chocolate notes.", currentOffering: "Current Offering:\n\n🇧🇷 Elemental, Brazil: Milk Chocolate. Macadamia. Smooth." },
        "Ethiopia": { description: "People love Ethiopian Coffees for their floral notes and its tea-like character.", currentOffering: "Current Offering:\n\n🇪🇹 Chelbesa, Ethiopia: Peach. Fudge. Jasmine." },
        "Center America": { description: "People like Central Coffees for their exciting acidity and clean notes of terroir.", currentOffering: "Current Offering:\n\n🇨🇷 Volcan Azul, Costa Rica: Dried Fig. Vanilla." },
        _default: { description: "Select a region to see details about the specific coffee offering for this type.", currentOffering: "" }
    },
    // --- ADDED: Capsule Descriptions ---
    "Capsules": {
        "Seasonal Brazil": {
            description: "Convenient capsules featuring our current seasonal single origin coffee from Brazil. Nespresso® compatible.",
            currentOffering: "Current Offering:\n\n🇧🇷 Capsule - Brazil: Notes of..."
        },
        "Seasonal Ethiopia": {
            description: "Convenient capsules featuring our current seasonal single origin coffee from Ethiopia. Nespresso® compatible.",
            currentOffering: "Current Offering:\n\n🇪🇹 Capsule - Ethiopia: Notes of..."
        },
        _default: { // Description shown when Method=Capsules but no Edition selected yet
            description: "Select a Seasonal Edition for our Nespresso® compatible coffee capsules (30 per box).",
            currentOffering: ""
        }
    }
    // --- End Capsule Descriptions ---
};

// --- MAPPING DATA ---

// Function to get Shopify Variant ID based on user selections
// Updated for Capsules and simplified Roasters Choice logic
const getVariantIdFromSelections = (method, type, region, sizeOption, edition) => {
  console.log("Looking up Variant ID for:", { method, type, region, sizeOption, edition });
  // --- !! IMPORTANT: Fill in missing Variant IDs below from your copied store !! ---

  // --- Capsules --- (NEEDS IDs)
  if (method === 'Capsules') {
      if (edition === 'Seasonal Brazil') {
          // TODO: Add Variant ID for Capsules - Seasonal Brazil
          console.error("Missing Variant ID: Capsules - Seasonal Brazil"); return null;
      }
      if (edition === 'Seasonal Ethiopia') {
           // TODO: Add Variant ID for Capsules - Seasonal Ethiopia
           console.error("Missing Variant ID: Capsules - Seasonal Ethiopia"); return null;
      }
      console.warn("Capsules method selected but edition is missing or invalid:", edition);
      return null;
  // --- Roasters Choice --- (Simplified - Always uses 1 bag variant)
  } else if (type === 'Roasters Choice') {
      if (method === 'Filter') {
          return 45910178332939; // Filter / 1 x 250g
      } else if (method === 'Espresso') {
          return 45910178398475; // Espresso / 1 x 250g
      }
      console.warn("Roasters Choice selected but method is invalid:", method);
      return null;
  // --- Masterpiece --- (Completed)
  } else if (type === 'Masterpiece') {
     return 45969541562635; // Masterpiece Variant ID
  // --- Office --- (NEEDS IDs)
  } else if (type === 'Office') {
     if (method === 'Espresso') { // Assuming Office is Espresso only
         if (sizeOption === '2 x 250g') { /* TODO */ console.error("Missing Office ID: 2x250g"); return null; }
         if (sizeOption === '1 x 1kg') { /* TODO */ console.error("Missing Office ID: 1x1kg"); return null; }
         if (sizeOption === '2 x 1kg') { /* TODO */ console.error("Missing Office ID: 2x1kg"); return null; }
         if (sizeOption === '5 kg') { /* TODO */ console.error("Missing Office ID: 5kg"); return null; }
         console.warn("Office selected but sizeOption is invalid:", sizeOption); return null;
     } else { console.error("Office type selected but method is not Espresso"); return null; }
  // --- Regional --- (NEEDS IDs)
  } else if (type === 'Regional') {
     // TODO: Check if Regional needs different IDs based on method (Filter/Espresso)
     if (region === 'Brazil') { /* TODO */ console.error("Missing Regional ID: Brazil"); return null; }
     if (region === 'Ethiopia') { /* TODO */ console.error("Missing Regional ID: Ethiopia"); return null; }
     if (region === 'Center America') { /* TODO */ console.error("Missing Regional ID: Center America"); return null; }
     console.warn("Regional type selected but region is missing or invalid:", region); return null;
  // --- Low-Caf --- (NEEDS IDs)
  } else if (type === 'Low-Caf') {
     // TODO: Add Variant ID for Low-Caf (consider method if needed)
     console.error("Missing Variant ID: Low-Caf"); return null;
  }

  console.warn(`Variant ID lookup reached end without match: Type=${type}, Method=${method}, Size=${sizeOption}, Region=${region}, Edition=${edition}`);
  return null;
};

// Map frequency selection string to Plan ID AND Interval/Unit for AJAX properties
const sellingPlanMapping = {
  "1 Week":                  { planId: 710364201335, interval: 1, unit: 'Weeks' },
  "2 Weeks":                 { planId: 710364234103, interval: 2, unit: 'Weeks' },
  "3 Weeks":                 { planId: 710364266871, interval: 3, unit: 'Weeks' },
  "4 Weeks (Recommended)": { planId: 710364299639, interval: 4, unit: 'Weeks' },
  "5 Weeks":                 { planId: 710364332407, interval: 5, unit: 'Weeks' },
  "6 Weeks":                 { planId: 710364365175, interval: 6, unit: 'Weeks' },
};

// Define Masterpiece specific plan ID separately
const MASTERPIECE_SELLING_PLAN_ID = 710364397943; // Note: This plan is actually Monthly

// --- Component ---
// Added 'edition' to the props destructuring
const RightContainer = ({ method, type, region, edition, sizeOption, quantity, frequency }) => {

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
    const showSummaryLayout = method && (type || edition);
    // Enable button when all required fields for the selected path are filled
    // Updated logic for simplified Roasters Choice path
    const canAddToCart = method && quantity && frequency &&
        ( // Path 1: Capsules
          (method === 'Capsules' && edition) ||
          // Path 2: Filter/Espresso (Roasters Choice, Masterpiece, Low-Caf - check type exists)
          (method !== 'Capsules' && type && ['Roasters Choice', 'Masterpiece', 'Low-Caf'].includes(type) ) ||
          // Path 3: Filter/Espresso (Office - check sizeOption exists)
          (method !== 'Capsules' && type === 'Office' && sizeOption) ||
          // Path 4: Filter/Espresso (Regional - check region exists)
          (method !== 'Capsules' && type === 'Regional' && region)
        );


    let contentToRender;
    let imagesToShow = [];
    let currentDescriptionData = null;

    // --- Logic to determine content based on selections ---
    if (showSummaryLayout) {
        // Determine images and description (Includes Capsule Logic)
        if (method === 'Capsules') {
            imagesToShow = carouselImageData.Capsules || carouselImageData._fallback || []; // Use generic capsule images
            currentDescriptionData = subscriptionDescriptions.Capsules?.[edition] || subscriptionDescriptions.Capsules?._default || null;
        } else if (type === 'Regional') {
            imagesToShow = carouselImageData.Regional?.[region] || carouselImageData.Regional?._default || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions.Regional?.[region] || subscriptionDescriptions.Regional?._default || null;
        } else { // Handles Roasters Choice, Masterpiece, Low-Caf, Office
            imagesToShow = carouselImageData[type] || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions[type] || null;
        }
        if (!Array.isArray(imagesToShow)) { imagesToShow = carouselImageData._fallback || []; }


        // Construct summary sentence (Includes Capsule Logic & simplified RC)
        const highlightClass = "text-[#A67C52] font-semibold";
        const sentenceParts = [];
        sentenceParts.push('Your selection: ');
        sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);

        if (method === 'Capsules') {
            if (edition) {
                sentenceParts.push(' - ');
                sentenceParts.push(<span key="edition" className={highlightClass}>{edition}</span>);
                // Size is fixed for capsules, mentioned with quantity below
            } else {
                sentenceParts.push(' (select edition)');
            }
        } else { // Filter/Espresso Methods
            if (type) {
                sentenceParts.push(' - ');
                sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);
                if (type === 'Regional') {
                    if (region) { sentenceParts.push(' - '); sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>); }
                    else { sentenceParts.push(' (select region)'); }
                } else if (type === 'Office') { // Only Office uses sizeOption now in summary
                     if (sizeOption) { sentenceParts.push(' - '); sentenceParts.push(<span key="amount" className={highlightClass}>{sizeOption}</span>); }
                     else { sentenceParts.push(' (select size)'); }
                }
                 // Roasters Choice, Masterpiece, Low-Caf don't display size/region here, handled with quantity
            } else {
                 sentenceParts.push(' (select type)');
            }
        }

        sentenceParts.push(' subscription'); // Generic term

        // --- UPDATED Quantity and Unit/Size display logic ---
        if (quantity) {
            sentenceParts.push(' - Qty: ');
            sentenceParts.push(<span key="qty-val" className={highlightClass}>{quantity}</span>);

            // Append unit/size based on type/method (excluding Office size which is added earlier)
            if (method === 'Capsules') {
                 // Add specificity matching MiddleContainer label
                 sentenceParts.push(parseInt(quantity) > 1 ? ' boxes (30 caps each)' : ' box (30 caps each)');
            } else if (type === 'Roasters Choice' || type === 'Regional' || type === 'Low-Caf') {
                // Match the "N x 250g" format requested
                sentenceParts.push(` x 250g`);
            } else if (type === 'Masterpiece') {
                // Match the approximate size from MiddleContainer label
                sentenceParts.push(parseInt(quantity) > 1 ? ` bags (100-200g each)` : ` bag (100-200g)`);
            }
            // Note: Office size ('sizeOption') is displayed earlier, after the type name.
        } else {
            sentenceParts.push(' (select quantity)');
        }
        // --- End UPDATED Quantity section ---


        if (frequency) {
            sentenceParts.push(', delivered every ');
            const displayFrequency = frequency.replace(' (Recommended)', '');
            sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>);
         } else {
            sentenceParts.push(' (select frequency)');
        }
        sentenceParts.push('.');
        // --- End sentence construction ---


        // --- ADD TO CART HANDLER (AJAX POST to /cart/add.js) ---
        const handleAddToCartClick = async () => {
            console.log("Add to cart clicked (AJAX). State:", { method, type, region, edition, sizeOption, quantity, frequency });

            if (!canAddToCart) { alert("Please complete your subscription selections."); console.warn("Add to cart blocked, selections incomplete."); return; }

            // Pass 'edition' prop to lookup; sizeOption only used internally by lookup if type is Office
            const selectedVariantId = getVariantIdFromSelections(method, type, region, sizeOption, edition);
            const selectedQuantity = parseInt(quantity, 10);
            let subscriptionInterval = null;
            let subscriptionUnit = null;
            let sellingPlanIdForProps = null;

            // Determine frequency details and correct selling plan ID
             // ** TODO: Verify if Capsules/Office/Regional/Low-Caf use the Roasters Choice sellingPlanMapping IDs or require specific ones **
            if (method !== 'Capsules' && type === 'Masterpiece') {
                subscriptionInterval = 1; subscriptionUnit = 'Months'; // Assuming Masterpiece is always monthly based on prior logic/IDs
                sellingPlanIdForProps = MASTERPIECE_SELLING_PLAN_ID; // Use specific ID
                console.log("Using specific Masterpiece Selling Plan ID (Monthly):", sellingPlanIdForProps);
            } else {
                // Use the general mapping (ASSUMPTION! Verify this matches Shopify setup)
                const selectedPlanInfo = sellingPlanMapping[frequency];
                if (!selectedPlanInfo || !selectedPlanInfo.interval || !selectedPlanInfo.unit || !selectedPlanInfo.planId) {
                    alert(`Error: Could not find full subscription plan details for frequency: "${frequency}". Check sellingPlanMapping.`); return;
                }
                subscriptionInterval = selectedPlanInfo.interval;
                subscriptionUnit = selectedPlanInfo.unit;
                sellingPlanIdForProps = selectedPlanInfo.planId; // Use ID from map
                console.log(`Using general Selling Plan ID for ${frequency} (Type/Method: ${type || method}):`, sellingPlanIdForProps);
            }

            // Validate looked-up values
            if (!selectedVariantId) { alert("Error: Could not determine the correct product variant. Please complete the getVariantIdFromSelections function."); return; }
            if (isNaN(selectedQuantity) || selectedQuantity < 1) { alert("Error: Invalid quantity selected."); return; }
            if (!subscriptionInterval || !subscriptionUnit || !sellingPlanIdForProps) { alert(`Error: Failed to determine valid subscription details for Type: ${type}, Frequency: ${frequency}.`); return; }

            console.log("Resolved Data for AJAX:", { variantId: selectedVariantId, quantity: selectedQuantity, interval: subscriptionInterval, unit: subscriptionUnit, sellingPlanIdForProps: sellingPlanIdForProps });

            // Prepare Properties and formData
            const rechargeProperties = {
                'shipping_interval_frequency': subscriptionInterval.toString(),
                'shipping_interval_unit_type': subscriptionUnit,
                'selling_plan': sellingPlanIdForProps // Pass the determined Selling Plan ID
            };
            const formData = { items: [{ id: selectedVariantId, quantity: selectedQuantity, properties: rechargeProperties }] };

            // Make the AJAX POST request
            try {
                console.log("Sending AJAX POST to /cart/add.js with data:", JSON.stringify(formData));
                const response = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(formData) });
                const responseData = await response.json();
                if (!response.ok) { console.error('Shopify cart/add error:', response.status, responseData); alert(`Error adding to cart: ${responseData.description || responseData.message || 'Inventory issue or invalid selection.'}`); return; }
                console.log('Successfully added to cart via AJAX:', responseData);
                alert('Subscription added to your cart!');
                // window.location.href = '/cart'; // Optionally redirect
            } catch (error) { console.error("AJAX request failed:", error); alert("Could not add subscription to cart (network issue)."); }
        };
        // --- END ADD TO CART HANDLER ---


        // --- JSX for the summary layout ---
        contentToRender = (
            <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4">
                <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>

                {/* Carousel */}
                {imagesToShow.length > 0 ? (
                    <Carousel className="w-full max-w-xs mx-auto mb-6" opts={{ align: "start", loop: imagesToShow.length > 1 }}>
                        <CarouselContent>
                            {imagesToShow.map((imageUrl, index) => (
                                // Updated key to include potentially changing edition/region/type
                                <CarouselItem key={`${method}-${type || edition}-${region || ''}-${index}`}>
                                    <div className="p-1">
                                        <img
                                            src={imageUrl}
                                            // Updated Alt Text
                                            alt={`${method}${type ? ' - '+type : ''}${edition ? ' - '+edition : ''}${region ? ' - '+region : ''} image ${index + 1}`}
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

                {/* Description and Animation Container */}
                {currentDescriptionData && currentDescriptionData.description && (
                    <div className="subscription-description text-white my-4 text-left w-full max-w-md flex justify-center flex-col">
                        {/* Description Box */}
                        <div className="bg-[#3a3c3d] p-4 rounded-md border border-[#A67C52] text-base sm:text-lg w-full">
                            <p className="mb-3">{currentDescriptionData.description}</p>
                            {currentDescriptionData.currentOffering && (
                                <p className="whitespace-pre-wrap text-sm sm:text-base">
                                    {currentDescriptionData.currentOffering}
                                </p>
                            )}
                        </div>
                        {/* Animation Box */}
                        <div>
                            <h1 className='words-animation'>You can adjust your quantity any time!</h1>
                        </div>
                    </div>
                )}

                {/* Summary Sentence */}
                <p className="summary-sentence text-base sm:text-lg leading-relaxed my-4 w-full max-w-md min-h-[3em]">
                    {sentenceParts}
                </p>

                {/* Add to Cart Button */}
                <div className="cart-btn mt-auto pt-4 w-full max-w-md flex justify-center sm:justify-end">
                    <button
                        className={`
                          bg-[#A67C52] py-2 px-5 rounded-md border-[1.5px] border-transparent hover:border-[#3a3c3d]
                          transition-all duration-300 ease-in-out transform
                          text-white font-semibold text-base sm:text-md
                          disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:active:scale-95
                        `}
                        disabled={!canAddToCart}
                        onClick={handleAddToCartClick}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        );

    } else {
        // Default Intro Content
        contentToRender = <DefaultIntroContent />;
    }

    // Final Render
    return (
        <div className="right-container pt-10 pb-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]">
            {contentToRender}
        </div>
    );
};

export default RightContainer;