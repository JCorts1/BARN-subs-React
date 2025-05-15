// src/components/RightContainer.jsx
// Uses Shopify Permalink for checkout, opening in a new tab.
// Includes specific Selling Plan IDs and Variant IDs for various products including Office.

import React from 'react';
import './RightContainer.css'; // Your CSS file for RightContainer styles

import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";

// --- Image Data for Carousel ---
const carouselImageData = {
    "Roasters Choice": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Curated_Subscription_Coffee_FIL_March_2025.jpg?v=1745957301",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/330B7ED3-F6D7-452A-80C1-F377D55D8FA6-2950-000002F30AF09FBC.jpg?v=1745591524",
    ],
    "Curated": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Curated_Subscription_Coffee_FIL_March_2025.jpg?v=1745957301",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/330B7ED3-F6D7-452A-80C1-F377D55D8FA6-2950-000002F30AF09FBC.jpg?v=1745591524",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
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
    "Office": [ // Assuming generic Office images for now
        "https://cdn.shopify.com/s/files/1/1657/3941/files/volcan_azul_1kg.webp?v=1743027540",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/HANNES_1kg_BAG.png?v=1706179901",
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
    "Capsules": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/capsules_1.png?v=1695032905",
        "https://cdn.shopify.com/s/files/1/0831/4141/products/94caa496-c974-436d-a877-91b5f1deee76_e692294a-dcda-4e46-97cf-cb22632a1acf.jpg?v=1667996022",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Capsules.jpg?v=1629729054"
    ],
     "_fallback": [
        "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883"
     ]
};

const subscriptionDescriptions = {
    "Roasters Choice": { description: "Our most popular Subscription. Seasonal coffee curated every month. The perfect way to explore stunning Single Origin flavour.", currentOffering: "Current Offering:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral." },
    "Curated": { description: "Perfect for sharing or enjoying variety. Every month our Roasters select two exceptional 250g bags of different single origin coffees, roasted for Filter or Espresso.", currentOffering: "Current Pairings:\n\nPairing details coming soon!" },
    "Masterpiece": { description: "The rarest coffees on the planet: a showcase of innovation and extraordinary flavour. Scoring 90 points and up. Omni Roast.", currentOffering: "Current Offering:\n\nFinca Sophia Natural Gesha, Panama 🇵🇦" },
    "Low-Caf": { description: "Our answer to decaf, without no compromise on flavour: unique coffees featuring naturally low levels of caffeine.", currentOffering: "Current Offering:\n\nDaterra Reserve from Brazil 🇧🇷" },
    "Office": { description: "For offices or households that love their espresso, with a little more volume each month. The coffee selection changes every month, allowing you to explore different regions and flavour!", currentOffering: "Current Offering:\n\nOur signature Office Espresso Blend." },
    "Regional": {
        "Brazil": { description: "People love Brazilian Coffees for their sweetness, depth, and low acidity.", currentOffering: "Current Offering:\n\n🇧🇷 Elemental, Brazil: Milk Chocolate. Macadamia. Smooth." },
        "Ethiopia": { description: "People love Ethiopian Coffees for their fruity sweetness and floral notes.", currentOffering: "Current Offering:\n\n🇪🇹 Chelbesa, Ethiopia: Peach. Fudge. Jasmine." },
        "Center America": { description: "People love Central American Coffees for their exciting diversity and complex flavour.", currentOffering: "Current Offering:\n\n🇨🇷 Volcan Azul, Costa Rica: Dried Fig. Vanilla." },
        _default: { description: "Select a region to see details about the specific coffee offering for this type.", currentOffering: "" }
    },
    "Capsules": {
        _default: {
            description: "Select a taste profile to continue.",
            currentOffering: "Receive our Sustainable Capsules on repeat."
        },
        "Brazil": {
            description: "Bold and chocolatey with low acidity. A smooth and comforting cup, every time.",
            currentOffering: "🇧🇷 Sweet flavours and pronounced chocolate notes with Single Origin Coffee from the experts at FAF Brazil."
        },
        "Ethiopia": {
            description: "Bright, fruity and floral. An elegant expression of Ethiopian terroir in capsule form. ",
            currentOffering: "🇪🇹 Take a trip to the birthplace of coffee with typical floral notes and sweet apricots. "
        },
        "Masterpiece": {
            description: "The pinnacle of capsule coffee: rare, high-scoring lots from the world’s top farms.",
            currentOffering: ""
        }
    }
};

