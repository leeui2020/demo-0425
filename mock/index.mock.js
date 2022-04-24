const { Random } = require('mockjs')

module.exports = [
  {
    pattern: '/api/tabs',
    handle (req, res) {
      const icon = Random.image('128x128', '#ee79a0', '#fff', 'ICON')
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        code: 200,
        msg: 'ok',
        data: [
          { id: 'douyin', icon, label: '抖音' },
          { id: 'bilibili', icon, label: 'Bilibili' },
          { id: 'kuaishou', icon, label: '快手' },
          { id: 'weibo', icon, label: '微博' },
          { id: 'video', icon, label: '视频号' },
          { id: 'redbook', icon, label: '小红书' }
        ]
      }))
    }
  }
]
