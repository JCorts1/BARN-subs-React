// src/components/RightContainer.jsx
// Uses Shopify Permalink for checkout, opening in a new tab.
// Includes specific Selling Plan IDs and Variant IDs for various products including Office and Capsules.
// Adds slower fade transitions, updated summary sentence formatting, and price display with new prices.

import React, { useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './RightContainer.css'; // Your CSS file for RightContainer styles

import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";

// --- Data Constants ---
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
    "Office": [
        "https://cdn.shopify.com/s/files/1/1657/3941/files/volcan_azul_1kg.webp?v=1743027540",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/gigesa_EOM.jpg?v=1741274114",
        "https://cdn.shopify.com/s/files/1/0831/4141/products/espressoshotsCropped_60eb6865-fd62-43c7-90c5-2bc9050f167b.jpg?v=1741274114",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Gigesa_flowers.jpg?v=1741274114",
        "https://cdn.shopify.com/s/files/1/0831/4141/files/Gigesa_cherries_cafe_imports.jpg?v=1741274114",
        "https://cdn.shopify.com/s/files/1/0831/4141/products/IMG_53282_e3689e29-ef3c-4753-8295-e2dd695b8ddc.jpg?v=1741274114",

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
    "Capsules": {
        "Brazil": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/capsules_1.png?v=1695032905",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/Capsules.jpg?v=1629729054",
            "https://cdn.shopify.com/s/files/1/0831/4141/products/IMG_0695_00be90e4-4d21-44b9-9455-9976a2701503.jpg?v=1667996022",
            "https://cdn.shopify.com/s/files/1/0831/4141/products/IMG_0685_0b551a68-a4c6-4184-bf6d-97cfbd0b9c43.jpg?v=1667996022",
        ],
        "Ethiopia": [
             "https://cdn.shopify.com/s/files/1/0831/4141/products/94caa496-c974-436d-a877-91b5f1deee76_e692294a-dcda-4e46-97cf-cb22632a1acf.jpg?v=1667996022",
             "https://cdn.shopify.com/s/files/1/0831/4141/files/Capsules.jpg?v=1629729054",
             "https://cdn.shopify.com/s/files/1/0831/4141/products/IMG_0695_00be90e4-4d21-44b9-9455-9976a2701503.jpg?v=1667996022",
             "https://cdn.shopify.com/s/files/1/0831/4141/products/IMG_0685_0b551a68-a4c6-4184-bf6d-97cfbd0b9c43.jpg?v=1667996022",
        ],
        "_default": [
            "https://cdn.shopify.com/s/files/1/0831/4141/files/capsules_1.png?v=1695032905",
            "https://cdn.shopify.com/s/files/1/0831/4141/products/94caa496-c974-436d-a877-91b5f1deee76_e692294a-dcda-4e46-97cf-cb22632a1acf.jpg?v=1667996022",
            "https://cdn.shopify.com/s/files/1/0831/4141/files/Capsules.jpg?v=1629729054"
        ]
    },
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
        }
    }
};
const getVariantIdFromSelections = (method, type, region, sizeOption, edition, quantity) => {
  if (method === 'Capsules') {
      const qty = quantity ? parseInt(quantity) : 0;
      if (qty === 3) { // Only quantity 3 is addable for capsules.
          if (edition === 'Brazil') return 43660597690635;
          if (edition === 'Ethiopia') return 43660597756171;
      }
      console.warn(`Capsule Variant ID not found for Edition: ${edition}, Quantity: ${qty}`);
      return null;
  }
  if (type === 'Roasters Choice') {
      if (method === 'Filter') return 45910178332939; if (method === 'Espresso') return 45910178398475;
      console.warn("Roasters Choice invalid method:", method); return null;
  } if (type === 'Curated') {
      if (method === 'Filter') return 54897259151735; if (method === 'Espresso') return 54897259184503;
      console.warn("Curated invalid method:", method); return null;
  } if (type === 'Masterpiece') return 45969541562635;
  if (type === 'Office') {
      if (sizeOption === "1x 1kg") return 43658532192523;
      if (sizeOption === "2x 1kg") return 43658532258059;
      if (sizeOption === "3x 1kg" || sizeOption === "4x 1kg" || sizeOption === "5x 1kg") {
        console.warn(`Office Variant ID for ${sizeOption} is not explicitly defined. Using 1x 1kg variant ID as fallback.`);
        return 43658532192523;
      }
      console.warn("Office unsupported size for current Variant ID mapping:", sizeOption); return null;
  } if (type === 'Regional') {
      if (region === 'Center America') return 45972274381067; if (region === 'Ethiopia') return 45972211695883; if (region === 'Brazil') return 45969588617483;
      console.warn("Regional region not mapped:", region); return null;
  } if (type === 'Low-Caf') return 45972282409227;
  console.warn("Fallback: Variant ID lookup failed.", { method, type, region, sizeOption, edition, quantity }); return null;
};

