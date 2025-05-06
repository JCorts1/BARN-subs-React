// src/components/RightContainer.jsx
// Final version using AJAX POST. Includes comment-free getVariantIdFromSelections.

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
        "Brazil": [ /* Your image URLs */ ],
        "Ethiopia": [ /* Your image URLs */ ],
        "Center America": [ /* Your image URLs */ ],
        "_default": [ "https://cdn.shopify.com/s/files/1/0831/4141/files/map.png?v=1745847536" ]
    },
    "Capsules": { // Added Placeholder
        "Seasonal Brazil": [ "https://cdn.shopify.com/s/files/1/0831/4141/files/capsules_1.png?v=1695032905" ],
        "Seasonal Ethiopia": [ "https://via.placeholder.com/300/A67C52/ffffff?text=Capsule+Ethiopia+1" ],
        "_default": [ "https://cdn.shopify.com/s/files/1/0831/4141/files/capsules_1.png?v=1695032905" ]
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
    },
     "Capsules": { // Added Placeholder
        "Seasonal Brazil": { description: "Convenient capsules featuring our current seasonal single origin coffee from Brazil. Nespresso® compatible.", currentOffering: "Current Offering:\n\n🇧🇷 Capsule - Brazil: Notes of..." },
        "Seasonal Ethiopia": { description: "Convenient capsules featuring our current seasonal single origin coffee from Ethiopia. Nespresso® compatible.", currentOffering: "Current Offering:\n\n🇪🇹 Capsule - Ethiopia: Notes of..." },
        _default: { description: "Select a Seasonal Edition for our Nespresso® compatible coffee capsules.", currentOffering: "" }
    }
};

// --- MAPPING DATA (Partially Populated - NEEDS MORE IDs) ---

