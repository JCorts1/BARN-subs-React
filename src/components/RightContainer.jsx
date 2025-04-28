// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Make sure this CSS file exists or remove if not needed

// --- Props remain the same ---
const RightContainer = ({ method, type, region, sizeOption, quantity, frequency }) => {

  // --- Define Default/Introductory Content (Using the original UL as per your code) ---
  const DefaultIntroContent = () => {
    const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883";
    return (
      <div className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
        <div>
          <img src={defaultImageUrl} alt="Select your coffee subscription" style={{ width: '100%', maxWidth: '350px', height: 'auto', margin: '1rem 0' }} />
        </div>
        {/* This introductory list remains as you provided it */}
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


  // --- Image Map ---
  const typeImageMap = {
    "Roasters Choice": "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
    "Masterpiece": "https://cdn.shopify.com/s/files/1/0831/4141/files/Aroma_Nativo_Masterpiece.jpg?v=1744711907",
    "Low-Caf": "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Daterra_Reserve_Low_Caf_2025.png?v=1739287021",
    "Office": "https://cdn.shopify.com/s/files/1/1657/3941/files/volcan_azul_1kg.webp?v=1743027540",
    // "Office": "YOUR_SHOPIFY_URL_FOR_OFFICE_IMAGE.jpg",
  };
  // --- End Image Map ---


  // --- Determine Display Logic ---
  const fullSelectionMade = method && type && quantity && frequency;
  const showTypeImageOnly = type && type !== 'Regional' && typeImageMap[type] && !fullSelectionMade;

  let contentToRender;

  if (fullSelectionMade) {
    // --- STATE 1: FINAL SELECTION MADE ---
    let finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg";

    // ** IMPORTANT: Replace placeholder URLs with your actual Shopify image URLs **
    if (type === 'Regional') {
      if (region === 'Ethiopia') finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Chelbesa_Natural_2024.png?v=1729679115";
      else if (region === 'Brazil') finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/Elemental_Bag_Catuai_mit_labelle.png?v=1723799712";
      else if (region === 'Center America') finalImageUrl = " https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Volcan_Azul_Caturra_OMNI_3a40d3d4-a185-4da0-99ff-b8d0f43479b7.png?v=1743674027";
      else finalImageUrl = "YOUR_SHOPIFY_URL_FOR_GENERIC_REGIONAL_FINAL.jpg"; // Fallback regional
    }

    // --- Construct the concise summary sentence ---
    const coffeeDescription = `${method} ${type}${region ? ` from ${region}` : ''} coffee`;
    const amountText = sizeOption ? `${sizeOption} ` : ''; // Amount per delivery, with trailing space if present. Example: "2 x 1kg " or "250g " or ""
    const quantityPlural = quantity > 1 ? 'times' : 'time'; // Handle singular 'time'
    const frequencyText = frequency ? `, delivered every ${frequency}`: ''; // Delivery frequency part

    // Combine: "You will receive [Amount] [Coffee Type] [Quantity] times, delivered every [Frequency]."
    const summarySentence = `You will receive ${amountText}${coffeeDescription} ${quantity} ${quantityPlural}${frequencyText}.`;
    // Example Output (sizeOption = "2 x 1kg", quantity = 4, frequency = "5 Weeks"):
    // "You will receive 2 x 1kg Espresso Office coffee 4 times, delivered every 5 Weeks."
    // Example Output (sizeOption = "250g", quantity = 1, frequency = "6 weeks"):
    // "You will receive 250g Filter Masterpiece coffee 1 time, delivered every 6 weeks."
    // Example Output (sizeOption = null, quantity = 3, frequency = "4 weeks"):
    // "You will receive Filter Regional from Ethiopia coffee 3 times, delivered every 4 weeks."
    // --- End sentence construction ---


    contentToRender = (
      <div className="final-selection-display w-[90%] flex flex-col items-center text-white text-center">
        <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>
        <img
          src={finalImageUrl}
          alt={`Coffee selection: ${type}${region ? ' - ' + region : ''}`}
          style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
        />

        {/* --- Display the concise summary sentence paragraph --- */}
        <p className="summary-sentence text-lg leading-relaxed my-4 px-4"> {/* Added margin, padding and line-height */}
          {summarySentence}
        </p>
        {/* --- End Summary Paragraph --- */}

        <div className="cart-btn mt-4"> {/* Adjusted margin if needed */}
          <button className="
            bg-[#A67C52] p-3 px-6 rounded-md border-[1.5px] border-[#3a3c3d]
            hover:brightness-110
            hover:scale-105
            transition-all duration-300 ease-in-out
            transform
            text-white font-semibold text-lg">
            ADD TO CART
          </button>
        </div>
      </div>
    );

  } else if (showTypeImageOnly) {
    // --- STATE 2: INTERMEDIATE - TYPE SELECTED (NOT REGIONAL) ---
    contentToRender = (
      <div className="intermediate-selection-display w-[90%] flex flex-col items-center">
        <img
          src={typeImageMap[type]} // Use Shopify URL from map
          alt={type}
          style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
        />
        <p className="text-gray-400 mt-4 italic">Complete your selection...</p>
      </div>
    );

  } else {
    // --- STATE 3: DEFAULT / INITIAL ---
    // Renders the DefaultIntroContent with the original UL
    contentToRender = <DefaultIntroContent />;
  }
  // --- End Display Logic ---


  // --- Render the Component ---
  return (
    <div className="right-container pt-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]"> {/* Example background */}
      {contentToRender}
    </div>
  );
};

export default RightContainer;