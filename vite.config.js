import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path" // <--- Add this line

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // Your existing Tailwind plugin
    react()       // Your existing React plugin
  ],
  // --- Add this 'resolve' section ---
  resolve: {
    alias: {
      // This tells Vite that imports starting with '@/' should point to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // --- End of added section ---
})