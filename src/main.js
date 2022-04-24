import { createApp, h, Suspense } from 'vue'
import App from './App.vue'
import registComponent from './components'
import { loadTheme } from './layout'
import router from './router'
import elementUI from './element-ui'

loadTheme('default').then(() => {
  createApp({
    setup () {
      return () => h(Suspense, h(App))
    }
  })
    .use(elementUI)
    .use(registComponent)
    .use(router)
    .mount('#app')
})
