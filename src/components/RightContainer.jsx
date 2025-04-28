// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Make sure this CSS file exists or remove if not needed

// --- Props remain the same ---
const RightContainer = ({ method, type, region, sizeOption, quantity, frequency }) => {

  // --- Define Default/Introductory Content (Remains the same) ---
  const DefaultIntroContent = () => {
    // ... DefaultIntroContent implementation ...
        const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883";
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


  // --- Image Map (Remains the same) ---
  const typeImageMap = {
        "Roasters Choice": "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
        "Masterpiece": "https://cdn.shopify.com/s/files/1/0831/4141/files/Aroma_Nativo_Masterpiece.jpg?v=1744711907",
        "Low-Caf": "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Daterra_Reserve_Low_Caf_2025.png?v=1739287021",
        "Office": "https://cdn.shopify.com/s/files/1/1657/3941/files/volcan_azul_1kg.webp?v=1743027540",
        // Add placeholder for Regional type if needed, though handled below now
        // "Regional": "OPTIONAL_BASE_REGIONAL_IMAGE_URL",
  };
  // --- End Image Map ---

  // --- Data for Subscription Descriptions (Remains the same) ---
  const subscriptionDescriptions = {
        "Roasters Choice": {
          description: "Our most popular Subscription. Every month, we source stunning coffees from around the world. This is the best way to explore the origins, varietals, and processes that make Single Origin flavour so special.",
          currentOffering: "In April you will receive:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral."
        },
        "Masterpiece": {
          description: "The rarest coffees on the planet. Scoring 90 points and up. Omni Roast.",
          currentOffering: "In May you will receive:\n\nFinca Sophia Natural Gesha, Panama 🇵🇦"
        },
        "Low-Caf": {
          description: "This subscription sends out 250g of rare coffee varietals that naturally contain low caffeine: Aramosa or Laurina.",
          currentOffering: "You are going to receive Daterra Reserve from Brazil"
        },
        "Office": {
          description: "This subscription is for offices that prefer espresso and need a little more volume each month. The coffee selection changes every month, allowing you to explore different coffee regions!",
          currentOffering: "In April you will receive:\n\n🇪🇹 Spring Coffee, Ethiopia: Apricot Jam. Bergamot. Floral."
        },
        "Regional": {
          "Brazil": {
            description: "People love Brazilian Coffees for their sweetness, low acidity and chocolate notes.",
            currentOffering: "In April you will receive:\n\n🇧🇷 Elemental, Brazil: Milk Chocolate. Macadamia. Smooth."
          },
          "Ethiopia": {
            description: "People love Ethiopian Coffees for their floral notes and its tea-like character.",
            currentOffering: "In April you will receive:\n\n🇪🇹 Chelbesa, Ethiopia: Peach. Fudge. Jasmine."
          },
          "Center America": {
            description: "People like Central Coffees for their exciting acidity and clean notes of terroir.",
            currentOffering: "In April you will receive:\n\n🇨🇷 Volcan Azul, Costa Rica: Dried Fig. Vanilla."
          },
          _default: {
            description: "Select a region to see details about the specific coffee offering for this type.",
            currentOffering: ""
          }
        }
  };
  // --- End Description Data ---


  // --- Determine Display Logic (Remains the same) ---
  const showSummaryLayout = method && type;
  const canAddToCart = method && type && quantity && frequency &&
    (type !== 'Regional' || region) &&
    (type !== 'Roasters Choice' || sizeOption) &&
    (type !== 'Office' || sizeOption);

  let contentToRender;

  // --- Show Summary Layout Logic ---
  if (showSummaryLayout) {
    // --- STATE 1: Display Summary (Dynamically Updating) ---

    // Initialize with base type image or fallback
    let finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg";

    // --- UPDATED: Image selection logic for Regional ---
    if (type === 'Regional') {
      // Check for specific selected regions first
      if (region === 'Ethiopia') {
        finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Chelbesa_Natural_2024.png?v=1729679115";
      } else if (region === 'Brazil') {
        finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/Elemental_Bag_Catuai_mit_labelle.png?v=1723799712";
      } else if (region === 'Center America') {
        finalImageUrl = " https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Volcan_Azul_Caturra_OMNI_3a40d3d4-a185-4da0-99ff-b8d0f43479b7.png?v=1743674027";
      } else if (region) {
        // Handle case where a region is selected but not specifically mapped above
        finalImageUrl = "YOUR_SHOPIFY_URL_FOR_GENERIC_REGIONAL_FINAL.jpg"; // Or maybe keep the map? Your choice.
      } else {
        // *** NEW: If type is Regional BUT no region is selected yet, show the map ***
        finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/map.png?v=1745847536";
      }
    }
    // --- End Image selection logic ---

    // --- Get Subscription Description Text (remains the same) ---
    let currentDescriptionData = null;
    if (type === 'Regional') {
      currentDescriptionData = subscriptionDescriptions.Regional[region] || subscriptionDescriptions.Regional._default;
    } else {
      currentDescriptionData = subscriptionDescriptions[type] || null;
    }
    // --- End Get Description Text ---


    // --- Construct summary sentence (remains the same) ---
    const highlightClass = "text-[#A67C52] font-semibold";
    const sentenceParts = [];
    // ... (sentenceParts construction logic is unchanged) ...
        sentenceParts.push('Your selection: ');
        if (sizeOption) {
          sentenceParts.push(<span key="amount" className={highlightClass}>{sizeOption}</span>);
          sentenceParts.push(' ');
        } else if (type === 'Roasters Choice' || type === 'Office') {
          sentenceParts.push('(select size/option) ');
        }
        sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);
        sentenceParts.push(' ');
        sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);
        if (region) {
          sentenceParts.push(' from ');
          sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>);
        } else if (type === 'Regional') {
          sentenceParts.push(' (select region)');
        }
        sentenceParts.push(' coffee');
        if (quantity) {
          sentenceParts.push(' ');
          sentenceParts.push(<span key="qty-val" className={highlightClass}>{quantity}</span>);
          sentenceParts.push(' ');
          sentenceParts.push(<span key="qty-word" className={highlightClass}>{quantity > 1 ? 'times' : 'time'}</span>);
        } else {
          sentenceParts.push(' (select quantity)');
        }
        if (frequency) {
          sentenceParts.push(', delivered every ');
          sentenceParts.push(<span key="freq" className={highlightClass}>{frequency}</span>);
        } else {
          sentenceParts.push(' (select frequency)');
        }
        sentenceParts.push('.');
    // --- End sentence construction ---


    contentToRender = (
      <div className="final-selection-display w-[100%] flex flex-col items-center text-white text-center">
        <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>
        {/* Coffee Image: Will now show map placeholder when appropriate */}
        <img
          src={finalImageUrl}
          alt={type === 'Regional' && !region ? "Select a coffee region" : `Coffee selection: ${type}${region ? ' - ' + region : ''}`} // Updated Alt Text
          style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
        />

        {/* Subscription Description Section (remains the same) */}
        {currentDescriptionData && (
          <div className="subscription-description text-white my-4 px-2 text-left w-[#80%] flex items-center justify-center">
            {currentDescriptionData.currentOffering && (
              <div className="bg-[#3a3c3d] p-3 rounded-md border border-[#A67C52] text-lg w-[90%]">
                <p className="whitespace-pre-wrap">
                <p className="mb-3">{currentDescriptionData.description}</p>
                  {currentDescriptionData.currentOffering}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Summary Paragraph (remains the same) */}
        <p className="summary-sentence text-lg leading-relaxed mt-0 mb-4 px-4 w-[90%] min-h-[3em]">
          {sentenceParts}
        </p>

        {/* Add to Cart Button (remains the same) */}
        <div className="cart-btn mt-2 w-[100%] flex justify-end">
          <button
            className={`
              bg-[#A67C52] p-2 px-3 rounded-md border-[1.5px] border-[#3a3c3d]
              transition-all duration-300 ease-in-out transform
              text-white font-semibold text-md mb-2
              disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:hover:scale-105
            `}
            disabled={!canAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    );

  } else {

    contentToRender = <DefaultIntroContent />;
  }

  return (
    <div className="right-container pt-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]"> {/* Example background */}
      {contentToRender}
    </div>
  );
};

export default RightContainer;