import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { resumeAsset } from './build/resume.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), resumeAsset(fileURLToPath(new URL('.', import.meta.url)))],
  base: '/',
})