const sellingPlanMapping = {
  "1 Week": { planId: 710364201335 }, "2 Weeks": { planId: 710364234103 }, "3 Weeks": { planId: 710364266871 },
  "4 Weeks (Recommended)": { planId: 710364299639 }, "4 Weeks": { planId: 710364299639 },
  "5 Weeks": { planId: 710364332407 }, "6 Weeks": { planId: 710364365175 },
};
const lowCafSellingPlanIds = {"2 Weeks": 710464045431, "4 Weeks (Recommended)": 710464143735, "4 Weeks": 710464143735, "6 Weeks": 710464110967 };
const MASTERPIECE_SELLING_PLAN_ID = 710364397943;
const regionalCenterAmericaSellingPlanIds = { "1 Week": 710364823927, "2 Weeks": 710364856695, "4 Weeks (Recommended)": 710364922231, "4 Weeks": 710364922231, "6 Weeks": 710364987767 };
const regionalEthiopiaSellingPlanIds = { "2 Weeks": 710364463479, "4 Weeks (Recommended)": 710364529015, "4 Weeks": 710364529015, "6 Weeks": 710364594551 };
const regionalBrazilSellingPlanIds = { "2 Weeks": 710364660087, "4 Weeks (Recommended)": 710364725623, "4 Weeks": 710364725623, "6 Weeks": 710364791159 };
const officeSellingPlanIds = { "2 Weeks": 710447038839, "4 Weeks": 710447104375, "4 Weeks (Recommended)": 710447104375 };
const capsuleSellingPlanIds = {
    "2 Weeks": 710706069879,
    "4 Weeks (Recommended)": 710706004343,
    "4 Weeks": 710706004343,
};
const SHOP_DOMAIN = "thebarn.de";

