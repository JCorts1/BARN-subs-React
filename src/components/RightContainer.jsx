// RightContainer.jsx

import React from 'react';
import './RightContainer.css'; // Keep your CSS import

/**
 * RightContainer now receives specific props related to the coffee selection
 * and displays default content before a selection is made.
 */
const RightContainer = ({ method, type, region, sizeOption, quantity }) => {

  // --- Logic to determine dynamic display based on props ---
  let imageUrl = '/placeholder-coffee.jpg'; // Default image for SELECTED state (can be same or different)
  let description = 'Processing your selection...'; // Default description for SELECTED state
  const selectionMade = method && type && quantity; // Check if a basic selection is complete

  if (selectionMade) {
    description = `You've chosen ${method} style ${type} coffee`;
    if (region) description += ` from ${region}`;
    if (sizeOption) description += ` (${sizeOption})`;
    description += `. Quantity: ${quantity}.`;

    // Example: Set image based on type (replace with your actual image logic)
    if (type === 'Espresso') imageUrl = '/espresso-beans.jpg';
    else if (type === 'Filter') imageUrl = '/filter-beans.jpg'; // Use else if for clarity if only one can be true
    if (type === 'Regional' && region === 'Ethiopia') imageUrl = '/ethiopia-beans.jpg';
    // Add more conditions as needed...
  }
  // --- End dynamic display logic ---

  // --- Define Default/Introductory Content ---
  const defaultImageUrl = "https://cdn.shopify.com/s/files/1/0831/4141/files/LOGO-NAME.png?v=1710576883"; // <--- CHANGE THIS to your actual default image path
  const defaultTitle = "Craft Your Perfect Coffee Subscription";
  const defaultIntroText = "Start by selecting your preferred coffee method and type on the left. Your personalized selection details will appear here.";
  // --- End Default Content ---


  return (
    <div className="right-container pt-10 flex justify-center items-center w-full">

      {/* Conditionally render: Selection Details OR Default Content */}
      {selectionMade ? (
        <>
          <h2>Your Selection</h2> {/* Moved title here */}
          <img src={imageUrl} alt={`Coffee selection: ${type}`} style={{ width: '100%', maxWidth: '200px', height: 'auto', margin: '1rem 0' }} />
          <p>{description}</p>
          <ul>
            <li>Method: {method}</li>
            <li>Type: {type}</li>
            {region && <li>Region: {region}</li>}
            {sizeOption && <li>Option/Size: {sizeOption}</li>}
            <li>Quantity: {quantity}</li>
          </ul>
        </>
      ) : (
        // --- This part renders BEFORE a selection is made ---
        <div className='text-white w-[90%] h-full flex flex-col items-center'>
          <div>
            <img src={defaultImageUrl} alt="Select your coffee subscription" style={{ width: '100%', maxWidth: '300px', height: 'auto', margin: '1rem 0' }} />
          </div>
         
          <div className='p-5 border border-[#A57C62] rounded-md mt-8'>
          <ul class="intro-list text-2xl">
                    <li>🌱 Sustainably sourced from top farms</li>
                    <li>🔥 Expertly roasted in Berlin</li>
                    <li>📦 Delivered fresh, right when you need it</li>
                    <li>☕ Always rotating—always exceptional</li>
                </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightContainer;