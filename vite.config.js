import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://cemetery-mapping-system.onrender.com', // Backend URL
        changeOrigin: true, // Ensures the backend sees requests as coming from the correct origin
      }
    }
  },
  plugins: [react()],
})
