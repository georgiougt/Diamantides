import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isSsr = process.argv.includes('--ssr')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: [
      { find: /^react-phone-input-2$/, replacement: path.resolve(__dirname, './src/components/PhoneInputWrapper.jsx') },
      ...(isSsr ? [
        { find: /^react-phone-input-2\/lib\/style\.css$/, replacement: path.resolve(__dirname, './src/mocks/empty-style.css') }
      ] : [])
    ]
  },
  ssr: {
    noExternal: isSsr ? ['react-phone-input-2'] : []
  }
})