// Function to get Shopify Variant ID based on user selections (COMMENT-FREE)
const getVariantIdFromSelections = (method, type, region, sizeOption, edition) => {
  console.log("Looking up Variant ID for:", { method, type, region, sizeOption, edition });

  if (method === 'Capsules') {
      if (edition === 'Seasonal Brazil') {
          console.error("Missing Variant ID: Capsules - Seasonal Brazil");
          return null;
      }
      if (edition === 'Seasonal Ethiopia') {
           console.error("Missing Variant ID: Capsules - Seasonal Ethiopia");
           return null;
      }
      console.warn("Capsules method selected but edition is missing or invalid:", edition);
      return null;

  } else if (type === 'Roasters Choice') {
      if (method === 'Filter') {
          if (sizeOption === '1 bag 250grams') return 45910178332939;
          if (sizeOption === '2 bags 250grams') return 54897259151735;
      } else if (method === 'Espresso') {
          if (sizeOption === '1 bag 250grams') return 45910178398475;
          if (sizeOption === '2 bags 250grams') return 54897259184503;
      }
      console.warn("Roasters Choice selected but sizeOption is invalid:", sizeOption);
      return null;

  } else if (type === 'Masterpiece') {
      return 45969541562635;

  } else if (type === 'Office') {
      if (method === 'Espresso') {
          if (sizeOption === '2 x 250g') {
              console.error("Missing Variant ID: Office - 2 x 250g");
              return null;
          }
          if (sizeOption === '1 x 1kg') {
              console.error("Missing Variant ID: Office - 1 x 1kg");
              return null;
          }
          if (sizeOption === '2 x 1kg') {
              console.error("Missing Variant ID: Office - 2 x 1kg");
              return null;
          }
          if (sizeOption === '5 kg') {
              console.error("Missing Variant ID: Office - 5 kg");
              return null;
          }
          console.warn("Office selected but sizeOption is invalid:", sizeOption);
          return null;
      } else {
          console.error("Office type selected but method is not Espresso");
          return null;
      }

  } else if (type === 'Regional') {
      if (region === 'Brazil') {
          console.error("Missing Variant ID: Regional - Brazil");
          return null;
      }
      if (region === 'Ethiopia') {
          console.error("Missing Variant ID: Regional - Ethiopia");
          return null;
      }
      if (region === 'Center America') {
          console.error("Missing Variant ID: Regional - Center America");
          return null;
      }
      console.warn("Regional type selected but region is missing or invalid:", region);
      return null;

  } else if (type === 'Low-Caf') {
      console.error("Missing Variant ID: Low-Caf");
      return null;
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
const MASTERPIECE_4_WEEK_SELLING_PLAN_ID = 710364397943; // This is the Monthly Plan ID

// --- Component ---
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
    const showSummaryLayout = method && (type || edition); // Show if method AND (type OR edition) selected
    const canAddToCart = method && quantity && frequency &&
        ( (method === 'Capsules' && edition) ||
          (method !== 'Capsules' && type &&
            (type !== 'Regional' || region) &&
            ((type !== 'Roasters Choice' && type !== 'Office') || sizeOption)
          )
        );

    let contentToRender;
    let imagesToShow = [];
    let currentDescriptionData = null;

    // --- Logic to determine content based on selections ---
    if (showSummaryLayout) {
        // Determine images and description (Includes Capsule Logic)
        if (method === 'Capsules') {
            imagesToShow = carouselImageData.Capsules?.[edition] || carouselImageData.Capsules?._default || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions.Capsules?.[edition] || subscriptionDescriptions.Capsules?._default || null;
        } else if (type === 'Regional') {
            imagesToShow = carouselImageData.Regional?.[region] || carouselImageData.Regional?._default || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions.Regional?.[region] || subscriptionDescriptions.Regional?._default || null;
        } else { // Handles Roasters Choice, Masterpiece, Low-Caf, Office
            imagesToShow = carouselImageData[type] || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions[type] || null;
        }
        if (!Array.isArray(imagesToShow)) { imagesToShow = carouselImageData._fallback || []; }


        // Construct summary sentence (Includes Capsule Logic)
        const highlightClass = "text-[#A67C52] font-semibold";
        const sentenceParts = [];
        sentenceParts.push('Your selection: ');
        sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);

        if (method === 'Capsules') {
            if (edition) {
                sentenceParts.push(' - ');
                sentenceParts.push(<span key="edition" className={highlightClass}>{edition}</span>);
                sentenceParts.push(' (30 capsules)'); // Fixed size for capsules
            } else {
                sentenceParts.push(' (select edition)');
            }
        } else { // Filter/Espresso Methods
            if (type) {
                sentenceParts.push(' - ');
                sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);
                if (type === 'Regional') {
                    if (region) {
                        sentenceParts.push(' - ');
                        sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>);
                    } else {
                         sentenceParts.push(' (select region)');
                    }
                } else if (type === 'Roasters Choice' || type === 'Office') {
                     if (sizeOption) {
                         sentenceParts.push(' - ');
                         sentenceParts.push(<span key="amount" className={highlightClass}>{sizeOption}</span>);
                     } else {
                         sentenceParts.push(' (select size/option)');
                     }
                }
            } else {
                 sentenceParts.push(' (select type)');
            }
        }

        sentenceParts.push(' subscription'); // Use generic term

        if (quantity) {
            sentenceParts.push(' - Qty: ');
            sentenceParts.push(<span key="qty-val" className={highlightClass}>{quantity}</span>);
            if (method === 'Capsules') {
                 sentenceParts.push(parseInt(quantity) > 1 ? ' boxes' : ' box');
            }
        } else {
            sentenceParts.push(' (select quantity)');
        }

        if (frequency) {
            sentenceParts.push(', delivered every ');
            const displayFrequency = frequency.replace(' (Recommended)', '');
            sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>);
         } else {
            sentenceParts.push(' (select frequency)');
        }
        sentenceParts.push('.');
        // --- End sentence construction ---


        // --- ADD TO CART HANDLER (AJAX POST to /cart/add.js - Includes Masterpiece Logic) ---
        const handleAddToCartClick = async () => {
            console.log("Add to cart clicked (AJAX). State:", { method, type, region, edition, sizeOption, quantity, frequency });

            if (!canAddToCart) { alert("Please complete your subscription selections."); console.warn("Add to cart blocked, selections incomplete."); return; }

            // Pass 'edition' to the lookup function now
            const selectedVariantId = getVariantIdFromSelections(method, type, region, sizeOption, edition);
            const selectedQuantity = parseInt(quantity, 10);
            let subscriptionInterval = null;
            let subscriptionUnit = null;
            let sellingPlanIdForProps = null;

            // Determine frequency details and correct selling plan ID
            if (method !== 'Capsules' && type === 'Masterpiece') { // Keep Masterpiece exception
                subscriptionInterval = 1; subscriptionUnit = 'Months';
                sellingPlanIdForProps = MASTERPIECE_4_WEEK_SELLING_PLAN_ID;
                console.log("Using specific Masterpiece Selling Plan ID (Monthly):", sellingPlanIdForProps);
            } else {
                // Use the general mapping for Capsules, Roasters Choice, Office, Regional, Low-Caf
                // ** TODO: Verify this assumption - Do all these types use the SAME selling plan IDs? **
                const selectedPlanInfo = sellingPlanMapping[frequency];
                if (!selectedPlanInfo || !selectedPlanInfo.interval || !selectedPlanInfo.unit || !selectedPlanInfo.planId) {
                    alert(`Error: Could not find full subscription plan details (interval/unit/planId) for frequency: "${frequency}". Check sellingPlanMapping.`); return;
                }
                subscriptionInterval = selectedPlanInfo.interval;
                subscriptionUnit = selectedPlanInfo.unit;
                sellingPlanIdForProps = selectedPlanInfo.planId;
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
                'selling_plan': sellingPlanIdForProps
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
                // Optionally update UI or redirect: window.location.href = '/cart';
            } catch (error) { console.error("AJAX request failed:", error); alert("Could not add subscription to cart (network issue)."); }
        };
        // --- END ADD TO CART HANDLER ---


        // --- JSX for the summary layout ---
        contentToRender = (
            <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4">
                <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>

                {/* === CAROUSEL IMPLEMENTATION START === */}
                {imagesToShow.length > 0 ? (
                    <Carousel className="w-full max-w-xs mx-auto mb-6" opts={{ align: "start", loop: imagesToShow.length > 1 }}>
                        <CarouselContent>
                            {imagesToShow.map((imageUrl, index) => (
                                <CarouselItem key={`${type || edition}-${region || ''}-${index}-${index}`}> {/* Use edition if type missing */}
                                    <div className="p-1">
                                        <img
                                            src={imageUrl}
                                            alt={`${method} - ${type || edition}${region ? ' - ' + region : ''} image ${index + 1}`}
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
                        onClick={handleAddToCartClick}
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