const getPriceForSelection = (method, type, region, edition, sizeOption, quantity, frequency) => {
    if (!method) return "";
    if (method !== 'Capsules' && !type) return "";
    if (method === 'Capsules' && !edition) return "";

    // 'quantity' prop is finalSelectionDetail from App.jsx (e.g., "3" for capsules)
    // 'qty' is its parsed integer value.
    if (method !== 'Capsules' && type !== 'Office' && !quantity) return "Select Quantity...";
    if (method === 'Capsules' && !quantity) return "Select Quantity..."; // Will always be "3" if selected
    if (type === 'Office' && !sizeOption) return "Select Size...";

    const qty = quantity ? parseInt(quantity) : 0;

    if (method === 'Capsules') {
        // Quantity is always "3" (3x10 pack) due to MiddleContainer update
        if (edition && quantity === "3") {
            if (edition === 'Brazil') {
                return "€27.50";
            } else if (edition === 'Ethiopia') {
                return "€30.00";
            }
        }
        // Fallback if edition not recognized or somehow quantity isn't "3"
        return "Select options for price";
    }

    if (type === 'Roasters Choice') {
        if (qty === 1) return "€14.00";
        if (qty === 2) return "€28.00";
        if (qty === 3) return "€42.00";
        if (qty === 4) return "€56.00";
        if (qty === 5) return "€70.00";
    } else if (type === 'Curated') {
        if (qty === 2) return "€27.50";
        if (qty === 4) return "€55.00";
        if (qty === 6) return "€82.50";
    } else if (type === 'Masterpiece') {
        if (qty === 1) return "€33.00";
        if (qty === 2) return "€66.00";
        if (qty === 3) return "€99.00";
    } else if (type === 'Low-Caf') {
        if (qty === 1) return "€15.50";
        if (qty === 2) return "€31.00";
        if (qty === 3) return "€46.50";
        if (qty === 4) return "€62.00";
        if (qty === 5) return "€77.50";
    } else if (type === 'Regional') {
        if (!region) return "Select Region...";

        if (region === 'Brazil') {
            if (qty === 1) return "€13.00";
            if (qty === 2) return "€26.00";
            if (qty === 3) return "€39.00";
            if (qty === 4) return "€52.00";
            if (qty === 5) return "€65.00";
        } else if (region === 'Ethiopia') {
            if (qty === 1) return "€14.00";
            if (qty === 2) return "€28.00";
            if (qty === 3) return "€42.00";
            if (qty === 4) return "€56.00";
            if (qty === 5) return "€70.00";
        } else if (region === 'Center America') {
            if (qty === 1) return "€15.00";
            if (qty === 2) return "€30.00";
            if (qty === 3) return "€45.00";
            if (qty === 4) return "€60.00";
            if (qty === 5) return "€75.00";
        }
    } else if (type === 'Office') {
        if (sizeOption === "1x 1kg") return "€39.00";
        if (sizeOption === "2x 1kg") return "€78.00";
        if (sizeOption === "3x 1kg") return "€117.00";
        if (sizeOption === "4x 1kg") return "€156.00";
        if (sizeOption === "5x 1kg") return "€195.00";
    }

    return "Select options for price";
};


const DefaultIntroContent = React.forwardRef((props, ref) => {
    const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883";
    return (
        <div ref={ref} className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
            <div className='mt-8'>
                <img src={defaultImageUrl} alt="The Barn Coffee Roasters Logo" style={{ width: '100%', maxWidth: '180px', height: 'auto', margin: '1rem 0' }} />
            </div>
            <div className='p-5 border border-[#A57C62] rounded-md mt-8 max-w-2xl'>
                <ul className="intro-list text-xl sm:text-2xl" style={{ listStyle: 'none', padding: 0 }}>
                    <li className="my-2">🌱 Sustainably sourced from top farms</li>
                    <li className="my-2">🔥 Expertly roasted in Berlin</li>
                    <li className="my-2">📦 Delivered fresh, right when you need it</li>
                    <li className="my-2">☕ Always rotating—always exceptional</li>
                </ul>
            </div>
        </div>
    );
});
DefaultIntroContent.displayName = 'DefaultIntroContent';

