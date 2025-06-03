// BARN-subs-React/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // You likely have this or similar
import { resolve } from 'path'; // <--- ADD THIS LINE

// ... rest of your config
export default defineConfig({
  plugins: [
    tailwindcss(), // Or your actual tailwindcss plugin usage
    react(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  build: {
    // Ensure this path is correct for your project structure
    outDir: resolve(__dirname, '../../BARN-subs-shopify/extensions/subscriptions-app/assets'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'TheBarnSubscriptionSelector',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && (assetInfo.name.endsWith('.css') || assetInfo.name.toLowerCase() === 'style.css')) {
            return 'subscriptions-react.css';
          }
          return '[name].[ext]';
        },
      },
    },
  },
  resolve: { // This is the Vite alias config section
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});