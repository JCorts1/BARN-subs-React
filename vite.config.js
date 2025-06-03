// vite.config.js (in Subscriptions-React folder)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // --- ADD THIS 'define' SECTION ---
  // This replaces process.env.NODE_ENV in the build output
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Add other process.env variables here if your code uses them
    // 'process.env.SOME_VAR': JSON.stringify(process.env.SOME_VAR || 'default')
  },
  // --- End of added define section ---
  build: {
    // --- Your existing build config ---
    outDir: resolve(__dirname, '../../BARN-subs-shopify/extensions/subscriptions-app/assets'),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.jsx'),
      name: 'TheBarnSubscriptionSelector',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
       output: {
         assetFileNames: `[name].[ext]`
       }
     }
     // --- End of existing build config ---
  },
})