// Function to get Variant ID based on selections
const getVariantIdFromSelections = (method, type, region, sizeOption, edition, quantity) => {
  console.log("Looking up Variant ID for Permalink:", { method, type, region, sizeOption, edition, quantity });

  if (method === 'Capsules') {
      console.error("Capsule variant ID lookup not fully implemented for permalinks.");
      return null;
  } else if (type === 'Roasters Choice') {
      if (method === 'Filter') return 45910178332939;
      if (method === 'Espresso') return 45910178398475;
      console.warn("Roasters Choice selected but method is invalid:", method);
      return null;
  } else if (type === 'Curated') {
      if (method === 'Filter') return 54897259151735;
      if (method === 'Espresso') return 54897259184503;
      console.warn("Curated subscription selected but method is invalid:", method);
      return null;
  } else if (type === 'Masterpiece') {
      return 45969541562635;
  } else if (type === 'Office') {
      if (sizeOption === "1x 1kg") return 43658532192523;
      if (sizeOption === "2x 1kg") return 43658532258059;
      console.warn(`Office subscription selected with unsupported size: ${sizeOption}. Currently only 1x 1kg and 2x 1kg are mapped.`);
      return null;
  } else if (type === 'Regional') {
      if (region === 'Center America') return 45972274381067;
      if (region === 'Ethiopia') return 45972211695883;
      if (region === 'Brazil') return 45969588617483;
      console.warn(`Regional variant ID lookup not implemented for region: ${region}`);
      return null;
  } else if (type === 'Low-Caf') {
      return 45972282409227;
  }

  console.warn(`Variant ID lookup fallback: M=${method},T=${type},R=${region},S=${sizeOption},E=${edition},Q=${quantity}`);
  return null;
};

// General selling plan mapping
const sellingPlanMapping = {
  "1 Week":                  { planId: 710364201335, interval: 1, unit: 'Weeks' },
  "2 Weeks":                 { planId: 710364234103, interval: 2, unit: 'Weeks' },
  "3 Weeks":                 { planId: 710364266871, interval: 3, unit: 'Weeks' },
  "4 Weeks (Recommended)": { planId: 710364299639, interval: 4, unit: 'Weeks' },
  "4 Weeks":                 { planId: 710364299639, interval: 4, unit: 'Weeks' }, // Alias for "4 Weeks"
  "5 Weeks":                 { planId: 710364332407, interval: 5, unit: 'Weeks' },
  "6 Weeks":                 { planId: 710364365175, interval: 6, unit: 'Weeks' },
};

// Specific Selling Plan IDs
const lowCafSellingPlanIds = {
    "2 Weeks": 710464045431,
    "4 Weeks (Recommended)": 710464143735,
    "4 Weeks": 710464143735, // Alias
    "6 Weeks": 710464110967,
};

const MASTERPIECE_SELLING_PLAN_ID = 710364397943; // Typically for 4 Weeks

const regionalCenterAmericaSellingPlanIds = {
    "1 Week": 710364823927,
    "2 Weeks": 710364856695,
    "4 Weeks (Recommended)": 710364922231,
    "4 Weeks": 710364922231, // Alias
    "6 Weeks": 710364987767,
};

const regionalEthiopiaSellingPlanIds = {
    "2 Weeks": 710364463479,
    "4 Weeks (Recommended)": 710364529015,
    "4 Weeks": 710364529015, // Alias
    "6 Weeks": 710364594551,
};

const regionalBrazilSellingPlanIds = {
    "2 Weeks": 710364660087,
    "4 Weeks (Recommended)": 710364725623,
    "4 Weeks": 710364725623, // Alias
    "6 Weeks": 710364791159,
};

// Specific Selling Plan IDs for Office
const officeSellingPlanIds = {
    "2 Weeks": 710447038839,
    "4 Weeks": 710447104375,
    "4 Weeks (Recommended)": 710447104375, // Ensure this covers the prop value if it includes "(Recommended)"
};


