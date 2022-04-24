import { ref } from 'vue'
import camelCase from 'lodash/camelCase'

const files = import.meta.glob('./*.json')

const getSheet = (() => {
  /** @type {HTMLStyleElement} */
  let stylesheet = null
  return () => {
    if (!stylesheet) {
      stylesheet = document.createElement('style')
      document.head.appendChild(stylesheet)
    }
    return stylesheet
  }
})()

export const theme = ref({})

export async function loadTheme (id) {
  const themeFile = `./${id}.json`
  if (!files[themeFile]) {
    return
  }

  const res = await files[themeFile]()
  const themeMap = {}
  for (const k in res.default) {
    themeMap[camelCase(k)] = res.default[k]
  }
  theme.value = themeMap

  getSheet().innerText = `:root {${
    Object.entries(res.default).map(([k, v]) => `--${k}: ${v}`).join(';')
  }}`
}
