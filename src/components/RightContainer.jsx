// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css';

// --- Updated Props: Added frequency ---
const RightContainer = ({ method, type, region, sizeOption, quantity, frequency }) => {

  // --- Define Default/Introductory Content ---
  const DefaultIntroContent = () => {
    // Use the Shopify URL for your default image/logo
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



  const typeImageMap = {
    "Roasters Choice": "https://cdn.shopify.com/s/files/1/0831/4141/files/Ralf-coffee_1.jpg?v=1713252187",
    "Masterpiece": "https://cdn.shopify.com/s/files/1/0831/4141/files/Aroma_Nativo_Masterpiece.jpg?v=1744711907",
    "Low-Caf": "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Daterra_Reserve_Low_Caf_2025.png?v=1739287021",

    // "Office": "YOUR_SHOPIFY_URL_FOR_OFFICE_IMAGE.jpg",
  };
  // --- End Image Map ---

  // --- Determine Display Logic ---
  // --- Updated Condition: Added frequency check ---
  const fullSelectionMade = method && type && quantity && frequency;
  const showTypeImageOnly = type && type !== 'Regional' && typeImageMap[type] && !fullSelectionMade;

  let contentToRender;

  if (fullSelectionMade) {
    // --- STATE 1: FINAL SELECTION MADE ---
    let finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg"; // Provide a fallback Shopify URL
    // --- Updated Description: Added frequency ---
    let finalDescription = `You've chosen ${method} style ${type} coffee`;

    if (region) finalDescription += ` from ${region}`;
    if (sizeOption) finalDescription += ` (${sizeOption})`;
    finalDescription += `. Quantity: ${quantity}. Delivered every ${frequency}.`; // <-- Added frequency here

    // ** IMPORTANT: Replace placeholder URLs with your actual Shopify image URLs **
    if (type === 'Regional') {
      if (region === 'Ethiopia') finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Chelbesa_Natural_2024.png?v=1729679115";
      else if (region === 'Brazil') finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/Elemental_Bag_Catuai_mit_labelle.png?v=1723799712";
      else if (region === 'Center America') finalImageUrl = " https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Volcan_Azul_Caturra_OMNI_3a40d3d4-a185-4da0-99ff-b8d0f43479b7.png?v=1743674027";
      else finalImageUrl = "YOUR_SHOPIFY_URL_FOR_GENERIC_REGIONAL_FINAL.jpg"; // Fallback regional
    }

    contentToRender = (
      <div className="final-selection-display w-[90%] flex flex-col items-center text-white text-center">
        <h2 className="summary-init text-2xl font-semibold text-[#A67C52]">Subscription Summary</h2>
        <img
          src={finalImageUrl}
          alt={`Coffee selection: ${type}${region ? ' - ' + region : ''}`}
          style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
        />
        <ul className="selection-details-list rounded-md">
          <li><img className='w-12' src="https://cdn.shopify.com/s/files/1/0831/4141/files/Coffee_Holder.png?v=1745751140" alt="MethodIcon" />Method: <span className='selection-span'>{method}</span></li>
          <li><img className='w-12' src="https://cdn.shopify.com/s/files/1/0831/4141/files/Coffee_Beans.png?v=1745751373" alt="" />Type: <span className='selection-span'>{type}</span> </li>
          {region && <li>Region: <span className='selection-span'>{region}</span></li>}
          {sizeOption && <li><img className='w-12' src="https://cdn.shopify.com/s/files/1/0831/4141/files/Coffee_Pack.png?v=1745751291" alt="bag of coffee" />Option/Size: <span className='selection-span'>{sizeOption}</span></li>}
          <li>Quantity: <span className='selection-span'>{quantity}</span></li>
          <li> Frequency: Every <span className='selection-span'>{frequency}</span></li>
        </ul>
        <div className="cart-btn">
  <button className="
    bg-[#A67C52] p-3 rounded-sm border-[1.5px] border-[#3a3c3d]
    hover:brightness-110
    hover:scale-105
    transition-all duration-300 ease-in-out
    transform
    text-white">
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
    contentToRender = <DefaultIntroContent />;
  }
  // --- End Display Logic ---

  return (
    <div className="right-container pt-10 flex justify-center items-start w-full min-h-screen">
      {contentToRender}
    </div>
  );
};

export default RightContainer;