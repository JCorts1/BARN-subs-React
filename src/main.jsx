// src/main.jsx
// Corrected ID + Waits for DOMContentLoaded

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Using your import style
import './index.css';
import App from './App.jsx';

// The ID MUST match the id="" attribute in subscription-selector.liquid
const APP_ROOT_ID = 'thebarn-subscription-react-app-root';

// Wait for the DOM to be fully loaded before trying to mount React
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded. Attempting to mount React app...");

  // Find the element using the CORRECT ID
  const rootElement = document.getElementById(APP_ROOT_ID);
  console.log(`Found element with ID #${APP_ROOT_ID}:`, rootElement);

  if (rootElement) {
    try {
      // Found the element, now mount React
      const root = createRoot(rootElement); // Use imported createRoot
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
      console.log("React app mount initiated successfully.");
    } catch (error) {
      console.error("Error occurred during createRoot or render:", error);
    }
  } else {
    // This error means the ID in this file doesn't match the ID in the .liquid file
    console.error(`CRITICAL ERROR: Could not find root element with ID #${APP_ROOT_ID} in the HTML after DOMContentLoaded.`);
  }
});