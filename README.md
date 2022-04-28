# 实现方案与思路

## 主题样式的管理

样式的相关代码定义在 src/layout 目录下。
首先在全局引入的 styles/index.scss 文件中定义全部 css 变量的初始值：

```scss
:root {
  --color-primary: #6858fe;

  --bg-color: #ffffff;
  --bg-tabs: #e7eaf4;

  --text-color-df: #333;
  --text-color-reverse: #fff;

  --font-size-df: 14px;
  --font-size-sm: 13px;
}
```

在 theme 中定义任意个 json 文件，每个 json 文件对应一种主题，文件名即主题名称。
json 文件的内容，是每个 css 变量的键值对，用以覆盖默认定义的 css 变量：

```json
{
  "color-primary": "#6858fe",
  "bg-color": "#424242",
  "bg-tabs": "#303030",
  "text-color-df": "#ffffff",
  "text-color-reverse": "#fff"
}
```

加载主题的逻辑定义在 theme/index.js 文件中。
利用 import.meta.glob 实现主题文件的自动懒加载，无需手动一个个引入；
向外暴露 loadTheme 方法，调用时传入要切换的主题名称即可实现主题切换；
相关代码：

```js
import { ref } from 'vue'
import camelCase from 'lodash/camelCase'

const files = import.meta.glob('./*.json')

const getSheet = (() => {
  /** @type {HTMLStyleElement} */
  let stylesheet = null
  return () => {
    if (!stylesheet) {
      stylesheet = document.createElement('style')
      stylesheet.type = 'text/css'
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
    Object.entries(res.default).map(([k, v]) => `--${k}: ${v}`).join(';\n')
  }}`
}
```
## 内容组件的展开收起逻辑

使用 flex 布局，并在内容溢出时换行处理；定义使单行高度为 36px; 
在收起状态时，定义父层容器的高度为 36px，溢出省略。即可实现展开、收起逻辑；
为了添加过度动画，需要事先在父层容器定义明确的高度，所以在组件渲染后，以及组件内容要变更时，
会通过 js 计算得到父层容器的实际高度，并通过 css 赋值给父层容器。
计算高度的相关代码：

```js
const contentEl = ref(null)
const computedHeight = async () => {
  await nextTick()
  if (!contentEl.value) return
  contentEl.value.classList.add('computing')
  contentEl.value.style.height = null
  const rect = contentEl.value.getBoundingClientRect()
  showClose.value = rect.height > 60
  contentEl.value.classList.remove('computing')
  contentEl.value.style.height = `${rect.height}px`
}

onMounted(computedHeight)
watch(props, computedHeight)
```
