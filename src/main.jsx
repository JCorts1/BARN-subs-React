// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App.jsx';

// --- START: Added section for localhost-specific styles ---
// This logic checks if the application is running in the 'development' environment
// (e.g., when you run `npm start` or `vite dev`).
// `process.env.NODE_ENV` is automatically set by your development server and build tool.
if (process.env.NODE_ENV === 'development') {
  // Dynamically import the localhost-styles.css file.
  // This import will only happen in development mode.
  // Build tools (like Webpack or Vite) will ensure this import and the CSS file
  // are NOT included in your production bundle.
  import('./localhost-styles.css');
  console.log('LOCALHOST STYLES: "localhost-styles.css" has been loaded.');
}
// --- END: Added section for localhost-specific styles ---

// The ID MUST match the id="" attribute in subscription-selector.liquid
const APP_ROOT_ID = 'thebarn-subscription-react-app-root';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded. Attempting to mount React app...");
  const rootElement = document.getElementById(APP_ROOT_ID);
  console.log(`Found element with ID #${APP_ROOT_ID}:`, rootElement);

  if (rootElement) {
    try {
      const root = createRoot(rootElement);
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
    console.error(`CRITICAL ERROR: Could not find root element with ID #${APP_ROOT_ID} in the HTML after DOMContentLoaded.`);
  }
});