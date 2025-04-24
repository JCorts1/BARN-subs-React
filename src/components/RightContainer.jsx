// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Styles specific to this component

const RightContainer = ({ method, type, region, sizeOption, quantity }) => {

  // --- Define Default/Introductory Content ---
  const DefaultIntroContent = () => {
    // Use the Shopify URL for your default image/logo
    const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883";
    return (
      <div className='default-intro-content text-white w-[90%] h-full flex flex-col items-center'>
        <div>
          <img src={defaultImageUrl} alt="Select your coffee subscription" style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0' }} />
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
  // --- End Default Content ---

  // --- Define Image Map using your Shopify URLs ---
  const typeImageMap = {
    "Roasters Choice": "https://cdn.shopify.com/s/files/1/0831/4141/files/roasters_choice.jpg?v=1728985731",
    "Masterpiece": "https://cdn.shopify.com/s/files/1/0831/4141/files/Aroma_Nativo_Masterpiece.jpg?v=1744711907",
    "Low-Caf": "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Daterra_Reserve_Low_Caf_2025.png?v=1739287021",
    // Add other types if needed:
    // "Office": "YOUR_SHOPIFY_URL_FOR_OFFICE_IMAGE.jpg",
  };
  // --- End Image Map ---

  // --- Determine Display Logic ---
  const fullSelectionMade = method && type && quantity;
  const showTypeImageOnly = type && type !== 'Regional' && typeImageMap[type] && !fullSelectionMade;

  let contentToRender;

  if (fullSelectionMade) {
    // --- STATE 1: FINAL SELECTION MADE ---
    let finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg"; // Provide a fallback Shopify URL
    let finalDescription = `You've chosen ${method} style ${type} coffee`;

    if (region) finalDescription += ` from ${region}`;
    if (sizeOption) finalDescription += ` (${sizeOption})`;
    finalDescription += `. Quantity: ${quantity}.`;

    // ** IMPORTANT: Replace placeholder URLs with your actual Shopify image URLs **
    if (type === 'Regional') {
      if (region === 'Ethiopia') finalImageUrl = "YOUR_SHOPIFY_URL_FOR_ETHIOPIA_FINAL.jpg";
      else if (region === 'Brazil') finalImageUrl = "YOUR_SHOPIFY_URL_FOR_BRAZIL_FINAL.jpg";
      else if (region === 'Center America') finalImageUrl = "YOUR_SHOPIFY_URL_FOR_CENTERAMERICA_FINAL.jpg";
      else finalImageUrl = "YOUR_SHOPIFY_URL_FOR_GENERIC_REGIONAL_FINAL.jpg"; // Fallback regional
    }

    contentToRender = (
      <div className="final-selection-display w-[90%] flex flex-col items-center text-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Selection</h2>
        <img
          src={finalImageUrl}
          alt={`Coffee selection: ${type}${region ? ' - ' + region : ''}`}
          style={{ width: '100%', maxWidth: '250px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
        />
        <p className="mb-4">{finalDescription}</p>
        <ul className="selection-details-list" style={{ listStyle: 'none', padding: 0 }}>
          <li>Method: {method}</li>
          <li>Type: {type}</li>
          {region && <li>Region: {region}</li>}
          {sizeOption && <li>Option/Size: {sizeOption}</li>}
          <li>Quantity: {quantity}</li>
        </ul>
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