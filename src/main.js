import { createApp, h, Suspense } from 'vue'
import App from './App.vue'
import registComponent from './components'
import { loadTheme } from './layout'
import router from './router'
import elementUI from './element-ui'

const url = new URL(location.href)
const theme = url.searchParams.get('theme') || 'default'

loadTheme(theme).then(() => {
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
