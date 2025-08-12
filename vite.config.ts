import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // --- TAMBAHKAN BARIS INI ---
  base: "/pelacakan-publik/", 
  plugins: [react()],
})
