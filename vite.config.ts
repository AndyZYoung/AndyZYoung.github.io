import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages user site (AndyZYoung.github.io) serves from root.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
