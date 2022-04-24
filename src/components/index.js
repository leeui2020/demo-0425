import { defineAsyncComponent } from 'vue'

const files = import.meta.glob('./*/index.vue')

/** @param {import('vue').App} app */
export default function registComponent (app) {
  Object.entries(files).forEach(([filePath, loadModule]) => {
    const compName = filePath.match(/^\.\/(\S+)\/index.vue$/)[1]
    app.component(`app-${compName}`, defineAsyncComponent(() => loadModule()))
  })
}
