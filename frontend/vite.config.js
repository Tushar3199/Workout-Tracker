import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    proxy: { 
      '/api/workouts': 'http://localhost:4000',  
      '/auth': 'http://localhost:4000', 
    }, 
  }, 
  build: { 
    outDir: 'dist', 
  },
})