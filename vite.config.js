import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import mockServer from 'vite-plugin-mock-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteRequireContext(),
    mockServer({
      logLevel: 'info',
      urlPrefixes: [ '/api/' ],
      mockRootDir: './mock',
      mockJsSuffix: '.mock.js',
      mockTsSuffix: '.mock.ts',
      noHandlerResponse404: true,
      mockModules: [] 
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/layout/global.scss";'
      }
    }
  }
})
