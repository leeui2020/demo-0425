import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import mockServer from 'vite-plugin-mock-server'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/layout/global.scss" as *;
        @use "@/element-ui/index.scss" as *;
        `
      }
    }
  }
})
