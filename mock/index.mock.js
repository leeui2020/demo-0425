const { Random } = require('mockjs')

const json = (func) => (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    code: 200,
    msg: 'ok',
    data: func()
  }))
}

module.exports = [
  {
    pattern: '/api/tabs',
    handle: json(() => {
      const icon = Random.image('128x128', '#ee79a0', '#fff', 'ICON')
      return [
        { id: 'douyin', icon, label: '抖音' },
        { id: 'bilibili', icon, label: 'Bilibili' },
        { id: 'kuaishou', icon, label: '快手' },
        { id: 'weibo', icon, label: '微博' },
        { id: 'video', icon, label: '视频号' },
        { id: 'redbook', icon, label: '小红书' }
      ]
    })
  },
  {
    pattern: '/api/props',
    handle: json(() => {
      const generate = (id, text) => Array(Random.integer(3, 36))
        .fill(0)
        .map((v, i) => ({
          id: `${id}-${i}`,
          title: Random.pick(text)
        }))

      const longText = Array(10).fill('超长测试文本').join('')

      return [
        { id: '1', title: '甜点饮品', children: generate(1, ['奶茶果子']) },
        { id: '2', title: '超市便利', children: generate(2, ['牛奶酸奶']) },
        { id: '3', title: '蔬菜水果', children: generate(3, ['买菜做饭']) },
      ]
    })
  }
]
