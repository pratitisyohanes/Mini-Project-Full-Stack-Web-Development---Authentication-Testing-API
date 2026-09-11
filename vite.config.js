import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mini-project-fake-api/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