const SummaryDisplay = React.forwardRef(({
    method, type, region, edition, sizeOption, quantity, frequency, canAddToCartProp
}, ref) => {
    let imagesToShowInSummary = [];
    let currentDescriptionDataInSummary = null;

    if (method === 'Capsules') {
        imagesToShowInSummary = carouselImageData.Capsules?.[edition] || carouselImageData.Capsules?._default || carouselImageData._fallback || [];
        currentDescriptionDataInSummary = subscriptionDescriptions.Capsules?.[edition] || subscriptionDescriptions.Capsules?._default || null;
    } else if (type === 'Regional') {
        imagesToShowInSummary = carouselImageData.Regional?.[region] || carouselImageData.Regional?._default || carouselImageData._fallback || [];
        currentDescriptionDataInSummary = subscriptionDescriptions.Regional?.[region] || subscriptionDescriptions.Regional?._default || null;
    } else if (type) {
        imagesToShowInSummary = carouselImageData[type] || carouselImageData._fallback || [];
        currentDescriptionDataInSummary = subscriptionDescriptions[type] || null;
    } else {
        imagesToShowInSummary = carouselImageData._fallback || [];
        currentDescriptionDataInSummary = null;
    }
    if (!Array.isArray(imagesToShowInSummary) || imagesToShowInSummary.length === 0) {
         imagesToShowInSummary = carouselImageData._fallback || [];
    }


    const highlightClass = "text-[#A67C52] font-semibold";
    const sentenceParts = [];
    sentenceParts.push('Your selection: ');
    sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);
    if (method === 'Capsules') {
        if (edition) { sentenceParts.push(' - Taste: '); sentenceParts.push(<span key="edition" className={highlightClass}>{edition}</span>); }
        else { sentenceParts.push(' (select taste profile)'); }
    } else {
        if (type) {
            sentenceParts.push(' - '); sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);
            if (type === 'Regional') {
                if (region) { sentenceParts.push(' - '); sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>); }
                else { sentenceParts.push(' (select region)'); }
            }
        } else { sentenceParts.push(' (select type)'); }
    }
    sentenceParts.push(' subscription');
    if (quantity || sizeOption) {
        sentenceParts.push(' - Quantity: ');
        if (type === 'Office') {
            sentenceParts.push(<span key="qty-val" className={highlightClass}>{sizeOption}</span>);
        } else {
            const qtyValue = parseInt(quantity); // quantity is finalSelectionDetail (e.g. "3" for capsules)
            if (method === 'Capsules') {
                 // Label will be "3x 10 capsules" as it's the only option
                 sentenceParts.push(<span key="qty-val" className={highlightClass}>3x 10 capsules</span>);
            } else if (type === 'Curated') {
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue}x 250g`}</span>);
            } else if (type === 'Masterpiece') {
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue} bag${qtyValue > 1 ? 's' : ''}`}</span>);
            } else { 
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue} bag${qtyValue > 1 ? 's' : ''} of 250g each`}</span>);
            }
        }
    } else { sentenceParts.push(type === 'Office' ? ' (select size)' : ' (select quantity)'); }

    if (frequency) {
        sentenceParts.push(', delivered every ');
        const displayFrequency = frequency.replace(' (Recommended)', '');
        sentenceParts.push(<span key="freq" className={highlightClass}>{displayFrequency}</span>);
    } else { sentenceParts.push(' (select frequency)'); }
    sentenceParts.push('.');

    const handleAddToCartClick = () => {
        if (!canAddToCartProp) { alert("Please complete selections or note that this specific option may be coming soon."); return; }
        const variantId = getVariantIdFromSelections(method, type, region, sizeOption, edition, quantity);

        if (!variantId) {
            alert("Error: Product variant not found for the current selection. It might be coming soon or an issue with the configuration.");
            console.error("Add to Cart blocked: Variant ID is null.", { method, type, region, sizeOption, edition, quantity });
            return;
        }

        let quantityForLink;
        const parsedQuantityFromProp = parseInt(quantity, 10);

        if (type === 'Office') {
            quantityForLink = 1; 
        } else if (type === 'Curated') {
            if (parsedQuantityFromProp === 2) quantityForLink = 1;
            else if (parsedQuantityFromProp === 4) quantityForLink = 2;
            else if (parsedQuantityFromProp === 6) quantityForLink = 3;
            else quantityForLink = parsedQuantityFromProp;
        } else if (method === 'Capsules') {
            // For capsules, variant ID represents the 3x10 pack. So quantityForLink is 1.
            // This assumes `quantity` prop is "3".
            if (parsedQuantityFromProp === 3) {
                quantityForLink = 1;
            } else {
                alert("Selected capsule quantity is not available for purchase at this time.");
                return;
            }
        }
         else {
            quantityForLink = parsedQuantityFromProp;
        }

        if (isNaN(quantityForLink) || quantityForLink < 1) {
             alert("Error: Invalid quantity for cart link. Please check selections.");
             console.error("Invalid quantityForLink:", quantityForLink, {method, type, quantity, sizeOption});
             return;
        }

        let sellingPlanIdToUse;
        if (method === 'Capsules') {
            sellingPlanIdToUse = capsuleSellingPlanIds[frequency];
        } else if (type === 'Office') sellingPlanIdToUse = officeSellingPlanIds[frequency];
        else if (type === 'Low-Caf') sellingPlanIdToUse = lowCafSellingPlanIds[frequency];
        else if (type === 'Masterpiece') {
            sellingPlanIdToUse = MASTERPIECE_SELLING_PLAN_ID;
            if (frequency !== "4 Weeks (Recommended)" && frequency !== "4 Weeks") console.warn("Masterpiece frequency note: Standard Masterpiece plan ID used, though frequency is not 4 weeks. Ensure this is intended.");
        } else if (type === 'Regional' && region === 'Center America') sellingPlanIdToUse = regionalCenterAmericaSellingPlanIds[frequency];
        else if (type === 'Regional' && region === 'Ethiopia') sellingPlanIdToUse = regionalEthiopiaSellingPlanIds[frequency];
        else if (type === 'Regional' && region === 'Brazil') sellingPlanIdToUse = regionalBrazilSellingPlanIds[frequency];
        else { 
            const selectedPlanInfo = sellingPlanMapping[frequency];
            if (selectedPlanInfo) sellingPlanIdToUse = selectedPlanInfo.planId;
        }

        if (!sellingPlanIdToUse) {
            const selectionName = method === 'Capsules' ? `Capsules (${edition || 'N/A'})` : `${type} (${region || 'N/A'})`;
            alert(`Error: Subscription plan details for frequency "${frequency}" are not available for ${selectionName.trim()}.`);
            return;
        }

        const cartAddParams = new URLSearchParams();
        cartAddParams.append("items[][id]", variantId.toString());
        cartAddParams.append("items[][quantity]", quantityForLink.toString());
        cartAddParams.append("items[][selling_plan]", sellingPlanIdToUse.toString());
        cartAddParams.append("return_to", "/checkout");

        const permalinkUrl = `https://${SHOP_DOMAIN}/cart/clear?return_to=${encodeURIComponent(`/cart/add?${cartAddParams.toString()}`)}`;
        const newTab = window.open(permalinkUrl, '_blank');
        if (newTab) newTab.focus(); else alert("Popup blocker may have prevented opening the cart. Please disable it and try again.");
    };

    const animationText = type === 'Masterpiece' && method !== 'Capsules' ? "We roast this subscription only on the first Tuesday every month" : "You can adjust your quantity any time!";
    const calculatedPrice = getPriceForSelection(method, type, region, edition, sizeOption, quantity, frequency);

    // Updated to handle "Coming soon" which might be returned by getPriceForSelection, though less likely now for capsules.
    const shouldShowPrice = calculatedPrice &&
                           calculatedPrice !== "Select options for price" &&
                           calculatedPrice !== "Select Quantity..." &&
                           calculatedPrice !== "Select Size..." &&
                           calculatedPrice !== "Select Region..." &&
                           calculatedPrice !== "Price on selection" && // Kept for other potential uses
                           calculatedPrice !== "Coming soon";


    return (
        <div ref={ref} className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4">
            <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>
            {imagesToShowInSummary.length > 0 ? (
                 <Carousel className="w-full max-w-lg mx-auto mb-6" opts={{ align: "start", loop: imagesToShowInSummary.length > 1 }}>
                    <CarouselContent>
                        {imagesToShowInSummary.map((imageUrl, index) => (
                            <CarouselItem key={`${method}-${type || edition}-${region || ''}-${index}-${quantity || sizeOption}`}>
                                <div className="p-1">
                                    <img src={imageUrl} alt={`${method}${type ? ' - '+type : ''}${edition ? ' - Taste: '+edition : ''}${region ? ' - '+region : ''} image ${index + 1}`}
                                        className="w-full h-auto aspect-square object-cover rounded-md block" loading="lazy" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {imagesToShowInSummary.length > 1 && (<>
                        <CarouselPrevious className="absolute left-[-25px] sm:left-[-40px] top-1/2 -translate-y-1/2 text-[#A67C52] bg-[#1a1a1a]/80 hover:bg-[#3a3c3d] border-none" />
                        <CarouselNext className="absolute right-[-25px] sm:right-[-40px] top-1/2 -translate-y-1/2 text-[#A67C52] bg-[#1a1a1a]/80 hover:bg-[#3a3c3d] border-none" />
                    </>)}
                </Carousel>
            ) : ( <div className="w-full max-w-xs h-[250px] bg-[#3a3c3d]/50 flex items-center justify-center rounded-md mb-6 border border-[#A67C52]/30"><p className="text-gray-400">Image Coming Soon</p></div>)}
            {currentDescriptionDataInSummary && currentDescriptionDataInSummary.description && (
                <div className="subscription-description text-white my-4 text-left w-full max-w-5xl flex justify-center flex-col">
                    <div className="bg-[#3a3c3d] p-4 rounded-md border border-[#A67C52] text-base sm:text-lg w-full">
                        <p className="mb-3">{currentDescriptionDataInSummary.description}</p>
                        {currentDescriptionDataInSummary.currentOffering && (<p className="whitespace-pre-wrap text-sm sm:text-base">{currentDescriptionDataInSummary.currentOffering}</p>)}
                    </div>
                    <div> <h1 className='words-animation'>{animationText}</h1> </div>
                </div>
            )}
            <p className="summary-sentence text-base sm:text-lg leading-relaxed my-4 w-full max-w-5xl min-h-[3em]">
                {sentenceParts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>)}
            </p>
            <div className="cart-actions-container mt-auto pt-4 w-full max-w-5xl flex flex-col items-center sm:flex-row sm:justify-end sm:items-center">
                <div className="price-and-button-group flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-x-4">
                    <div className="price-display text-white text-2xl font-bold min-h-[1em]">
                        {shouldShowPrice ? (
                            <span>{calculatedPrice}</span>
                        ) : (
                            calculatedPrice && <span className="text-sm text-gray-400">{calculatedPrice}</span>
                        )}
                    </div>
                    <button
                        className={`bg-[#A67C52] py-3 px-18 rounded-md border-[1.5px] border-transparent hover:border-[#3a3c3d] transition-all duration-300 ease-in-out transform text-white font-semibold text-base sm:text-md disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:active:scale-95 w-full mt-2 sm:mt-0 sm:w-auto`}
                        disabled={!canAddToCartProp}
                        onClick={handleAddToCartClick} >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
});
SummaryDisplay.displayName = 'SummaryDisplay';

const RightContainer = ({ method, type, region, edition, sizeOption, quantity, frequency }) => {
    const showSummaryLayout = method && (type || edition);
    const introRef = useRef(null);
    const summaryRef = useRef(null);

    const canAddToCart = method && frequency && (
        // For Capsules, only quantity "3" is addable (as per MiddleContainer only offering "3")
        (method === 'Capsules' && edition && quantity === "3") ||
        (type === 'Office' && sizeOption) ||
        (type === 'Regional' && region && quantity) ||
        (['Roasters Choice', 'Masterpiece', 'Low-Caf', 'Curated'].includes(type) && quantity)
    );

    return (
        <div className={`right-container flex justify-center w-full min-h-screen bg-[#1a1a1a] ${!showSummaryLayout ? 'items-center' : 'items-start pt-8 pb-8'}`}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={showSummaryLayout ? "summary" : "intro"}
                    nodeRef={showSummaryLayout ? summaryRef : introRef}
                    timeout={1000}
                    classNames="fade-content"
                    unmountOnExit >
                    {showSummaryLayout ? (
                        <SummaryDisplay ref={summaryRef} method={method} type={type} region={region} edition={edition} sizeOption={sizeOption} quantity={quantity} frequency={frequency} canAddToCartProp={canAddToCart} />
                    ) : (
                        <DefaultIntroContent ref={introRef} />
                    )}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};
export default RightContainer;