import { createApp } from 'vue'
import App from './App.vue'
import { loadTheme } from './layout'

loadTheme('default').then(() => {
  createApp(App).mount('#app')
})