const RightContainer = ({ method, type, region, edition, sizeOption, quantity, frequency }) => {

    const SHOP_DOMAIN = "thebarn.de";

    const DefaultIntroContent = () => {
        const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883";
        return (
            <div className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
                <div className='mt-8'>
                    <img src={defaultImageUrl} alt="The Barn Coffee Roasters Logo" style={{ width: '100%', maxWidth: '180px', height: 'auto', margin: '1rem 0' }} />
                </div>
                <div className='p-5 border border-[#A57C62] rounded-md mt-8 w-full max-w-5xl'>
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

    const showSummaryLayout = method && (type || edition);
    const canAddToCart = method && quantity && frequency &&
        (
          (method === 'Capsules' && edition) ||
          (method !== 'Capsules' && type &&
            ( (type === 'Office' && sizeOption) || // For Office, quantity prop still needs to be valid for this check
              (type === 'Regional' && region) ||
              (['Roasters Choice', 'Masterpiece', 'Low-Caf', 'Curated'].includes(type))
            )
          )
        );

    let contentToRender;
    let imagesToShow = [];
    let currentDescriptionData = null;

    if (showSummaryLayout) {
        if (method === 'Capsules') {
            imagesToShow = carouselImageData.Capsules || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions.Capsules?.[edition] || subscriptionDescriptions.Capsules?._default || null;
        } else if (type === 'Regional') {
            imagesToShow = carouselImageData.Regional?.[region] || carouselImageData.Regional?._default || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions.Regional?.[region] || subscriptionDescriptions.Regional?._default || null;
        } else { // Includes Office here for images/description
            imagesToShow = carouselImageData[type] || carouselImageData._fallback || [];
            currentDescriptionData = subscriptionDescriptions[type] || null;
        }
        if (!Array.isArray(imagesToShow)) { imagesToShow = carouselImageData._fallback || []; }

        const highlightClass = "text-[#A67C52] font-semibold";
        const sentenceParts = [];
        sentenceParts.push('Your selection: ');
        sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);

        if (method === 'Capsules') {
            if (edition) {
                sentenceParts.push(' - Taste: ');
                sentenceParts.push(<span key="edition" className={highlightClass}>{edition}</span>);
            } else { sentenceParts.push(' (select taste profile)'); }
        } else { // Not Capsules
            if (type) {
                sentenceParts.push(' - ');
                sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);
                if (type === 'Regional') {
                    if (region) { sentenceParts.push(' - '); sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>); }
                    else { sentenceParts.push(' (select region)'); }
                }
            } else {
                 sentenceParts.push(' (select type)');
            }
        }
        sentenceParts.push(' subscription');

        if (quantity) { // quantity prop is still relevant for display and for canAddToCart
            sentenceParts.push(' - Qty: ');
            const qtyValue = parseInt(quantity); // Actual number of bags for Curated (2,4,6), direct count for others.

            if (type === 'Office') {
                // For Office, sizeOption (e.g., "1x 1kg") is the primary quantity indicator shown.
                // The 'quantity' prop might be '1' by default from the parent if not specifically varied for Office.
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{sizeOption}</span>);
            } else if (method === 'Capsules') {
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue}x 10 capsules`}</span>);
            } else if (type === 'Curated') {
                // Display the actual number of bags based on the qtyValue (e.g., 2, 4, or 6)
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue}x 250g`}</span>);
            } else if (type === 'Masterpiece') {
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue} bag${qtyValue > 1 ? 's' : ''}`}</span>);
            } else { // For Roasters Choice, Low-Caf, Regional
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{qtyValue}</span>);
                sentenceParts.push(` x 250g`);
            }
        } else { // Fallback if quantity prop is missing
            sentenceParts.push(type === 'Office' ? ' (select size)' : ' (select quantity)');
        }


        if (frequency) {
            sentenceParts.push(', delivered every ');
            const displayFrequency = frequency.replace(' (Recommended)', '');
            sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>);
         } else {
            sentenceParts.push(' (select frequency)');
        }
        sentenceParts.push('.');

        const handleAddToCartClick = () => {
            console.log("Attempting to generate Permalink for State:", { method, type, region, edition, sizeOption, quantity, frequency });

            if (!canAddToCart) {
                alert("Please complete your subscription selections to proceed.");
                console.warn("Permalink generation blocked by canAddToCart check.");
                return;
            }

            const variantId = getVariantIdFromSelections(method, type, region, sizeOption, edition, quantity);

            if (!variantId) {
                alert("Error: Product variant could not be determined for your selection. Please ensure all options are selected or check configuration (ensure Variant IDs are mapped).");
                console.error("Permalink Error: Missing Variant ID for selections:", { method, type, region, edition, sizeOption, quantity });
                return;
            }

            let quantityForLink;
            const parsedQuantityFromProp = parseInt(quantity, 10);

            if (type === 'Office') {
                // For Office, we select a specific variant (e.g., "1x 1kg" or "2x 1kg") and add 1 unit of that variant.
                quantityForLink = 1;
            } else if (type === 'Curated') {
                // 'quantity' prop from parent is actual bag count (2, 4, or 6)
                // Map this to permalink tier (1, 2, or 3)
                if (parsedQuantityFromProp === 2) { // 2x 250g
                    quantityForLink = 1;
                } else if (parsedQuantityFromProp === 4) { // 4x 250g
                    quantityForLink = 2;
                } else if (parsedQuantityFromProp === 6) { // 6x 250g
                    quantityForLink = 3;
                } else {
                    console.error(`Unexpected quantity value for Curated subscription: ${quantity}. Using raw value for permalink.`);
                    quantityForLink = parsedQuantityFromProp; // Fallback, though this case should be avoided
                }
            } else {
                // For other types (Roasters Choice, Low-Caf, Masterpiece, Regional etc.)
                quantityForLink = parsedQuantityFromProp;
            }

            if (isNaN(quantityForLink) || quantityForLink < 1) {
                alert("Error: Invalid or missing quantity for the selected product.");
                console.error("Permalink Error: Invalid quantityForLink:", quantityForLink, "from quantity prop:", quantity, "parsed as:", parsedQuantityFromProp);
                return;
            }

            let sellingPlanId;
            if (type === 'Office') {
                sellingPlanId = officeSellingPlanIds[frequency];
            } else if (type === 'Low-Caf') {
                sellingPlanId = lowCafSellingPlanIds[frequency];
            } else if (type === 'Masterpiece') {
                // Masterpiece uses a single selling plan ID, typically tied to 4 weeks
                // The frequency selection might be for user info but permalink uses the fixed plan
                sellingPlanId = MASTERPIECE_SELLING_PLAN_ID;
                 if (frequency !== "4 Weeks (Recommended)" && frequency !== "4 Weeks") {
                    console.warn(`Masterpiece selected with frequency "${frequency}", but permalink will use the dedicated Masterpiece selling plan ID (${MASTERPIECE_SELLING_PLAN_ID}) typically for a 4-week cycle.`);
                }
            } else if (type === 'Regional' && region === 'Center America') {
                sellingPlanId = regionalCenterAmericaSellingPlanIds[frequency];
            } else if (type === 'Regional' && region === 'Ethiopia') {
                sellingPlanId = regionalEthiopiaSellingPlanIds[frequency];
            } else if (type === 'Regional' && region === 'Brazil') {
                sellingPlanId = regionalBrazilSellingPlanIds[frequency];
            } else {
                // For other types (e.g., Roasters Choice, Curated) use the generic mapping
                const selectedPlanInfo = sellingPlanMapping[frequency];
                if (selectedPlanInfo && selectedPlanInfo.planId) {
                    sellingPlanId = selectedPlanInfo.planId;
                }
            }

            // Fallback for types with specific mappings if frequency doesn't match a specific plan ID
            // This check should ideally only be for types that *might* use generic plans as a fallback.
            // For Office, Low-Caf, Regional, if !sellingPlanId, it means the frequency is not supported.
            const typesWithSpecificPlans = ['Office', 'Low-Caf', 'Regional'];
            if (typesWithSpecificPlans.includes(type) && !sellingPlanId) {
                 // Attempt generic fallback only if explicitly desired, otherwise it's an unsupported frequency
                console.error(`Permalink Error: ${type} ${region || ''} specific selling plan ID not found for frequency "${frequency}". This frequency may not be supported.`);
                alert(`Error: The selected frequency "${frequency}" is not available for ${type} ${region || ''}.`);
                return;
            }


            if (!sellingPlanId) {
                alert(`Error: Subscription plan details not found for the selected frequency: "${frequency}" and type: "${type}".`);
                console.error("Permalink Error: Missing selling plan ID for frequency:", frequency, "type:", type);
                return;
            }

            const cartAddParams = new URLSearchParams();
            cartAddParams.append("items[][id]", variantId.toString());
            cartAddParams.append("items[][quantity]", quantityForLink.toString());
            cartAddParams.append("items[][selling_plan]", sellingPlanId.toString());
            cartAddParams.append("return_to", "/checkout");

            const permalinkUrl = `https://${SHOP_DOMAIN}/cart/clear?return_to=${encodeURIComponent(`/cart/add?${cartAddParams.toString()}`)}`;

            console.log("Opening Permalink in new tab:", permalinkUrl);
            const newTab = window.open(permalinkUrl, '_blank');
            if (newTab) {
                newTab.focus();
            } else {
                alert("Your browser may have blocked the new tab. Please check your pop-up blocker settings.");
            }
        };

        const animationText = type === 'Masterpiece'
            ? "We roast this subscription only on the first Tuesday every month"
            : "You can adjust your quantity any time!";

        contentToRender = (
            <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4">
                <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>
                {imagesToShow.length > 0 ? (
                     <Carousel className="w-full max-w-lg mx-auto mb-6" opts={{ align: "start", loop: imagesToShow.length > 1 }}>
                        <CarouselContent>
                            {imagesToShow.map((imageUrl, index) => (
                                <CarouselItem key={`${method}-${type || edition}-${region || ''}-${index}-${quantity}`}>
                                    <div className="p-1">
                                        <img
                                            src={imageUrl}
                                            alt={`${method}${type ? ' - '+type : ''}${edition ? ' - Taste: '+edition : ''}${region ? ' - '+region : ''} image ${index + 1}`}
                                            className="w-full h-auto aspect-square object-cover rounded-md block"
                                            loading="lazy"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {imagesToShow.length > 1 && (<>
                            <CarouselPrevious className="absolute left-[-25px] sm:left-[-40px] top-1/2 -translate-y-1/2 text-[#A67C52] bg-[#1a1a1a]/80 hover:bg-[#3a3c3d] border-none" />
                            <CarouselNext className="absolute right-[-25px] sm:right-[-40px] top-1/2 -translate-y-1/2 text-[#A67C52] bg-[#1a1a1a]/80 hover:bg-[#3a3c3d] border-none" />
                        </>)}
                    </Carousel>
                ) : (
                     <div className="w-full max-w-xs h-[250px] bg-[#3a3c3d]/50 flex items-center justify-center rounded-md mb-6 border border-[#A67C52]/30">
                         <p className="text-gray-400">Image Coming Soon</p>
                     </div>
                 )}
                {currentDescriptionData && currentDescriptionData.description && (
                    <div className="subscription-description text-white my-4 text-left w-full max-w-5xl flex justify-center flex-col">
                        <div className="bg-[#3a3c3d] p-4 rounded-md border border-[#A67C52] text-base sm:text-lg w-full">
                            <p className="mb-3">{currentDescriptionData.description}</p>
                            {currentDescriptionData.currentOffering && (
                                <p className="whitespace-pre-wrap text-sm sm:text-base">
                                    {currentDescriptionData.currentOffering}
                                </p>
                            )}
                        </div>
                        <div> <h1 className='words-animation'>{animationText}</h1> </div>
                    </div>
                )}
                <p className="summary-sentence text-base sm:text-lg leading-relaxed my-4 w-full max-w-5xl min-h-[3em]">
                    {sentenceParts}
                </p>
                <div className="cart-btn mt-auto pt-4 w-full max-w-5xl flex justify-center sm:justify-end">
                     <button
                        className={`bg-[#A67C52] py-2 px-5 rounded-md border-[1.5px] border-transparent hover:border-[#3a3c3d] transition-all duration-300 ease-in-out transform text-white font-semibold text-base sm:text-md disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:active:scale-95`}
                        disabled={!canAddToCart}
                        onClick={handleAddToCartClick} >
                        ADD TO CART
                    </button>
                </div>
            </div>
        );
    } else {
        contentToRender = <DefaultIntroContent />;
    }

    return (
        <div className="right-container pt-10 pb-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]">
            {contentToRender}
        </div>
    );
};

export default RightContainer;