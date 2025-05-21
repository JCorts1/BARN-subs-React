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
const getVariantIdFromSelections = (method, type, region, sizeOption, edition, quantity) => {
  if (method === 'Capsules') { console.error("Capsule ID lookup not implemented."); return null; }
  if (type === 'Roasters Choice') {
      if (method === 'Filter') return 45910178332939; if (method === 'Espresso') return 45910178398475;
      console.warn("Roasters Choice invalid method:", method); return null;
  } if (type === 'Curated') {
      if (method === 'Filter') return 54897259151735; if (method === 'Espresso') return 54897259184503; // Assuming Espresso Curated uses this if available
      console.warn("Curated invalid method:", method); return null;
  } if (type === 'Masterpiece') return 45969541562635;
  if (type === 'Office') {
      // Assuming variant IDs are specific to the sizeOption, not just a base product ID with quantity.
      // These might need to be distinct variant IDs for 1kg, 2kg etc. if they are separate SKUs in Shopify.
      // The existing logic only has two variant IDs for office, corresponding to 1x1kg and 2x1kg based on original code.
      // If 3x, 4x, 5x 1kg options have *different* variant IDs, this needs expansion.
      // For now, using the existing variant IDs for the sizes they were mapped to.
      if (sizeOption === "1x 1kg") return 43658532192523;
      if (sizeOption === "2x 1kg") return 43658532258059;
      // Add more variant IDs if other office sizes have unique ones:
      // if (sizeOption === "3x 1kg") return YOUR_VARIANT_ID_FOR_3KG;
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
const SHOP_DOMAIN = "thebarn.de";

const getPriceForSelection = (method, type, region, edition, sizeOption, quantity, frequency) => {
    // Initial check: if critical top-level selections are missing, return empty.
    if (!method) return "";
    if (method !== 'Capsules' && !type) return "";
    if (method === 'Capsules' && !edition) return "";

    // For Office type, sizeOption is the primary price determinant.
    // For other types that require quantity, if quantity is missing, we can't determine price.
    if (method !== 'Capsules' && type !== 'Office' && !quantity) return "Select Quantity...";
    if (method === 'Capsules' && !quantity) return "Select Quantity...";
    if (type === 'Office' && !sizeOption) return "Select Size...";

    const qty = quantity ? parseInt(quantity) : 0; // 'quantity' here is the finalSelectionDetail from props

    if (method === 'Capsules') {
        // Specific capsule pricing based on edition and qty would go here
        // e.g., if (edition === 'Brazil' && qty === 3) return "€20.00";
        return "Price on selection"; // Fallback as per original, assuming prices are more complex or TBD
    }

    if (type === 'Roasters Choice') { // Applies to Filter or Espresso
        if (qty === 1) return "€14.00";
        if (qty === 2) return "€28.00";
        if (qty === 3) return "€42.00";
        if (qty === 4) return "€56.00";
        if (qty === 5) return "€70.00";
    } else if (type === 'Curated') { // User specified "Filter Curated". Assume Espresso Curated, if exists, has same pricing.
                                   // `quantity` prop values are "2", "4", "6" from curatedQuantityOptions
        if (qty === 2) return "€27.50"; // For "2x 250g" (original price, not explicitly changed by user for this qty)
        if (qty === 4) return "€55.00";
        if (qty === 6) return "€82.50"; // For "6x 250g" (new price from user)
        // Price for qty "6" ("6x 250g") not provided by user. Falls through to "Select options for price".
    } else if (type === 'Masterpiece') { // Omni roast
                                        // `quantity` prop values are "1", "2", "3" from masterpieceQuantityOptions
        if (qty === 1) return "€33.00"; // For "1 bag"
        if (qty === 2) return "€66.00"; // For "2 bags"
        if (qty === 3) return "€99.00"; // For "3 bags"
    } else if (type === 'Low-Caf') { // User specified "Filter low-caf". Assume Espresso Low-Caf, if exists, has same pricing.
                                     // `quantity` prop values are "1"-"5" from standardQuantityOptions
        if (qty === 1) return "€15.50";
        if (qty === 2) return "€31.00";
        if (qty === 3) return "€46.50";
        if (qty === 4) return "€62.00";
        if (qty === 5) return "€77.50";
    } else if (type === 'Regional') {
        if (!region) return "Select Region..."; // Regional type selected, but no specific region
        // Prices here are for qty 1 as per original code.
        // `quantity` prop values are "1"-"5" from standardQuantityOptions
        if (qty === 1) {
            if (region === 'Brazil') return "€13.00";
            if (region === 'Center America') return "€15.00";
            if (region === 'Ethiopia') return "€14.00";
        }
        // Add other quantities for regional if prices are known e.g.
        // if (qty === 2 && region === 'Brazil') return "€25.00";
    } else if (type === 'Office') {
        // `sizeOption` is the key for Office pricing (e.g., "1x 1kg", "2x 1kg")
        if (sizeOption === "1x 1kg") return "€44.00";
        if (sizeOption === "2x 1kg") return "€80.00";
        // Prices for "3x 1kg", "4x 1kg", "5x 1kg" from officeSizeOptions are not defined in requirements.
    }

    // If a known type/method is selected but doesn't match any specific price rule above
    // (e.g. Curated with qty 6, or Regional with qty 2, or Office 3x 1kg)
    // or if a required sub-selection for pricing is still missing (though initial checks try to catch this)
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
        imagesToShowInSummary = carouselImageData.Capsules || carouselImageData._fallback || [];
        currentDescriptionDataInSummary = subscriptionDescriptions.Capsules?.[edition] || subscriptionDescriptions.Capsules?._default || null;
    } else if (type === 'Regional') {
        imagesToShowInSummary = carouselImageData.Regional?.[region] || carouselImageData.Regional?._default || carouselImageData._fallback || [];
        currentDescriptionDataInSummary = subscriptionDescriptions.Regional?.[region] || subscriptionDescriptions.Regional?._default || null;
    } else {
        imagesToShowInSummary = carouselImageData[type] || carouselImageData._fallback || [];
        currentDescriptionDataInSummary = subscriptionDescriptions[type] || null;
    }
    if (!Array.isArray(imagesToShowInSummary)) { imagesToShowInSummary = carouselImageData._fallback || []; }

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
    if (quantity || sizeOption) { // sizeOption for Office, quantity for others
        sentenceParts.push(' - Quantity: ');
        if (type === 'Office') {
            sentenceParts.push(<span key="qty-val" className={highlightClass}>{sizeOption}</span>);
        } else {
            const qtyValue = parseInt(quantity); // Ensure quantity is a number for comparisons
            if (method === 'Capsules') {
                 // Example: "3 boxes of 10 capsules" from capsuleQuantityLabelMap logic in MiddleContainer
                 // We need a way to get the actual label here if it's complex, or construct it.
                 // For simplicity, directly using qtyValue for now, but ideally, pass down getQuantityDisplayLabel or similar.
                 sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue}x 10 capsules`}</span>); // Simplified, adjust if more detail needed
            } else if (type === 'Curated') {
                // Value "2" is "2x 250g", "4" is "4x 250g", "6" is "6x 250g"
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue}x 250g`}</span>);
            } else if (type === 'Masterpiece') {
                sentenceParts.push(<span key="qty-val" className={highlightClass}>{`${qtyValue} bag${qtyValue > 1 ? 's' : ''}`}</span>);
            } else { // Roasters Choice, Low-Caf, Regional
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
        if (!canAddToCartProp) { alert("Please complete selections."); return; }
        const variantId = getVariantIdFromSelections(method, type, region, sizeOption, edition, quantity);
        if (!variantId) { alert("Error: Variant ID not found for the current selection. Please check console for details."); return; }

        let quantityForLink;
        const parsedQuantityFromProp = parseInt(quantity, 10);

        if (type === 'Office') {
            // For Office, the quantity in the permalink is typically 1, as the variant itself represents the total amount (e.g., 1 unit of "2x 1kg" variant).
            // This depends on how Shopify variants are set up. If each 1kg bag is a quantity unit, then sizeOption's numeric part is the quantity.
            // Assuming variant represents the bundle (e.g. "2x 1kg" is one variant, quantity 1 of that variant)
            quantityForLink = 1;
        } else if (type === 'Curated') {
            // Original logic: 2 -> 1, 4 -> 2, 6 -> 3. This implies the variant is a "pair of 250g bags" or similar base unit.
            if (parsedQuantityFromProp === 2) quantityForLink = 1; // 1 unit of (2x250g variant)
            else if (parsedQuantityFromProp === 4) quantityForLink = 2; // 2 units of (2x250g variant if base is 2 bags)
            else if (parsedQuantityFromProp === 6) quantityForLink = 3; // 3 units
            else quantityForLink = parsedQuantityFromProp; // Fallback, should not happen with current options
        } else {
            quantityForLink = parsedQuantityFromProp;
        }

        if (isNaN(quantityForLink) || quantityForLink < 1) {
             alert("Error: Invalid quantity for cart link. Please check selections.");
             console.error("Invalid quantityForLink:", quantityForLink, {method, type, quantity, sizeOption});
             return;
        }

        let sellingPlanIdToUse; // Renamed to avoid conflict
        if (type === 'Office') sellingPlanIdToUse = officeSellingPlanIds[frequency];
        else if (type === 'Low-Caf') sellingPlanIdToUse = lowCafSellingPlanIds[frequency];
        else if (type === 'Masterpiece') {
            sellingPlanIdToUse = MASTERPIECE_SELLING_PLAN_ID;
            if (frequency !== "4 Weeks (Recommended)" && frequency !== "4 Weeks") console.warn("Masterpiece frequency note: Standard Masterpiece plan ID used, though frequency is not 4 weeks. Ensure this is intended.");
        } else if (type === 'Regional' && region === 'Center America') sellingPlanIdToUse = regionalCenterAmericaSellingPlanIds[frequency];
        else if (type === 'Regional' && region === 'Ethiopia') sellingPlanIdToUse = regionalEthiopiaSellingPlanIds[frequency];
        else if (type === 'Regional' && region === 'Brazil') sellingPlanIdToUse = regionalBrazilSellingPlanIds[frequency];
        else if (method === 'Capsules') {
            // TODO: Implement capsule selling plan ID lookup if they have specific plans
            // For now, try to use generic plans if capsules use them, or log error.
            const selectedPlanInfo = sellingPlanMapping[frequency];
            if (selectedPlanInfo) sellingPlanIdToUse = selectedPlanInfo.planId;
            else { console.error(`Capsule selling plan for frequency "${frequency}" not found.`); /* sellingPlanIdToUse remains undefined */ }
        }
        else { // Default for Roasters Choice, Curated (if not covered by specific logic)
            const selectedPlanInfo = sellingPlanMapping[frequency];
            if (selectedPlanInfo) sellingPlanIdToUse = selectedPlanInfo.planId;
        }

        // Check if a selling plan ID was actually found
        const typesRequiringSpecificPlans = ['Office', 'Low-Caf', 'Regional', 'Masterpiece', 'Capsules']; // Capsules added
        if (typesRequiringSpecificPlans.includes(type) || method === 'Capsules') {
            if (!sellingPlanIdToUse) {
                alert(`Error: Subscription plan details for frequency "${frequency}" are not available for ${method === 'Capsules' ? `Capsules ${edition || ''}` : `${type} ${region || ''}`}.`);
                return;
            }
        } else if (!sellingPlanIdToUse) { // For other types like Roasters Choice, Curated
             alert(`Error: Subscription plan details for frequency "${frequency}" are not available.`);
             return;
        }


        const cartAddParams = new URLSearchParams();
        cartAddParams.append("items[][id]", variantId.toString());
        cartAddParams.append("items[][quantity]", quantityForLink.toString());
        cartAddParams.append("items[][selling_plan]", sellingPlanIdToUse.toString()); // Use the correctly determined sellingPlanIdToUse
        cartAddParams.append("return_to", "/checkout"); // Or perhaps just /cart to review first

        const permalinkUrl = `https://${SHOP_DOMAIN}/cart/clear?return_to=${encodeURIComponent(`/cart/add?${cartAddParams.toString()}`)}`;
        const newTab = window.open(permalinkUrl, '_blank');
        if (newTab) newTab.focus(); else alert("Popup blocker may have prevented opening the cart. Please disable it and try again.");
    };

    const animationText = type === 'Masterpiece' ? "We roast this subscription only on the first Tuesday every month" : "You can adjust your quantity any time!";
    const calculatedPrice = getPriceForSelection(method, type, region, edition, sizeOption, quantity, frequency);

    const shouldShowPrice = calculatedPrice &&
                           calculatedPrice !== "Select options for price" &&
                           calculatedPrice !== "Select Quantity..." &&
                           calculatedPrice !== "Select Size..." &&
                           calculatedPrice !== "Select Region..." &&
                           calculatedPrice !== "Price on selection";


    return (
        <div ref={ref} className="final-selection-display w-[100%] flex flex-col items-center text-white text-center px-4">
            <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>
            {imagesToShowInSummary.length > 0 ? (
                 <Carousel className="w-full max-w-lg mx-auto mb-6" opts={{ align: "start", loop: imagesToShowInSummary.length > 1 }}>
                    <CarouselContent>
                        {imagesToShowInSummary.map((imageUrl, index) => (
                            <CarouselItem key={`${method}-${type || edition}-${region || ''}-${index}-${quantity || sizeOption}`}> {/* Added sizeOption to key for office */}
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
                    <div className="price-display text-white text-2xl font-bold min-h-[1em]"> {/* Ensure space even if no price */}
                        {shouldShowPrice ? (
                            <span>{calculatedPrice}</span>
                        ) : (
                            calculatedPrice && <span className="text-sm text-gray-400">{calculatedPrice}</span> // Show prompts like "Select Quantity..."
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
    const showSummaryLayout = method && (type || edition); // Show summary if method and EITHER type (for coffee/espresso) OR edition (for capsules) is selected
    const introRef = useRef(null);
    const summaryRef = useRef(null);

    // Determine if the "Add to Cart" button should be enabled
    const canAddToCart = method && frequency && (
        (method === 'Capsules' && edition && quantity) || // Capsules need edition and quantity
        (type === 'Office' && sizeOption) || // Office needs sizeOption (quantity is derived from it)
        (type === 'Regional' && region && quantity) || // Regional needs region and quantity
        // For types that only need quantity (and not a sub-type like region or special size like office)
        (['Roasters Choice', 'Masterpiece', 'Low-Caf', 'Curated'].includes(type) && quantity)
    );

    return (
        <div className={`right-container flex justify-center w-full min-h-screen bg-[#1a1a1a] ${!showSummaryLayout ? 'items-center' : 'items-start pt-8 pb-8'}`}> {/* Added padding top/bottom for summary view */}
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={showSummaryLayout ? "summary" : "intro"}
                    nodeRef={showSummaryLayout ? summaryRef : introRef}
                    timeout={1000} // Adjusted timeout for a more noticeable transition
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