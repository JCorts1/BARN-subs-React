// src/components/RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Make sure this CSS file exists or remove if not needed

// --- Props remain the same ---
const RightContainer = ({ method, type, region, sizeOption, quantity, frequency }) => {

  // --- Define Default/Introductory Content (Remains the same) ---
  const DefaultIntroContent = () => {
    // ... (DefaultIntroContent implementation remains unchanged)
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
  };
  // --- End Image Map ---


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
    let finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg";

    // Image selection logic based on region (remains the same)
    if (type === 'Regional') {
          if (region === 'Ethiopia') finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Chelbesa_Natural_2024.png?v=1729679115";
          else if (region === 'Brazil') finalImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/Elemental_Bag_Catuai_mit_labelle.png?v=1723799712";
          else if (region === 'Center America') finalImageUrl = " https://cdn.shopify.com/s/files/1/0831/4141/files/BAG_Volcan_Azul_Caturra_OMNI_3a40d3d4-a185-4da0-99ff-b8d0f43479b7.png?v=1743674027";
          else if (region) {
            finalImageUrl = "YOUR_SHOPIFY_URL_FOR_GENERIC_REGIONAL_FINAL.jpg";
          } else {
            finalImageUrl = typeImageMap[type] || "YOUR_SHOPIFY_URL_FOR_FALLBACK_IMAGE.jpg";
          }
    }

    // --- Construct the dynamic summary sentence with highlighted values ---
    const highlightClass = "text-[#A67C52] font-semibold"; // Tailwind classes for highlighting
    const sentenceParts = []; // Array to hold strings and JSX elements

    sentenceParts.push('Your selection: '); // Start of sentence

    // Amount (sizeOption) - Highlight if present
    if (sizeOption) {
      sentenceParts.push(<span key="amount" className={highlightClass}>{sizeOption}</span>);
      sentenceParts.push(' '); // Add space after
    } else if (type === 'Roasters Choice' || type === 'Office') {
      // Show placeholder if size/option is required but missing
      sentenceParts.push('(select size/option) ');
    }

    // Method (Always present here) - Highlight
    sentenceParts.push(<span key="method" className={highlightClass}>{method}</span>);
    sentenceParts.push(' '); // Add space after

    // Type (Always present here) - Highlight
    sentenceParts.push(<span key="type" className={highlightClass}>{type}</span>);

    // Region - Highlight if present
    if (region) {
      sentenceParts.push(' from ');
      sentenceParts.push(<span key="region" className={highlightClass}>{region}</span>);
    } else if (type === 'Regional') {
      // Show placeholder if region is required but missing
      sentenceParts.push(' (select region)');
    }

    sentenceParts.push(' coffee'); // Static word "coffee"

    // Quantity - Highlight value and "time(s)" if present
    if (quantity) {
      sentenceParts.push(' '); // Space before quantity
      sentenceParts.push(<span key="qty-val" className={highlightClass}>{quantity}</span>);
      sentenceParts.push(' '); // Space between value and word
      // Highlight the word "time" or "times" as well
      sentenceParts.push(<span key="qty-word" className={highlightClass}>{quantity > 1 ? 'times' : 'time'}</span>);
    } else {
      // Show placeholder if quantity is missing
      sentenceParts.push(' (select quantity)');
    }

    // Frequency - Highlight if present
    if (frequency) {
      sentenceParts.push(', delivered every ');
      sentenceParts.push(<span key="freq" className={highlightClass}>{frequency}</span>);
    } else {
      // Show placeholder if frequency is missing
      sentenceParts.push(' (select frequency)');
    }

    sentenceParts.push('.'); // End punctuation
    // --- End sentence construction ---


    contentToRender = (
      <div className="final-selection-display w-[90%] flex flex-col items-center text-white text-center">
        <h2 className="summary-init text-2xl font-semibold text-[#A67C52] mb-4">Subscription Summary</h2>
        <img
          src={finalImageUrl}
          alt={`Coffee selection: ${type}${region ? ' - ' + region : ''}`}
          style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0', borderRadius: '8px' }}
        />
        {/* Summary Paragraph: Render the array of elements */}
        <p className="summary-sentence text-lg leading-relaxed my-4 px-4 min-h-[3em]">
          {sentenceParts} {/* React can render arrays */}
        </p>
        {/* Add to Cart Button (logic remains the same) */}
        <div className="cart-btn mt-4">
          <button
            className={`
              bg-[#A67C52] p-3 px-6 rounded-md border-[1.5px] border-[#3a3c3d]
              transition-all duration-300 ease-in-out transform
              text-white font-semibold text-lg
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
    // --- STATE 2: DEFAULT / INITIAL (Remains the same) ---
    contentToRender = <DefaultIntroContent />;
  }
  // --- End Display Logic ---


  // --- Render the Component (Remains the same) ---
  return (
    <div className="right-container pt-10 flex justify-center items-start w-full min-h-screen bg-[#1a1a1a]"> {/* Example background */}
      {contentToRender}
    </div>
  );
};

export default RightContainer;