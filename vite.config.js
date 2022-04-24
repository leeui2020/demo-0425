import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRequireContext from '@originjs/vite-plugin-require-context'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteRequireContext()
  ]
})
